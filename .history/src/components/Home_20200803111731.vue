<template>
    <el-container class="home-container">
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
            <el-aside width="200px">
                <!-- 侧边栏菜单区 -->
                <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <!-- 一级菜单 -->
                    <el-submenu index="1">
                        <!-- 一级菜单模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i class="el-icon-location"></i>
                            <!-- 文本 -->
                            <span>导航一</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item index="1-4-1">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-location"></i>
                                <!-- 文本 -->
                                <span>选项1</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main></el-main>
        </el-container>
    </el-container>
</template>
<script>
    export default {
        created() {
            this.getMenuList();
        },
        data() {
            return {

            }
        },
        methods: {
            exit() {
                window.sessionStorage.clear();
                this.$router.push('/login');
            },
            async getMenuList() {
                const { data: res } = await this.$http.get("/menus");
                console.log(res[0]);
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

    .el-main {
        background-color: #eaedf1;

    }
</style>