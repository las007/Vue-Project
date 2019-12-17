//入口文件
console.log('ok');

import Vue from 'vue';

//导入 App 根组件
import app from './App.vue';

//按需导入 Mint-UI 中的组件
import { Header, Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//导入 MUI 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//1.1导入路由的包
import VueRouter from 'vue-router';
//1.2安装路由
Vue.use(VueRouter);
//1.3导入自己的路由 router 模块
import router from './router.js';

//2.1 导入 vue-resource
import VueResource from 'vue-resource'
//2.2 安装 vue-resource
Vue.use(VueResource);


var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router      //1.4 挂载路由对象
});