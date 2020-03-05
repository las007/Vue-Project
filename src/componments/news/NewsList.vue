<template>

    <div class="news-container">

        <header id="header" class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav mui-pull-left" to="/home"></router-link>
            <h1 class="mui-title">新闻资讯页面</h1>
            <span class="mui-icon mui-icon-search mui-pull-right" @click="searchMore"></span>
        </header>

        <div class="search-content" v-show="this.searchBox">
            <p>本地搜索</p>
            <input type="text" @keyup.enter="postSearchMsg" v-model="name" v-focus>
            <div class="line"></div>
            <span @click="searchEsc">×</span>

            <ul>
                <li v-for="(item, i) in searchList" :key="item.id" @click="Tap(item.id)">
                    {{ i + 1}}.&nbsp;{{ item.title }}
                </li>
            </ul>
        </div>

        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in msg" :key="item.img">
                <router-link :to="'/home/newsinfo/' + item.id">          <!--//此处路径 = 字符串 + 表达式-->
                    <img class="mui-media-object mui-pull-left" :src="item.img_url" alt="404">
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
                msg: [],
                searchBox: false,
                name: '',
                searchList: []
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
                    .get("getNewsList")
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
                        // console.log(this.msg);
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
                    .get("toPage/" + pageId)
                    .then(result => {

                        if (result.status === 200) {
                            this.msg = result.body;
                            // console.log(this.msg);
                        }
                    });
            },

            searchMore() {
                // console.log('ok');
                this.searchBox = true;
            },
            searchEsc() {
                this.searchBox = false;
            },
            postSearchMsg() {
                var cmt = {
                    title: this.name,
                };

                this.$http
                    .post("postSearchNews", cmt, { emulateJSON: true })
                    .then(result => {
                        // console.log(result);

                        if (result.status === 200) {
                            if (result.body.flag === 0) {
                                this.$toast("站内还没有这一片文章呢，不如就由你来填写吧！");
                            }else if (result.body.flag === 1) {
                                this.searchList = result.body.msg;
                            }
                        }
                    });
            },
            Tap(artId) {
                // console.log(id);
                this.$router.push("/home/newsinfo/" + artId);
            },
        }
    }
</script>

<style lang="scss" scoped>


    .search-content {
        width: 80%;
        /*height: 150px;*/
        background: #eee;
        margin: 60px 10%;
        position: fixed;
        padding-bottom: 15px;
        z-index: 999;
        border: 2px solid #eeeeee;
        border-radius: 10px;

        p {
            padding-top: 10px;
            padding-left: 10px;
        }
        input {
            width: 90%;
            display: block;
            margin: 10px auto;
        }
        span {
            position: absolute;
            right: 0;
            top: 0;
        }
        ul {
            list-style-type: none;
            /*height: 50px;*/
            li {
                margin: 5px auto;
            }
        }
        .line {
            border-bottom: 2px dotted #66997d;
        }
    }
    .news-container {
        padding-bottom: 65px;
    }
    .mint-button--large {
        display: block;
        width: 95%;
        margin: 1px auto;
    }
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