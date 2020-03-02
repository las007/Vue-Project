<template>

    <div>


        <header id="header" class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">新闻资讯页面</h1>
        </header>

        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in msg" :key="item.img">
                <router-link :to="'/home/newsinfo/' + item.id">          <!--//此处路径 = 字符串 + 表达式-->
                    <img class="mui-media-object mui-pull-left" :src="item.img_url" alt="404error..">
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

        <div class="gotop" v-show="fixed" @click="toTop">Top</div>

        <div class="num-list">
            <ul v-show="numList">
                <li v-for="(item, i) in num_1" @click="toPage(i+1)">
                    <span>{{ item }}</span>
                    <!--                    <span>{{ item }}</span>-->
                </li>
            </ul>
            <ul v-show="!numList">
                <li v-for="(item, i) in 3" @click="toPage(i+1)"><span>{{ item }}</span></li>
                <li>...</li>
                <li @click="toPage(num_2)">{{ num_2 }}</li>
            </ul>
        </div>

        <router-link to="/home/newslist/content">
            <mt-button type="primary" size="large">
                发布文章
            </mt-button>
        </router-link>

    </div>

</template>

<script>

    import { Toast, Indicator } from 'mint-ui'

    export default {
        data() {
            return {
                newList: [],     //新闻列表
                fixed: false,
                goTop: true,
                numList: true,
                num: "",
                num_1: "",
                num_2: "",
                pageId: 1,
                list: [],
                msg: []
            }
        },
        created() {
            this.getNewsList();
            this.toPage(1);
        },
        mounted() {
            window.addEventListener('scroll', this.fixedActiveBtn);
        },
        methods: {
            getNewsList() {
                //获取新闻列表
                this.$http
                    // .get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/newList.json")
                    .get("http://localhost:3000/getNewsList")
                    .then(result => {
                    // console.log(result);
                    if (result.status === 200) {
                        //获取数据成功，获取到的数据应该保存到 data 上
                        Indicator.open({ spinnerType: 'fading-circle' });
                        this.newList = result.body;
                        setTimeout(function () {
                            Indicator.close();
                        }, 1500);

                        this.newList = result.body;
                        console.log(this.msg);
                        this.num = parseInt(this.newList.length/8) + 1;

                        if (this.num <= 3) {
                            this.num_1 = this.num;
                        }else {
                            this.num_2 = this.num;
                            this.numList = !this.numList;
                        }
                    }else {
                        //获取失败
                        Toast('获取数据失败..');
                    }


                });
            },

            fixedActiveBtn() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                scrollTop >=112 ? this.fixed = true : this.fixed = false;
                // console.log(scrollTop);
                // console.log(this.fixed)
            },
            toTop() {
                // console.log('ok');
                let top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                const timeTop = setInterval(() => {
                    document.documentElement.scrollTop = document.body.scrollTop = top -= 50;
                    if (top <= 0) {
                        clearInterval(timeTop);
                    }
                }, 10);
            },
            toPage(pageId) {

                // for (var i=0; i<= this.msg.length;i++) {
                //     console.log(this.msg[i].id);
                //     if (this.msg[i].id/pageId <= 8) {
                //         console.log('ok');
                //         // this.msg =
                //     }
                // }

                this.$http
                    .get("http://localhost:3000/toPage/" + pageId)
                    .then(result => {
                        console.log(result);

                        if (result.status === 200) {
                            this.msg = result.body
                        }
                    });

                // this.getHome(pageId);

            }
        }
    }
</script>

<style lang="scss" scoped>
    .mui-table-view {
        padding-top: 55px;
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

    .gotop {
        text-align: center;
        position: fixed;
        right: 30px;
        bottom: 60px;
        padding: 10px;
        width: 50px;
        border-radius: 50%;
        border: 2px solid #5e5e5e;
        background-color: #fff;
        color: #000;
    }

    .num-list {
        /* width: 150px;
         height: 20px;*/
        /*background-color: #2ac845;*/
        text-align: center;

        ul {
            list-style-type: none;

            li {
                display: inline-block;
                margin: 5px 10px;
                color: #2ac845;
                border: 1px solid #2ac845;
                width: 25px;
                border-radius: 5px;
            }
        }
    }
</style>