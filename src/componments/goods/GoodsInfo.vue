<template>

    <div class="goodsinfo-container">

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
                        购买数量: <numbox :max="goodsInfo.stock_quantity"></numbox>
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
            this.getGoodsInfo();
        },
        methods: {
            getGoodsBanner() {
                //根据分类 Id，获取图片列表
                this.$http
                    .get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/message.json")
                    .then(result => {
                        // console.log(result);
                        if (result.status === 200) {
                            // this.goodsList = result.body[this.pageIndex][this.pageIndex + 1];

                            this.lunbotu = result.body;
                            // console.log(this.goodsList);
                        }
                    });
            },
            getGoodsInfo() {
                //获取商品消息
                this.$http
                    .get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/goodsImg.json")
                    .then(result => {
                        // console.log(result);
                        if (result.status === 200) {
                            this.goodsInfo = result.body[0][1][this.id];
                            // console.log(this.goodsInfo);
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
            },
            afterEnter(el) {
                this.ballFalse = !this.ballFalse;
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