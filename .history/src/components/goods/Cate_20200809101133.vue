<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card>
            <el-row>
                <el-col>
                    <el-button type="primary">添加分类</el-button>
                </el-col>
            </el-row>
            <!-- 表格 -->


            <!-- 分页区域 -->
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        created() {
            this.getCateList();
        },
        methods: {
            async getCateList() {
                const { data: res } = await this.$http.get("categories");
                console.log(res)
            }
        }
    }
</script>
<style scoped></style>