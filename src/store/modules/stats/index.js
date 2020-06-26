import { isEmpty } from 'lodash';
import moment from 'dayjs';
import chain from '../../../utils/chain';
import { DEFAULT_DENOM } from '../../../constants';

export default {
    namespaced: true,

    state: {
        total: {},
        pool: {},
    },

    mutations: {
        setPool: (state, pool) => {
            state.pool = pool;
        },
        setTotalSupply: (state, total) => {
            state.total = total;
        },
    },

    getters: {
        total: state => state.total,
        pool: state => state.pool,
        // if (isEmpty(this.pool)) {
        // return 0;
        avgBlockTime(state, getters, rootState) {
            const blocks = rootState.blocks.list;

            if (!blocks.length) return 0;
            const first = moment(blocks[0].header.time)
                .unix();
            const last = moment(
                blocks[blocks.length - 1].header.time,
            )
                .unix();

            return ((first - last) / blocks.length).toFixed(2);
        },
        bondedTokens: state => (Number(state.pool.bonded_tokens) / Math.pow(10, 8)).toFixed(2),
        bondedRatio(state) {
            if (isEmpty(state.total)) {
                return 0;
            }

            if (isEmpty(state.pool.bonded_tokens)) {
                return 0;
            }

            return ((Number(state.pool.bonded_tokens) / Number(state.total.find(t => t.denom === DEFAULT_DENOM).amount)) * 100).toFixed(2);
        },
    },

    actions: {
        async fetchStakingPool(context) {
            const { result } = await chain.fetchStakingPool();
            if (isEmpty(result)) {
                return Promise.reject();
            }

            context.commit('setPool', result);

            return Promise.resolve();
        },
        // async fetchSupplyDenom(context) {
            // console.log(await chain.fetchSupplyDenom('adarc'));
        // },
        async fetchSupplyTotal(context) {
            const { result } = await chain.fetchSupplyTotal();
            if (isEmpty(result)) {
                return Promise.reject();
            }

            context.commit('setTotalSupply', result);

            return Promise.resolve();
        },
        fetchStats(context) {
            context.dispatch('fetchStakingPool');
            context.dispatch('fetchSupplyTotal');
        },
    },
};
