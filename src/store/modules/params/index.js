import {isEmpty} from 'lodash';
import chain from '../../../utils/chain';

export default {
    namespaced: true,

    state: {
        params: {},
    },

    mutations: {
        setParams: (state, params) => {
            state.params = {
                ...state.params,
                ...params,
            };
        },
    },

    getters: {},

    actions: {
        async fetchStakingParams(context) {
            const {result} = await chain.fetchStakingParameters();
            if (isEmpty(result)) {
                return Promise.reject();
            }

            context.commit('setParams', {staking: result});

            return Promise.resolve();
        },
        async fetchSlashingParams(context) {
            const {result} = await chain.fetchSlashingParameters();
            if (isEmpty(result)) {
                return Promise.reject();
            }

            context.commit('setParams', {slashing: result});

            return Promise.resolve();
        },
        async fetchDistributionParams(context) {
            const {result} = await chain.fetchDistributionParameters();
            if (isEmpty(result)) {
                return Promise.reject();
            }

            context.commit('setParams', {distribution: result});

            return Promise.resolve();
        },
        async fetchMintParams(context) {
            const {result} = await chain.fetchMintParameters();
            if (isEmpty(result)) {
                return Promise.reject();
            }

            context.commit('setParams', {mint: result});

            return Promise.resolve();
        },
        async fetchGovParams(context) {
            const {result: deposit} = await chain.fetchGovDepositParameters();
            if (isEmpty(deposit)) {
                return Promise.reject();
            }
            const {result: tallying} = await chain.fetchGovTallyingParameters();
            if (isEmpty(tallying)) {
                return Promise.reject();
            }
            const {result: voting} = await chain.fetchGovVotingParameters();
            if (isEmpty(voting)) {
                return Promise.reject();
            }
            context.commit('setParams', {gov: {...deposit, ...tallying, ...voting}});

            return Promise.resolve();
        },
        async fetchIssueParams(context) {
            const {result} = await chain.fetchIssueParameters();
            if (isEmpty(result)) {
                return Promise.reject();
            }

            context.commit('setParams', {issue: result.value});

            return Promise.resolve();
        },
        fetchParams(context) {
            context.dispatch('fetchStakingParams');
            context.dispatch('fetchSlashingParams');
            context.dispatch('fetchDistributionParams');
            context.dispatch('fetchMintParams');
            context.dispatch('fetchGovParams');
            context.dispatch('fetchIssueParams');
        },
    },
};
