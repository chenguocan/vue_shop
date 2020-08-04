<template>
    <el-container class="home-container">
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
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
    }
</style>