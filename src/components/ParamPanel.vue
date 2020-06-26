<template>
    <div
        class="param">
        <p class="param__title">
            {{ title | upper }}
        </p>
        <div class="param__values">
            <template v-for="(value, key) in param">
                <div
                    :key="key"
                    class="param__kv">
                    <div class="param__key">
                        <template v-if="$t(`params.${title}.${key}`)">
                            <el-tooltip
                                class="item"
                                :content="$t(`params.${title}.${key}`)"
                                placement="top">
                                <a>{{ key }}</a>
                            </el-tooltip>
                        </template>
                        <template v-else>
                            {{ key }}
                        </template>
                    </div>
                    <div class="param__value">
                        <template v-if="isArray(value) || isObject(value)">
                            {{ value | formatAmount }}
                        </template>
                        <template v-else>
                            {{ value }}
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import {isArray, isObject} from 'lodash';

    export default {
        name: 'ParamPanel',
        props: {
            param: {
                type: Object,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
        },
        methods: {
            isArray,
            isObject,
        },
    };
</script>

<style lang="scss" scoped>
    .param {
        flex-basis: 216px;
        text-align: center;
        color: $color-title;
        display: flex;
        flex-direction: column;
        padding: 16px $padding-basic $padding-basic $padding-basic;
        cursor: pointer;
        background: $color-hover;

        &__kv {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }

        &__key {

        }

        &__title {
            width: 100%;
            display: flex;
            font-weight: 600;
            margin-bottom: 16px;
        }

        img {
            width: 40px;
            height: 40px;
            margin-top: 8px;
            margin-bottom: 16px;
            position: relative;
            top: 2px;
        }

        .logo-none {
            width: 48px;
            height: 48px;
            margin-top: 4px;
            margin-bottom: 12px;
            position: relative;
            top: 2px;
            background: $color-active;
            border-radius: 24px;
        }

        &__denom {
            font-size: 18px;
        }

        &__owner {
            display: flex;
            align-items: center;
            justify-content: right;
            font-size: 8px;
            width: 100%;
            flex-direction: row;
        }

        &__total-supply {
            font-size: 20px;
        }

        .enabled {
            color: $color-subtitle;
            margin: 0 10px 0 0;
        }

        .disabled {
            color: $color-warning;
            margin: 0 10px 0 0;
        }
    }
</style>
