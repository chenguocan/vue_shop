<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-table :data="RightsList" style="width: 100%" :border="true">
                <el-table-column label="#" width="180" type="index">
                </el-table-column>
                <el-table-column prop="authName" label="权限名称">
                </el-table-column>
                <el-table-column prop="path" label="路径">
                </el-table-column>
                <el-table-column prop="level" label="权限等级">
                    <el-tag>标签一</el-tag>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
    export default {
        created() {
            this.getRightsList()
        },
        data() {
            return {
                RightsList: []
            }
        },
        methods: {
            async getRightsList() {
                const { data: res } = await this.$http.get("rights/list");
                if (res.meta.status !== 200) {
                    return this.$message.error("获取权限信息失败");
                }
                this.RightsList = res.data;
            }
        }
    }
</script>
<style scoped>

</style>