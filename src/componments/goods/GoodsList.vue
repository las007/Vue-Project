<template>

    <div class="goods-container">

        <div class="good-item">
            <img src="https://raw.githubusercontent.com/las007/Vue-Project/master/src/images/4.jpg" alt="">
            <h1 class="title">小米（Mi）小米Note 16G双网通版</h1>
            <div class="good-info">
                <p class="price">
                    <span class="now">￥2199</span>
                    <span class="old">￥2399</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩69件</span>
                </p>
            </div>
        </div>
        <div class="good-item">
            <img src="https://raw.githubusercontent.com/las007/Vue-Project/master/src/images/4.jpg" alt="">
            <h1 class="title">尼康(Nikon)D3300套机（18-55mm f/3.5-5.6G VRII）（黑色）</h1>
            <div class="good-info">
                <p class="price">
                    <span class="now">￥2199</span>
                    <span class="old">￥2399</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩69件</span>
                </p>
            </div>
        </div>
        <div class="good-item">
            <img src="https://raw.githubusercontent.com/las007/Vue-Project/master/src/images/6.jpg" alt="">
            <h1 class="title">小米（Mi）小米Note 16G双网通版</h1>
            <div class="good-info">
                <p class="price">
                    <span class="now">￥2199</span>
                    <span class="old">￥2399</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩69件</span>
                </p>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                id: this.$route.params.id,          //从路由获取到图片的 id
                goodsList: [],       //图片列表的数据
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
                    .get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/newList.json")
                    .then(result => {
                        console.log(result);
                        if (result.status === 200) {
                            this.goodsList = result.body.message;
                        }
                    });
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

    .good-item {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        min-height: 231px;

        /*position: relative;*/
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        img {
            width: 100%;
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