<template>
    <div>
        <div class="exit">
            <el-popconfirm title="确定退出吗?">
                <el-button slot="reference">删除</el-button>
            </el-popconfirm>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

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