import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Blocks from './views/Blocks';
import BlockDetail from './views/BlockDetail';
import Transactions from './views/Transactions';
import TransactionDetail from './views/TransactionDetail';
import AddressDetail from './views/AddressDetail';
import Proposals from './views/Proposals';
import ProposalDetail from './components/Proposals/Detail';
import Validators from './views/Validators';
import ValidatorDetail from './views/ValidatorDetail';
import Issues from './views/Issues';
import IssueDetail from './views/IssueDetail';
import NotFound from './views/NotFound';
import View from './components/View';
import Params from './views/Params';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/params',
            name: 'params',
            component: Params,
        },
        {
            path: '/block',
            component: View,
            children: [
                {
                    path: '',
                    name: 'blocks',
                    component: Blocks,
                },
                {
                    path: '/block/:id',
                    name: 'blockDetail',
                    component: BlockDetail,
                },
            ],
        },
        {
            path: '/txs/:category',
            name: 'transactions',
            component: Transactions,
        },
        {
            path: '/tx/:hash',
            name: 'transactionDetail',
            component: TransactionDetail,
        },
        {
            path: '/address/:address',
            name: 'addressDetail',
            component: AddressDetail,
        },
        {
            path: '/proposal',
            component: View,
            children: [
                {
                    path: '',
                    name: 'proposals',
                    component: Proposals,
                },
                {
                    path: ':id',
                    name: 'proposalDetail',
                    component: ProposalDetail,
                },
            ],
        },
        {
            path: '/validator',
            component: View,
            children: [
                {
                    path: '',
                    name: 'validators',
                    component: Validators,
                },
                {
                    path: ':address',
                    name: 'validatorDetail',
                    component: ValidatorDetail,
                },
            ],
        },
        {
            path: '/issue',
            component: View,
            children: [
                {
                    path: '',
                    name: 'issues',
                    component: Issues,
                },
                {
                    path: ':denom',
                    name: 'issueDetail',
                    component: IssueDetail,
                },
            ],
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound,
        },
    ],
});
