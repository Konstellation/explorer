<template>
    <el-menu
        :default-active="$route.path"
        mode="horizontal"
        text-color="#fff"
        class="menu-container"
        background-color="#0E1923"
        active-text-color="#369EFF"
        @select="handleSelect">
        <el-submenu
            v-for="sub in subMenus"
            :key="sub.name"
            :index="sub.name"
            class="item">
            <template slot="title">
                {{ sub.name.toUpperCase() }}
            </template>
            <el-menu-item
                v-for="i in sub.children"
                :key="i.link"
                :index="i.link"
                class="item">
                {{ i.name.toUpperCase() }}
            </el-menu-item>
        </el-submenu>
        <el-menu-item
            v-for="item in menus"
            :key="item.link"
            :index="item.link"
            class="item">
            {{ item.name.toUpperCase() }}
        </el-menu-item>
    </el-menu>
</template>

<script>
    import { menu } from '../../constants';

    export default {
        name: 'Menu',
        data() {
            const menus = [];
            const subMenus = [];

            menu.forEach((i) => {
                if (i.children) {
                    subMenus[subMenus.length] = i;
                } else {
                    menus[menus.length] = i;
                }
            });

            return {
                menus,
                subMenus,
            };
        },
        methods: {
            handleSelect(key) {
                this.$router.push(key);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .menu-container {
        border-bottom: none;
        background-color: rgb(14, 25, 35);

        .item, .el-menu-item {
            &:hover {
                background-color: $color-hover !important;
            }
        }

        a {
            text-decoration: none;
        }
    }
    .el-submenu, .el-menu-item {
        &:hover {
              background-color: $color-hover !important;
        }
    }

    @include responsive($sm) {
        .menu-container {
            display: none;
        }
    }
</style>
