<template>

    <div class="goodsinfo-container">

        <header id="header" class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">导航栏</h1>
        </header>

        <div class="page-list"
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="busy"
             infinite-scroll-distance="50">
            <!--<ul>
                <li v-for="item in list">{{ item.name }}</li>
            </ul>-->

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
            <div class="gotop" v-show="!fixed" @click="toTop">Top</div>
            <p class="loading-tips" v-show="busy">加载中...</p>
        </div>

    </div>

</template>

<script>

    export default {
        data() {
            return {
                count: 0,
                data: [],
                busy: false,
                loading: false,
                goodsList: [],
                list: [],
                goTop: true,
                fixed: false,
            }
        },

        mounted() {
            window.addEventListener('scroll', this.fixedActiveBtn);

            console.log(this.$refs)
        },

        created() {
            //默认进入页面，就主动请求 所有图片列表的数据
            this.getGoodsList();
        },
        methods: {
            getGoodsList() {
                //根据分类 Id，获取图片列表
                this.$http
                    .get("http://localhost:3000/getGoodsList")
                    .then(result => {
                        // console.log(result);
                        if (result.status === 200) {
                            // this.goodsList = result.body[this.pageIndex][this.pageIndex + 1];
                            // this.goodsList = this.goodsList.concat(result.body.list[this.pageIndex][this.pageIndex + 1]);
                            // console.log(this.goodsList);
                            // this.goodsList = result.data;
                            // console.log(this.goodsList);
                        }
                    });
            },

            loadMore: function() {
                this.busy = true;

                this.$http
                    .get("http://localhost:3000/getGoodsList")
                    .then(result => {
                        console.log(result);
                        if (result.status === 200) {
                            this.goodsList = result.data;

                            setTimeout(() => {
                                var now = new Date();
                                var year = now.getFullYear();
                                var mon = now.getMonth();
                                var day = now.getDate();
                                var hour = now.getHours();//得到小时
                                var minu = now.getMinutes();//得到分钟
                                var sec = now.getSeconds();//得到秒
                                var timeId = year + "." + mon + "." + day + " " + hour + ":" + minu + ":" + sec;

                                for (var i = 0; i < this.goodsList.length; i++) {
                                    this.list.push(this.goodsList[i]);
                                    // this.list[i].id = timeId;
                                }
                                console.log(this.list);
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
                window.location.reload();
            },

            goDetail(id) {

                // console.log(id);
                this.$http
                    .get("http://localhost:3000/getGoodsInfo/" + id)
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
        }
    }
</script>

<style lang="scss" scoped>

    .goodsinfo-container {
        .page-list {
            height: 500px;
            overflow-y: auto;
            margin-top: 40px;
            /*background-color: #2ac845;*/

            .loading-tips {
                text-align: center;
            }
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

        .gotop {
            text-align: center;
            position: fixed;
            right: 30px;
            bottom: 60px;
            padding: 10px;
            width: 50px;
            border-radius: 50%;
            border: 2px solid #5e5e5e;
            background-color: #fff;
            color: #000;
        }
    }

</style>