<template>

    <div class="content-container">

        <input type="text" placeholder="请输入文章标题.." class="title">

        <textarea placeholder="请输入文章内容" class="content-box"></textarea>

        <mt-button type="primary" size="large">发布</mt-button>

    </div>

</template>

<script>

    import { Toast } from 'mint-ui'

    export default {
        data() {
            return {
                newList: []     //新闻列表
            }
        },
        created() {
            // this.getNewsList();
        },
        methods: {

            postContent() {
                this.$http
                    .post("https://raw.githubusercontent.com/las007/Vue-Project/master/src/newList.json")
                    .then(result => {
                        if (result.status === 200) {
                            var com = {
                                user_name: "匿名用户",
                                add_time: Date.now(),
                                content: this.msg
                            };
                        }
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
.content-container {
    .title {

    }
    .content-box {
        height: 380px;
    }
}
</style>