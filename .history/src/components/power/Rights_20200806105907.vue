<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
            <el-table style="width: 100%">
                <el-table-column label="日期" width="180">
                </el-table-column>
                <el-table-column label="姓名" width="180">
                </el-table-column>
                <el-table-column label="地址">
                </el-table-column>
            </el-table>
        </el-breadcrumb>
    </div>
</template>
<script>
    export default {

    }
</script>
<style scoped>

</style>