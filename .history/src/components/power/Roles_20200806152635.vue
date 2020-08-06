<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <el-row>
                <el-col>
                    <el-button type="parimary">添加角色</el-button>
                </el-col>
            </el-row>
            <!-- 角色列表区域 -->
            <el-table :data="roleList" border stripe>

            </el-table>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                //所有角色列表数据
                roleList: [],
            }
        },
        created() {
            this.getRolesList()
        },
        methods: {
            async getRolesList() {
                const { data: res } = await this.$http.get("roles");
                if (res.meta.status != 200) {
                    return this.$message.error("获取角色列表失败");
                }
                this.roleList = res.data;
                console.log(this.roleList);
            }
        }
    }
</script>
<style scoped></style>