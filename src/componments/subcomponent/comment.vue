<template>

    <div class="cmt-container">
<!--
        <header id="header" class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">导航栏</h1>
        </header>-->
<!--        <mt-header title="导航栏">-->
<!--            <router-link to="/home/newslist" slot="left">-->
<!--                <mt-button icon="back">back</mt-button>-->
<!--            </router-link>-->
<!--            <mt-button slot="right"></mt-button>-->
<!--        </mt-header>-->

        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容..（最多允许120字）" maxlength="120" v-model="msg"></textarea>

        <mt-button type="primary" size="large" @click="postComment" @keyup.ent="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in commentList" :key="item.add_time ">
                <div class="cmt-title">
                    第 {{ i + 1 }} 楼&nbsp;&nbsp;用户：{{ item.name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dataFormat}}
                </div>
                <div class="cmt-body">
                    {{ item.description }}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多..</mt-button>
    </div>

</template>

<script>
    import { MessageBox } from 'mint-ui';
    import Vue from 'vue'

    Vue.config.keyCodes.ent = 113;

    Vue.directive('focus', {
        inserted: function (el) {
            el.focus();
        }
    });

    export default {
        data() {
            return {
                commentList: [],       //获取到的评论数据
                artid: 1,
                msg: [],     //评论输入的内容
                pageIndex: 3,
                // book: []
                name: ''

            }
        },
        created() {
            this.getComment();
            // this.postComment();
            //进入页面，创建本地存储
            localStorage.setItem('cmts', JSON.stringify([]));
        },
        methods: {
            getComment() {      //获取评论信息
                this.$http
                    // .get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/comment.json")
                    .get("messages/" + this.id)
                    // .get("http://las007.xiaomy.net/messages")
                    .then(result => {
                        // console.log(result);

                        // console.log(this.id);
                    if (result.status === 200) {
                        //获取成功
                        // this.commentList = result.body[this.id];
                        // console.log(this.commentList);
                        //每当获取新评论数据的时候，不要把老数据清空覆盖，而是应以老数据拼 接上新数据
                        // this.commentList = this.commentList.concat(result.body[this.id -1][this.artid]);
                        // console.log(this.commentList);

                        var bodyLength = result.body.length;
                        // console.log(bodyLength);
                        // console.log(result.body.list[this.id -1]);

                        /*if (this.id <= bodyLength) {
                            var book = {};
                            var listLength = result.body.list[this.id -1].length;
                            console.log(listLength);

                            for (var i = 0; i <= this.pageIndex; i++) {
                                book[i] = result.body.list[this.id -1][i];
                                // console.log(i);
                                if (i >= listLength) {
                                    return this.$toast("所有评论已加载！");
                                }
                                console.log(i);
                            }
                            // console.log(book);
                        }else {
                            return this.$toast("还没有评论哦·！还不赶紧过来抢沙发");
                        }

                        // this.commentList = this.commentList.concat(result.body.list);
                        this.commentList = book;*/

                        //数据库数据递减显示
                        var item = [];
                        for (var i = bodyLength -1; i >= 0; i--) {
                            // item[i] = result.body[i];
                            item.push(result.body[i]);
                        }
                        // console.log(item);

                        if (bodyLength ===0) {
                            return this.$toast("还没有评论哦·！还不赶紧过来抢沙发");
                        }else if (bodyLength === 1 || bodyLength === 2 || bodyLength === 3) {
                            this.commentList = item;
                        }else {
                            var book = [];
                            for (var j = 0; j <= this.pageIndex; j++) {
                                book.push(item[j]);
                                // console.log(i);
                                if (j >= bodyLength) {
                                    return this.$toast("所有评论已加载！");
                                }
                                // console.log(j);
                            }
                            // console.log(j + "===");
                            // console.log(this.pageIndex + "+++");
                            // console.log(book);

                            // console.log(result.body);
                            this.commentList = book;

                        }


                    }else {
                    //失败
                    this.$toast('获取评论数据失败...');
                }
                });
            },
            getMore() {
                //加载更多
                this.artid++;
                this.getComment();
                this.pageIndex = this.pageIndex + 3;
                // console.log(this.pageIndex);
                // console.log('ok');
                // this.$toast("再没有更多的评论了。。")
            },

            //  postComment() {
            //     // 校验是否为空内容
            //     if (this.msg.length === 0) {
            //         return this.$toast('评论内容不能为空！');
            //     }
            //
            //     //发表评论
            //     // 参数1： 请求的URL地址
            //     // 参数2： 提交给服务器的数据对象 { content: this.msg }
            //     // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }
            //     this.$http
            //         .post("addMessage", { name: "匿名用户啊", desc: this.msg.trim() }, {emulateJSON: true})
            //         // .post("http://las007.xiaomy.net/addMessage", { name: "匿名用户啊", desc: this.msg.trim() }, {emulateJSON: true})
            //         .then(result => {
            //             // console.log(result);
            //
            //             if (result.status === 200) {
            //                 //1.拼接出一个对象
            //                 var cmt = {
            //                     name: "匿名用户",
            //                     desc: this.msg.trim()
            //                 };
            //                 this.commentList.unshift(cmt);
            //                 this.msg = "";
            //             }
            //     });
            // }

            postComment() {
                // 校验是否为空内容
                // console.log(this.msg);
                if (this.msg.length === 0) {
                    return this.$toast('输入内容不能为空！');
                }

                function getDate() {
                    var now = new Date(),
                        y = now.getFullYear(),
                        m = now.getMonth() + 1,
                        d = now.getDate();
                    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
                }

                var userName = JSON.parse(localStorage.getItem('cmts' || []));
                // console.log(userName[0].username);
                // console.log(userName.length);

                if (userName.length !== 0) {
                    var cmt = {
                        id: this.id,
                        name: userName[0].username,
                        description: this.msg,
                        add_time: getDate()
                    };
                }else {
                    // MessageBox('提示', '操作成功');
                    MessageBox.confirm('未登录！请先登录过后再作评论..', '提示').then(action => {
                        // ...
                        // console.log(action);
                        if (action === "confirm") {
                            // console.log(123);
                            this.$router.push("/home/newpage");
                        }else {
                            this.msg = "";
                        }
                    });

                }


                // 发表评论
                // 参数1： 请求的URL地址
                // 参数2： 提交给服务器的数据对象 { content: this.msg }
                // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }
                this.$http
                    .post("addMessage/" + this.id, cmt, { emulateJSON:true })
                    .then(result => {
                        // console.log(result);

                        // console.log(result.body.flag);
                        if (result.status === 200) {
                        // if (result.body.flag === 1) {
                            //1.拼接出一个评论对象
                            var com = {
                                name: "匿名用户啊",
                                description: this.msg,
                                add_time: getDate()
                            };
                            //2.将数据加到数组中
                            // this.commentList.unshift(com);
                            this.getComment();
                            //3.清空文本框
                            this.msg = '';
                        }
                });

            },

            log() {
                console.log(this.name);
            }
        },
        props: ["id"]
    };
</script>

<style lang="scss" scoped>
.cmt-container {
    padding-bottom: 65px;
    /*padding-top: 50px;*/
    margin: auto 5px;

    .mint-header {
        margin: 5px auto;
    }

    h3 {
        font-size: 18px;
    }
    textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }

    .cmt-list {
        margin: 5px 0;

        .cmt-item {
            font-size: 13px;

            .cmt-title {
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body {
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>