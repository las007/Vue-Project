<template>

    <div class="goods-container">

        <!--<router-link class="good-item" v-for="item in goodsList" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
            <img :src="item.img_url" alt="">
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
        </router-link>-->

        <header id="header" class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">导航栏</h1>
        </header>

        <!-- 在网页中，有两种跳转方式： -->
        <!-- 方式1： 使用 a 标签 的形式叫做 标签跳转  -->
        <!-- 方式2： 使用 window.location.href 的形式，叫做 编程式导航 -->

        <div class="good-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
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

        <mt-button type="danger" size="large" @click="getMore">加载更多..</mt-button>

    </div>

</template>

<script>

    export default {
        data() {
            return {
                goodsList: [],       //图片列表的数据
                // artId: 0,             //分页的页数
                pageIndex: 0
            }
        },
        created() {
            //默认进入页面，就主动请求 所有图片列表的数据
            this.getGoodsList();
        },
        methods: {
            getGoodsList() {
                //根据分类 Id，获取图片列表
                this.$http
                    .get("http://bfbad689.ngrok.io/getGoodsList")
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
            getMore() {
                this.pageIndex++;
                this.getGoodsList();
                // console.log('ok');
            },
            goDetail(id) {

                // console.log(id);
                this.$http
                    .get("http://bfbad689.ngrok.io/getGoodsInfo/" + id)
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
            }

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

    .good-item {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin-left: 0;
        padding: 2px;
        min-height: 231px;
        margin-top: 40px;

        /*position: relative;*/
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        img {
            width: 100%;
            height: 115px;
        }
        .title {
            font-size: 14px;
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