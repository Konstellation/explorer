import { isEmpty } from 'lodash';
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
            state.list = list.reverse();
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
            const { result } = await chain.fetchGovProposals();
            context.commit('setLoad', false);
            context.commit('setList', result);

            return Promise.resolve(result);
        },
        async fetchDetail(context, id) {
            if (!isEmpty(context.state.details[id])) {
                return Promise.resolve();
            }

            context.commit('setLoad', true);
            const { result: proposal } = await chain.fetchGovProposal(id);
            context.commit('setLoad', false);
            if (isEmpty(proposal)) {
                return Promise.reject();
            }

            const { result: votes } = await chain.fetchGovProposalVotes(id);
            const { result: tally } = await chain.fetchGovProposalTally(id);

            proposal.votes = votes;
            proposal.tally = tally;

            context.commit('setDetails', { [id]: proposal});

            return Promise.resolve(proposal);
        },
    },
};
