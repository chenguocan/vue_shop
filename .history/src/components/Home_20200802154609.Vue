<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>Header</el-header>
        <!-- 页面主题区域 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">Aside</el-aside>
        </el-container>
        <el-container>
            <el-main>Main</el-main>
            <el-footer>footer</el-footer>
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
</style>