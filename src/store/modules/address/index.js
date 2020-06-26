import { isEmpty } from 'lodash';
import chain from '../../../utils/chain';
import { DEFAULT_DENOM } from '../../../constants';

export default {
    namespaced: true,

    state: {
        info: [],
        addressMap: {},
    },

    getters: {},

    mutations: {
        setInfo(state, info) {
            state.info = info;
        },
        setAddressMap(state, data) {
            state.addressMap = Object.assign({}, state.addressMap, data);
        },
    },

    actions: {
        async fetch(context, address) {
            context.commit('setInfo', []);
            const { result } = await chain.fetchAccountBalance(address);
            const balances = result;
            if (isEmpty(balances)) {
                return Promise.reject();
            }

            balances.sort(i => (i.denom === DEFAULT_DENOM ? -1 : 1));

            context.commit('setInfo', balances);

            return Promise.resolve();
        },
        async fetchDetail(context, address) {
            const { result } = await chain.fetchAccount(address);
            if (isEmpty(result)) {
                return Promise.reject();
            }

            context.commit('setAddressMap', {
                [address]: result,
            });

            return Promise.resolve();
        },
    },
};
