import axios from 'axios';
import { useMessage } from '@/hooks/useMessage';
const server = axios.create({
  baseURL: 'http://192.168.50.38:3001',
  headers: {
    // 'Content-Type':'applica'
  },
});

// 响应拦截器
// 请求拦截器
server.interceptors.response.use(
  (response) => {
    const { message } = useMessage();
    const res = response.data;
    console.log('res-interceptors', res);
    if (response.status != 200) {
      message({
        type: 'error',
        message: '请求异常',
      });
      return Promise.reject('请求异常');
    }
    if (response.status == 200) {
      //   return res.data;
      return response.data;
    }
  },
  (err) => {
    console.log('异常', err);
    return Promise.reject(err);
  },
);
// post请求
export const post = (url, data, config = {}) => {
  return server({
    method: 'POST',
    data: data,
    url: url,
    ...config,
  });
};
// get请求
export const get = (url, data, config = {}) => {
  return server({
    method: 'GET',
    params: data,
    url: url,
    ...config,
  });
};

export default server;
