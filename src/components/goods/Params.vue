<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区 -->
    <el-card>
      <el-alert
          title="注意:只允许第三级分类设置相关参数!"
          type="warning"
          show-icon
          :closable="false"
      >
      </el-alert>
      <el-row class="cat_opt">
        <el-col>
          <span> 选择商品列表</span>
          <!--选择商品的级联选择框-->
          <el-cascader
              v-model="selectedCateKeys"
              :options="cateList"
              :props="cateProps"
              @change="handleChange"></el-cascader>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cateList: [],
      /*级联选择框配置对象*/
      cateProps:{
        value:"cat_id",
        label:"cat_name",
        children:"children",
      },
      /*级联选择框双向绑定的数组*/
      selectedCateKeys:[],
    }
  },
  methods: {
    async getCateList() {
        const {data:res}=await this.$http.get("categories")
        if(res.meta.status!==200){
          return this.$message.error("获取商品分类失败");
        }
        this.cateList=res.data;
        console.log(this.cateList);
    },
    /*级联选择框变化触发函数*/
    handleChange(){
      console.log(this.selectedCateKeys);
    }
  },
  created() {
    this.getCateList();
  }
}
</script>
<style scope>
.cat_opt {
  margin: 15px 0;
}
</style>