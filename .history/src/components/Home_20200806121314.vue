<template>
    <el-container class="home-container" height="50px">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/heima.png" alt="">
                <span>电商后台管理系统</span>
            </div>
            <div class="exit">
                <el-popconfirm title="确定退出吗?" @onConfirm="exit">
                    <el-button type="info" slot="reference">退出</el-button>
                </el-popconfirm>
            </div>
        </el-header>
        <!-- 主体区域 -->
        <el-container>
            <el-aside :width="isCollapse?'64px':'200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 侧边栏菜单区 -->
                <el-menu background-color="#545c64" :unique-opened="true" text-color="#fff" active-text-color="#409EFF"
                    :collapse="isCollapse" :collapse-transition="false" :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id+''" :key="item.id" v-for="(item,index) in MenuList">
                        <!-- 一级菜单模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="iconsObj[item.id]"></i>
                            <!-- 文本 -->
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"
                            @click="saveNavState('/' + subItem.path)">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    export default {
        created() {
            this.getMenuList();
            this.activePath = window.sessionStorage.getItem("activePath");
        },
        data() {
            return {
                MenuList: [],
                iconsObj: {
                    "125": "iconfont icon-user",
                    "103": "iconfont icon-tijikongjian",
                    "101": "iconfont icon-shangpin",
                    "102": "iconfont icon-danju",
                    "145": "iconfont icon-baobiao"
                },
                isCollapse: false,
                // 被激活的链接地址
                activePath: "",
            }
        },
        methods: {
            exit() {
                window.sessionStorage.clear();
                this.$router.push('/login');
            },
            async getMenuList() {
                const { data: res } = await this.$http.get("/menus");
                if (res.meta.status !== 200) {
                    this.$message.error(res.meta.msg);
                    return false;
                }
                this.MenuList = res.data;
            },
            // 实现菜单的展开与拉近
            toggleCollapse() {
                this.isCollapse = !this.isCollapse;
            },
            //保存链接的激活状态
            saveNavState(activePath) {
                this.$router.push(activePath);
                window.sessionStorage.setItem("activePath", activePath);
                this.activePath = activePath;
            }
        }
    }
</script>
<style scoped>
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 0;
        color: #fff;
        font-size: 20px;
    }

    .el-header>div {
        display: flex;
        align-items: center;
    }

    .el-header>div>span {
        margin-left: 15px;
    }

    .el-aside {
        background-color: #333744;

    }

    .el-aside>.el-menu {
        border: 0px;
    }

    .el-main {
        background-color: #eaedf1;

    }

    .iconfont {
        margin-right: 10px;
    }

    .toggle-button {
        color: white;
        background-color: #4A5064;
        line-height: 24px;
        font-size: 10px;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
</style>