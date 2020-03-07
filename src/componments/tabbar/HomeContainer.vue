<template>
    <div class="home-container">
<!--        轮播图区域-->
        <img src="http://localhost:3000/www/images/21.jpg" alt="404error.." v-if="!showname" @click="tap">

        <div class="item"  v-if="showname">
            <header id="header" class="mui-bar mui-bar-transparent">
                <input type="text" class="mintui mintui-search" placeholder="站内搜索.." @click="Click">
                <span class="mui-icon mui-icon-search" @click="Click"></span>
            </header>
        </div>

        <div class="page-list"
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="busy"
             infinite-scroll-distance="30">

            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item in bannerList" v-bind:key="item.url">
                    <router-link :to="'/home/photoinfo/' + item.id">
                        <img :src="item.img" alt="error404...">
                    </router-link>
                </mt-swipe-item>
            </mt-swipe>

            <!--        九宫格样式布局-->
            <ul class="mui-table-view mui-grid-view mui-grid-9" ref="elForm">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/newslist">
                        <img src="../../images/menu1.png" alt="404error..">
                        <div class="mui-media-body">新闻咨询</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/photoslist">
                        <img src="../../images/menu2.png" alt="404error.." id="content1">
                        <div class="mui-media-body">商品分类</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/goodslist">
                        <img src="../../images/menu3.png" alt="404error..">
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/comment">
                        <img src="../../images/menu4.png" alt="404error..">
                        <div class="mui-media-body">留言反馈</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/member">
                        <img src="../../images/menu5.png" alt="404error..">
                        <div class="mui-media-body">发现</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/setting">
                        <img src="../../images/menu6.png" alt="404error..">
                        <div class="mui-media-body">联系我们</div>
                    </router-link>
                </li>
            </ul>

            <ul class="good-item" id="testPaper" v-for="(item, i) in list" :key="i" @click="goDetail(item.id)">
                <li>
                    <img v-lazy="item.img_url" alt="">
                    <h1 class="title">{{ item.title }}</h1>
                    <div class="good-info">
                        <p class="price">
                            <span class="now">￥{{ item.sell_price }}</span>
                            <span class="old">￥{{ item.market_price }}</span>
                        </p>
                        <p class="sell">
                            <span>热卖中</span>
                            <span>剩{{ item.stock_quantity }}件</span>
                        </p>
                    </div>
                </li>
            </ul>
            <p class="loading-tips" v-show="content">加载中...</p>
            <p class="loading-tips" v-show="!content">所有数据已加载。</p>
            <div class="gotop" v-show="fixed" @click="toTop">
                <span class="mui-icon mui-icon-arrowup"></span>
            </div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';
    import { Toast, Indicator, Lazyload } from 'mint-ui'
    import swiper from '../subcomponent/swiper.vue'

    Vue.use(Lazyload);

    import infiniteScroll from 'vue-infinite-scroll'

    export default {
        directives: { infiniteScroll },

        inject: ['reload'],     //注入 reload() 方法

        data() {
            return {
                bannerList: [],      //保存轮播图的数组
                showname: true,
                msg: '',
                goodsList: [],
                count: 0,
                data: [],
                busy: false,
                goTop: true,
                fixed: true,
                list: [],
                scrollTop: '',
                content: true
            }
        },
        created() {
            this.getBanner();

            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            // console.log(this.scrollTop);
        },

        mounted() {
            window.addEventListener('scroll', this.fixedActiveBtn);
        },
        destroyed () {
            window.removeEventListener('scroll', this.fixedActiveBtn)
        },
        methods: {
            getBanner() {
                //获取轮播图数据的方法

                // $.ajax({
                //     url: 'http://las007.gitee.io/vue-project/src/message.json',
                //     type: 'get',
                //     dataType: 'json',
                //     success: function (data) {
                //         console.log(data);
                //     }
                // });

                // header('Access-Control-Allow-Origin:*');//允许所有来源访问
                // header('Access-Control-Allow-Method:POST,GET');//允许访问的方式

                this.$http
                    // .get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/message.json")
                    .get("getBanner")
                    .then(result => {
                    // console.log(result);
                    if (result.status === 200) {
                        // console.log(result.body);
                        //成功了
                        this.bannerList = result.data;
                    }else {
                        //失败了
                        Toast('加载轮播图失败...');
                    }
                });
            },
            getGoodsList() {
                //根据分类 Id，获取图片列表
                this.$http
                    .get("getGoodsList")
                    .then(result => {
                        // console.log(result);
                        if (result.status === 200) {
                            this.goodsList = result.data;
                        }
                    });
            },
            loadMore: function() {
                this.busy = true;

                this.$http
                    .get("getGoodsList")
                    .then(result => {
                        // console.log(result);
                        if (result.status === 200) {
                            this.goodsList = result.data;

                            Indicator.open({ spinnerType: 'fading-circle' });
                            this.newList = result.body;
                            setTimeout(function () {
                                Indicator.close();
                            }, 1500);

                            if (this.list.length <= this.goodsList.length*3) {
                                setTimeout(() => {
                                    for (var i = 0; i < this.goodsList.length; i++) {
                                        this.list.push(this.goodsList[i]);
                                    }

                                    this.busy = false;
                                }, 1000);
                            }else {
                                Toast('加载完成！！');
                                this.content = false;
                            }
                        }
                    });
            },
            goDetail(id) {

                // console.log(id);
                this.$http
                    .get("getGoodsInfo/" + id)
                    .then(result => {
                        // console.log(result);
                        if (result.status === 200) {

                        }
                    });
                // 使用JS的形式进行路由导航

                // 注意： 一定要区分 this.$route 和 this.$router 这两个对象，
                // 其中： this.$route 是路由【参数对象】，所有路由中的参数， params, query 都属于它
                // 其中： this.$router 是一个路由【导航对象】，用它 可以方便的 使用 JS 代码，实现路由的 前进、后退、 跳转到新的 URL 地址

                // 1. 最简单的
                // this.$router.push("/home/goodsinfo/" + id);
                // 2. 传递对象
                // this.$router.push({ path: "/home/goodsinfo/" + id });
                // 3. 传递命名的路由
                this.$router.push({ name: "goodsinfo", params: { id } });
            },
            tap() {
                this.showname = true;
            },

            Click() {
                // console.log(1);
                this.$router.push('/searchlist');
            },

            fixedActiveBtn() {
                this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                // this.scrollTop >=12 ? this.fixed = true : this.fixed = false;
                // console.log(this.scrollTop);
                // console.log(this.fixed)
            },
            toTop() {
                // console.log('ok');
                let top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                const timeTop = setInterval(() => {
                    document.documentElement.scrollTop = document.body.scrollTop = top -= 50;
                    if (top <= 0) {
                        clearInterval(timeTop);
                    }
                }, 10);
                // window.location.reload();
                //刷新当前页，而不加载数据
                // this.$router.replace('/refresh');

                //直接调用
                this.reload();
            },
        },
        components: {
            swiper
        }
    }
