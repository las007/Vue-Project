<template>

    <div>

        <h3>新闻资讯页面</h3>

        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newList" :key="item.img">
                    <router-link :to="'/home/newsinfo/' + item.id">          <!--//此处路径 = 字符串 + 表达式-->
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{ item.add_time | dataFormat }}</span>
                            <span>点击：{{ item.click }}次</span>
                        </p>
                    </div>
                </router-link>
            </li>

        </ul>
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
    .mui-table-view {
        li {
            h1 {font-size: 14px;}
            .mui-ellipsis {
                font-size: 12px;
                color: #226aff;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>