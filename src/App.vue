<template>
    <div id="app">
        <k-header :net-name="netName"/>
        <div class="main">
            <router-view/>
        </div>
        <k-footer/>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import chain from './utils/chain';

    export default {
        computed: {
            ...mapState({
                netName: store => store.basic.name,
            }),
        },
        async mounted() {
            await this.$store.dispatch('stats/fetchStats');

            chain.subscribeNewBlock((data) => {
                this.$store.dispatch('blocks/handleNewBlock', data);
            });

            chain.subscribeNewTx((data) => {
                this.$store.dispatch('transactions/handleNewTx', data);
            });

            chain.connect();
        },
    };
</script>

<style lang="scss">
    @import "~@/styles/_reset.scss";
    @import "~@/styles/_common.scss";

    html,
    body {
        font-size: 14px;
        line-height: 1.571428;
        font-family: "PingFangSC", Microsoft YaHei, "Helvetica Neue", Helvetica, Arial,
        STHeiTi, sans-serif;
        color: black(0.85);
        background: $color-background;
    }

    #app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;

        .main {
            flex: 1;
            padding: 0 24px;
            background: $color-background;
            color: $color-title;
            a {
                color: $color-link;
            }
        }

        .el-table {

        }
    }

    @include responsive($sm) {
        #app {
            .main {
                padding: 0 16px;
            }
        }
    }
</style>
