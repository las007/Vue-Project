<template>

    <div class="goodsinfo-container">

        <header id="header" class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">导航栏</h1>
        </header>

        <transition @beforeEnter="beforeEnter" @enter="enter" @afterEnter="afterEnter">
            <div class="ball" v-show="ballFalse"></div>
        </transition>

<!--        商品轮播区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :bannerList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>

<!--        商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsInfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>
                        市场价: <del>￥{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;<span class="now_price">${{ goodsInfo.sell_price }}</span>
                    </p>
                    <p>
                        购买数量: <numbox @getcount="getSelectedCount" :max="goodsInfo.stock_quantity"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

<!--        商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsInfo.click }}</p>
                    <p>库存情况：{{ goodsInfo.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsInfo.add_time | dataFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>

    </div>

</template>

<script>

// 导入轮播图组件
import swiper from '../subcomponent/swiper.vue'
// 导入 数字选择框 组件
import numbox from '../subcomponent/goodsinfo_numbox.vue'

    export default {
        data() {
            return {
                id: this.$route.params.id,          //将路由参数对象中的 id 挂载到 data ,方便后续调用
                lunbotu: [],       //图片列表的数据
                goodsInfo: [],       //获取到的商品消息
                pageIndex: 1,
                ballFalse: false        //控制小球显示和隐藏的标识符

            }
        },
        created() {
            //默认进入页面，就主动请求 所有图片列表的数据
            this.getGoodsBanner();
            this.getGoodsInfo(this.id);
        },
        methods: {
            getGoodsBanner() {
                //根据分类 Id，获取图片列表
                this.$http
                    .get("http://localhost:3000/getMessages")
                    .then(result => {
                        // console.log(result);
                        if (result.status === 200) {
                            // this.goodsList = result.body[this.pageIndex][this.pageIndex + 1];

                            this.lunbotu = result.body.list;
                            // console.log(this.goodsList);
                        }
                    });
            },
            getGoodsInfo(id) {
                //获取商品消息
                this.$http
                    .get("http://localhost:3000/getGoodsInfo/" + id)
                    .then(result => {
                        console.log(result);
                        if (result.status === 200) {
                            // this.goodsInfo = result.body.list[0][1][this.id];
                            // console.log(this.goodsInfo);
                            this.goodsInfo = result.data[0];
                        }
                    });
            },

            // 编程式导航
            goDesc(id) {
                //点击使用编程式导航跳转到图文介绍页面
                this.$router.push({ path: "/home/goodsdesc/" + id });
            },
            goComment(id) {
                //点击使用编程式导航跳转到图文介绍页面
                this.$router.push({ path: "/home/goodscomment/" + id });
            },

            addToShopCar() {
                this.ballFalse = !this.ballFalse;


                // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
                // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
                var goodsinfo = {
                    id: this.id,
                    count: this.selectedCount,
                    price: this.goodsInfo.sell_price,
                    selected: true
                };
                // 调用 store 中的 mutations 来将商品加入购物车
                this.$store.commit("addToCar", goodsinfo);


                let com = {
                    id: this.goodsInfo.id,
                    title: this.goodsInfo.title,
                    add_time: this.goodsInfo.add_time | dataFormat,
                    zhaiyao: this.goodsInfo.zhaiyao,
                    click: this.goodsInfo.click,
                    img_url: this.goodsInfo.img_url,
                    sell_price: this.goodsInfo.sell_price,
                    market_price: this.goodsInfo.market_price,
                    stock_quantity: this.goodsInfo.stock_quantity
                };
                this.$http
                    .post("http://localhost:3000/toShopCar", this.goodsInfo, { emulateJSON: true })
                    .then(result => {
                        // console.log(result.data.flag);

                        if (result.data.flag === 1) {

                        }
                    });
            },

            //使用构子函数实现动画效果
            beforeEnter(el) {
                el.style.transform = 'translate(0, 0)'
            },
            enter(el, done) {
                el.offsetWidth;
                el.style.transform = 'translate(116px, 298px)';
                el.style.transition = 'all 1s cubic-bezier(.4,-0.3,1,.68)';
                done()

                // 小球动画优化思路：
                // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
                // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
                // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
                // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
                // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()

                /*// 获取小球的 在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                // 获取 徽标 在页面中的位置
                const badgePosition = document
                    .getElementById("badge")
                    .getBoundingClientRect();

                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;

                el.style.transform = `translate(${xDist}px, ${yDist}px)`;
                el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
                done();*/
            },
            afterEnter(el) {
                this.ballFalse = !this.ballFalse;
            },

            getSelectedCount(count) {
                // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
                this.selectedCount = count;
                console.log("父组件拿到的数量值为： " + this.selectedCount);
            }
        },

        components: {
            //评论子组件
            swiper,
            numbox
        }
    }
</script>

<style lang="scss" scoped>
.goodsinfo-container {
    background-color: #eee;
    overflow: hidden;

    .mui-card-content {
        margin-top: 35px;
    }

    .mui-card-footer {
        margin-bottom: 35px;
    }

    .now_price {
        color: red;
        font-size: 16px;
        font-weight: bold;
    }

    .mui-card-footer {
        display: block;

        button {
            margin: 10px 0;
        }
    }

    .ball {
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        z-index: 99;
        top: 390px;
        left: 146px;
    }
}
</style>