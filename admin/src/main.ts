import { createApp } from 'vue'

import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import http from './http'
// import axios from 'axios'



const app = createApp(App)
// 全局挂载axios
app.config.globalProperties.$http = http;


app.use(ElementPlus)
.use(store)
.use(router)
app.mount('#app')
