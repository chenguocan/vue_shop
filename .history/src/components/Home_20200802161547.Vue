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
            <el-aside width="200px"></el-aside>
            <el-main></el-main>
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