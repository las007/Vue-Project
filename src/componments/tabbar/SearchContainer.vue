<template>
    <div class="search-container">
<!--        <h3>SearchContainer</h3>-->

<!--        <mt-search v-model="value"></mt-search>-->

<!--        <mt-search-->
<!--                v-model="value"-->
<!--                cancel-text="取消"-->
<!--                placeholder="站内搜索..">-->
<!--        </mt-search>-->

        <header id="header" class="mui-bar mui-bar-nav">
            <router-link class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" to="/home/newslist">

            </router-link>
            <h1 class="mui-title">SearchContainer</h1>
        </header>

<!--        <mt-search v-model="value" @keyup.enter="postMan">-->
<!--            <mt-cell-->
<!--                    v-for="item in result"-->
<!--                    :title="item.title"-->
<!--                    :value="item.value">-->
<!--            </mt-cell>-->
<!--        </mt-search>-->

        <input type="text" @keyup.enter="postSearchMsg" v-model="name">
        <input type="button" value="搜索" @click="postSearchMsg">
        <ul>
            <li v-for="(item, i) in result" :key="item.id">
                {{ i + 1}}.&nbsp;{{ item.title }}
            </li>
        </ul>


    </div>
</template>

<script>

    import comment from '../subcomponent/comment.vue'

    import Vue from 'vue';
    //安装 图片预览插件
    import VuePreview from 'vue-preview'
    Vue.use(VuePreview);

    export default {
        data() {
            return {
                id: this.$route.params.id,          //从路由获取到图片的 id
                list: [],            //缩略图的数组
                value: "",
                result: [],
                name: '',
                info: []
            }
        },
        created() {
            //默认进入页面，就主动请求 所有图片列表的数据
            this.getPhotoInfo();
        },
        methods: {
            getPhotoInfo() {
                //根据分类 Id，获取图片列表
                this.$http
                // .get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/newList.json")
                    .get("http://localhost:3000/getNewsList")
                    .then(result => {
                        // console.log(result);
                        console.log(this.value);
                        if (result.status === 200) {

                            // this.result = result.body;
                            // console.log(this.item);

                            // for (var i = 0; i < this.item.length; i++) {
                            //     this.info[i] = this.item[i].title;
                            // }
                            // console.log(this.info);

                            // console.log(this.id);
                            // console.log(result.body.message[this.id]);
                        }
                    });
            },



            postSearchMsg() {

                function getDate() {
                    var now = new Date(),
                        y = now.getFullYear(),
                        m = now.getMonth() + 1,
                        d = now.getDate();
                    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
                }

                var cmt = {
                    id: this.id,
                    title: this.name,
                    common: "匿名用户啊",
                    add_time: getDate(),
                    img_url: "http://localhost:3000/www/images/17.jpg"
                };


                this.$http
                    .post("http://localhost:3000/postSearchMsg", cmt, { emulateJSON: true })
                    .then(result => {
                        console.log(result);
                        if (result.status === 200) {
                            console.log(result.body.msg[0]);
                            this.result = result.body.msg;
                        }
                    });
            },


            log() {
                // console.log(this.info);
                console.log(this.name);
                // if (this.name === this.item) {
                //     this.value = result.body.list.title;
                //     this.getPhotoInfo();
                // }

                var cmt = this.info;
                //
                for (var i = 0;i <= cmt.length;i++) {

                    // console.log(cmt[i].indexOf(this.name));

                    // if(cmt[i].indexOf(this.name) > -1){
                    //     console.log(cmt[i]);
                    //     console.log('ok');
                    //     // this.result = this.item;
                    //     // console.log(this.result);
                    // }else {
                    //     console.log(false);
                    //     this.$toast("暂时还没有这一篇文章哦·！不如就由你来添加吧");
                    // }
                }


                // console.log(this.name[key]);
                //
                // if (cmt[i].indexOf(this.name)) {
                //     console.log(cmt[i]);
                // }
                // console.log(cmt);

                // if(cmt[i].indexOf(this.name) > -1){
                //     console.log(cmt[i]);
                //     console.log('ok');
                //     // this.result = this.item;
                //     // console.log(this.result);
                // }else {
                //     console.log(false);
                //     this.$toast("暂时还没有这一篇文章哦·！不如就由你来添加吧");
                // }

                // function isStr(str, val) {
                //     if (str.indexOf(val) !== -1) {
                //         return true
                //     } else {
                //         return false
                //     }
                // }
                //
                // console.log(isStr(cmt[0], this.name));
                //
                // function isObj(obj, val) {
                //     var a;
                //     obj.forEach(item => {
                //         if (item instanceof Object) {
                //             for (var i in item) {
                //                 if (item[i].includes(val)) {
                //                     a = item[i].includes(val)
                //                     return
                //                 }
                //             }
                //         }
                //     });
                //     return a
                // }
                //
                // console.log(isObj(cmt[0], this.name));






            }
        }
    }
</script>

<style lang="scss" scoped>

    .search-container {
        ul {
            list-style-type: none;
            padding: 0;
            margin: auto 15px;
        }
        li {
            /*background-color: aqua;*/
            border-bottom: 1px solid #404060;
            margin-bottom: 10px;
        }
        .mint-search .mint-searchbar {
            margin-top: 256px !important;
        }

        input[type=text] {
            margin-top: 50px;
            margin-left: 20px;
            width: 70%;
        }
        input[type=button] {
            margin-top: 50px;
            width: 20%;
        }


        .mint-search {
            height: 110px;
        }
       /deep/ .mint-searchbar-inner {
             padding: 0;
        }

        /deep/ .mint-searchbar {
            margin-top: 50px;
        }

        /deep/ input[type=search] {
            width: 100%;
            height: 28px;
            margin-bottom: 0;
            text-align: left;
            border-radius: 0;
            background-color: #fff;
        }


        /deep/ .mint-search-list-warp {
             margin-top: 50px;
         }

    }


</style>