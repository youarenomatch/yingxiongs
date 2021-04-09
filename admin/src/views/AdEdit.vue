<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="model.items.push({})">
          <i class="el-icon-plus"></i> 添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="跳转链接 (URL)">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top: 0.5rem;">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :headers="gerAuhtHeaders()"
                :show-file-list="false"
                 :on-success="afterUpload"
              >
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            
            <el-form-item>
              <el-button size="small" type="danger" @click="model.items.splice(i, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive ,getCurrentInstance, toRefs, onMounted} from 'vue';
export default {
  props: {
    id: {}
  },
  setup(){
    const {proxy}=getCurrentInstance()

    const state=reactive({
       model: {
        items: [
        ],
        
      }
    })

    const save=async()=>{
      if (proxy.id) {
        let res = await proxy.$http.put(`rest/ads/${proxy.id}`, state.model);
      } else {
        let  res = await proxy.$http.post("rest/ads", state.model);
      }
      proxy.$router.push("/ads/list");
      proxy.$message({
        type: "success",
        message: "保存成功"
      });
    }

    const fetch=async()=>{
      const res = await proxy.$http.get(`rest/ads/${proxy.id}`);
      state.model = Object.assign({}, state.model, res.data);
    }
     const gerAuhtHeaders=()=>{
           return {Authorization:`Bearer ${localStorage.token || ''}`}
        }

      const afterUpload=(res,file)=>{
      console.log(file);
      
      // proxy.$set(model, 'icon', res.url)
      state.model.items.image=URL.createObjectURL(file.raw)
    }   
    onMounted(()=>{
     proxy.id && fetch();
    })
    return{
      ...toRefs(state),
      save,
      gerAuhtHeaders,
      afterUpload
    }
  }
};
</script>
