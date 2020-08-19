<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
            <el-button slot="append" icon="el-icon-search" @click="findGoodsById"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4"></el-col>
        <el-button type="primary" @click="goAddpage">添加商品</el-button>
      </el-row>
      <el-table
          :data="goodsList"
          style="width: 100%" stripe border>
        <el-table-column
            type="index"
            label="#">
        </el-table-column>
        <el-table-column
            prop="goods_name"
            label="商品名称"
            width="500">
        </el-table-column>
        <el-table-column
            prop="goods_price"
            label="商品价格"
        >
        </el-table-column>
        <el-table-column
            prop="goods_weight"
            label="商品重量"
        >
        </el-table-column>
        <el-table-column
            label="创建时间"
        >
          <template v-slot="scope">
            {{ scope.row.add_time|format("YYYY-MM-DD") }}
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
        >
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteGoods(scope.row.goods_id)" ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5,6,7,8,9,10]"
          :page-size="currentPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      goodsList: [],
      currentPageSize: parseInt(localStorage.getItem("pagesize")) || 5,
      queryInfo: {
        query: "",
        pagenum: parseInt(localStorage.getItem("pagenum")) || 10,
        pagesize: parseInt(localStorage.getItem("pagesize")) || 5,
      }
    }
  },
  created() {
    this.getGoods();
  },
  methods: {
    async getGoods() {
      const {data: res} = await this.$http.get("goods", {params: this.queryInfo});
      if (res.meta.status !== 200) {
        return this.$message.error("获取信息失败");
      }
      this.goodsList = res.data.goods;
      this.total = res.data.total;
    },
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
      localStorage.setItem("pagesize", val);
      this.getGoods();
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
      localStorage.setItem("pagenum", val);
      this.getGoods();
    },
    findGoodsById() {
      this.getGoods();
    },
    async deleteGoods(id){
      const confirm=await this.$confirm("是否删除该商品","提示",{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:"warning"
      }).catch((error)=>{
          return error;
      })
      if(confirm==="confirm"){
         const {data:res}=await this.$http.delete("goods/"+id);
         if(res.meta.status!==200){
           return this.$message.error("删除失败");
         }
         this.getGoods();
      }
    },
    goAddpage(){
      this.$router.push("/goods/add");
    }
  },
}
</script>

<style scoped>

</style>