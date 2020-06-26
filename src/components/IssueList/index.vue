<template>
    <el-table
        class="table"
        :data="list"
        :header-cell-class-name="tableHeaderClass"
        :row-class-name="tableRowClassName"
        :cell-class-name="tableCellClassName">
        <div class="empty" slot="empty">
            ---
        </div>
        <el-table-column
            label="DENOM(SYMBOL)">
            <template slot-scope="record">
                <div class="issue__denom_row">
                    <k-link
                        type="issue"
                        :content="record.row.denom"/>
                    <span>({{ record.row.symbol }})</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column
            label="ISSUER">
            <template slot-scope="record">
                <k-link
                    type="address"
                    :content="record.row.issuer"/>
            </template>
        </el-table-column>
        <el-table-column
            label="OWNER">
            <template slot-scope="record">
                <k-link
                    type="address"
                    :content="record.row.owner"/>
            </template>
        </el-table-column>
        <el-table-column
            label="TOTAL SUPPLY">
            <template slot-scope="record">
                <span>
                    {{ `${record.row.total_supply}${record.row.decimals > 0 ?
                    `.${'0'.repeat(record.row.decimals)}` : ''}` }}
                </span>
            </template>
        </el-table-column>
        <el-table-column
            label="FEATURES">
            <template slot-scope="record">
                <div>
                    <template v-for="feature in features(record.row)">
                        <el-tooltip
                            :key="feature.title"
                            class="item"
                            :content="feature.title"
                            placement="top">
                            <font-awesome-icon
                                :class="feature.class"
                                :icon="feature.icon"/>
                        </el-tooltip>
                    </template>
                </div>
            </template>
        </el-table-column>
        <el-table-column
            label="TIMESTAMP">
            <template slot-scope="record">
                <span>{{ record.row.issue_time | formatTime }}</span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {features} from '../../utils/func';

    export default {
        name: 'IssueList',
        props: {
            list: {
                required: true,
                type: Array,
            },
        },
        methods: {
            tableHeaderClass() {
                return 'table-header';
            },
            tableRowClassName() {
                return 'table-row';
            },
            tableCellClassName() {
                return 'table-cell';
            },
            features,
        },
    };
</script>

<style lang="scss">
    .issue {
        &__denom_row {
            display: flex;
            justify-content: space-between;
        }
    }

    .enabled {
        color: $color-subtitle;
        margin: 0 10px 0 0;
    }

    .disabled {
        color: $color-warning;
        margin: 0 10px 0 0;
    }
</style>
