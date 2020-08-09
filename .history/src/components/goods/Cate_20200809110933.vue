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
            <tree-table :data="catelist" :columns="columns" :selection-type="false" :expand-type="false"
                :show-index="true">

            </tree-table>

            <!-- 分页区域 -->
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                queryInfo: {
                    type: 3,
                    pagenum: 1,
                    pagesize: 5,
                },
                // 商品分类数据列表
                catelist: [

                ],
                total: 0,
                // 为table指定列的定义
                columns: [{
                    label: "分类名称",
                    prop: "cat_name",
                }]
            }
        },
        created() {
            this.getCateList();
        },
        methods: {
            async getCateList() {
                const { data: res } = await this.$http.get("categories", { params: this.queryInfo });
                if (res.meta.status !== 200) {
                    this.$message.error("获取数据失败");
                }
                this.catelist = res.data.result;
                this.total = res.data.total;
                console.log(this.catelist)
            }
        }
    }
</script>
<style scoped></style>