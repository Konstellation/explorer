import {set, isEmpty} from 'lodash';
import chain from '../../../utils/chain';

export default {
    namespaced: true,

    state: {
        list: [],
        consPubMap: {},
        latest: null,
        details: {},
    },

    getters: {
        onlineList: state => state.list.filter(i => !i.jailed),
    },

    mutations: {
        setList(state, data) {
            set(state, 'list', data);
        },
        setDetail(state, data) {
            state.details = Object.assign({}, state.details, data);
        },
        setConsPubMap(state, data) {
            state.consPubMap = Object.assign({}, state.consPubMap, data);
        },
    },

    actions: {
        setValidators(context, validators) {
            if (validators) {
                validators.sort((a, b) => b.tokens - a.tokens);
                context.commit(
                    'setList',
                    validators.map((i, index) => {
                        i.number = index + 1;
                        return i;
                    }),
                );
                validators.forEach((i) => {
                    context.commit('setConsPubMap', {[i.consensus_pubkey]: i});
                });
            }
        },
        async fetchAll(context) {
            const {result: validatorsBonded} = await chain.fetchValidators('bonded');
            const {result: validatorsUnbonded} = await chain.fetchValidators('unbonded');
            const {result: validatorsUnbonding} = await chain.fetchValidators('unbonding');
            const validators = [...validatorsBonded, ...validatorsUnbonded, ...validatorsUnbonding];

            context.dispatch('setValidators', validators);
        },
        async fetchList(context, status) {
            const {result: validators} = await chain.fetchValidators(status);

            context.dispatch('setValidators', validators);
        },
        async fetchDetail(context, address) {
            if (!isEmpty(context.state.details[address])) {
                return Promise.resolve();
            }

            const data = await chain.fetchValidatorDetails(address);
            if (isEmpty(data)) {
                return Promise.reject();
            }

            context.commit('setDetail', {[address]: data.result});

            return Promise.resolve();
        },
    },
};
