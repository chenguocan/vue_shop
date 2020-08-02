<template>
    <div>
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
            exit: function () {
                console.log(sessionStorage);
                window.sessionStorage.clear();
                this.$router.push("/login");
            }
        }
    }
</script>
<style scoped>
    .exit {
        position: absolute;
        left: 50%;
        top: 50%;
    }
</style>