<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
        
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { reactive,getCurrentInstance } from 'vue'
export default {
    setup() {
        const {proxy} =getCurrentInstance()
        const model=reactive({
            username:'',
            password:''
        })
        const login=async()=>{
          const res = await proxy.$http.post('login', model)
      // sessionStorage.token = res.data.token
      localStorage.token = res.data.token
      console.log(res.data)
      proxy.$router.push('/')
      proxy.$message({
        type: 'success',
        message: '登录成功'
      })
        }
        return{
            model,
            login
        }
    },
}
</script>

<style>
.login-card{
  width: 25rem;
  margin: 5rem auto;
}
</style>