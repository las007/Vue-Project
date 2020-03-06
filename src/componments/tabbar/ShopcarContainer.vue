<template>
    <div class="shopcar-container">

        <div class="goods-list">

            <header id="header" class="mui-bar mui-bar-nav">
                <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <h1 class="mui-title">导航栏</h1>
            </header>

            <!-- 商品列表项区域 -->
            <div class="mui-card" v-for="(item, i) in idArr" :key="item.id" v-show="flag">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">

                        <mt-switch
                                v-model="$store.getters.getGoodsSelected[item.id]"
                                @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.img">
                        <div class="info">
                            <h4 class="info-title">{{ item.title }}</h4>
                            <p>
                                <span class="price">￥{{ item.price }}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- 问题：如何从购物车中获取商品的数量呢 -->
                                <!-- 1. 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据，
                                 把 当前循环这条商品的 Id， 作为 对象 的 属性名，count值作为 对象的 属性值，
                                 这样，当把所有的商品循环一遍，就会得到一个对象： { 88: 2, 89: 1, 90: 4 } -->
                                <a class="delete" href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>

                    </div>
                </div>
            </div >

        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件， 总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>

<!--        <p>{{ $store.getters.getGoodsSelected }}</p>-->

       <!-- <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in msg" :key="item.img">
                <router-link :to="'/home/goodsinfo/' + item.id">          &lt;!&ndash;//此处路径 = 字符串 + 表达式&ndash;&gt;
                    <img class="mui-media-object mui-pull-left" :src="item.img_url" alt="404error..">
                    <div class="mui-media-body">
                        <h4>{{ item.title }}</h4>
                        <div class="mui-card-content-inner">
                            <p>
                                市场价: <del>￥{{ item.market_price }}</del>&nbsp;&nbsp;<span class="now_price">${{ item.sell_price }}</span>
                            </p>
                        </div>
                    </div>
                </router-link>
                <mt-button type="danger" class="mui-pull-right" @click="btnDelete(item.id)"><span class="delete-btn">-</span>删除</mt-button>
            </li>
        </ul>-->

    </div>
</template>

<script>
    import numbox from "../subcomponent/shopcar_numbox.vue";

    export default {
        inject: ['reload'],     //注入 reload() 方法
        data() {
            return {
                goodslist: [], // 购物车中所有商品的数据
                msg: [],
                cmts: [],
                idArr: [],
                flag: true
            };
        },
        created() {
            this.getGoodsList();
            // this.getShopCarList();
        },
        methods: {
            getGoodsList() {

                var userName = JSON.parse(localStorage.getItem('cmts' || []));
                // console.log(userName[0].username);
                // console.log(userName.length);

                if (userName.length !== 0) {
                    // 1. 获取到 store 中所有的商品的Id，然后拼接出一个 用逗号分隔的 字符串

                    this.$store.state.car.forEach(item => this.idArr.push(item));

                    // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
                    // console.log(this.idArr);
                    if (this.idArr.length <= 0) {
                        return;
                    }
                }else {
                    this.flag = false;
                    this.$store.getters.getGoodsCountAndAmount.count = 0;
                    this.$store.getters.getGoodsCountAndAmount.amount = 0;
                    // this.$store.state.car.forEach(item => {
                    //     // item.selected = false;
                    //     console.log(item.selected);
                    // });

                    var box = JSON.parse(localStorage.getItem('car') || '[]');

                    var com = [];
                    box.forEach(item => {
                        item.selected = false;
                    });
                    com = box;

                    localStorage.setItem('car', JSON.stringify(com));
                }

                // 获取购物车商品列表
             /*   this.$http
                    .get("getShopCarList/" + idArr.join(","))
                    .then(result => {
                        console.log(result);

                        if (result.status === 200) {
                            this.goodslist = result.data;
                        }
                    });*/
            },
            getShopCarList() {

                // 获取购物车商品列表
                this.$http
                    .get("getShopCar")
                    .then(result => {

                        if (result.status === 200) {
                            // console.log(result.data);
                            this.msg = result.data;

                            for (var i = 0; i < result.data.length; i++) {
                                // console.log(result.data[i].id);
                                this.cmts = result.data[i].id;

                                let com = [];
                                com.push(this.cmts);
                                // console.log(com);
                            }
                            console.log(this.getRepeatNum(this.cmts));
                        }
                    });

                // this.getRepeatNum(arr);
            },
            btnDelete(deleteId) {
              this.$http
                  .get("btnDelete/" + deleteId)
                  .then(result => {
                      console.log(result);
                      if (result.status === 200) {
                          if (result.data.flag === 1) {
                              this.getShopCarList();
                              this.$toast('删除成功！');
                          }
                      }
                  });
            },
            remove(id, index) {
                // 点击删除，把商品从 store 中根据 传递的 Id 删除，同时，把 当前组件中的 goodslist 中，对应要删除的那个商品，使用 index 来删除
                this.goodslist.splice(index, 1);
                this.$store.commit("removeFormCar", id);
                window.location.reload();
            },
            selectedChanged(id, val) {
                // 每当点击开关，把最新的 快关状态，同步到 store 中
                // console.log(id + " --- " + val);
                this.$store.commit("updateGoodsSelected", { id, selected: val });
            },

            //统计一个数组中有多少个不重复的单词：
            // 不用reduce时：
            getRepeatNum(arr){
                var obj = {};
                for(var i= 0, l = arr.length; i< l; i++){
                    var item = arr[i];
                    obj[item] = (obj[item] +1 ) || 1;
                }
                return obj;
            }
        },
        components: {
            numbox
        }
    };
</script>

<style lang="scss" scoped>
    .shopcar-container {
        background-color: #eee;
        overflow: hidden;

        .delete {
            position: fixed;
            right: 20px;
        }
        h4 {
            width: 60%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 16px;
        }

        .mui-pull-right {
            /* float: right; */
            position: absolute;
            right: 10px;
        }

        .mui-table-view-cell {
            display: flex;
            text-align: center;
        }

        .mui-media  {
            width: 98%;
            border: 1px solid #5e5e5e;
            margin: 10px auto;
            border-radius: 5px;
        }

        .mui-table-view {
            margin-bottom: 70px;
        }
        /*照片 max-height*/
        .mui-table-view .mui-media-object {
            height: 70px;
        }
        .mui-table-view .mui-media-body {
            overflow: hidden;
            text-overflow: ellipsis;
            width: 80%;
        }

        .mui-card-content {
            /*margin-top: 40px;*/
            border: 2px solid #eeeeee;
        }

        .now_price {
            color: red;
            font-size: 16px;
            font-weight: bold;
        }
        .mui-card-content-inner {
            padding: 10px 5px;
        }

        .goods-list {
            margin-top: 55px;

            .mui-card-content-inner {
                display: flex;
                align-items: center;
            }
            img {
                width: 15%;
                height: 60px;
                margin: auto 5px;
            }
            h1 {
                font-size: 13px;
            }
            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;


                .price {
                    color: red;
                    font-weight: bold;
                }
            }
        }
        .jiesuan {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red {
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }


</style>
