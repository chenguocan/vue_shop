<template>
    <el-container class="home-container">
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">
                <el-row class="tac">
                    <div style="background-color: rgb(71,81,99);">|||</div>
                    <el-menu default-active="2" class="el-menu-vertical-demo" background-color="rgb(51,55,68)"
                        text-color="#fff" active-text-color="#ffd04b">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>导航一</span>
                            </template>
                            <el-menu-item-group>
                                <template slot="title">分组一</template>
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>
                        <el-menu-item index="3" disabled>
                            <i class="el-icon-document"></i>
                            <span slot="title">导航三</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                    </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-container>
                <el-main>Main</el-main>
                <el-footer>
                    <div class="exit">
                        <el-popconfirm title="确定退出吗?" @onConfirm="exit">
                            <el-button type="info" slot="reference">退出</el-button>
                        </el-popconfirm>
                    </div>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            exit() {
                window.sessionStorage.clear();
                this.$router.push('/login');
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

    }

    .el-aside {
        background-color: #333744;

    }

    .el-main {
        background-color: #eaedf1;

    }

    .exit {
        text-align: center;
        margin-top: 10px;
    }
</style>