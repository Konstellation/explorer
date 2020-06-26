<template>
    <card title="validators">
        <el-radio-group
            v-model="status"
            class="radios"
            @change="onStatusChange">
            <el-radio
                label="all"
                border>
                All
            </el-radio>
            <el-radio
                label="bonded"
                border>
                Bonded
            </el-radio>
            <el-radio
                label="unbonded"
                border>
                Unbonded
            </el-radio>
            <el-radio
                label="unbonding"
                border>
                Unbonding
            </el-radio>
        </el-radio-group>
        <validator-list :list="filtered"/>
    </card>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'Validators',
        data() {
            return {status: 'bonded'};
        },
        computed: {
            ...mapState('validators', ['list']),
            filtered() {
                let status = 2;
                switch (this.status) {
                    case 'bonded':
                        status = 2;
                        break;
                    case 'unbonding':
                        status = 1;
                        break;
                    case 'unbonded':
                        status = 0;
                        break;
                    default:
                        return this.list;
                }
                return this.list.filter(v => v.status === status);
            },
        },
        mounted() {
            this.$store.dispatch('validators/fetchAll');
        },
        methods: {
            onStatusChange() {
                this.$store.dispatch('validators/fetchAll');
            },
        },
    };
</script>

<style lang="scss">
    .radios {
        margin-bottom: $basic-padding;
    }

    .el-radio {
        color: $color-title;
    }

    .el-radio.is-checked {
        color: $color-accent !important;
        border-color: $color-accent !important;
    }

    .el-radio__input.is-checked + .el-radio__label {
        color: $color-accent !important;
    }
</style>
