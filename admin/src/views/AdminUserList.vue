<template>
  <div>
    <h1>管理员列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, toRefs } from 'vue';
export default {
setup() {
  const {proxy}=getCurrentInstance()

  const state=reactive({
    items:[]
  })
  
  const fetch=async()=>{
      const res = await proxy.$http.get("rest/admin_users");
      state.items = res.data;
    }


  const remove=(row)=>{
     proxy.$confirm(`是否确定要删除 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await proxy.$http.delete(`rest/admin_users/${row._id}`);
        proxy.$message({
          type: "success",
          message: "删除成功!"
        });
        proxy.fetch();
      });
  }
  onMounted(()=>{
    fetch()
  })
  return{
    ...toRefs(state),
    remove
  }
}
};
</script>

