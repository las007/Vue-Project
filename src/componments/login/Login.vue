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
                    <input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
                </div>
                <div class="mui-input-row">
                    <label>密码</label>
                    <input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
                </div>
            </form>
            <form class="mui-input-group">
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell">
                        自动登录
                        <div id="autoLogin" class="mui-switch">
                            <div class="mui-switch-handle"></div>
                        </div>
                    </li>
                </ul>
            </form>
            <div class="mui-content-padded">
                <button id='login' class="mui-btn mui-btn-block mui-btn-primary">登录</button>
                <div class="link-area"><a id='reg'>注册账号</a> <span class="spliter">|</span> <a id='forgetPassword'>忘记密码</a>
                </div>
            </div>
            <div class="mui-content-padded oauth-area">

            </div>
        </div>

    </div>

</template>


<script>
    import Toast from 'mint-ui'
    import Vue from 'vue'
    import $ from 'jquery'
    import mui from '../../lib/mui/js/mui.min'


    (function($, doc) {
        $.init({
            statusBarBackground: '#f7f7f7'
        });
        $.plusReady(function() {
            plus.screen.lockOrientation("portrait-primary");
            var settings = app.getSettings();
            var state = app.getState();
            var mainPage = $.preload({
                "id": 'main',
                "url": 'main.html'
            });
            var main_loaded_flag = false;
            mainPage.addEventListener("loaded",function () {
                main_loaded_flag = true;
            });
            var toMain = function() {
                //使用定时器的原因：
                //可能执行太快，main页面loaded事件尚未触发就执行自定义事件，此时必然会失败
                var id = setInterval(function () {
                    if(main_loaded_flag){
                        clearInterval(id);
                        $.fire(mainPage, 'show', null);
                        mainPage.show("pop-in");
                    }
                },20);
            };
            //检查 "登录状态/锁屏状态" 开始
            if (settings.autoLogin && state.token && settings.gestures) {
                $.openWindow({
                    url: 'unlock.html',
                    id: 'unlock',
                    show: {
                        aniShow: 'pop-in'
                    },
                    waiting: {
                        autoShow: false
                    }
                });
            } else if (settings.autoLogin && state.token) {
                toMain();
            } else {
                app.setState(null);
                //第三方登录
                var authBtns = ['qihoo', 'weixin', 'sinaweibo', 'qq']; //配置业务支持的第三方登录
                var auths = {};
                var oauthArea = doc.querySelector('.oauth-area');
                plus.oauth.getServices(function(services) {
                    for (var i in services) {
                        var service = services[i];
                        auths[service.id] = service;
                        if (~authBtns.indexOf(service.id)) {
                            var isInstalled = app.isInstalled(service.id);
                            var btn = document.createElement('div');
                            //如果微信未安装，则为不启用状态
                            btn.setAttribute('class', 'oauth-btn' + (!isInstalled && service.id === 'weixin' ? (' disabled') : ''));
                            btn.authId = service.id;
                            btn.style.backgroundImage = 'url("images/' + service.id + '.png")'
                            oauthArea.appendChild(btn);
                        }
                    }
                    $(oauthArea).on('tap', '.oauth-btn', function() {
                        if (this.classList.contains('disabled')) {
                            plus.nativeUI.toast('您尚未安装微信客户端');
                            return;
                        }
                        var auth = auths[this.authId];
                        var waiting = plus.nativeUI.showWaiting();
                        auth.login(function() {
                            waiting.close();
                            plus.nativeUI.toast("登录认证成功");
                            auth.getUserInfo(function() {
                                plus.nativeUI.toast("获取用户信息成功");
                                var name = auth.userInfo.nickname || auth.userInfo.name;
                                app.createState(name, function() {
                                    toMain();
                                });
                            }, function(e) {
                                plus.nativeUI.toast("获取用户信息失败：" + e.message);
                            });
                        }, function(e) {
                            waiting.close();
                            plus.nativeUI.toast("登录认证失败：" + e.message);
                        });
                    });
                }, function(e) {
                    oauthArea.style.display = 'none';
                    plus.nativeUI.toast("获取登录认证失败：" + e.message);
                });
            }
            // close splash
            setTimeout(function() {
                //关闭 splash
                plus.navigator.closeSplashscreen();
            }, 600);
            //检查 "登录状态/锁屏状态" 结束
            var loginButton = doc.getElementById('login');
            var accountBox = doc.getElementById('account');
            var passwordBox = doc.getElementById('password');
            var autoLoginButton = doc.getElementById("autoLogin");
            var regButton = doc.getElementById('reg');
            var forgetButton = doc.getElementById('forgetPassword');
            loginButton.addEventListener('tap', function(event) {
                var loginInfo = {
                    account: accountBox.value,
                    password: passwordBox.value
                };
                app.login(loginInfo, function(err) {
                    if (err) {
                        plus.nativeUI.toast(err);
                        return;
                    }
                    toMain();
                });
            });
            $.enterfocus('#login-form input', function() {
                $.trigger(loginButton, 'tap');
            });
            autoLoginButton.classList[settings.autoLogin ? 'add' : 'remove']('mui-active')
            autoLoginButton.addEventListener('toggle', function(event) {
                setTimeout(function() {
                    var isActive = event.detail.isActive;
                    settings.autoLogin = isActive;
                    app.setSettings(settings);
                }, 50);
            }, false);
            regButton.addEventListener('tap', function(event) {
                $.openWindow({
                    url: 'reg.html',
                    id: 'reg',
                    preload: true,
                    show: {
                        aniShow: 'pop-in'
                    },
                    styles: {
                        popGesture: 'hide'
                    },
                    waiting: {
                        autoShow: false
                    }
                });
            }, false);
            forgetButton.addEventListener('tap', function(event) {
                $.openWindow({
                    url: 'forget_password.html',
                    id: 'forget_password',
                    preload: true,
                    show: {
                        aniShow: 'pop-in'
                    },
                    styles: {
                        popGesture: 'hide'
                    },
                    waiting: {
                        autoShow: false
                    }
                });
            }, false);
            //
            window.addEventListener('resize', function() {
                oauthArea.style.display = document.body.clientHeight > 400 ? 'block' : 'none';
            }, false);
            //
            var backButtonPress = 0;
            $.back = function(event) {
                backButtonPress++;
                if (backButtonPress > 1) {
                    plus.runtime.quit();
                } else {
                    plus.nativeUI.toast('再按一次退出应用');
                }
                setTimeout(function() {
                    backButtonPress = 0;
                }, 1000);
                return false;
            };
        });
    }(mui, document));



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
                activeClass: 'active'
            }
        },
        created() {
            this.getComment();
        },
        methods: {
            getComment() {      //获取登录信息
                this.$http
                    .get("http://localhost:3000/messages/" + this.id)
                    .then(result => {
                        console.log(result + "====");

                    });
            },

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

                var cmt = {
                    id: this.id,
                    name: "匿名用户啊",
                    description: this.msg,
                    add_time: getDate()
                };

                this.$http
                    .post("http://localhost:3000/addMessage/" + this.id, cmt, { emulateJSON:true })
                    .then(result => {
                        console.log(result);

                        if (result.status === 200) {
                            // if (result.body.flag === 1) {
                            //1.拼接出一个评论对象

                            //2.将数据加到数组中
                            // this.commentList.unshift(com);
                            this.getComment();
                            //3.清空文本框
                            this.msg = '';
                        }
                    });

            },

            pageHidden() {
                $(function () {
                    $('.login').click(function () {
                        console.log('ok');
                        this.remove();
                    });
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .content-box {
        margin-top: 40px;
        background-color: #fff;
    }
    .content-box .text-item {
        width: 85%;
        display: flex;
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
        background-color: #fff;
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