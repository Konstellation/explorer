<template>
    <div v-if="detail">
        <div class="item-details__data">
            <div class="item-details__data approval__spender">
                <div class="item-details__label">
                    {{ $t('issues.to_address') }}
                </div>
                <k-link
                    type="address"
                    class="item-details__value"
                    :ellipsis="false"
                    :content="get(detail, 'to_address')"/>
            </div>
            <div class="item-details__data transfer__amount">
                <div class="item-details__label">
                    {{ $t('issues.amount') }}
                </div>
                <div class="item-details__value">
                    {{ get(detail, 'amount') }}
                    {{ get(detail, 'denom') || '' | upper }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { get } from 'lodash';
    import moment from 'dayjs';
    import View from '../../../views/View';

    export default {
        name: 'MintDetail',
        extends: View,
        props: {
            detail: Object,
        },
        computed: {},
        methods: {
            get,
            moment,
        },
    };
</script>

<style lang="scss" scoped>
    .transfer__amount {
        font-size: 30px;
    }
</style>
