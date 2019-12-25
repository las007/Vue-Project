<template>

    <div class="content-box">
<!--        <div class="text-item">-->
<!--            <p>账号：</p><input type="text">-->
<!--        </div>-->
<!--        <div class="text-item">-->
<!--            <p>密码：</p><input type="text">-->
<!--        </div>-->
<!--        <div class="select">-->
<!--            <form name="form_name">-->
<!--                <select name="section" id="las007">-->
<!--                    <option value="1">平台管理员</option>-->
<!--                    <option value="2">商家</option>-->
<!--                    <option value="3">用户</option>-->
<!--                </select><span>▼</span>-->
<!--            </form>-->
<!--        </div>-->
<!--        <div class="btn-item">-->
<!--            <a href="http://localhost:3001/#/home">-->
<!--                <input type="button" value="登录">-->
<!--            </a>-->
<!--            <router-link to="/home">-->
<!--                <input type="button" value="注册">-->
<!--            </router-link>-->
<!--        </div>-->

        <mt-header fixed title="顶部状态栏"></mt-header>

        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">登录</h1>
        </header>
        <div class="mui-content">
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

    export default {
        data() {
            return {
                msg: '',
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
                routerLink: '',
                userInfo: []

            }
        },
        created() {
            // this.toLog();
        },
        methods: {

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
                                this.$router.push("/home");
                                MessageBox.alert('登录成功!').then(action => {
                                    // this.$router.push("/home");
                                });

                                //把登陆成功的数据存放到localStorage中
                                var com = [];
                                com.push(cmt);

                                localStorage.setItem('userMsg', JSON.stringify(com));
                                //把数据从 ... 中取出来，并渲染到页面上...

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
    };
</script>

<style lang="scss" scoped>
    .content-box {
        margin-top: 40px;
        background-color: #efeff4;
        height: 100%;
    }
    .content-box .text-item {
        width: 85%;
        display: flex;
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
    .text-item input {
        /*width: 80%;*/
        /*margin-left: 15px;*/
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
        padding-top: 40px;
    }

    .mui-bar-nav {
        top: 44px;
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
</style>