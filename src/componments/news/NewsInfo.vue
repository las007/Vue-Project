<template>

    <div class="newsinfo-container">

        <mt-header :title="newsInfo.title">
            <router-link to="/home/newslist" slot="left">
                <mt-button icon="back">back</mt-button>
            </router-link>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="content-item">
            <!--        <h3>新闻资讯详情页面 {{ $route.params.id }}</h3>-->

            <p class="subtitle">
                <span>发表时间：{{ newsInfo.add_time | dataFormat}}</span>
                <span>作者：{{ newsInfo.author }}</span>
                <span>点击：{{ newsInfo.click }}</span>
            </p>

            <hr>

            <div class="mui-card" v-html="newsInfo.common"></div>
            <hr>

<!--            <div class="adImg">-->
<!--                <img src="http://kvnice.natappfree.cc/www/images/AD_2.jpg" alt="error..">-->
<!--            </div>-->

        </div>

        <comment-box :id="this.id"></comment-box>
    </div>

</template>

<script>

    import Toast from 'mint-ui'
    import comment from '../subcomponent/comment.vue'

    export default {
        data() {
            return {
                //将 URL 地址栏中传递过来的 id 值，挂载到 data 上，方便以后调用
                id: this.$route.params.id,
                newsInfo: []        //新闻对象
            }
        },
        created() {
            this.getNewsInfo();
        },
        methods: {
            getNewsInfo() {     //获取新闻详情咨询
                this.$http
                    // .get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/newList.json")
                    .get("getNewsInfo/" + this.id)
                    .then(result => {
                    // console.log(result);
                    if (result.status === 200) {
                        //获取成功，
                        this.newsInfo = result.body[0];
                    }else {
                        //获取失败
                        this.$toast('获取失败..');
                    }
                });
            }
        },
        components: {
            "comment-box": comment
        }
    }
</script>

<style lang="scss" scoped>
.newsinfo-container {
    .adImg {
        img {
            width: 100%;
            margin-top: 10px;
           /* margin-bottom: -30px;*/
        }
    }


    hr {
        margin: auto 5px;
    }

    .tips {
        text-align: right;
        margin: 25px auto;
    }

    .content-item {
        padding: 5px 4px;
    }
    .content p {
        color: #000;
        font-size: 16px;
    }
    .title {
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle {
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content {
        img {

        }
    }

    .mui-card {
        margin: auto 5px;
        padding-left: 5px;
        padding-right: 5px;
    }
}
</style>