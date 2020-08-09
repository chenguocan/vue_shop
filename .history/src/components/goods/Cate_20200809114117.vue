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
                :show-index="true" index-text="#" border :show-row-hover="false">
                <!-- 是否有效 -->
                <template v-slot:isok="scope">
                    <i class="el-icon-success" v-if="scope.row.cat_deleted===false" style="color:lightgreen"></i>
                    <i class="el-icon-error" v-else style="color:red"></i>
                </template>
                <!-- 排序 -->
                <template v-slot:level="scope">
                    <el-tag size="mini" v-if="scope.row.cat_level===0">一级</el-tag>
                    <el-tag size="mini" type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
                    <el-tag size="mini" type="warning" v-else-if="scope.row.cat_level===2">三级</el-tag>
                </template>
                <!-- 操作 -->
                <template v-slot:opt="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                    <el-button type="warning" icon="el-icon-delete" size="mini">删除</el-button>
                </template>
            </tree-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[3,5,10,15]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
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
                    pagesize: 10,
                },
                // 商品分类数据列表
                catelist: [

                ],
                total: 0,
                // 为table指定列的定义
                columns: [{
                    label: "分类名称",
                    prop: "cat_name",

                }, {
                    label: "是否有效",
                    type: "template",
                    template: "isok"
                }, {
                    label: "排序",
                    type: "template",
                    template: "level"
                }, {
                    label: "操作",
                    type: "template",
                    template: "opt",
                }
                ]
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
            },
            // 监听pagesize改变的事件
            handleSizeChange(newSize) {
                this.queryInfo.pagesize = newSize;
                this.getCateList();
            },
            handleCurrentChange(newPage) {
                this.queryInfo.pagenum = newPage;
                this.getCateList();
            }
        }
    }
</script>
<style scoped></style>