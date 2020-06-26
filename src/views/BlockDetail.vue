<template>
    <div v-if="detail">
        <sub-title
            title="BLOCK"
            :sub="`#${height}`"
        />
        <div class="block-detail-content">
            <card title="Block Information">
                <data-item label="Height">
                    <span>{{ detail.header.height }}</span>
                </data-item>
                <data-item label="TimeStamp">
                    <span>{{ detail.header.time }}</span>
                </data-item>
                <data-item label="Hash">
                    <span>{{ detail.header.app_hash }}</span>
                </data-item>
                <data-item label="Transactions number">
                    <span>{{ detail.header.num_txs }}</span>
                </data-item>
                <data-item label="Proposer Address">
                    <k-link
                        type="validator"
                        :content="get(consPubMap,
                        [get(proposers, [height, 'pub_key']), 'operator_address'])"
                        :ellipsis="false"
                    />
                </data-item>
            </card>
            <card title="Last Block">
                <data-item label="Last Block Hash">
                    {{ detail.last_commit.block_id.hash }}
                </data-item>
            </card>
            <card title="Transactions">
                <transaction-list
                    :fields="fields"
                    :load="load"
                    :list="transactionList"
                />
            </card>
            <card
                v-if="validatorList"
                title="Validators"
            >
                <validator-list :list="validatorList"/>
            </card>
        </div>
    </div>
</template>

<script>
    import {get, isEmpty} from 'lodash';
    import {mapState} from 'vuex';
    import sha256 from 'crypto-js/sha256';
    import Base64 from 'crypto-js/enc-base64';

    import {txListFieldsMap} from '../constants';

    export default {
        name: 'BlockDetail',
        data() {
            return {
                height: this.$route.params.id,
                fields: txListFieldsMap.send,
                txs: [],
            };
        },
        computed: {
            ...mapState('blocks', {
                blockDetails: 'details',
                proposers: 'proposers',
                validatorsets: 'validatorsets',
            }),
            ...mapState('transactions', {
                transactionDetails: 'details',
                load: 'load',
            }),
            ...mapState('validators', ['consPubMap']),
            detail() {
                const {height, blockDetails} = this;
                return get(blockDetails, [height, 'block']);
            },
            transactionList() {
                const {txs} = this;
                if (isEmpty(txs)) {
                    return null;
                }

                return txs;
            },
            validatorList() {
                const {height, validatorsets, consPubMap} = this;
                const validatorset = get(validatorsets, `${height}.result.validators`);

                if (isEmpty(validatorset) || isEmpty(consPubMap)) {
                    return [];
                }

                return validatorset.map(i => get(consPubMap, [i.pub_key]));
            },
        },
        mounted() {
            this.fetchData();
        },
        methods: {
            get,
            decodeTx(tx) {
                return sha256(Base64.parse(tx))
                    .toString()
                    .toUpperCase();
            },
            async processTx(txs) {
                const promises = txs.map(hash => this.$store.dispatch('transactions/fetch', hash));
                return Promise.all(promises);
            },
            async fetchData() {
                if (isEmpty(this.consPubMap)) {
                    await this.$store.dispatch('validators/fetchAll', 'bonded');
                }

                const {block: {data: {txs}}} = await this.$store.dispatch('blocks/fetchDetail', this.height);
                if (isEmpty(txs)) {
                    return false;
                }

                this.txs = await this.processTx(txs
                    .map(this.decodeTx));

                return true;
            },
        },
    };
</script>
