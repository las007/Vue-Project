<template>
    <div class="member-container">
        <!--        <div class="member-item" v-for="item in memberList" :key="item.id">-->
        <!--            <h3 class="title">{{ item.name }}</h3>-->
        <!--            <div class="member-info">{{ item.desc }}</div>-->
        <!--            <hr>-->
        <!--        </div>-->

        <!--        <mt-button type="danger" size="large" plain @click="getMore">加载更多..</mt-button>-->
        <!--        添加数据区域-->
        <!--        <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="msg"></textarea>-->

        <!--        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>-->


        <header class="mui-bar mui-bar-nav">
            <span class="mui-icon mui-icon-left-nav item-back" @click="$router.go(-1)">返回</span>
            <h1 class="mui-title">登录</h1>
        </header>

        <div class="more-side">
            <ul>
                <li class="img-item">
                    <img src="http://localhost:3000/www/images/21.jpg" alt="404error..">
                </li>
            </ul>
            <!--            <span>{{ userInfo.username }}</span>-->
            <div class="username-item">
                <span v-for="item in msg" :key="item.username">{{ item.username }}</span>
            </div>

        </div>

        <div class="dialog" v-if="showname">
            <div class="username-item">
                <span>未登录..</span>
            </div>
<!--            <form>
                用户名：<input type="text" v-model="form2.username" v-focus>
                密  码：<input type="password" v-model="form2.password" @keyup.enter="Login" autocomplete="password">
            </form>
            <mt-button type="primary" size="large" @click="Login">确定</mt-button>-->
        </div>

        <mt-button type="danger" size="large" plain @click="storageCancel" v-if="!showname">退出登录</mt-button>


        <div class="mui-content" v-if="showname">
            <form id='login-form' class="mui-input-group">
                <div class="mui-input-row">
                    <label>账号</label>
                    <input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号" v-model="form_1.username" v-focus>
                </div>
                <div class="mui-input-row">
                    <label>密码</label>
                    <input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="form_1.password" @keyup.enter="postComment" autocomplete="password">
                </div>
            </form>
            <form class="mui-input-group">
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell">
                        自动登录
                        <div id="autoLogin" class="mui-switch">
                            <div class="mui-switch-handle" @click="toLog"></div>
                        </div>
                    </li>
                </ul>
            </form>
            <div class="mui-content-padded">
                <mt-button id='login' type="primary" size="large" @click="postComment">
                    登录
                </mt-button>
                <div class="link-area"><a id='reg' @click="toRegister">注册账号</a> <span class="spliter">|</span> <a id='forgetPassword' @click="Forget">忘记密码</a>
                </div>
            </div>
        </div>

<!--        <router-link :to="router">
            <mt-button type="primary" @click="toLog">前去登录/注册</mt-button>
        </router-link>-->


    </div>
</template>

