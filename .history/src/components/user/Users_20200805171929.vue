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
                        <el-input placeholder="请输入内容" class="input-with-select" v-model="queryInfo.query" clearable
                            @clear="getUserList">
                            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
                    </el-col>
                </el-row>
            </div>
            <!-- 用户列表区 -->
            <el-table :data="userList" style="width: 100%" border stripe>
                <el-table-column label="#" type="index">
                </el-table-column>
                <el-table-column prop="username" label="姓名">
                </el-table-column>
                <el-table-column label="邮箱" prop="email">
                </el-table-column>
                <el-table-column label="电话" prop="mobile">
                </el-table-column>
                <el-table-column label="角色" prop="role_name">
                </el-table-column>
                <el-table-column label="状态">
                    <template v-slot="scope">
                        <!-- {{scope.row.mg_state}} -->
                        <el-switch v-model="scope.row.mg_state" active-color=" #13ce66" inactive-color="#ff4949"
                            @change="userStateChanged(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template v-slot="scope">
                        <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="findUserById(scope.row)">
                            </el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="设置" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 分页区域 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum" :page-sizes="[1,2,3,4,5]" :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <!-- 添加用户的对话框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <el-form :model="addUserForm" :rules="rules" label-width="100px" ref="addUserFormRef">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addUserForm.username" type="text"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addUserForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addUserForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addUserForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="submitForm('addUserFormRef')">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改用户信息 -->
        <el-dialog title="提示" :visible.sync="modifyDialogVisible" :model="modifyUserForm" ref="modifyUserForm"
            width="50%">
            <el-form label-width="100px" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="modifyUserForm.username"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="modifyUserForm.email"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="modifyUserForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifyDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitModifyForm('modifyUserForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            // 邮箱验证规则
            var checkEmail = (rule, value, callback) => {
                const regEmail = /^\w+@\w+(\.\w+)+$/;
                if (regEmail.test(value)) {
                    return callback();
                }
                callback(new Error("输入的邮箱规则不正确"));
            }
            var checkMobile = (rule, value, callback) => {
                const regMobile = /^1[34578]\d{9}$/;
                if (regMobile.test(value)) {
                    return callback();
                }
                callback(new Error("输入的手机号码规则不正确"));
            }
            return {
                queryInfo: {
                    query: "",
                    // 当前的页数
                    pagenum: 1,
                    pagesize: 2
                },
                userList: [],
                total: 0,
                value: false,
                // 控制对话框显示与隐藏
                addDialogVisible: false,
                modifyDialogVisible: false,
                addUserForm: {
                    username: "",
                    password: "",
                    email: "",
                    mobile: "",
                },
                modifyUserForm: {
                    id: "",
                    email: "",
                    mobile: "",
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮件', trigger: 'blur' },
                        { validator: checkEmail, trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: checkMobile, trigger: 'blur' }
                    ]
                }
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
            },
            // 监听pageSizeChange
            handleSizeChange(newSize) {
                this.queryInfo.pagesize = newSize;
                this.getUserList();
            },
            // 监听页码值改变的事件
            handleCurrentChange(newPage) {
                this.queryInfo.pagenum = newPage;
                this.getUserList();
            },
            // 监听switch状态开关的改变
            async userStateChanged(userinfo) {
                const { data: res } = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
                if (res.meta.status != 200) {
                    userinfo.mg_state = !userinfo.mg_state;
                    return this.$message.error("更新用户状态失败!");
                }
                this.$message.success("更新用户状态成功!");
            },
            async submitUserForm() {
                const { data: res } = await this.$http.post("users", this.addUserForm);
                this.addDialogVisible = false;
                if (res.meta.status != 201) {
                    return this.$message.error("添加用户失败");
                }
                this.$message.success("添加用户成功");
                this.getUserList();
            },
            //提交添加用户信息
            submitForm(addUserFormRef) {
                this.$refs[addUserFormRef].validate((valid) => {
                    if (valid) {
                        this.submitUserForm();
                    } else {
                        this.$message.error("添加失败,注意查看规则");
                    }
                })
            },
            addDialogClosed() {
                // this.$refs[addUserFormRef].resetFields()如果没有传参这句话会出错
                this.$refs.addUserFormRef.resetFields();
            },
            async findUserById(user) {
                this.modifyDialogVisible = true;
                const { data: res } = await this.$http.get(`users/${user.id}`);
                if (res.meta.status != 200) {
                    return this.$message.error("获取信息失败");
                }
                this.modifyUserForm = res.data;
                console.log(this.modifyUserForm);
            },
            submitModifyForm(modifyUserForm) {
                this.$refs.modifyUserForm.validate(async (valid) => {
                    if (valid) {
                        this.modifyDialogVisible = false;
                        const { data: res } = await this.$http.put(`users/${this.modifyUserForm.id}`, this.modifyUserForm)
                        if (res.meta.status != 200) {
                            return this.$message.error("提交修改信息失败");
                        }
                        this.$message.success("提交修改信息成功");
                        this.getUserList();
                    } else {

                    }

                })
            }

        }
    }
</script>
<style scoped></style>