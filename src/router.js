import VueRouter from 'vue-router'

//导入对应的路由组件
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
import GoodsComment from './componments/goods/GoodsComment.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [     //配置路由规则的
    { path: '/', redirect: '/home' },
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
    { path: '/home/goodscomment/:id', component: GoodsComment }
  ],

  //覆盖默认的路由高亮的类，默认的类叫做 router-link-active
  linkActiveClass: 'mui-active'
});

// 把路由对象暴露出去
export default router