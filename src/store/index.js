import Vuex from 'vuex';
import Vue from 'vue';
import basic from './modules/basic';
import blocks from './modules/blocks';
import transactions from './modules/transactions';
import proposals from './modules/proposals';
import address from './modules/address';
import validators from './modules/validators';
import issues from './modules/issues';
import params from './modules/params';
import stats from './modules/stats';

const rootStore = {
    modules: {
        basic,
        blocks,
        transactions,
        proposals,
        address,
        validators,
        issues,
        params,
        stats,
    },
};

Vue.use(Vuex);

export default new Vuex.Store(rootStore);
