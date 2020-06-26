<template>
    <card title="proposals">
        <proposal-list :list="list"/>
    </card>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: 'Proposals',
        computed: {
            ...mapState('proposals', ['list']),
        },
        mounted() {
            this.$store.dispatch('proposals/fetchList');
        },
    };
</script>
