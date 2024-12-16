import axios from 'axios';
const server = axios.create({
    baseURL: 'http://192.168.1.151:3000',
    headers:{
        // 'Content-Type':'applica'
    }
});

// 请求拦截器
// 响应拦截器

// post请求
export const post = (url, data, config = {}) => {
    return server({
        method: 'POST',
        data: data,
        url: url,
        ...config
    });
};
// get请求
export const get = (url, data, config = {}) => {
    return server({
        method: 'GET',
        params: data,
        url: url,
        ...config
    });
};


export default server;