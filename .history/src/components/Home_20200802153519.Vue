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
    .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body>.el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .exit {
        position: absolute;
        left: 50%;
        top: 50%;
    }
</style>