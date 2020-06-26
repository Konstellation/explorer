<template>
    <div class="sub-title-container">
        <span>{{ title }}</span>
        <span class="sub-title">
            {{ sub }}
        </span>
    </div>
</template>


<script>
  export default {
    name: 'SubTitle',
    props: {
      title: String,
      sub: String,
    },
  };
</script>

<style lang="scss" scoped>
    .sub-title-container {
        height: 64px;
        line-height: 64px;
        background: $color-primary;
        font-weight: bold;
        box-shadow: $shadow;
        width: 100%;
        overflow: hidden;
        box-sizing: content-box;
        padding: 0 $basic-padding;
        margin: 0 -24px;
    }

    .sub-title {
        margin-left: 16px;
        color: $color-subtitle;
        font-weight: normal;
    }

    @include responsive($sm) {
        .sub-title-container {
            padding: 0 16px;
            margin: 0 -16px;
        }
    }
</style>


