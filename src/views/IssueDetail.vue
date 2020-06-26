<template>
    <div>
        <sub-title
            title="Issue"
            :sub="denom"/>
        <div class="content">
            <card
                v-if="detail"
                title="Issue details">
                <data-item label="Denom">
                    <span>{{ detail.denom }}</span>
                </data-item>
                <data-item label="Issuer">
                    <k-link
                        type="address"
                        :content="detail.issuer"
                        :ellipsis="false"
                    />
                </data-item>
                <data-item label="Owner">
                    <k-link
                        type="address"
                        :content="detail.owner"
                        :ellipsis="false"
                    />
                </data-item>
                <data-item label="Symbol">
                    <span>{{ detail.symbol }}</span>
                </data-item>
                <data-item label="Total supply">
                    <span>
                        {{ `${detail.total_supply}${detail.decimals > 0 ?
                        `.${'0'.repeat(detail.decimals)}` : ''}` }}
                    </span>
                </data-item>
                <data-item label="Description">
                    <span>{{ detail.description || '-' }}</span>
                </data-item>
            </card>
            <card
                v-if="detail"
                title="Features">
                <template v-for="feature in features(detail)">
                    <data-item
                        :key="feature.key"
                        :label="feature.title">
                        <span>Yes</span>
                    </data-item>
                </template>
            </card>
        </div>
    </div>
</template>

<script>
    import {get} from 'lodash';
    import {mapState} from 'vuex';
    import {features} from '../utils/func';

    export default {
        name: 'IssueDetail',
        data() {
            return {
                denom: this.$route.params.denom,
            };
        },
        computed: {
            ...mapState('issues', ['details']),
            detail() {
                return get(this.details, this.denom);
            },
        },
        mounted() {
            this.$store.dispatch('issues/fetchDetail', this.denom);
        },
        methods: {
            get,
            features,
        },
    };
</script>
