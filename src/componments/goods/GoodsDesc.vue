<template>
    <div class="goodsdesc-container">
        <h3>{{ info.title }}</h3>

        <hr>

        <div class="content" v-html="info.zhaiyao"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                info: []
            }
        },
        created() {
            this.getGoodsDesc();
        },
        methods: {
            getGoodsDesc() {
                //获取图文详情
                this.$http
                    .get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/comments/" + this.$route.params.id + "/pageImg.json")
                    .then(result => {
                    // console.log(result);
                    if (result.status === 200) {
                        this.info = result.body.message[0];
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
.goodsdesc-container {
    h3 {
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
    .content {
        img {
            width: 100%;
        }
    }
}
</style>
