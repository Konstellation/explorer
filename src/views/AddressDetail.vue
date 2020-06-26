<template>
    <div>
        <sub-title
            title="ADDRESS"
            :sub="address"/>
        <div
            v-if="info"
            class="address-detail-content">
            <card title="Address Information">
                <data-item label="Balance">
                    <data-amount :list="info"/>
                </data-item>
                <data-item label="Address">
                    <span>{{ address }}</span>
                </data-item>
                <data-item label="Memo Required">
                    <span v-if="addressMemo">
                        Yes
                    </span>
                    <span v-else>
                        No
                    </span>
                </data-item>
            </card>
            <card
                v-if="!isEmpty(transactionList)"
                title="Transaction List">
                <transaction-list
                    :fields="send"
                    :load="load"
                    :list="transactionList"/>
            </card>
        </div>
    </div>
</template>

<script>
    import { get, isEmpty } from 'lodash';
    import { mapState } from 'vuex';
    import { txListFieldsMap } from '../constants';

    export default {
        name: 'AddressDetail',
        data() {
            return txListFieldsMap;
        },
        computed: {
            ...mapState('address', ['info', 'addressMap']),
            ...mapState('transactions', {
                transactionList: 'list',
                load: 'load',
            }),
            address() {
                return this.$route.params.address;
            },
            addressMemo() {
                return get(this.addressMap[this.address], 'memo_required') || '';
            },
        },
        beforeRouteUpdate(to, from, next) {
            const { address } = to.params;

            this.$store.dispatch('address/fetch', address);
            this.$store.dispatch('transactions/fetchAddressTxList', address);

            next();
        },
        mounted() {
            this.$store.dispatch('address/fetch', this.address);
            this.$store.dispatch('transactions/fetchAddressTxList', this.address);
            this.$store.dispatch('address/fetchDetail', this.address);
        },
        methods: {
            get,
            isEmpty,
        },
    };
</script>
