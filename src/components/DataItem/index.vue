<template>
    <div class="data-item">
        <p class="label">
            {{ label }}
        </p>
        <p class="content">
            <slot/>
        </p>
    </div>
</template>

<script>
    export default {
        name: 'DataItem',
        props: {
            label: String,
        },
    };
</script>

<style lang="scss" scoped>
    $height: 36px;

    .data-item {
        display: flex;
        margin-bottom: 12px;

        > .label {
            display: inline-block;
            width: 200px;
            color: $color-label;
        }

        > .content {
            color: $color-text;
            width: 100%;
            overflow: hidden;
        }
    }

    @include responsive($sm) {
        .data-item {
            flex-direction: column;
        }
    }
</style>
