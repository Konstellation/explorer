import Vue from 'vue';
import ElementUI from 'element-ui';
import '@/styles/element-variables.scss';
import VueI18n from 'vue-i18n';
import {
    library,
} from '@fortawesome/fontawesome-svg-core';
import {
    faArrowUp,
    faArrowDown,
    faEquals,
    faChevronDown,
    faCircle,
    faPercent,
    faSpinner,
    faVoteYea,
    faAngleDoubleUp,
    faAngleDoubleRight,
    faAngleDoubleDown,
    faCommentDollar,
    faPoll,
    faCoins,
    faHashtag,
    faEdit,
    faPlus,
    faMinus,
    faSeedling,
    faSnowflake,
    faBurn,
    faFireAlt,
    faFire,
    faHammer,
    faShieldAlt,
    faNetworkWired,
    faSun,
    faCog,
    faAlignJustify,
    faStar,
    faGavel,
} from '@fortawesome/free-solid-svg-icons';
import {
    FontAwesomeIcon,
} from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import {
    en,
} from './constants';
import * as filters from './utils/filters.js';
import store from './store';

import Card from './components/Card';
import Link from './components/Link';
import TransactionList from './components/TransactionList';
import InputSearch from './components/InputSearch';
import ValidatorList from './components/ValidatorList';
import DataItem from './components/DataItem';
import SubTitle from './components/SubTitle';
import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './components/Menu';
import AddressCopy from './components/AddressCopy';
import TextCopy from './components/TextCopy';
import HashCopy from './components/HashCopy';
import ProposalList from './components/Proposals/List';
import BlockList from './components/BlockList';
import BoxGrid from './components/BoxGrid';
import ParamPanel from './components/ParamPanel';
import IssueList from './components/IssueList';
import Amount from './components/DataAmount';
import IssueDetail from './components/Issues/Issue/IssueDetail';
import ApproveDetail from './components/Issues/Approve/ApproveDetail';
import TransferDetail from './components/Issues/Transfer/TransferDetail';
import TransferFromDetail from './components/Issues/TransferFrom/TransferFromDetail';
import TransferOwnershipDetail from './components/Issues/TransferOwnership/TransferOwnershipDetail';
import MintDetail from './components/Issues/Mint/MintDetail';
import BurnDetail from './components/Issues/Burn/BurnDetail';
import FreezeDetail from './components/Issues/Freeze/FreezeDetail';
import UnfreezeDetail from './components/Issues/Unfreeze/UnfreezeDetail';
import ChangeFeaturesDetail from './components/Issues/ChangeFeatures/ChangeFeaturesDetail';
import ChangeDescriptionDetail from './components/Issues/ChangeDescription/ChangeDescriptionDetail';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Object.keys(filters)
    .forEach(key => Vue.filter(key, filters[key]));

Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'en',
    messages: {
        en,
    },
    // silentTranslationWarn: true,
});
// get blockchain basic info
store.dispatch('basic/fetchInfo');

library.add(
    faArrowDown,
    faArrowUp,
    faEquals,
    faChevronDown,
    faCircle,
    faPercent,
    faSpinner,
    faVoteYea,
    faAngleDoubleUp,
    faAngleDoubleRight,
    faAngleDoubleDown,
    faCommentDollar,
    faPoll,
    faCoins,
    faHashtag,
    faEdit,
    faPlus,
    faMinus,
    faSeedling,
    faFireAlt,
    faBurn,
    faFire,
    faHammer,
    faSnowflake,
    faShieldAlt,
    faNetworkWired,
    faSun,
    faCog,
    faAlignJustify,
    faStar,
    faGavel,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('card', Card);
Vue.component('k-link', Link);
Vue.component('k-menu', Menu);
Vue.component('k-footer', Footer);
Vue.component('k-header', Header);
Vue.component('k-address', AddressCopy);
Vue.component('k-text-copy', TextCopy);
Vue.component('k-hash-copy', HashCopy);
Vue.component('transaction-list', TransactionList);
Vue.component('block-list', BlockList);
Vue.component('proposal-list', ProposalList);
Vue.component('input-search', InputSearch);
Vue.component('validator-list', ValidatorList);
Vue.component('issue-list', IssueList);
Vue.component('sub-title', SubTitle);
Vue.component('data-item', DataItem);
Vue.component('box-grid', BoxGrid);
Vue.component('param-panel', ParamPanel);
Vue.component('data-amount', Amount);
Vue.component('issue-detail', IssueDetail);
Vue.component('mint-detail', MintDetail);
Vue.component('burn-detail', BurnDetail);
Vue.component('approve-detail', ApproveDetail);
Vue.component('transfer-detail', TransferDetail);
Vue.component('freeze-detail', FreezeDetail);
Vue.component('unfreeze-detail', UnfreezeDetail);
Vue.component('transfer-from-detail', TransferFromDetail);
Vue.component('transfer-ownership-detail', TransferOwnershipDetail);
Vue.component('change-description-detail', ChangeDescriptionDetail);
Vue.component('change-features-detail', ChangeFeaturesDetail);

new Vue({
    i18n,
    router,
    store,
    render: h => h(App),
}).$mount('#app');
