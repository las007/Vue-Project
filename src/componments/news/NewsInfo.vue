<template>

    <div class="newsinfo-container">

<!--        <h3>新闻资讯详情页面 {{ $route.params.id }}</h3>-->
        <h3 class="title">{{ newsInfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ newsInfo.add_time }}</span>
            <span>点击：{{ newsInfo.click }}</span>
        </p>

        <hr>

        <div class="content" v-html="newsInfo.common"></div>

        <comment-box :id="this.id"></comment-box>
    </div>

</template>

<script>

    import { Toast } from 'mint-ui'
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
                this.$http.get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/newList.json").then(result => {
                    // console.log(result);
                    if (result.status === 200) {
                        //获取成功，
                        this.newsInfo = result.body.message[this.id - 1];
                    }else {
                        //获取失败
                        Toast('获取失败..');
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
    padding: 0 4px;
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