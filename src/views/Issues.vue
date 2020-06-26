<template>
    <card title="issues">
        <issue-list :list="list"/>
    </card>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'Issues',
        computed: {
            ...mapState('issues', ['list']),
        },
        mounted() {
            this.$store.dispatch('issues/fetchList');
        },
        methods: {},
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
