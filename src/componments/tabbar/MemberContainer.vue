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

        <header id="header" class="mui-bar mui-bar-nav">
<!--            <span class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left item-back">返回</span>-->
            <span class="mui-icon mui-icon-left-nav item-back" @click="$router.go(-1)">返回</span>
        </header>

        <div class="more-side">
            <ul v-if="showname">
                <li class="userInfo">
                    <button @click="register()">登录</button>
                </li>
                <li class="userInfo">
                    <button @click="loading()">注册</button>
                </li>
            </ul>
<!--            <span>{{ userInfo.username }}</span>-->
            <span v-for="item in msg">{{ item.username }}</span>
        </div>

        <div class="dialog">
            <form v-if="showname">
                用户名：<input type="text" v-model="form2.username" v-focus>
                密  码：<input type="password" v-model="form2.password" @keyup.enter="Login" autocomplete="password">
            </form>
            <mt-button type="primary" size="large" @click="Login">确定</mt-button>
            <mt-button type="danger" size="large" plain @click="storageCancel">退出登录</mt-button>
        </div>

        <router-link :to="router">
            <mt-button type="primary" @click="toLog">前去登录/注册</mt-button>
        </router-link>


    </div>
</template>

<script>
    import Vue from 'vue'

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
                router: ''
            }
        },
        created() {
            // this.getInfo();
            //把 ... 赋值给 this.msg
            this.msg = JSON.parse(localStorage.getItem('cmts') || []);

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
                    .get("http://localhosts:3000/getLoginMsg")
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
            }
        }
    }
</script>

<style lang="scss" scoped>
.member-container {
    margin-top: 50px;

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
        padding: 5px 25%;
        display: flex;
        justify-content: space-between;
    }
}
</style>