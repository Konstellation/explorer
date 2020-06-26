import { isEmpty, get } from 'lodash';
import chain from '../../../utils/chain';

export default {
    namespaced: true,

    state: {
        name: '',
    },

    getters: {},

    mutations: {
        setName: (state, name) => {
            state.name = name;
        },
    },

    actions: {
        async fetchInfo(context) {
            const { node_info } = await chain.fetchNodeInfo();
            if (isEmpty(node_info)) {
                return Promise.reject();
            }

            context.commit('setName', get(node_info, 'network'));

            return Promise.resolve();
        },
    },
};
