<template>
   <div class="about">
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!-- 这里还缺少上传之前的说明（大小，格式设么的） -->
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :headers="gerAuhtHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
          
        >
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
  
</template>

<script lang="ts">
import {ref ,reactive,getCurrentInstance, onMounted} from 'vue'
import {useRouter} from 'vue-router'

interface models{
  name: string;
  icon:string
}
export default {
  props:{
    id:{}
  },
  setup() {
    // @ts-ignore
    const {proxy}=getCurrentInstance()
    const router=useRouter()
    
    const model=reactive<models>({
      name:'',
      icon:''
    })
    
    const save = async()=>{
      if(proxy.id){
        const res=await proxy.$http.put(`rest/items/${proxy.id}`,model)
      }else{
        const res=await proxy.$http.post('rest/items',model)
      }
      
      router.push('/items/list')
      proxy.$message({
        type: 'success',
        message: '保存成功'
      })
    }
    const fetch=async()=>{
      let res=await proxy.$http.get(`rest/items/${proxy.id}`)
      console.log(res)
      model.name=res.data.name
      model.icon=res.data.icon
    }
   

    const afterUpload=(res:any,file:any)=>{
      console.log(res);
      
      // proxy.$set(model, 'icon', res.url)
      model.icon=URL.createObjectURL(file.raw)
    }

    const gerAuhtHeaders=()=>{
           return {Authorization:`Bearer ${localStorage.token || ''}`}
        }

    onMounted(()=>{
       proxy.id &&fetch()
    })

    return{
      save,
      model,
      afterUpload,
      gerAuhtHeaders
    }
  }
}
</script>


<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>