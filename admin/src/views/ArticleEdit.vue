<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue3-editor";
import {getCurrentInstance, onMounted, reactive, toRefs} from 'vue'

export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  setup() {
    const {proxy} =getCurrentInstance()
    const state=reactive({
       model: {},
       categories: []
    })

    const handleImageAdded=async(file, Editor, cursorLocation, resetUploader)=>{
      const formData = new FormData();
      formData.append("file", file);
      const res = await proxy.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
    const save=async()=>{

      if (proxy.id) {
        let res = await proxy.$http.put(`rest/articles/${proxy.id}`, proxy.model);
      } else {
        let res = await proxy.$http.post("rest/articles", proxy.model);
      }
      proxy.$router.push("/articles/list");
      proxy.$message({
        type: "success",
        message: "保存成功"
      });
    }
    const fetch=async()=>{
       const res = await proxy.$http.get(`rest/articles/${proxy.id}`);
      state.model = res.data;
    }
    const fetchCatgories=async()=>{
        const res = await proxy.$http.get(`rest/categories`);
      state.categories = res.data;
    }
    onMounted(()=>{
        fetchCatgories();
        proxy.id && fetch();
    })
    return{
      ...toRefs(state),
      save,
      handleImageAdded
    }
  }
};
</script>
