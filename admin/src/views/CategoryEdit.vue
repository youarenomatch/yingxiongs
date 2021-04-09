<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
       <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id"
          :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- <p>{{state.parents}}</p> -->
  </div>
  
</template>

<script lang="ts">
import {ref ,reactive,getCurrentInstance, onMounted, toRefs} from 'vue'
import {useRouter} from 'vue-router'

// interface models{
//   name: string;
//    parent:any
// }
export default {
  props:{
    id:{}
  },
  setup() {
    // @ts-ignore
    const {proxy}=getCurrentInstance()
    const router=useRouter()
    
    const state=reactive({
      model: {},
      parents: [],
    })

    const save = async()=>{
      if(proxy.id){
        const res=await proxy.$http.put(`rest/categories/${proxy.id}`,state.model)
      }else{
        const res=await proxy.$http.post('rest/categories',state.model)
      }
      
      router.push('/categories/list')
      proxy.$message({
        type: 'success',
        message: '保存成功'
      })
    }
    const fetch=async()=>{
      let res=await proxy.$http.get(`rest/categories/${proxy.id}`)
      console.log(res)
      state.model=res.data
    }
    

    const fetchParents=async()=>{
      let res=await proxy.$http.get(`rest/categories`)
      console.log(res.data)
      state.parents=res.data
    }
    
    onMounted(()=>{
      fetchParents()
      proxy.id && fetch()
    })
    return{
      ...toRefs(state),
      save,
      state
    }
  }
}
</script>