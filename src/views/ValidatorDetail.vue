<template>
    <div>
        <sub-title
            title="VALIDATOR"
            :sub="address"/>
        <div class="content">
            <card
                v-if="v"
                title="Validator Profile">
                <template v-if="v.operator_address">
                    <div class="item-details validator">
                        <div class="item-details__row">
                            <div class="validator__moniker">
                                <div class="item-details__label">
                                    {{ $t('staking.moniker') }}
                                </div>
                                <div class="item-details__value">
                                    {{ get(v, 'description.moniker') }}
                                </div>
                            </div>
                            <div class="validator__status">
                                <div class="item-details__label">
                                    {{ $t('staking.status') }}
                                </div>
                                {{ get(v, 'status') === 2 ? $t('staking.bonded') : get(v, 'status')
                                === 0 ?
                                $t('staking.unbonded') : $t('staking.unbonding') }}
                                <div class="item-details__value">
                                    <font-awesome-icon
                                        icon="circle"
                                        :class="get(v, 'jailed') ? 'danger' : 'success'"/>
                                </div>
                            </div>
                        </div>
                        <div class="item-details__section">
                            <div class="item-details__section__title">
                                {{ $t('staking.description') }}
                            </div>
                            <div class="item-details__section__content">
                                <div class="validator__description">
                                    <div class="item-details__row">
                                        <div class="item-details__data">
                                            <div class="item-details__label">
                                                {{ $t('staking.identity') }}
                                            </div>
                                            <div class="item-details__value">
                                                {{ get(v, 'description.identity') || '-' }}
                                            </div>
                                        </div>
                                        <div
                                            class="validator__description__website item-details__data">
                                            <div class="item-details__label">
                                                {{ $t('staking.website') }}
                                            </div>
                                            <template v-if="get(v, 'description.website')">
                                                <a
                                                    :href="get(v, 'description.website')"
                                                    class="item-details__value">
                                                    {{ get(v, 'description.website') }}
                                                </a>
                                            </template>
                                            <template v-else>
                                                <div class="item-details__value">
                                                    -
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="item-details__data item-details__row">
                                        <div>
                                            <div class="item-details__label">
                                                {{ $t('staking.details') }}
                                            </div>
                                            <div class="item-details__value">
                                                {{ get(v, 'description.details') || '-' }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item-details__section">
                            <div class="item-details__section__title">
                                {{ $t('staking.title') }}
                            </div>
                            <div class="item-details__section__content">
                                <div class="item-details__data">
                                    <div class="item-details__label">
                                        {{ $t('staking.operator') }}
                                    </div>
                                    <k-link
                                        type="validator"
                                        class="item-details__value"
                                        :ellipsis="false"
                                        :content="get(v, 'operator_address')"/>
                                </div>
                                <div class="item-details__data">
                                    <div class="item-details__label">
                                        {{ $t('staking.consensus_pubkey') }}
                                    </div>
                                    <span>{{ get(v, 'consensus_pubkey') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-details__section">
                            <div class="item-details__section__title">
                                {{ $t('staking.commission') }}
                            </div>
                            <div class="item-details__section__content">
                                <div class="item-details__row item-details__data">
                                    <div>
                                        <div class="item-details__label">
                                            {{ $t('staking.commission_rate') }}
                                        </div>
                                        <div class="item-details__value">
                                            {{ numeral(get(v,
                                            'commission.commission_rates.rate')).format('(0.[00]%)')
                                            }}
                                        </div>
                                    </div>
                                    <div>
                                        <div class="item-details__label">
                                            {{ $t('staking.commission_max') }}
                                        </div>
                                        <div class="item-details__value">
                                            {{ numeral(get(v,
                                            'commission.commission_rates.max_rate')).format('(0.[00]%)')
                                            }}
                                        </div>
                                    </div>
                                    <div>
                                        <div class="item-details__label">
                                            {{ $t('staking.commission_change') }}
                                        </div>
                                        <div class="item-details__value">
                                            {{ numeral(get(v,
                                            'commission.commission_rates.max_change_rate')).format('(0.[00]%)')
                                            }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <template v-if="v.jailed">
                            <div class="item-details__section">
                                <div class="item-details__section__title">
                                    {{ $t('staking.unjail') }}
                                </div>
                                <div class="item-details__section__content">
                                    <div class="item-details__data item-details__row">
                                        <div>
                                            <div class="item-details__label">
                                                {{ $t('staking.status') }}
                                            </div>
                                            <div class="item-details__value">
                                                {{ $t(get(v, 'jailed') ? 'staking.jailed' :
                                                'staking.active') }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div class="item-details__section">
                            <div class="item_details__section__title">
                                {{ $t('staking.shares') }}
                            </div>
                            <div class="item-details__section__content">
                                <div class="item-details__row item-details__data">
                                    <div>
                                        <div class="item-details__label">
                                            {{ $t('staking.total_shares') }}
                                        </div>
                                        <div class="item-details__value">
                                            {{ shares | formatAmount }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </card>
            <card
                v-if="v"
                title="Current Status">
                <data-item label="Voting Power">
                    <span>{{ v.tokens | formatDARC }}</span>
                </data-item>
                <data-item label="Jailed">
                    <span>{{ v.jailed ? 'True' : 'False' }}</span>
                </data-item>
                <data-item label="Unbonding Height">
                    <span>{{ v.unbonding_height || '-' }}</span>
                </data-item>
                <data-item label="Unbonding Time">
                    <span>{{ v.unbonding_time | formatTime }}</span>
                </data-item>
            </card>
        </div>
    </div>
</template>

<script>
    import {get} from 'lodash';
    import {mapState} from 'vuex';
    import numeral from 'numeral';
    import {DEFAULT_DENOM} from '../constants';

    export default {
        name: 'ValidatorDetail',
        data() {
            return {
                address: this.$route.params.address,
            };
        },
        computed: {
            ...mapState('validators', ['details']),
            v() {
                return get(this.details, this.address);
            },
            shares() {
                return {
                    denom: DEFAULT_DENOM,
                    amount: this.v.tokens,
                };
            },
        },
        mounted() {
            this.$store.dispatch('validators/fetchDetail', this.address);
        },
        methods: {
            numeral,
            get,
        },
    };
</script>
