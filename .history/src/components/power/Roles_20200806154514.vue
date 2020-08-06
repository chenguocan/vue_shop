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
                        <el-button size="mini" type="primary" icon="el-icon-edit">编辑 </el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete">删除 </el-button>
                        <el-button size="mini" type="warning" icon="el-icon-setting">分配权限 </el-button>
                    </template>
                </el-table-column>
                </label>
            </el-table>
        </el-card>
        <el-dialog title="添加用户" :visible.sync="rolesDialogVisible" width="30%" @close="roleFormClosed">
            <span slot="footer" class="dialog-footer">
                <el-form :model="addroleList" label-width="80px" ref="addroleListRef">
                    <el-form-item label="角色名称">
                        <el-input v-model="addroleList.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述">
                        <el-input v-model="addroleList.roleDesc"></el-input>
                    </el-form-item>
                </el-form>
                <el-button @click="rolesDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="rolesDialogVisible = false">确 定</el-button>
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
                addroleList: {
                    roleName: "",
                    roleDesc: "",
                }
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
                this.$refs.addroleListRef.resetFileds();
            }
        }
    }
</script>
<style scoped></style>