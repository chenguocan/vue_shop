<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-alert
              title="添加商品信息"
              type="info"
              center
              show-icon
              :closable="false"
          >
          </el-alert>
        </el-col>
      </el-row>
      <el-steps :space="200" :active="activeIndex-0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" :label-position="'top'">
        <el-tabs v-model="activeIndex" :tab-position="'left'">
          <el-tab-pane label="基本信息" name="0"></el-tab-pane>
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="addForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input v-model="addForm.goods_price" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight" type="number">
            <el-input v-model="addForm.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number" type="number">
            <el-input v-model="addForm.goods_number"></el-input>
          </el-form-item>
          <el-tab-pane label="商品参数" name="1"></el-tab-pane>
          <el-tab-pane label="商品属性" name="2"></el-tab-pane>
          <el-tab-pane label="商品图片" name="3"></el-tab-pane>
          <el-tab-pane label="商品内容" name="4"></el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getCateList();
  },
  data() {
    return {
      activeIndex: "0",  //公用同一个数据el-tab,el-step,通过改变el-tabs来改变activeIndex
      cateList: [],
      /*级联选择框配置对象*/
      /*  cateProps:{
          value:"cat_id",
          label:"cat_name",
          /!*children:"children",*!/
        },*/
      /*{label:cateProps.label,children:cateProps.children}"*/
          cateProps: {
            label: 'cat_name',
            value: 'cat_id',
            expandTrigger: 'hover',
            children: 'children',
          },
      /*级联选择框双向绑定的数组*/
      selectedCateKeys: [],
      addForm: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
      },
      addFormRules: {
        goods_name: [
          {required: true, message: "请输入商品名称", trigger: "blur"}
        ],
        goods_price: [
          {required: true, message: "请输入商品价格", trigger: "blur", type: 'number'}
        ],
        goods_weight: [
          {required: true, message: "请输入商品重量", trigger: "blur", type: 'number'}
        ],
        goods_number: [
          {required: true, message: "请输入商品数量", trigger: "blur", type: 'number'}
        ]
      },
    }
  },
  methods: {
    async getCateList() {
      const {data: res} = await this.$http.get("categories")
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品分类失败");
      }
      this.cateList = res.data;
      console.log(this.cateList);
    },
  }
}
</script>

<style scoped>
.el-calendar-menu {
  height: 50px;
}
</style>