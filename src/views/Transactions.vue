<template>
    <card :title="category">
        <div class="card-header">
            <div class="select-action">
                <el-select
                    v-if="Object.keys(actions).length > 1"
                    :disabled="load"
                    :value="selected_key"
                    placeholder="Pls select action"
                    size="small"
                    @change="onSelect">
                    <el-option
                        v-for="key in Object.keys(actions)"
                        :key="key"
                        :value="key"
                        :label="actions[key]"/>
                </el-select>
            </div>
            <p>TOTAL AMOUNT: {{ totalCount }}</P>
        </div>
        <transaction-list
            :list="list"
            :fields="fields"
            :load="load"/>
        <div class="card-footer">
            <el-pagination
                class="pagination"
                background
                :pager-count="7"
                layout="prev, pager, next"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="Number(totalCount)"
                @prev-click="onPageChange"
                @next-click="onPageChange"
                @current-change="onPageChange"/>
        </div>
    </card>
</template>

<script>
    import {mapState} from 'vuex';
    import {txTypes, txListFieldsMap} from '../constants';

    export default {
        name: 'Transactions',
        data() {
            const {category} = this.$route.params;
            return {
                selected_key: Object.keys(txTypes[category])[0],
            };
        },
        computed: {
            ...mapState('transactions', [
                'list',
                'totalCount',
                'currentPage',
                'pageSize',
                'load',
            ]),
            category() {
                return this.$route.params.category;
            },
            actions() {
                return txTypes[this.category];
            },
            fields() {
                return txListFieldsMap[this.selected_key];
            },
            selected() {
                return this.selected_key.match('-')
                    ? this.selected_key.split('-')
                    : [this.selected_key, ''];
            },
        },
        watch: {
            category() {
                const [selectedKey] = Object.keys(txTypes[this.category]);
                this.selected_key = selectedKey;
                this.fetchData();
            },
        },
        mounted() {
            this.fetchData();
        },
        methods: {
            onPageChange(currentPage) {
                const {pageSize, totalCount} = this;
                const page = Math.ceil(totalCount / pageSize) - currentPage + 1;
                const [action] = this.selected;

                this.$store.dispatch('transactions/fetchList', {
                    action,
                    page,
                });
            },
            onSelect(value) {
                this.selected_key = value;
                this.fetchData();
            },
            async fetchData() {
                const [action] = this.selected;

                await this.$store.dispatch('transactions/fetchTotalCount', {
                    action,
                });
                const {pageSize, totalCount} = this;
                this.$store.dispatch('transactions/fetchList', {
                    action,
                    page: Math.ceil(totalCount / pageSize) || 1,
                });
            },
        },
    };
</script>

<style lang="scss">
    .height {
        color: $color-primary;
    }

    .card-header {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
    }

    .card-footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 24px;
    }

    .select-action {
        font-size: 16px;
        margin-right: 16px;
    }
</style>
