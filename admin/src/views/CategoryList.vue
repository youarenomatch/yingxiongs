<template>
  <div>
    <h1>分类界面</h1>
    <el-table :data="items.todo">
      <el-table-column prop="_id" label="ID" width="220"> </el-table-column>
      <el-table-column prop="parent.name" label="上级分类"></el-table-column>
      <el-table-column prop="name" label="分类名称"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-button
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
            type="text"
            size="small"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- <p>{{ items }}</p> -->
  </div>
</template>

<script lang="ts">
import { ref, reactive, getCurrentInstance } from "vue";
export default {
  name: "CategoryList",
  setup() {
    //  @ts-ignore
    const { proxy } = getCurrentInstance();
    let items = reactive({ todo: [] });

     // 请求
    let reqs = async () => {
      let res = await proxy.$http.get(
        "rest/categories"
      );
      console.log(res);
      items.todo = res.data;
      console.log("items", items);
    };
    reqs();

    // 删除
    let remove = (row:any):void => {
      proxy.$confirm(`是否确定要删除分类 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await proxy.$http.delete(`rest/categories/${row._id}`);
        proxy.$message({
          type: "success",
          message: "删除成功!",
        });
       reqs();
      });
    };

    return {
      items,
      remove,
    };
  },
  onMounted() {},
};
</script>
