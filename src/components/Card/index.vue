<template>
    <div class="card-container">
        <div class="header">
            <p v-if="title">
                {{ title | upper }}
            </p>
            <router-link
                v-if="link"
                :to="link"
                class="link">
                VIEW ALL
            </router-link>
        </div>
        <div class="content">
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Card',
        props: {
            title: String,
            link: String,
            data: Array,
        },
    };
</script>

<style lang="scss" scoped>
    .card-container {
        position: relative;
        padding: 0;
        color: $color-text;
        box-shadow: $shadow;
        background: $color-primary;
        margin: 24px 0;
    }

    .header {
        display: flex;
        box-sizing: border-box;
        padding: 0 32px;
        width: 100%;
        height: 64px;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        border-bottom: 1px solid $color-line-border;
        color: $color-title;
        font-weight: bold;

        .link {
            text-decoration: none;
            color: $color-primary;
        }
    }

    .content {
        padding: $basic-padding;
    }

    @include responsive($sm) {
        .content {
            /*padding: 16px 0;*/
        }
    }
</style>
