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
        <el-tabs v-model="activeIndex" :tab-position="'left'" :before-leave="beforeTabsLeave" @tab-click="tabsClick">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight" >
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number" >
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                  v-model="addForm.goods_cat"
                  :options="cateList"
                  :props="cateProps"
                  @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item :label="item.attr_name" v-model="manyTabdata"
                          v-for="(item,index) in manyTabdata" :key="item.attr_id">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="cb" v-for="(cb,i) in item.attr_vals" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" :key="item.attr_id" v-for="(item,index) in onlyTabdata">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
                :action="uploadUrl"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                list-type="picture"
                :headers="headerObj"
                :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <el-button class="addBtn" type="primary" @click="add('addFormRef')">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <el-dialog
        title="图片预览"
        :visible.sync="pictureVisible"
        width="30%"
    >
      <img :src="previewPath" class="previewImg">
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
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
        children: 'children',
      },
      uploadUrl: `http://127.0.0.1:8888/api/private/v1/upload`,
      manyTabdata: [],
      onlyTabdata: [],
      previewPath: "",
      pictureVisible:false,
      /*级联选择框双向绑定的数组*/
      selectedCateKeys: [],
      addForm: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        pics: [],
        goods_introduce:"",
        attrs:[],
      },
      headerObj: {
        Authorization: window.sessionStorage.getItem("token")
      },
      /*添加表单规则*/
      addFormRules: {
        goods_name: [
          {required: true, message: "请输入商品名称", trigger: "blur"}
        ],
        goods_price: [
          {required: true, message: "请输入商品价格", trigger: "blur"}
        ],
        goods_weight: [
          {required: true, message: "请输入商品重量", trigger: "blur"}
        ],
        goods_number: [
          {required: true, message: "请输入商品数量", trigger: "blur"}
        ],
        goods_cat: [
          {required: true, message: "请选择商品分类", trigger: "blur"}
        ]
      },
    }
  },
  methods: {
    /*获取商品列表数据*/
    async getCateList() {
      const {data: res} = await this.$http.get("categories")
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品分类失败");
      }
      this.cateList = res.data;
    },
    handleChange() {
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = "";
        this.$message.error("只能选择三级分类");
      }
    },
    beforeTabsLeave(activeName, oldActiveName) {
      if (activeName !== "0" && this.addForm.goods_cat.length !== 3) {
        this.$message.error("没有选择商品分类");
        return false;
      }
    },
    async tabsClick() {
      /*this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:"many"}});*/
      if (this.activeIndex === "1") {
        const {data: res} = await this.$http.get(`categories/${this.cateId}/attributes`, {params: {sel: "many"}});
        if (res.meta.status !== 200) {
          return this.$message.error("商品参数获取失败");
        }
        res.data.forEach((item) => {
          item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(",");
        })
        this.manyTabdata = res.data;
      }
      if (this.activeIndex === "2") {
        const {data: res} = await this.$http.get(`categories/${this.cateId}/attributes`, {params: {sel: "only"}});
        if (res.meta.status !== 200) {
          return this.$message.error("商品参数获取失败");
        }
        this.onlyTabdata = res.data;
      }
    },
    handlePreview(file) {
      this.pictureVisible=true;
      this.previewPath = file.response.data.url;
    },
    handleRemove(file) {
      const filePath = file.response.data.tmp_path;
      const i = this.addForm.pics.findIndex(x => {
      })
    },
    handleSuccess(response) {
      const picInfo = {pic: response.data.tmp_path};
      this.addForm.pics.push(picInfo);
      console.log(this.addForm);
    },
    add(addFormRef){
      this.$refs[addFormRef].validate(async (valid)=>{
        if(!valid){
          return this.$message.error("表单没有填写完整");
        }
        const form =_.cloneDeep(this.addForm);
        console.log(form);
        /*this.addForm.goods_cat=this.addForm.goods_cat.join(",");*/
        /*this.addForm.goods_cat=form.goods_cat;*/
        form.goods_cat=this.addForm.goods_cat.join(",");
        this.manyTabdata.forEach(item=>{
          const newInfo={
            "attr_id":item.attr_id,
            "attr_value":item.attr_vals.join(" ")
          };
          this.addForm.attrs.push(newInfo);
        })
        this.onlyTabdata.forEach(item=>{
          const newInfo={
            "attr_id":item.attr_id,
            "attr_value":item.attr_vals,
          }
          this.addForm.attrs.push(newInfo);
        })
        console.log(this.addForm);
        form.attrs=this.addForm.attrs;
        form.goods_weight=parseInt(form.goods_weight);
        form.goods_price=parseInt(form.goods_price);
        form.goods_number=parseInt(form.goods_number);
        console.log(form.attrs);
        console.log(form.goods_cat);
        const {data:res}=await this.$http.post("goods",form);
        console.log(res);
        if(res.meta.status!==201){
          return this.$message.error("添加商品失败");
        }
        this.$message.success("添加成功");
        this.$router.push("/goods");
      })
    }
  },
  computed: {
    cateId() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null;
    },
  }
}
</script>

<style scoped>
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
.previewImg{
  width: 100%;
}
.addBtn{
  margin-top:10px;
}


</style>