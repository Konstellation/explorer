<template>
    <div :class="`search-container ${ mini && !expand ? 'mini' : '' }`">
        <i
            class="el-icon-search search-icon"
            @click="expandSearch"></i>
        <el-dialog
            title="Search"
            :visible.sync="dialog"
            :close-on-click-modal="true">
            <el-autocomplete
                ref="input"
                v-model.trim="value"
                class="search-inner"
                placeholder="Address/ Txhash/ Block"
                :trigger-on-focus="false"
                :clearable="!mini"
                autofocus
                @keyup.enter.native="onSearch"
                @blur="onBlur"
                @select="handleSelect"/>
            <span slot="footer">
                <el-button class="btn__primary">
                    OK
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { DEFAULT_BECH32_PREFIX } from '../../constants';

    export default {
        props: {
            mini: Boolean,
            expand: Boolean,
        },
        data() {
            return {
                dialog: false,
                value: '',
            };
        },
        computed: {
            ...mapGetters('blocks', { blocksLastList: 'lastList' }),
        },
        methods: {
            expandSearch() {
                this.dialog = true;
                if (this.mini && !this.expand) {
                    this.$emit('focus');
                    this.$refs.input.focus();
                }
            },
            onBlur() {
                if (this.mini && this.expand) {
                    this.$emit('blur');
                }
            },
            async querySearch() {
                return false;
                // const data = await this.$store.dispatch('tokens/search', {
                //     symbol: queryString,
                // });
                // if (isEmpty(data)) {
                //     return;
                // }
                // const res = data.map((i) => {
                //     i.value = `${i.symbol} ( ${i.name} ${i.issue_id} )`;
                //     return i;
                // });
            },
            handleSelect() {
            },
            onSearch() {
                let { value } = this;
                value = value.replace(/ /g, '');
                // jump to block detail page;
                const numberPattern = /^\d+$/g;
                if (numberPattern.test(value)) {
                    if (value - 0 > this.blocksLastList[0].header.height - 0) {
                        this.dialog = false;
                        this.$router.push('/404');
                        return false;
                    }
                    this.dialog = false;
                    this.$router.push({ path: `/block/${value}` });
                    return false;
                }

                // jump to address detail page;
                const addressPattern = new RegExp(`^${DEFAULT_BECH32_PREFIX}.{39}$`);
                if (addressPattern.test(value)) {
                    this.dialog = false;
                    this.$router.push({ path: `/address/${value}` });
                    return false;
                }

                // jump to validator detail page;
                const valPattern = new RegExp(`^${DEFAULT_BECH32_PREFIX}valoper.{39}$`);
                if (valPattern.test(value)) {
                    this.dialog = false;
                    this.$router.push({ path: `/validator/${value}` });
                    return false;
                }

                // jump to tx detail page;
                const txPattern = /^[0-9A-F]{64}$/;
                if (txPattern.test(value)) {
                    this.dialog = false;
                    this.$router.push({ path: `/tx/${value}` });
                    return false;
                }

                // else show 404
                this.$router.push({ path: '/404' });
                return false;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .search-container {
        display: flex;
        /*height: 48px;*/
        /*border: 1px solid white;*/
        align-items: center;
        flex-shrink: 0;
        transition: all $trans;

        .search-inner {
            width: 100%;
            flex: 1 1 auto;
        }

        .search-icon {
            padding: 0 10px;
            font-size: 18px;
            color: rgba(255, 255, 255, 0.75);
            z-index: 9;
        }

        &.mini {
            width: 40px;
            border: none;

            .search-inner {
                width: 8px;
            }

            .search-icon {
                margin-right: 0;
                cursor: pointer;

                &:hover {
                    color: white;
                }
            }
        }
    }

    @include responsive($sm) {
        .search-container {
            margin-top: $basic-padding;
        }
    }
</style>
