<template>
    <div>
        <el-container>
            <!-- 头部区域 -->
            <el-header>Header</el-header>
            <!-- 页面主题区域 -->
            <el-container>
                <!-- 侧边栏 -->
                <el-aside width="200px">Aside</el-aside>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
        <div class="exit">
            <el-popconfirm title="确定退出吗?" @onConfirm="exit">
                <el-button type="info" slot="reference">退出</el-button>
            </el-popconfirm>
        </div>
    </div>
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
    .el-header,
        {
        background-color: #373d41;

    }

    .el-aside {
        background-color: #333744;

    }

    .el-main {
        background-color: #333333;

    }
</style>