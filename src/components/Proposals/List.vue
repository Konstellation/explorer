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
        <el-table-column label="ID">
            <template slot-scope="scope">
                <k-link
                    type="proposal"
                    :content="get(scope.row, 'id')"/>
            </template>
        </el-table-column>
        <el-table-column label="TITLE">
            <template slot-scope="scope">
                <k-link
                    type="proposal"
                    :content="get(scope.row, 'content.value.title')"
                    :link="get(scope.row, 'id')"/>
            </template>
        </el-table-column>
        <el-table-column
            label="TYPE"
            prop="content.type"/>
        <el-table-column
            label="STATUS"
            prop="proposal_status"/>
        <el-table-column label="SUBMIT TIME">
            <template slot-scope="scope">
                {{ scope.row.submit_time | formatTime }}
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import { get } from 'lodash';

    export default {
        name: 'ProposalList',
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
            get,
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
</style>