<script>
    import Vue from 'vue'
    import { MessageBox } from 'mint-ui';

    Vue.directive('focus', {
        inserted: function (el) {
            el.focus();
        }
    });

    Vue.directive('focus', {
        inserted: function (el){
            el.focus();
        }
    });

    export default {
        data() {
            return {
                msg: [],
                showname: true,
                userInfo: [],

                form2: {
                    username: '',
                    password: ''
                },
                router: '',

                flag: true,
                obj: {
                    display: 'none',
                    backgroundColor: 'yellow'
                },
                activeClass: 'active',

                form_1: {
                    username: '',
                    password: ''
                },
                routerLink: ''
            }
        },
        created() {
            // this.getInfo();
            //把 ... 赋值给 this.msg
            this.msg = JSON.parse(localStorage.getItem('cmts') || '[]');

            // console.log(this.msg.length);

            if (this.msg.length === 0) {
                // console.log("=======================");
            }else {
                this.showname = !this.msg[0].show;
                console.log(this.showname);
            }

        },
        updated() {
            // console.log(this.msg.length);
            // if (this.msg.length > 0) {
            //     this.showname = !this.msg[0].show;
            //     console.log(this.showname);
            // }
        },
        methods: {

            getLoginMsg(info) {
                this.$http
                    .get("getLoginMsg")
                    .then(result => {
                        console.log(result);

                        if (result.status === 200) {

                        }
                    });
            },

            Login() {

                var cmt = {
                    username: this.form2.username,
                    password: this.form2.password
                };

                //判断文本框是否为空
                if (this.form2.username.length === 0 || this.form2.password.length === 0) {
                    return this.$toast('用户名或密码不能为空！');
                }

                this.$http
                    .post("http://localhost:3000/postLoginMsg", cmt, { emulateJSON: true })
                    .then(result => {
                        // console.log(result);

                        if (result.status === 200) {

                            if (result.body.flag === 0) {
                                this.$toast("账号或者密码不对！");
                            }else if (result.body.flag === 1) {

                                this.router = '/login';
                                this.$toast("登录成功！");

                                var comment = {
                                    show: this.showname,
                                    username: this.form2.username,
                                    password: this.form2.password
                                };

                                //把登陆成功的数据存放到localStorage中
                                var com = [];
                                com.push(comment);

                                localStorage.setItem('cmts', JSON.stringify(com));
                                this.msg = JSON.parse(localStorage.getItem('cmts') || []);

                                // this.showname = !this.this.msg.show;
                                this.showname = !this.msg[0].show;

                                this.form2.username = this.form2.password = "";
                                // console.log(com);

                                // this.getInfo(com);
                            }
                        }
                    });
            },

            // getInfo(info) {
            //     // console.log(info);
            //     if (info !== undefined) {
            //
            //         // this.showname = true;
            //         this.form2.username = this.form2.password = "";
            //         // console.log(this.msg[0].username);
            //     }else {
            //         console.log('not ok++++++++++++++++++');
            //     }
            //
            // },

            //用于推出登录，删除 localhostStorage 中的信息
            storageCancel() {
                var list = JSON.parse(localStorage.getItem('cmts' || []));
                list.splice(0, 1);
                localStorage.setItem('cmts', JSON.stringify(list));
                console.log(1);
                this.showname = true;
                this.msg = [];

                // for (var i = 0; i < list.length; i++) {
                //     if (i === 2) {
                //         list.splice(i, 1);
                //     }
                // }
            },
            toLog() {
                console.log(11);
                this.router = '/login';
            },

            postComment() {
                //判断文本框是否为空
                if (this.form_1.username.length === 0 || this.form_1.password.length === 0) {
                    return this.$toast('用户名或密码不能为空！');
                }

                var cmt = {
                    username: this.form_1.username,
                    password: this.form_1.password
                };

                this.$http
                    .post("http://localhost:3000/postLoginMsg", cmt, { emulateJSON: true })
                    .then(result => {
                        console.log(result);

                        if (result.status === 200) {

                            if (result.body.flag === 0) {
                                this.$toast("账号或者密码不对！");
                            }else if (result.body.flag === 1) {
                                // this.routerLink = '/home';
                                // console.log(12);
                                this.$router.go(-1);
                                MessageBox.alert('登录成功!').then(action => {
                                    // this.$router.push("/home");
                                });

                                // //把登陆成功的数据存放到localStorage中
                                // var com = [];
                                // com.push(cmt);
                                //
                                // localStorage.setItem('userMsg', JSON.stringify(com));
                                // //把数据从 ... 中取出来，并渲染到页面上...


                                var comment = {
                                    show: this.showname,
                                    username: this.form_1.username,
                                    password: this.form_1.password
                                };

                                //把登陆成功的数据存放到localStorage中
                                var com = [];
                                com.push(comment);

                                localStorage.setItem('cmts', JSON.stringify(com));

                                this.msg = JSON.parse(localStorage.getItem('cmts') || []);

                                // this.showname = !this.this.msg.show;
                                this.showname = !this.msg[0].show;

                                this.form_1.username = this.form_1.password = "";

                            }
                        }
                    });
            },

            toLog() {
                console.log(12);
                // this.routerLink = '/home';
                this.userInfo = JSON.parse(localStorage.getItem('userMsg') || []);
                console.log(this.userInfo);
                this.form_1.username = this.userInfo[0].username;
                this.form_1.password = this.userInfo[0].password;
                // console.log(this.form_1.username);
            },
            goDetail() {
                this.$router.push("/home");
            },
            toRegister() {
                this.$router.push("/register");
            },
            Forget() {
                this.$toast("懒！！！还没开始着手完善此模块");
            }
        }
    }
