import axios from 'axios'

export function request(config){
  //1.创建axios的实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  //2.axios的拦截器分两类 请求拦截和响应拦截
  //请求拦截的作用
  instance.interceptors.request.use(res => {
    return res
  }, err => {
    // console.log(err);
  })

  //响应拦截的作用
  instance.interceptors.response.use(res => {
    return res
  }, err => {
    console.log(err);
  })

  //3.发送真正的请求
  //instance返回的是一个promise
  return instance(config)

}
