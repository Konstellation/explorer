<template>
    <div>
        <sub-title
            title="PROPOSAL"
            :sub="id"/>
        <div class="content">
            <card
                v-if="detail"
                title="Proposal Details">
                <data-item label="Proposal ID">
                    <span>{{ detail.id }}</span>
                </data-item>
                <data-item label="Type">
                    <span>{{ get(detail, 'content.type') }}</span>
                </data-item>
                <data-item label="Status">
                    <span>{{ detail.proposal_status }}</span>
                </data-item>
                <data-item label="Submit Time">
                    <span>{{ detail.submit_time | formatTime }}</span>
                </data-item>
                <data-item label="Deposit End Time">
                    <span>{{ detail.deposit_end_time | formatTime }}</span>
                </data-item>
                <data-item label="Total Deposit">
                    <data-amount :list="detail.total_deposit"/>
                </data-item>
            </card>
            <card
                v-if="detail"
                title="Proposal Content">
                <data-item label="Title">
                    <span>{{ get(detail, 'content.value.title') }}</span>
                </data-item>
                <data-item label="Description">
                    <span>
                        {{ get(detail, 'content.value.description') }}
                    </span>
                </data-item>
                <div v-if="!isEmpty(get(detail, 'content.value.changes'))">
                    <data-item
                        v-for="para in get(detail, 'content.value.changes')"
                        :key="para.key"
                        :label="para.key">
                        <span>{{ para.value }}</span>
                    </data-item>
                </div>
            </card>
            <card
                v-if="detail && detail.proposal_status === 'VotingPeriod'"
                title="Voting Status">
                <data-item label="Voting Start Time">
                    <span>{{ detail.voting_start_time | formatTime }}</span>
                </data-item>
                <data-item label="Voting End Time">
                    <span>{{ detail.voting_end_time | formatTime }}</span>
                </data-item>
                <data-item label="Voting Result (Votes/Tally)">
                    <div class="voting-result">
                        <div class="yes">
                            <span>{{ detail.votes.filter(v => v.option === 'Yes').length }} / {{ detail.tally.yes }}</span>
                            <p>YES</p>
                        </div>
                        <div class="no">
                            <span>{{ detail.votes.filter(v => v.option === 'No').length }} / {{ detail.tally.no }}</span>
                            <p>NO</p>
                        </div>
                        <div class="veto">
                            <span>{{ detail.votes.filter(v => v.option === 'NoWithVeto').length }} / {{ detail.tally.no_with_veto }}</span>
                            <p>NO WITH VETO</p>
                        </div>
                        <div class="abstain">
                            <span>{{ detail.votes.filter(v => v.option === 'Abstain').length }} / {{ detail.tally.abstain }}</span>
                            <p>ABSTAIN</p>
                        </div>
                    </div>
                </data-item>
            </card>
            <card
                v-if="detail && (detail.proposal_status === 'Rejected' || detail.proposal_status === 'Passed')"
                title="Voting Status">
                <data-item label="Voting Result">
                    <div class="voting-result">
                        <div class="yes">
                            <span>{{ detail.votes.filter(v => v.option === 'Yes').length }} / {{ detail.tally.yes }}</span>
                            <p>YES</p>
                        </div>
                        <div class="no">
                            <span>{{ detail.votes.filter(v => v.option === 'No').length }} / {{ detail.tally.no }}</span>
                            <p>NO</p>
                        </div>
                        <div class="veto">
                            <span>{{ detail.votes.filter(v => v.option === 'NoWithVeto').length }} / {{ detail.tally.no_with_veto }}</span>
                            <p>NO WITH VETO</p>
                        </div>
                        <div class="abstain">
                            <span>{{ detail.votes.filter(v => v.option === 'Abstain').length }} / {{ detail.tally.abstain }}</span>
                            <p>ABSTAIN</p>
                        </div>
                    </div>
                </data-item>
            </card>
        </div>
    </div>
</template>

<script>
    import { get, isEmpty } from 'lodash';
    import { mapState } from 'vuex';

    export default {
        name: 'ProposalDetail',
        data() {
            return {
                id: this.$route.params.id,
            };
        },
        computed: {
            ...mapState('proposals', ['details']),
            detail() {
                return get(this.details, this.id);
            },
        },
        mounted() {
            this.$store.dispatch('proposals/fetchDetail', this.id);
        },
        methods: {
            get,
            isEmpty,
        },
    };
</script>

<style lang="scss">
    .voting-result {
        display: flex;
        text-align: center;
        justify-content: space-between;
        flex-wrap: wrap;

        & > div {
            flex-basis: 120px;

            span {
                font-size: 24px;
            }
        }

        .yes {
            color: green;
        }

        .no {
            color: orange;
        }

        .veto {
            color: red;
        }
    }
</style>
