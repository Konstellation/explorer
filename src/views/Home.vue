<template>
    <div class="home-container">
        <div class="panels">
            <div class="home-panel">
                <p>Block Height</p>
                <span>{{ get(blocksLastList, `0.header.height`) }}</span>
            </div>
            <div class="home-panel">
                <p>Avg Block Time</p>
                <span>{{ avgBlockTime }}</span> S
            </div>
            <div class="home-panel">
                <p>Bonded Tokens</p>
                <span>{{ bondedTokens }}</span> M
            </div>
            <div class="home-panel">
                <p>Bonded Ratio</p>
                <span>{{ bondedRatio }}</span> %
            </div>
            <div class="home-panel">
                <p>
                    <RouterLink to="/validator">
                        Active Validators
                    </RouterLink>
                </p>
                <span>{{ validatorList.length }}</span>
            </div>
        </div>
        <el-row :gutter="24">
            <el-col
                :xs="24"
                :sm="12">
                <card
                    title="blocks"
                    link="/block">
                    <ul class="home-blocks">
                        <li
                            v-for="(item, index) in blocksLastList"
                            :key="index"
                            class="item block">
                            <p class="height">
                                <router-link
                                    :to="`/block/${item.header.height}`"
                                    class="link">
                                    {{ item.header.height }}
                                </router-link>
                            </p>
                            <p class="time">
                                {{ item.header.time | formatTime }}
                            </p>
                            <p class="txn">
                                Txn: {{ item.header.num_txs }}
                            </p>
                        </li>
                    </ul>
                </card>
            </el-col>
            <el-col
                :xs="24"
                :sm="12">
                <card
                    title="transactions"
                    link="/txs/transfers">
                    <ul class="home-txs">
                        <li
                            v-for="(item, index) in txLastList"
                            :key="index"
                            class="item transactions">
                            <p class="hash">
                                <k-link
                                    type="tx"
                                    :content="item.txhash"
                                />
                            </p>
                            <p class="block">
                                Block:
                                <k-link
                                    type="block"
                                    :content="item.height"/>
                            </p>
                            <p class="gas">
                                Gas Used: {{ item.gas_used }}
                            </p>
                        </li>
                    </ul>
                </card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';
    import { get } from 'lodash';

    export default {
        name: 'Home',
        computed: {
            ...mapState('blocks', { blockList: 'list' }),
            ...mapState('validators', { validatorList: 'list' }),
            ...mapGetters('blocks', { blocksLastList: 'lastList' }),
            ...mapGetters('transactions', { txLastList: 'lastList' }),
            ...mapGetters('stats', ['pool', 'bondedRatio', 'bondedTokens', 'avgBlockTime']),

            bonded() {
                return this.bondedTokens;
            },
        },
        async mounted() {
            await this.$store.dispatch('transactions/fetchTotalCount');
            await this.$store.dispatch('validators/fetchAll', 'bonded');
            await this.$store.dispatch('transactions/fetchLastList');
            this.fetchData();
        },
        methods: {
            get,
            fetchData() {
                // console.log(await chain.fetchDistributionCommunityPool());
                // console.log(await chain.fetchDistributionParameters());
                // console.log(await chain.fetchStakingPool());
                // console.log(await chain.fetchStakingParameters());
                // console.log(await chain.fetchSlashingSigningInfos());
                // console.log(await chain.fetchSlashingParameters());
                // console.log(await chain.fetchGovDepositParameters());
                // console.log(await chain.fetchGovTallyingParameters());
                // console.log(await chain.fetchGovVotingParameters());
                this.$store.dispatch('blocks/fetchList');
            },
        },
    };
</script>

<style lang="scss" scoped>
    .home-container {
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;

        .panels {
            display: flex;
            margin: 0 -1%;
        }

        .home-panel {
            flex-basis: 18%;
            margin: 24px 1% 0;
            text-align: center;
            padding: 24px 0;
            height: 146px;
            overflow: hidden;
            background: $color-primary;
            /*border-radius: 8px;*/
            box-shadow: $shadow;
            font-size: 1.2em;

            p {
                margin-bottom: 16px;
            }

            span {
                font-size: 36px;
            }
        }

        .item {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 16px;
            border-bottom: 1px solid $color-line;
            font-size: 14px;

            > p {
                margin-bottom: 10px;
            }

            > p:last-child {
                margin-bottom: 0;
            }

            &:first-child {
                padding: 0 16px 16px;
            }
        }
    }

    .block > .height {
        flex: 1;
        color: $color-primary;
    }

    .block > .txn {
        flex-basis: 100%;
    }

    .block > .time {
        color: $color-text;
    }

    .transactions > .gas {
        flex-basis: 100%;
    }

    @include responsive($sm) {
        .home-container {
            .panels {
                flex-wrap: wrap;
            }

            .home-panel {
                flex-basis: 98%;
            }
        }
    }
</style>
