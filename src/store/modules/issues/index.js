import {isEmpty} from 'lodash';
import chain from '../../../utils/chain';

export default {
    namespaced: true,
    state: {
        list: [],
        details: {},
        load: false,
    },
    mutations: {
        setList(state, list) {
            state.list = list;
        },
        setDetails(state, data) {
            state.details = Object.assign({}, state.details, data);
        },
        setLoad(state, load) {
            state.load = load;
        },
    },
    actions: {
        async fetchList(context) {
            context.commit('setLoad', true);
            const {result} = await chain.fetchIssues({});
            context.commit('setLoad', false);
            context.commit('setList', result);

            return Promise.resolve(result);
        },
        async fetchDetail(context, denom) {
            if (!isEmpty(context.state.details[denom])) {
                return Promise.resolve();
            }

            context.commit('setLoad', true);
            const {result} = await chain.fetchIssue(denom);
            context.commit('setLoad', false);
            if (isEmpty(result)) {
                return Promise.reject();
            }

            const {value: issue} = result;

            context.commit('setDetails', {[denom]: issue});

            return Promise.resolve(issue);
        },
    },
};
