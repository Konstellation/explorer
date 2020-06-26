<template>
    <el-table
        v-loading="load"
        class="table"
        :data="list"
        style="width: 100%">
        <el-table-column label="ACTION">
            <template slot-scope="scope">
                {{ scope.row.tags.find(i => i.key === 'action').value }}
            </template>
        </el-table-column>
        <el-table-column label="TX HASH">
            <template slot-scope="scope">
                <k-link
                    type="tx"
                    :content="scope.row.txhash"/>
            </template>
        </el-table-column>
        <el-table-column label="BLOCK">
            <template slot-scope="scope">
                <k-link
                    type="block"
                    :content="scope.row.height"/>
            </template>
        </el-table-column>
        <el-table-column label="VALIDATOR">
            <template slot-scope="scope">
                <k-link
                    type="validator"
                    :content="get(scope.row, 'tx.value.msg.0.value.validator_addr')"/>
            </template>
        </el-table-column>
        <el-table-column label="DELEGATOR">
            <template slot-scope="scope">
                <k-link
                    type="address"
                    :content="get(scope.row, 'tx.value.msg.0.value.delegator_addr')"/>
            </template>
        </el-table-column>
        <el-table-column label="GAS USED">
            <template slot-scope="scope">
                {{ scope.row.gas_used }}
            </template>
        </el-table-column>
        <el-table-column label="TIME">
            <template slot-scope="scope">
                {{ scope.row.timestamp | formatTime }}
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import { get } from 'lodash';

    export default {
        name: 'WithdrawDelegationReward',
        props: {
            list: Array,
            load: {
                type: Boolean,
                default: true,
            },
        },
        methods: { get },
    };
</script>
