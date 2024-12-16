import { createApp } from 'vue';
import App from './App';
import router from '@/router';
import '@/style/index.less';
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
const app = createApp(App);
// app.use(ElementPlus)

app.use(router);
app.mount('#app');

let a = 1;
console.log(a);
