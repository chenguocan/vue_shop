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
            <el-table style="width: 100%">
                <el-table-column label="日期" width="180">
                </el-table-column>
                <el-table-column label="姓名" width="180">
                </el-table-column>
                <el-table-column label="地址">
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
                total: 0
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