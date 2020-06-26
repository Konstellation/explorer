<template>
    <el-table
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
            class="height"
            label="HEIGHT">
            <template slot-scope="scope">
                <router-link
                    :to="`/block/${scope.row.header.height}`"
                    class="link">
                    {{ scope.row.header.height }}
                </router-link>
            </template>
        </el-table-column>
        <el-table-column
            prop="header.num_txs"
            label="TXN"/>
        <el-table-column label="VALIDATORS">
            <template slot-scope="scope">
                <span>{{ get(scope, 'row.validators.length') }}</span>
            </template>
        </el-table-column>
        <el-table-column
            prop=""
            label="PROPOSER">
            <template slot-scope="scope">
                <span>{{ get(scope, 'row.header.proposer_address') }}</span>
            </template>
        </el-table-column>
        <el-table-column
            prop=""
            label="VOTING POWER">
            <template slot-scope="scope">
                <span>{{ countVotingPower(scope.row.validators) }}</span>
            </template>
        </el-table-column>
        <el-table-column
            prop="header.time"
            label="TIMESTAMP">
            <template slot-scope="scope">
                <span>{{ scope.row.header.time | formatTime }}</span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import { get } from 'lodash';
    import { mapState } from 'vuex';

    export default {
        name: 'TransactionList',
        props: {
            list: Array,
        },
        computed: {
            ...mapState('validators', ['validatorList', 'consPubMap', 'validators']),
        },
        methods: {
            get,
            countVotingPower(validators) {
                if (!validators) {
                    return '';
                }

                return validators.reduce(
                    (prev, current) => prev + Number(current.voting_power),
                    0,
                );
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

        mounted() {
            console.log(this.validatorList);
            console.log(this.consPubMap);
            console.log(this.validators);
        },
    };
</script>
