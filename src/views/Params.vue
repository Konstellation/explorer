<template>
    <card title="params">
        <box-grid class="params">
            <template v-for="(param, mod) in params">
                <param-panel
                    :key="mod"
                    :param="param"
                    :title="mod"/>
            </template>
        </box-grid>
    </card>
</template>

<script>
    import {mapState} from 'vuex';
    import {get} from 'lodash';

    export default {
        name: 'Params',
        computed: {
            ...mapState('params', ['params']),
        },
        mounted() {
            this.$store.dispatch('params/fetchParams');
        },
        methods: {
            get,
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
