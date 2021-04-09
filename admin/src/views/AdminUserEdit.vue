<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
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
    const {proxy} =getCurrentInstance()
    const state=reactive({
      model:{}
    })

    const save=async()=>{
       if (proxy.id) {
        let res = await proxy.$http.put(`rest/admin_users/${proxy.id}`, state.model)
      } else {
        let res = await proxy.$http.post('rest/admin_users', state.model)
      }
      proxy.$router.push('/admin_users/list')
      proxy.$message({
        type: 'success',
        message: '保存成功'
      })
    }
    const fetch=async()=>{
      const res = await proxy.$http.get(`rest/admin_users/${proxy.id}`)
      state.model = res.data
    }
    onMounted(()=>{
      fetch()
    })
    return{
      ...toRefs(state),
      save
    }
  }
}
</script>
