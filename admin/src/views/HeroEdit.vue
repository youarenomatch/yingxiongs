<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="skills" type="border-card">
        <el-tab-pane label="基础信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :headers="gerAuhtHeaders()"
              :show-file-list="false"
              :on-success="afterUpload"
              
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="Banner">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :headers="gerAuhtHeaders()"
              :show-file-list="false"
              :on-success="afterUploads"
              
            >
              <img v-if="model.banner" :src="model.banner" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})">
            <i class="el-icon-plus"></i> 添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :headers="gerAuhtHeaders()"
                  :show-file-list="false"
                  :on-success="afterUploadss"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" 
                @click="model.skills.splice(i, 1)"
                >删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem;">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getCurrentInstance, onMounted, reactive, toRefs} from 'vue'
export default {
  props: {
    id: {}
  },
  setup() {
    const {proxy}=getCurrentInstance()

    const state=reactive({
      categories:[],
      items: [],
       model: {
        name: "",
        avatar: "",
        scores: {
          difficult: 0
        }
      }
    })

    const afterUpload=(res, file)=>{
      state.model.avatar=URL.createObjectURL(file.raw)
    }

      const afterUploads=(res, file)=>{
      state.model.banner=URL.createObjectURL(file.raw)
    }
     const afterUploadss=(res, file)=>{
      state.model.banner=URL.createObjectURL(file.raw)
    }

    const save=async()=>{
       
      if (proxy.id) {
       const res = await proxy.$http.put(`rest/heroes/${proxy.id}`, state.model);
      } else {
        const  res = await proxy.$http.post("rest/heroes",state.model);
      }
      proxy.$router.push("/heroes/list");
      proxy.$message({
        type: "success",
        message: "保存成功"
      });
    }

    const fetch=async()=>{
      const res = await proxy.$http.get(`rest/heroes/${proxy.id}`);
      state.model = Object.assign({}, proxy.model, res.data);
    }

    const fetchCategories=async()=>{
      const res = await proxy.$http.get(`rest/categories`);
      state.categories = res.data;
    }

    const fetchItems=async()=>{
       const res = await proxy.$http.get(`rest/items`);
      state.items = res.data;
    }
    const gerAuhtHeaders=()=>{
       return {Authorization:`Bearer ${localStorage.token || ''}`}
    } 


    onMounted(()=>{
      fetchItems();
      fetchCategories();
      proxy.id && fetch();
    })

    return{
      ...toRefs(state),
      afterUpload,
      afterUploads,
      save,
      gerAuhtHeaders,
      afterUploadss
    }
  }
}
</script>

<style>

</style>
