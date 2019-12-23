<template>

    <div class="newsinfo-container">

<!--        <mt-header :title="newsInfo.title">-->
<!--            <router-link to="/home/newslist" slot="left">-->
<!--                <mt-button icon="back">返回</mt-button>-->
<!--            </router-link>-->
<!--            <mt-button icon="more" slot="right"></mt-button>-->
<!--        </mt-header>-->

        <header id="header" class="mui-bar mui-bar-nav">
            <router-link class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" to="/home/newslist">

            </router-link>
            <h1 class="mui-title">{{ newsInfo.title }}</h1>
        </header>

<!--        <header id="header" class="mui-bar mui-bar-transparent">-->
<!--            <router-link class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" to="/home/newslist"></router-link>-->
<!--            <h1 class="mui-title">{{ newsInfo.title }}</h1>-->
<!--        </header>-->

        <div class="content-item">
            <!--        <h3>新闻资讯详情页面 {{ $route.params.id }}</h3>-->


            <h3 class="title"></h3>
            <p class="subtitle">
                <span>发表时间：{{ newsInfo.add_time }}</span>
                <span>点击：{{ newsInfo.click }}</span>
            </p>

            <hr>

            <div class="content" v-html="newsInfo.common"></div>

            <comment-box :id="this.id"></comment-box>
        </div>
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
                    .get("http://localhost:3000/getNewsInfo/" + this.id)
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

<style lang="scss">
.newsinfo-container {

    mt-header {
        width: 100%;
    }



    .content-item {
        padding: 0 4px;
        margin-top: 50px;
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
            width: 100%;
        }
    }
}
</style>