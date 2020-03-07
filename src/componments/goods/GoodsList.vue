<template>

    <div class="goods-container">
        <header id="header" class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">导航栏</h1>
        </header>

        <!-- 在网页中，有两种跳转方式： -->
        <!-- 方式1： 使用 a 标签 的形式叫做 标签跳转  -->
        <!-- 方式2： 使用 window.location.href 的形式，叫做 编程式导航 -->

        <div class="page-list"
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="busy"
             infinite-scroll-distance="50">

            <ul class="good-item" v-for="(item, i) in list" :key="i" @click="goDetail(item.id)" ref="elForm">
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
            <div class="gotop" v-show="!fixed" @click="toTop">
                <span class="mui-icon mui-icon-arrowthinup"></span>
            </div>
            <p class="loading-tips" v-show="busy">加载中...</p>
        </div>

    </div>

</template>

<script>

    export default {
        inject: ['reload'],     //注入 reload() 方法

        data() {
            return {
                goodsList: [],       //图片列表的数据
                // artId: 0,             //分页的页数
                pageIndex: 0,
                count: 0,
                data: [],
                busy: false,
                goTop: true,
                fixed: false,
                list: []
            }
        },
        created() {
            //默认进入页面，就主动请求 所有图片列表的数据
            this.getGoodsList();
        },
        mounted() {
            window.addEventListener('scroll', this.fixedActiveBtn);
        },
        methods: {
            getGoodsList() {
                //根据分类 Id，获取图片列表
                this.$http
                    .get("getGoodsList")
                    .then(result => {
                        // console.log(result);
                        if (result.status === 200) {
                            this.goodsList = result.data;
                            // console.log(this.goodsList.length);
                        }
                    });
            },
            getMore() {
                this.pageIndex++;
                this.getGoodsList();
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

            loadMore: function() {
                this.busy = true;

                this.$http
                    .get("getGoodsList")
                    .then(result => {
                        // console.log(result);
                        if (result.status === 200) {
                            this.goodsList = result.data;

                            setTimeout(() => {
                                for (var i = 0; i < this.goodsList.length; i++) {
                                    this.list.push(this.goodsList[i]);
                                    // this.list[i].id = timeId;
                                }
                                // console.log(this.list);
                                // console.log(this.goodsList.title);
                                this.busy = false;
                            }, 1000);
                        }
                    });
            },

            fixedActiveBtn() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                scrollTop >=112 ? this.fixed = true : this.fixed = false;
                // console.log(scrollTop);
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
                this.reload();
            },

        },

        components: {
            //评论子组件

        }
    }
</script>

<style lang="scss" scoped>
.goods-container {
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
    justify-content: space-between;

    .mint-button--large {
        margin-top: 40px;
        margin-bottom: 80px;
    }

    .page-list {
        height: 100vh;
        overflow-y: auto;
        padding-top: 45px;
        padding-bottom: 50px;
        /*background-color: #2ac845;*/

        .loading-tips {
            text-align: center;
        }
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

    .good-item {
        width: 47%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        padding: 2px;
        min-height: 231px;
        margin: 10px 1.5%;
        list-style-type: none;

        /*position: relative;*/
        display: inline-block;
        flex-direction: column;
        justify-content: space-between;

        img {
            width: 100%;
            height: 115px;
        }
        .title {
            font-size: 14px;
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
}
</style>