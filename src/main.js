//入口文件
// console.log('ok');

import Vue from 'vue';
//导入 App 根组件
import app from './App.vue';
import login from './componments/login/Login.vue'

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex);

// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]');

var store = new Vuex.Store({
    state: { // this.$store.state.***
        car: car // 将 购物车中的商品的数据，用一个数组存储起来，在 car 数组中，存储一些商品的对象， 咱们可以暂时将这个商品对象，设计成这个样子
        // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
    },
    mutations: { // this.$store.commit('方法的名称', '按需传递唯一的参数')
        addToCar(state, goodsinfo) {
            // 点击加入购物车，把商品信息，保存到 store 中的 car 上
            // 分析：
            // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
            // 2. 如果没有，则直接把 商品数据，push 到 car 中即可

            // 假设 在购物车中，没有找到对应的商品
            var flag = false;

            state.car.some(item => {            //对数组进行遍历，并将相同id， push到数组car中去
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true
                }
            });

            // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
            if (!flag) {    //flag === false
                state.car.push(goodsinfo)
            }

            // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            // 修改购物车中商品的数量值
            // 分析：
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count);
                    return true
                }
            });
            // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFormCar(state, id) {
            // 根据Id，从store 中的购物车中删除对应的那条商品数据
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1);
                    return true;
                }
            });
            // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            });
            // 把最新的 所有购物车商品的状态保存到 store 中去
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: { // this.$store.getters.***
        // 相当于 计算属性，也相当于 filters
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            });
            return c
        },
        getGoodsCount(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count;
                // console.log(o);
            });
            return o
        },
        getGoodsSelected(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.selected;
                // console.log(o);
            });
            return o
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, // 勾选的数量
                amount: 0 // 勾选的总价
            };
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count;
                    o.amount += item.price * item.count
                }
            });
            return o
        }
    }
});

//按需导入 Mint-UI 中的组件
import { Header, Swipe, SwipeItem, Toast, Button, Lazyload  } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Toast.name, Toast);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI);
import 'mint-ui/lib/style.css'

//导入 MUI 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/app.css'
import './lib/mui/js/mui.min.js'
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

//没有添加被动事件监听器来阻止'touchstart'事件，请考虑添加事件管理者'passive'，以使页面更加流畅
import 'default-passive-events'


//导入格式化时间的插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dataFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr, moment.ISO_8601).format(pattern);
});

//安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);

//infiniteScroll 滚动加载
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll);

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,      //1.4 挂载路由对象
    store // 挂载 store 状态管理对象
});