<template>
    <div>
        <!--        <h3>ShopcarContainer</h3>-->

        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">发现·多彩生活</h1>
        </header>
        <div class="mui-content mui-row mui-fullscreen">
            <div class="mui-col-xs-3">
                <div id="segmentedControls" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical">
                    <a class="mui-control-item mui-active" href="#content1">今日推荐</a>
                    <a class="mui-control-item" href="#content2">数码产品</a>
                    <a class="mui-control-item" href="#content3">网络推荐</a>
                    <a class="mui-control-item" href="#content4">智能设备</a>
                    <a class="mui-control-item" href="#content5">服装</a>
                    <a class="mui-control-item" href="#content6">书籍</a>
                    <a class="mui-control-item" href="#content7">食品</a>
                    <a class="mui-control-item" href="#content8">运动装备</a>
                    <a class="mui-control-item" href="#content9">外设产品</a>
                    <a class="mui-control-item" href="#content10">出行必备</a>
                    <a class="mui-control-item" href="#content11">选项11</a>
                    <a class="mui-control-item" href="#content12">选项12</a>
                </div>
            </div>
            <div id="segmentedControlContents" class="mui-col-xs-9" style="border-left: 1px solid #c8c7cc;">
                <div id="content1" class="mui-control-content mui-active">
                    <ul class="mui-table-view mui-grid-view">
                        <li class="mui-table-view-cell mui-media mui-col-xs-12 mui-col-sm-6">
                            <router-link to="home/goodsinfo/4">
                                <img class="mui-media-object" src="../../../static/images/photosList/51.jpg">
                                <div class="mui-media-body">数码相机</div>
                            </router-link>
                        </li>
                    </ul>
                    <ul class="mui-table-view mui-grid-view">
                        <li class="mui-table-view-cell mui-media mui-col-xs-12 mui-col-sm-6">
                            <router-link to="home/goodsinfo/6">
                                <img class="mui-media-object" src="../../../static/images/shopCarList/6.jpg">
                                <div class="mui-media-body">数学大通关，智力开发max...</div>
                            </router-link>
                        </li>
                    </ul>
                    <ul class="mui-table-view mui-grid-view">
                        <li class="mui-table-view-cell mui-media mui-col-xs-12 mui-col-sm-6">
                            <router-link to="home/goodsinfo/7">
                                <img class="mui-media-object" src="../../../static/images/shopCarList/7.jpg">
                                <div class="mui-media-body">时尚女装，需要你的加入</div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div id="content2" class="mui-control-content">
                    <ul class="mui-table-view mui-grid-view">
                        <li class="mui-table-view-cell mui-media mui-col-xs-12 mui-col-sm-6">
                            <router-link to="/home/photoinfo/4">
                                <img class="mui-media-object" src="../../../static/images/photosList/35.jpg">
                                <div class="mui-media-body">Color of SIP CBD</div>
                            </router-link>
                        </li>
                    </ul>
                    <ul class="mui-table-view mui-grid-view">
                        <li class="mui-table-view-cell mui-media mui-col-xs-12 mui-col-sm-6">
                            <router-link to="/home/photoinfo/1">
                                <img class="mui-media-object" src="../../../static/images/photosList/33.jpg">
                                <div class="mui-media-body">静静看这世界</div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div id="content3" class="mui-control-content">
                    <div class="good-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
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
                    </div>

                </div>
                <div id="content4" class="mui-control-content">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">第4个选项卡子项-1</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-2</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-3</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-4</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-5</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-6</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-7</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-8</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-9</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-10</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-11</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-12</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-13</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-14</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-15</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-16</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-17</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-18</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-19</li>
                        <li class="mui-table-view-cell">第4个选项卡子项-20</li>
                    </ul>
                </div>
                <div id="content5" class="mui-control-content">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">第5个选项卡子项-1</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-2</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-3</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-4</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-5</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-6</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-7</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-8</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-9</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-10</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-11</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-12</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-13</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-14</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-15</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-16</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-17</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-18</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-19</li>
                        <li class="mui-table-view-cell">第5个选项卡子项-20</li>
                    </ul>
                </div>
                <div id="content6" class="mui-control-content">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">第6个选项卡子项-1</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-2</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-3</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-4</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-5</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-6</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-7</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-8</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-9</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-10</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-11</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-12</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-13</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-14</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-15</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-16</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-17</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-18</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-19</li>
                        <li class="mui-table-view-cell">第6个选项卡子项-20</li>
                    </ul>
                </div>
                <div id="content7" class="mui-control-content">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">第7个选项卡子项-1</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-2</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-3</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-4</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-5</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-6</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-7</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-8</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-9</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-10</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-11</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-12</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-13</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-14</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-15</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-16</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-17</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-18</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-19</li>
                        <li class="mui-table-view-cell">第7个选项卡子项-20</li>
                    </ul>
                </div>
                <div id="content8" class="mui-control-content">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">第8个选项卡子项-1</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-2</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-3</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-4</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-5</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-6</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-7</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-8</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-9</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-10</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-11</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-12</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-13</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-14</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-15</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-16</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-17</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-18</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-19</li>
                        <li class="mui-table-view-cell">第8个选项卡子项-20</li>
                    </ul>
                </div>
                <div id="content9" class="mui-control-content">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">第9个选项卡子项-1</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-2</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-3</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-4</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-5</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-6</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-7</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-8</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-9</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-10</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-11</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-12</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-13</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-14</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-15</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-16</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-17</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-18</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-19</li>
                        <li class="mui-table-view-cell">第9个选项卡子项-20</li>
                    </ul>
                </div>
                <div id="content10" class="mui-control-content">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">第10个选项卡子项-1</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-2</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-3</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-4</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-5</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-6</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-7</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-8</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-9</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-10</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-11</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-12</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-13</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-14</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-15</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-16</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-17</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-18</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-19</li>
                        <li class="mui-table-view-cell">第10个选项卡子项-20</li>
                    </ul>
                </div>
                <div id="content11" class="mui-control-content">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">第11个选项卡子项-1</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-2</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-3</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-4</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-5</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-6</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-7</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-8</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-9</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-10</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-11</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-12</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-13</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-14</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-15</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-16</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-17</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-18</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-19</li>
                        <li class="mui-table-view-cell">第11个选项卡子项-20</li>
                    </ul>
                </div>
                <div id="content12" class="mui-control-content">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">第12个选项卡子项-1</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-2</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-3</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-4</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-5</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-6</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-7</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-8</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-9</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-10</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-11</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-12</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-13</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-14</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-15</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-16</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-17</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-18</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-19</li>
                        <li class="mui-table-view-cell">第12个选项卡子项-20</li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import mui from '../../lib/mui/js/mui.min.js'


    export default {
        data() {
            return {
                goodsList: [],
            }
        },
        created() {
            this.getMsg();
            this.getGoodsList();

        },

        methods: {
            getMsg(e) {
                mui.init({
                    swipeBack: true //启用右滑关闭功能
                });

                //原生js，操作DOM元素
                // console.log(document.getElementById('myh1').innerText);

                //ref 是英文单词 [reference]     值类型 和 引用类型 referenceError
                // console.log(this.$refs.myh1.innerText);

                // var controls = document.getElementById("segmentedControls");
                var controls = this.$refs.segmentedControls;
                var contents = this.$refs.segmentedControlContents;
                // var contents = document.getElementById("segmentedControlContents");

                var html = [];
                var i = 1,
                    j = 1,
                    m = 16, //左侧选项卡数量+1
                    n = 21; //每个选项卡列表数量+1
                for (; i < m; i++) {
                    html.push('<a class="mui-control-item" href="#content' + i + '">选项' + i + '</a>');
                }
                this.myHtmlCode = html.join('');

                // this.myHtmlCode = e.target.innerHTML;

                html = [];
                for (i = 1; i < m; i++) {
                    html.push('<div id="content' + i + '" class="mui-control-content"><ul class="mui-table-view">');
                    for (j = 1; j < n; j++) {
                        html.push('<li class="mui-table-view-cell">第' + i + '个选项卡子项-' + j + '</li>');
                    }
                    html.push('</ul></div>');
                }
                // contents.innerHTML = html.join('');
                // this.myHtmlCode = e.target.innerHTML;
                //默认选中第一个
                // controls.querySelector('.mui-control-item').classList.add('mui-active');
                // contents.querySelector('.mui-control-content').classList.add('mui-active');
            },
            getGoodsList() {
                //根据分类 Id，获取图片列表
                this.$http
                    .get("getGoodsList")
                    .then(result => {
                        // console.log(result);
                        if (result.status === 200) {
                            // this.goodsList = result.body[this.pageIndex][this.pageIndex + 1];

                            // this.goodsList = this.goodsList.concat(result.body.list[this.pageIndex][this.pageIndex + 1]);
                            // console.log(this.goodsList);
                            this.goodsList = result.data;
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

        },
        components: {}
    }
</script>

<style lang="scss" scoped>
    h3 {
        color: red;
    }
    .mui-row.mui-fullscreen>[class*="mui-col-"] {
        height: 100%;
    }
    .mui-col-xs-3,
    .mui-control-content {
        overflow-y: auto;
        height: 100%;
        padding-bottom: 50px;
    }

    .mui-table-view {
        margin: 10px auto;
    }
    .mui-table-view.mui-grid-view, .mui-table-view-cell {
        width: 95%;
    }

    .mui-segmented-control .mui-control-item {
        line-height: 50px;
        width: 100%;
    }
    .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active {
        background-color: #fff;
    }

    .good-item {
        width: 47%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 10px 1.5%;
        padding: 2px;
        min-height: 231px;

        /*position: relative;*/
        display: inline-block;
        flex-direction: column;
        justify-content: space-between;

        img {
            width: 100%;
            height: 230px;
        }

        image[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .title {
            font-size: 14px;
            /*width: 89%;*/
            /*background-color: #2ac845;*/
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .good-info {
            background-color: #eee;

            /*position: absolute;*/
            /*bottom: 2px;*/
            /*right: 2px;*/
            /*width: 100%;*/

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
</style>