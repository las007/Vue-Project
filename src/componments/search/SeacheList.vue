<template>
    <div class="search-container">

        <header id="header" class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">SearchContainer</h1>
        </header>


        <div class="item">
            <input type="text" class="mintui mintui-search" placeholder="站内搜索.." @keyup.enter="postSearchMsg" v-model="name">
            <span class="clearBtn" @click="clearBtn">×</span>
            <span class="mui-icon mui-icon-search" @click="postSearchMsg"></span>
            <!--            <input type="button" value="搜索" @click="postSearchMsg">-->
            <span class="history-item">历史记录..</span>
            <span class="delete-item" @click="Delete">清除记录</span>
            <ul class="ul-list">
                <li v-for="(item, i) in result" :key="item.id">
                    <a @click="Tap(item.id)">{{ i + 1}}.&nbsp;{{ item.title }}</a>
                </li>
            </ul>
        </div>

        <div class="history" v-show="this.historyShow">
            <ul>
                <span v-for="item in history">{{ item.title }}</span>
            </ul>
        </div>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                id: this.$route.params.id,          //从路由获取到图片的 id
                result: [],
                name: '',
                info: [],
                history: [],
                historyShow: true
            }
        },
        created() {
            this.history = JSON.parse(localStorage.getItem('history') || []);
        },
        methods: {
            postSearchMsg() {
                var cmt = {
                    title: this.name,
                };

                this.$http
                    .post("http://localhost:3000/postSearchMsg", cmt, { emulateJSON: true })
                    .then(result => {
                        // console.log(result);

                        if (result.status === 200) {
                            if (result.body.flag === 0) {
                                this.$toast("站内还没有这一片文章呢，不如就由你来填写吧！");
                            }else if (result.body.flag === 1) {
                                // console.log(result.body.msg);
                                this.result = result.body.msg;

                            }
                        }

                        var comment = {
                            title: this.name
                        };
                        //获取
                        var com = JSON.parse(localStorage.getItem('history') || '[]');

                        com.push(comment);

                        //保存
                        localStorage.setItem('history', JSON.stringify(com));
                        // console.log(com);
                        this.history = com;
                        this.historyShow = false;
                    });
            },

            log() {
                // console.log(this.info);
                // console.log(this.name);
                // if (this.name === this.item) {
                //     this.value = result.body.list.title;
                //     this.getPhotoInfo();
                // }

                // var cmt = this.info;
                //
                // for (var i = 0;i <= cmt.length;i++) {
                //
                //     // console.log(cmt[i].indexOf(this.name));
                //
                //     if(cmt[i].indexOf(this.name) > -1){
                //         console.log(cmt[i]);
                //         console.log('ok');
                //         // this.result = this.item;
                //         // console.log(this.result);
                //     }else {
                //         console.log(false);
                //         this.$toast("暂时还没有这一篇文章哦·！不如就由你来添加吧");
                //     }
                // }


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

            },

            Tap(artId) {
                // console.log(id);
                this.$router.push("/home/newsinfo/" + artId);
            },
            Delete() {
                localStorage.removeItem('history');
                this.historyShow = false;
            },
            clearBtn() {
                this.name = "";
            }
        }
    }
</script>

<style lang="scss" scoped>

    .search-container {
        ul {
            list-style-type: none;
            padding: 0;
            /*margin: 15px 15px;*/
        }
        li {
            /*background-color: aqua;*/
            border-bottom: 1px solid #404060;
            margin-bottom: 10px;
        }
        .ul-list {
            /*background-color: #2ac845;*/
            margin-top: 48px;
        }
        .mint-search .mint-searchbar {
            margin-top: 256px !important;
        }

        input[type=text] {
            margin: 5px 0px 5px 5px;
            width: 89%;
            border-radius: 5px;
        }
        /*input[type=button] {*/
        /*    margin-top: 10px;*/
        /*    width: 21%;*/
        /*    border: 5px;*/
        /*    background-color: #00a4ff;*/
        /*}*/

        .item {
            /*height: 44px;*/
            background-color: #d9d9d9;
            /*margin-top: 55px;*/
            padding-top: 55px;
            position: relative;
        }
        .clearBtn {
            position: absolute;
            right: 50px;
            top: 70px;
        }
        .history-item, .delete-item {
            background-color: #fff;
            border-radius: 15px;
            padding: 2px 5px;
            margin-top: 10px;
            border: 2px solid #d9d9d9;
        }
        .history-item {
            float: left;
            margin-left: 10px;
        }
        .delete-item {
            float: right;
            margin-right: 10px;
        }

        .history ul span {
            background-color: #e0e0e0;
            border-radius: 5px;
            display: inline-block;
            margin: 5px 5px;
            border: 2px solid #d9d9d9;
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