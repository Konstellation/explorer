<template>
    <el-table
        v-loading="load"
        class="table"
        :data="list"
        style="width: 100%"
        :header-cell-class-name="tableHeaderClass"
        :row-class-name="tableRowClassName"
        :cell-class-name="tableCellClassName">
        <div class="empty" slot="empty">
            ---
        </div>
        <el-table-column
            v-for="item in fields"
            :key="item.name"
            :label="item.name">
            <template slot-scope="scope">
                <k-link
                    v-if="item.linkType"
                    :type="item.linkType"
                    :content="get(scope.row, item.field)"/>
                <span v-if="!item.linkType">
                    <data-amount
                        v-if="(get(scope.row, item.field) instanceof Array)"
                        :list="get(scope.row, item.field)"/>
                    <data-amount
                        v-else-if="(get(scope.row, item.field) instanceof Object)"
                        :list="[get(scope.row, item.field)]"/>
                    <data-amount
                        v-else-if="item.name === 'Rewards'"
                        :list="rewardList(get(scope.row, item.field))"/>
                    <data-amount
                        v-else-if="item.name === 'Amount'"
                        :list="get(scope.row, item.field)"/>
                    <span v-else-if="item.name.match('Time')">
                        {{ get(scope.row, item.field) | formatTime }}
                    </span>
                    <span v-else>
                        <span v-if="item.name === 'Hash'">
                            {{ (get(scope.row, item.field) || '-').slice(0, 18) + '...' }}
                        </span>
                        <span v-else>
                            {{ get(scope.row, item.field) || '-' }}
                        </span>
                    </span>
                </span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import { get } from 'lodash';
    import { DEFAULT_DENOM } from '../../constants';

    export default {
        name: 'TransactionList',
        props: {
            list: Array,
            fields: Array,
            load: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            get,
            rewardList(val) {
                console.log(val);
                return [{
                    denom: DEFAULT_DENOM,
                    amount: val,
                }];
            },
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
