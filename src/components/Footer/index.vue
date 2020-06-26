<template>
    <div class="footer-container">
        <img
            alt="logo-footer"
            class="logo"
            src="~@/assets/logo.png">
        <p>Powered by konstellation.tech</p>
    </div>
</template>

<script>
    export default {
        name: 'Footer',
    };
</script>

<style lang="scss" scoped>
    .footer-container {
        display: flex;
        height: 68px;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.8);

        > img {
            margin-right: $basic-margin;
        }
    }

    @include responsive($sm) {
        .footer-container {
            > img {
                display: none;
            }
        }
    }
</style>
