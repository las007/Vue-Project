<template>

    <div>

        <h3>图片列表页面</h3>

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
            this.getNewsList();
        },
        methods: {
            getNewsList() {
                //获取新闻列表
                this.$http.get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/newList.json").then(result => {
                    // console.log(result);
                    if (result.status === 200) {
                        //获取数据成功，获取到的数据应该保存到 data 上
                        this.newList = result.body.message;
                    }else {
                        //获取失败
                        Toast('获取数据失败..');
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>