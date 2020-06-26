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
<!--        <el-table-column-->
<!--            class="UP"-->
<!--            label="UP">-->
<!--            <template slot-scope="record">-->
<!--&lt;!&ndash;                <span :class="isUp(record.spanrow ? 'jailed' : 'active'">&ndash;&gt;-->
<!--&lt;!&ndash;                    {{ record.row.jailed ? 'FALSE' : 'TRUE' }}&ndash;&gt;-->
<!--&lt;!&ndash;                </span>&ndash;&gt;-->
<!--            </template>-->
<!--        </el-table-column>-->
        <el-table-column
            class="jailed-status"
            label="JAILED">
            <template slot-scope="record">
                <span :class="record.row.jailed ? 'jailed' : 'active'">
                    {{ record.row.jailed ? 'FALSE' : 'TRUE' }}
                </span>
            </template>
        </el-table-column>
        <el-table-column
            class="operator-address"
            label="OPERATOR ADDRESS"
            prop="operator_address">
            <template slot-scope="record">
                <k-link
                    type="validator"
                    :content="record.row.operator_address"/>
            </template>
        </el-table-column>
        <el-table-column
            class="name"
            label="NAME"
            prop="description.moniker"/>
        <el-table-column
            class="voting-power"
            label="VOTING POWER"
            prop="tokens">
            <template slot-scope="record">
                {{ record.row.tokens | toToken | formatAmount }}
            </template>
        </el-table-column>
        <el-table-column
            label="RANKING"
            prop="number"/>
        <el-table-column
            class="bond-height"
            label="UNBONDING HEIGHT"
            prop="unbonding_height"/>
    </el-table>
</template>

<script>
    export default {
        name: 'ValidatorList',
        props: {
            list: {
                required: true,
                type: Array,
            },
            type: {
                type: String,
                default: '',
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
        },
    };
</script>

<style lang="scss">
    .jailed {
        color: $color-accent;
    }

    .active {
        color: $color-subtitle;
    }
</style>