</script>

<style lang="scss" scoped>

    .home-container {
        /*margin-top: 50px;*/

        .item {
            padding-top: 50px;
            /*background-image: url("http://localhost:3000/www/images/26.jpg");*/
            background-image: url("../../../static/images/26.jpg");
        }

        img {
            /*height: 100%;*/
            width: 100%;
        }

        img[lazy="loading"] {
            width: 40px;
            height: 300px;
            margin: auto;
        }

        .gotop {
            text-align: center;
            position: fixed;
            right: 30px;
            bottom: 130px;
            padding: 10px;
            width: 50px;
            border-radius: 50%;
            border: 2px solid #5e5e5e;
            background-color: #fff;
            color: #000;
        }
    }

    .page-list {
        height: 100vh;
        overflow-y: auto;
        /*margin-top: 40px;*/
        /*background-color: #2ac845;*/
        padding-bottom: 50px;
        /*margin-bottom: 100px;*/

        .loading-tips {
            font-size: 18px;
            color: #000;
            line-height: 50px;
            text-align: center;
        }
    }
    .good-item {
        width: 96%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 10px 2%;
        padding: 2px;
        min-height: 231px;
        list-style-type: none;

        /*position: relative;*/
        display: inline-block;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 30px;
        overflow: hidden;

        img {
            width: 100%;
            height: 350px;
        }
        .title {
            font-size: 14px;
        }
        .good-info {
            background-color: #eee;

            p {
                margin: 0;
                padding: 5px;
            }
            .price {
                .now {
                    color: red;
                    font-weight: bold;
                    font-size: 14px;
                }
                .old {
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell {
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }

    input[type=text] {
        margin: 0;
        width: 89%;
        border-radius: 5px;
    }

    .mint-swipe{
        height: 200px;
        text-align: center;

        .mint-swipe-item {

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: 2px solid #fff;

        img {
            width: 60px;
            height: 60px;
        }
        .mui-media-body {
            font-size: 13px;
        }
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: none;
    }

</style>