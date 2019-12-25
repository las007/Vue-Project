<template>
    <div class="home-container">
<!--        轮播图区域-->
        <img src="http://localhost:3000/www/images/21.jpg" alt="404error.." v-if="!showname" @click="tap">

<!--        <div class="box">-->
<!--            <h2 id="myh2" ref="myMsg">剩余时间：<span class="clock">{{ msg }}</span>秒</h2>-->
<!--        </div>-->

        <div class="item"  v-if="showname">
<!--                    <swiper :bannerList="bannerList" :isfull="true"></swiper>-->
<!--            <mt-header fixed title="顶部状态栏"></mt-header>-->
            <header id="header" class="mui-bar mui-bar-transparent">
                <a class="mui-pull-left"></a>
                <h1 class="mui-title">导航栏</h1>
            </header>

            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(item, i) in bannerList" v-bind:key="item.url">
                    <router-link :to="'/home/photoinfo/' + i">
                        <img :src="item.img" alt="error404...">
                    </router-link>
                </mt-swipe-item>
            </mt-swipe>

            <!--        九宫格样式布局-->
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/newslist">
                        <img src="../../images/menu1.png" alt="404error..">
                        <div class="mui-media-body">新闻咨询</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/photoslist">
                        <img src="../../images/menu2.png" alt="404error..">
                        <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/goodslist">
                        <img src="../../images/menu3.png" alt="404error..">
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <img src="../../images/menu4.png" alt="404error..">
                        <div class="mui-media-body">留言反馈</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/otherpages">
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
        </div>

    </div>
</template>

<script>

    import { Toast } from 'mint-ui'
    import swiper from '../subcomponent/swiper.vue'

    export default {
        data() {
            return {
                bannerList: [],      //保存轮播图的数组
                showname: true,
                msg: ''
            }
        },
        created() {
            this.getBanner();
            // this.Timer();

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
                    .get("http://localhost:3000/getMessages")
                    .then(result => {
                    // console.log(result);
                    if (result.status === 200) {
                        // console.log(result.body);
                        //成功了
                        this.bannerList = result.body.list;
                    }else {
                        //失败了
                        Toast('加载轮播图失败...');
                    }
                });
            },

            tap() {
                this.showname = true;
            },

            /*Timer() {
                var number = 5;

                //原生js，操作DOM元素
                // console.log(document.getElementById('#myh2').innerText);

                // console.log(this.$refs.myMsg.innerText);

                var timer = setInterval(function () {
                     number--;

                     //
                     localStorage.setItem('timer', JSON.stringify(number));
                     if (number === 0) {
                         clearInterval(timer);
                     }

                 }, 1000);
                this.msg = JSON.parse(localStorage.getItem('timer' || []));
                console.log(this.msg);
            }*/
        },
        components: {
            swiper
        }
    }
</script>

<style lang="scss" scoped>

    .home-container {
        margin-top: 40px;
        background-image: url("http://localhost:3000/www/images/21.jpg");

        img {
            /*height: 100%;*/
            width: 100%;
        }
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