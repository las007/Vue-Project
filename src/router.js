import VueRouter from 'vue-router'

//导入对应的路由组件
import Login from './componments/login/Login.vue'
import LoginPage from './componments/others/inifitePage.vue'
import NewPage from './componments/login/NewPage.vue'
import Register from './componments/login/Register.vue'
import Setting from './componments/login/Setting.vue'
import Search from './componments/search/SeacheList.vue'
import HomeContainer from './componments/tabbar/HomeContainer.vue'
import MemberContainer from './componments/tabbar/MemberContainer.vue'
import ShopcarContainer from './componments/tabbar/ShopcarContainer.vue'
import SearchContainer from './componments/tabbar/SearchContainer.vue'
import NewsList from './componments/news/NewsList.vue'
import NewsInfo from './componments/news/NewsInfo.vue'
import PhotosList from './componments/photos/PhotosList.vue'
import PhotosInfo from './componments/photos/PhotoInfo.vue'
import NewsContent from './componments/news/NewsContent.vue'
import GoodsList from './componments/goods/GoodsList.vue'
import GoodsInfo from './componments/goods/GoodsInfo.vue'
import GoodsDesc from './componments/goods/GoodsDesc.vue'
import OtherPages from './componments/others/OtherPages.vue'
import GoodsComment from './componments/goods/GoodsComment.vue'
import App from './App.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [     //配置路由规则的
    { path: '/', redirect: '/home' },
    { path: '/login', component: Login },
    { path: '/home/loginpage', component: LoginPage },
    { path: '/home/newpage', component: NewPage },
    { path: '/register', component: Register },
    { path: '/setting', component: Setting },
    { path: '/searchlist', component: Search },
    // { path: '/app', component: App },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer },
    { path: '/home/newslist', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewsInfo },
    { path: '/home/photoslist', component: PhotosList },
    { path: '/home/newslist/content', component: NewsContent },
    { path: '/home/photoinfo/:id', component: PhotosInfo },
    { path: '/home/goodslist', component: GoodsList },
    { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' },
    { path: '/home/goodsdesc/:id', component: GoodsDesc },
    { path: '/home/goodscomment/:id', component: GoodsComment },
    { path: '/home/otherpages', component: OtherPages },
  ],

  //覆盖默认的路由高亮的类，默认的类叫做 router-link-active
  linkActiveClass: 'mui-active'
});

// 把路由对象暴露出去
export default router