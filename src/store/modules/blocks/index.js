import { get, isEmpty } from 'lodash';
import Codec from '../../../utils/cdec';
import chain from '../../../utils/chain';
import { DEFAULT_BECH32_PREFIX } from '../../../constants';

export default {
    namespaced: true,
    state: {
        pageSize: 20,
        currentPage: 1,
        lastHeight: 0,
        list: [],
        details: {},
        proposers: {},
        validatorsets: {},
    },
    getters: {
        lastList: state => state.list.slice(0, 5),
        list: (state) => {
            const { list, details, validatorsets } = state;

            return list.map((item) => {
                const height = get(item, 'header.height');
                if (isEmpty(details[height])) {
                    return item;
                }

                const validators = get(validatorsets, [height, 'validators'], []);
                const block = get(details, [height, 'block']);

                return {
                    ...item,
                    block,
                    validators,
                };
            });
        },
    },
    mutations: {
        setCurrentPage(state, page) {
            state.currentPage = page;
        },
        setLastHeight(state, height) {
            height = Number(height);
            if (state.lastHeight > height) {
                return false;
            }

            state.lastHeight = height;

            return true;
        },
        setList(state, list) {
            state.list = list;
        },
        addToList(state, block) {
            state.list = [block, ...state.list];
        },
        setDetails(state, data) {
            state.details = Object.assign({}, data, state.details);
        },
        setProposers(state, data) {
            state.proposers = Object.assign({}, data, state.proposers);
        },
        setValidatorSets(state, data) {
            state.validatorsets = Object.assign({}, data, state.validatorsets);
        },
    },
    actions: {
        async fetchList(context, params = { page: 1 }) {
            const { minHeight, maxHeight, page } = params;
            const { result } = await chain.fetchBlockchainInfo({
                minHeight,
                maxHeight,
                random: new Date().getTime(),
            });
            if (isEmpty(result)) {
                return Promise.reject();
            }

            const { block_metas, last_height } = result;

            page && context.commit('setCurrentPage', page);
            context.commit('setList', block_metas);
            context.commit('setLastHeight', last_height);

            block_metas.forEach((item) => {
                const height = get(item, 'header.height');
                const { details } = context.state;

                if (isEmpty(details[height])) {
                    context.dispatch('fetchDetail', height);
                }
            });

            return Promise.resolve();
        },
        async fetchValidatorSet(context, height) {
            const data = await chain.fetchValidatorSets(height);
            if (!isEmpty(data)) {
                context.commit('setValidatorSets', { [height]: data });
                // find proposer of this block
                const block = context.state.details[height];
                const cons_hex = get(block, 'block.header.proposer_address');
                const cons_addr = Codec.Bech32.toBech32(`${DEFAULT_BECH32_PREFIX}valcons`, cons_hex);
                const proposer = data.result.validators.find(v => v.address === cons_addr);

                context.commit('setProposers', { [height]: proposer });
            }
        },
        async fetchDetail(context, height) {
            if (!isEmpty(context.state.details[height])) {
                return Promise.resolve(context.state.details[height]);
            }

            const { result: block } = await chain.fetchBlockInfo(height);
            if (!isEmpty(block)) {
                context.dispatch('fetchValidatorSet', height);
                context.commit('setDetails', { [height]: block });

                return Promise.resolve(block);
            }

            return Promise.resolve();
        },
        handleNewBlock(context, {data: {value: {block}}}) {
            const height = get(block, 'header.height');
            const { details } = context.state;

            context.commit('addToList', block);
            context.commit('setLastHeight', height);

            if (isEmpty(details[height])) {
                context.dispatch('fetchDetail', height);
            }

            return Promise.resolve();
        },
    },
};
