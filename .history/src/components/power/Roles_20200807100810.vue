<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <el-row>
                <el-col>
                    <el-button type="primary" @click="rolesDialogVisible=true">添加角色</el-button>
                </el-col>
            </el-row>
            <!-- 角色列表区域 -->
            <el-table :data="roleList" border stripe>
                <!-- 展开列 -->
                <el-table-column type="expand">
                    <template v-slot="scope">
                        <el-row :class="['bdbottom',i1===0?'bdtop':'','vcenter']"
                            v-for="(item1,i1) in scope.row.children" :key="item1.id">
                            <!-- 渲染一级权限 -->
                            <el-col :span="5">
                                <el-tag closable @close="removeRightsById(item1.id,scope.row)">{{item1.authName}}
                                </el-tag>
                                <i class=" el-icon-caret-right"></i>
                            </el-col>
                            <!-- 渲染二级和三级权限 -->
                            <el-col :span="19">
                                <!-- 渲染所有二级权限 -->
                                <el-row :class="[i2===0?'':'bdtop','vcenter']" v-for="(item2,i2) in item1.children"
                                    :key="item2.id">
                                    <el-col :span="6">
                                        <el-tag type="success" closable @close="removeRightsById(item2.id,scope.row)">
                                            {{item2.authName}}</el-tag>
                                        <i class=" el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-tag type="warning" v-for="(item3,i3) in item2.children" :key="item3.id"
                                            closable @close="removeRightsById(item3.id,scope.row)">
                                            {{item3.authName}}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>

                    </template>
                </el-table-column>

                <!-- 索引列 -->
                <el-table-column type="index">#</el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" width="300">
                    <template v-slot="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit" @click="editRole(scope.row.id)">编辑
                        </el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteRole(scope.row.id)">删除
                        </el-button>
                        <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog">分配权限
                        </el-button>
                    </template>
                </el-table-column>
                </label>
            </el-table>
        </el-card>
        <el-dialog title="添加用户" :visible.sync="rolesDialogVisible" width="30%" @close="roleFormClosed">
            <span slot="footer" class="dialog-footer">
                <el-form :model="addroleList" :rules="rules" label-width="80px" ref="addroleListRef">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="addroleList.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input v-model="addroleList.roleDesc"></el-input>
                    </el-form-item>
                </el-form>
                <el-button @click="rolesDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitRole">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="编辑角色" :visible.sync="editDialogVisible" width="30%" @close="editFormClosed">
            <span slot="footer" class="dialog-footer">
                <el-form :model="editroleList" :rules="rules" label-width="80px" ref="editFormRef">
                    <el-form-item label="角色名称">
                        <el-input v-model="editroleList.roleId" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="editroleList.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input v-model="editroleList.roleDesc"></el-input>
                    </el-form-item>
                </el-form>
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditRole">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 分配权限对话框 -->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                //所有角色列表数据
                roleList: [],
                rolesDialogVisible: false,
                editDialogVisible: false,
                addroleList: {
                    roleName: "",
                    roleDesc: "",
                },
                editroleList: {
                    roleId: "",
                    roleName: "",
                    roleDesc: "",
                },
                rules: {
                    roleName: [
                        { required: true, message: '请输入角色姓名', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    roleDesc: [
                        { required: true, message: '请输入角色描述', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ]
                },
            }
        },

        created() {
            this.getRolesList()
        },
        methods: {
            async getRolesList() {
                const { data: res } = await this.$http.get("roles");
                if (res.meta.status != 200) {
                    return this.$message.error("获取角色列表失败");
                }
                this.roleList = res.data;
                console.log(this.roleList);
            },
            roleFormClosed() {
                this.$refs.addroleListRef.resetFields();
            },
            submitRole(valid) {
                this.$refs.addroleListRef.validate(async (valid) => {
                    if (valid) {
                        const { data: res } = await this.$http.post("roles", this.addroleList);
                        if (res.meta.status !== 201) {
                            return this.$message.error("角色添加失败");
                        }
                        this.getRolesList();
                        this.rolesDialogVisible = false;
                        return this.$message.success("角色添加成功");
                    }
                    return this.$message.error("添加角色失败,验证规则不符合");
                })
            },
            async deleteRole(id) {
                const confirmResult = await this.$confirm('是否确定删除该角色', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(error => {
                    return error;
                })
                if (confirmResult === "confirm") {
                    const { data: res } = await this.$http.delete("roles/" + id);
                    if (res.meta.status !== 200) {
                        return this.$message.error("删除失败");
                    }
                    this.getRolesList();
                    return this.$message.success("删除成功");
                }
                return this.$message.info("已经取消删除");
            },
            // const { data: res } = await this.$http.delete("roles/" + id);
            // if (res.meta.status !== 200) {
            //     return this.$message.error("删除失败");
            // }
            // this.getRolesList();
            // return this.$message.success("删除成功");
            submitEditRole(valid) {
                this.$refs.editFormRef.validate(async (valid) => {
                    if (valid) {
                        const { data: res } = await this.$http.put("roles/" + this.editroleList.roleId, this.editroleList);
                        if (res.meta.status !== 200) {
                            return this.$message.error("编辑角色提交失败");
                        }
                        this.editDialogVisible = false;
                        this.getRolesList();
                        return this.$message.success("信息编辑成功");
                    }
                    this.$message.error("角色规则不正确");
                })
            },
            async editRole(id) {
                const { data: res } = await this.$http.get("roles/" + id);
                if (res.meta.status != 200) {
                    return this.$message.error("获取编辑角色失败");
                }
                this.editroleList = res.data;
                this.editDialogVisible = true;
            },
            editFormClosed() {
                this.$refs.editFormRef.resetFields();
            },
            // 根据ID删除权限
            async removeRightsById(rightsId, role) {
                // 弹框确定是否删除
                const confirmResult = await this.$confirm('是否取消该权限?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(error => error);
                if (confirmResult !== "confirm") {
                    return this.$message.info("取消了删除");
                }
                const { data: res } = await this.$http.delete("roles/" + role.id + "/rights/" + rightsId);
                if (res.meta.status !== 200) {
                    return this.$message.error("删除失败");
                }
                // this.getRolesList();
                role.children = res.data;
                return this.$message.success("删除成功");
            },
            showSetRightDialog() {

            }
        }
    }
</script>
<style scoped>
    .el-tag {
        margin: 7px;
    }

    .bdtop {
        border-top: 1px solid #eee;
    }

    .bdbottom {
        border-bottom: 1px solid #eee;
    }

    .vcenter {
        display: flex;
        align-items: center;
    }
</style>