<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card class="box-card">
            <div class="text item">
                <el-row :gutter="20">
                    <el-col :span="9">
                        <el-input placeholder="请输入内容" class="input-with-select">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary">添加用户</el-button>
                    </el-col>
                </el-row>
            </div>
            <!-- 用户列表区 -->
            <el-table :data="userList" style="width: 100%" border stripe>
                <el-table-column prop="username" label="姓名">
                </el-table-column>
                <el-table-column label="邮箱" prop="email">
                </el-table-column>
                <el-table-column label="电话" prop="mobile">
                </el-table-column>
                <el-table-column label="角色" prop="role_name">
                </el-table-column>
                <el-table-column label="状态" prop="mg_state">
                    <el-switch prop="mg_state" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                </el-table-column>
                <el-table-column label="操作" width="180">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                queryInfo: {
                    query: "",
                    pagenum: 1,
                    pagesize: 2
                },
                userList: [],
                total: 0,
            }
        },
        created() {
            this.getUserList();
        },
        methods: {
            async getUserList() {
                const { data: res } = await this.$http.get("users", { params: this.queryInfo });
                if (res.meta.status !== 200) {
                    return this.$message.error("数据获取失败");
                }
                this.userList = res.data.users;
                this.total = res.data.total;
                console.log(this.userList);
            }

        }
    }
</script>
<style scoped></style>