import {isEmpty} from 'lodash';

import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import chain from '../../../utils/chain';

export default {
    namespaced: true,
    state: {
        pageSize: 30,
        currentPage: 1,
        totalCount: 0,
        list: [],
        details: {},
        lastList: [],
        load: false,
    },
    getters: {
        lastList: state => state.lastList.slice(0, 5),
    },
    mutations: {
        setTotalCount(state, data) {
            state.totalCount = data;
        },
        setList(state, list) {
            state.list = list.reverse();
        },
        addToList(state, tx) {
            state.list.unshift(tx);
        },
        addToLastList(state, tx) {
            state.lastList.unshift(tx);
        },
        setLastList(state, list) {
            state.lastList = list.reverse();
        },
        setDetails(state, data) {
            const {details} = state;
            const {txhash} = data;

            if (isEmpty(details[txhash])) {
                state.details = Object.assign({}, state.details, {[txhash]: data});
            }
        },
        setLoad(state, load) {
            state.load = load;
        },
    },
    actions: {
        async fetchTotalCount(context, params = {action: 'send'}) {
            context.commit('setLoad', true);
            const totalCount = await chain.fetchTotalTransactionsCount(params);
            context.commit('setLoad', false);
            if (isEmpty(totalCount)) {
                return Promise.reject();
            }

            context.commit('setTotalCount', Number(totalCount));

            return Promise.resolve();
        },
        async fetchList(context, params = {
            page: 1,
            limit: context.state.pageSize,
        }) {
            context.commit('setLoad', true);
            const {total_count, txs} = await chain.fetchTransactions(params);
            context.commit('setLoad', false);
            if (isEmpty(total_count)) {
                return Promise.reject();
            }

            context.commit('setTotalCount', Number(total_count));
            context.commit('setList', txs);

            return Promise.resolve();
        },
        async fetch(context, hash) {
            const data = await chain.fetchTransaction(hash);

            const {error} = data;
            if (isEmpty(error)) {
                context.commit('setDetails', data);
            }

            context.commit('setLoad', false);
            return Promise.resolve(data);
        },
        async fetchLastList(context) {
            context.commit('setLoad', true);

            const pageSize = 5;
            const {totalCount} = context.state;
            const lastPage = Math.ceil(totalCount / pageSize) || 1;

            let data = await chain.fetchLastTransactions(pageSize);
            if (isEmpty(data)) {
                context.commit('setLoad', false);
                return Promise.reject();
            }

            const {total_count} = data;
            let {txs} = data;

            if (txs.length < pageSize && total_count > pageSize) {
                data = await chain.fetchTransactions({
                    limit: pageSize,
                    page: lastPage - 1,
                });
                if (isEmpty(data)) {
                    context.commit('setLoad', false);
                    return Promise.reject();
                }

                txs = [...data.txs, ...txs];
            }

            context.commit('setLoad', false);
            context.commit('setTotalCount', total_count);
            context.commit('setLastList', txs);

            return Promise.resolve();
        },
        async fetchAddressTxList(context, address, params = {
            page: 1,
            limit: 100,
        }) {
            context.commit('setLoad', true);
            // 1. query txs as sender
            const outBoundTxs = await chain.fetchOutboundTransactions(address, params);
            if (isEmpty(outBoundTxs)) {
                context.commit('setLoad', false);
                return Promise.reject();
            }

            // 2. query txs as recipient
            const inBoundTxs = await chain.fetchInboundTransactions(address, params);
            if (isEmpty(inBoundTxs)) {
                context.commit('setLoad', false);
                return Promise.reject();
            }

            // show action as receive in address page
            const list = [...outBoundTxs.txs, ...inBoundTxs.txs];
            list.sort((a, b) => a.height - b.height);

            context.commit('setLoad', false);
            context.commit('setList', list);

            return Promise.resolve();
        },
        async handleNewTx(context, {data: {value: {TxResult: {tx}}}}) {
            const hash = sha256(Base64.parse(tx))
                .toString();

            const transaction = await context.dispatch('fetch', hash);

            context.commit('addToList', transaction);
            context.commit('addToLastList', transaction);

            return Promise.resolve(transaction);
        },
    },
};
