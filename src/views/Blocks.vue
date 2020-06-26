<template>
    <card title="blocks">
        <div class="card-header">
            <p>TOTAL AMOUNT: {{ lastHeight }}</P>
        </div>
        <block-list :list="list"/>
        <div class="card-footer">
            <el-pagination
                class="pagination"
                background
                :pager-count="7"
                layout="prev, pager, next"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="lastHeight"
                @prev-click="onPageChange"
                @next-click="onPageChange"
                @current-change="onPageChange"/>
        </div>
    </card>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';
    import { get } from 'lodash';

    export default {
        name: 'Blocks',
        computed: {
            ...mapGetters('blocks', ['list']),
            ...mapState('blocks', ['lastHeight', 'currentPage', 'pageSize']),
        },
        mounted() {
            this.$store.dispatch('blocks/fetchList');
        },
        methods: {
            get,
            onPageChange(page) {
                const { pageSize, lastHeight } = this;
                const maxHeight = lastHeight - pageSize * (page - 1) + 1;
                const minHeight = Math.max(0, lastHeight - pageSize * page);

                this.$store.dispatch('blocks/fetchList', {
                    page,
                    maxHeight,
                    minHeight,
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
        margin-bottom: 24px;
    }

    .card-footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 24px;
    }
</style>
