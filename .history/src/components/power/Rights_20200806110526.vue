<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-table style="width: 100%">
                <el-table-column label="权限名称" width="180">
                </el-table-column>
                <el-table-column label="路径" width="180">
                </el-table-column>
                <el-table-column label="权限等级">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
    export default {

    }
</script>
<style scoped>

</style>