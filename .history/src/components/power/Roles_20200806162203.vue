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
                <el-table-column type="expand"></el-table-column>
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
                        <el-button size="mini" type="warning" icon="el-icon-setting">分配权限 </el-button>
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
        <el-dialog title="编辑角色" :visible.sync="editDialogVisible" width="30%" ref="editFormRef">
            <span slot="footer" class="dialog-footer">
                <el-form :model="editroleList" :rules="rules" label-width="80px">
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
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    roleDesc: [
                        { required: true, message: '请输入角色描述', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
            async submitRole(valid) {
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
            },
            async deleteRole(id) {
                const { data: res } = await this.$http.delete("roles/" + id);
                if (res.meta.status !== 200) {
                    return this.$message.error("删除失败");
                }
                this.getRolesList();
                return this.$message.success("删除成功");
            },
            submitEditRole(valid) {
                this.$refs.editFormRef.validate(async (valid) => {
                    if (valid) {
                        const { data: res } = await this.$http.put("roles/" + this.editroleList.roleId, this.editroleList);
                        if (res.meta.status !== 200) {
                            return this.$message.error("编辑角色提交失败");
                        }
                        this.editDialogVisible = false;
                        return this.$message.success("信息编辑成功");
                    }
                    this.$http.error("角色规则不正确");
                })
            },
            async editRole(id) {
                const { data: res } = await this.$http.get("roles/" + id);
                if (res.meta.status != 200) {
                    return this.$message.error("获取编辑角色失败");
                }
                this.editroleList = res.data;
                this.editDialogVisible = true;
            }
        }
    }
</script>
<style scoped></style>