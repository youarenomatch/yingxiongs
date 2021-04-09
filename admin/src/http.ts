import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElLoading } from 'element-plus';
import router from './router'


let loading: any;

const http = axios.create({
  baseURL:process.env.VUE_APP_BASEURL || '/admin/api',
  // baseURL: 'http://localhost:3000/admin/api'
})
const startLoading = () => {

  interface Options {
    lock: boolean;
    text: string;
    background: string;
  };

  const options: Options = {
    lock: true,
    text: "加载中...",
    background: 'rgba(0,0,0,0.7)'
  }
  loading = ElLoading.service(options);
}

const endLoading = () => {
  loading.close();
}

// 请求拦截
http.interceptors.request.use((config: AxiosRequestConfig) => {
  // 加载
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  startLoading();
  return config;
})


// 响应拦截
http.interceptors.response.use((response: AxiosResponse<any>) => {
  // 结束loading
  endLoading();
  return response;
}, error => {
    
    if (error.response.status === 401) {
      router.push('/login')
    }
  
  // 结束loading
  endLoading();
  // 错误提醒
  return Promise.reject(error);
})

export default http;