</script>

<style lang="scss" scoped>
    .member-container {
        padding-top: 80px;

        .item-back {
            font-size: 16px;
            margin-top: 5px;
        }
        button {
            transform: translateX(-50%);
            margin-left: 50%;
            margin-top: 15px;
        }
        h3 {
            font-size: 18px;
        }
        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }

        .userInfo {
            display: inline-block;
            /*background-color: red;*/
            /*margin-left: 15%;*/
        }

        ul {
            /*padding-left: 0;*/
            /*padding: 5px 25%;*/
            display: flex;
            justify-content: space-between;
            list-style-type: none;
        }

        .more-side ul {
            padding: 5px 25%;
        }

        .username-item {
            width: 90px;
            margin: 0 auto;
            text-align: center;
        }

        .img-item {
            width: 80px;
            height: 80px;
            margin: 0 auto;
        }
        .img-item img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }


        .mui-table-view-cell {
            width: 100%;
        }

        .mui-content {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        select {
            border: 1px solid #0f0f0f !important;
            width: 30%;
            height: 40px;
        }

        .select span {
            display: inline-block;
            margin-left: -20px;
            color: #8f8f94;
        }


        .text-item p {
            width: 60px;
            color: #000;
            font-size: 16px;
            margin-top: 15px;
        }

        .btn-item input {
            width: 25%;
            margin: 15% 1px 15% 15%;
        }


        .area {
            margin: 50px auto 0px auto;
        }

        .mui-input-group {
            margin-top: 10px;
        }


        .mui-bar-nav~.mui-content {
            padding-top: 0;
        }
        .dialog {
            margin-bottom: 10px;
        }

        .mui-bar-nav {
            top: 0;
        }

        .mui-table-view-cell {
             position: relative;
        }

        .mui-content-padded[data-v-6e853632] {
            margin-top: 25px;
            /*background-color: #fff;*/
            margin-bottom: 10px;
        }

        .mui-input-group:first-child {
            margin-top: 20px;
        }

        .mui-input-group label {
            width: 22%;
        }

        .mui-input-row label~input,
        .mui-input-row label~select,
        .mui-input-row label~textarea {
            width: 78%;
        }

        .mui-checkbox input[type=checkbox],
        .mui-radio input[type=radio] {
            top: 6px;
        }

        .mui-content-padded {
            margin-top: 25px;
        }

        .mui-btn {
            padding: 10px;
        }

        .link-area {
            display: block;
            margin-top: 25px;
            text-align: center;
        }

        .spliter {
            color: #bbb;
            padding: 0px 8px;
        }

        .oauth-area {
            position: absolute;
            bottom: 20px;
            left: 0px;
            text-align: center;
            width: 100%;
            padding: 0px;
            margin: 0px;
        }

        .oauth-area .oauth-btn {
            display: inline-block;
            width: 50px;
            height: 50px;
            background-size: 30px 30px;
            background-position: center center;
            background-repeat: no-repeat;
            margin: 0px 20px;
            /*-webkit-filter: grayscale(100%); */
            border: solid 1px #ddd;
            border-radius: 25px;
        }

        .oauth-area .oauth-btn:active {
            border: solid 1px #aaa;
        }

        .oauth-area .oauth-btn.disabled {
            background-color: #ddd;
        }


    }
</style>