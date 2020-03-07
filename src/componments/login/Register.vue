<template>

    <div class="content-box">

        <header class="mui-bar mui-bar-nav">
            <span class="mui-icon mui-icon-left-nav item-back" @click="$router.go(-1)">返回</span>
            <h1 class="mui-title">注册详情页</h1>
        </header>

        <div class="mui-content">
            <form id='login-form' class="mui-input-group">
                <div class="page-datetime-wrapper">
                    <label>选择出生日期：</label>
                    <mt-button @click="open('picker')" size="large" class="btn">
                        <span v-if="showname">选择时间段..▼</span> <label>{{ timer }}</label>
                    </mt-button>
                </div>
                <div class="mui-input-row">
                    <label>账号：</label>
                    <input id='account' type="text" class="mui-input-clear mui-input" maxlength="15" placeholder="请输入账号" v-model="form_1.username" v-focus>
                </div>
                <div class="mui-input-row">
                    <label>密码：</label>
                    <input id='password' type="password" class="mui-input-clear mui-input" maxlength="15" placeholder="请输入密码" v-model="form_1.password" autocomplete="password">
                </div>
                <div class="mui-input-row">
                    <label>密码确认：</label>
                    <input id='password_2' type="password" class="mui-input-clear mui-input" maxlength="15" placeholder="请输入密码" v-model="form_1.password_2" autocomplete="password">
                   <!-- autocomplete 用途：此功能主要是记住输入内容，下次提交表单或者浏览器回退后，还能保持表单内容不变-->
                </div>
                <div class="mui-input-row">
                    <label>号码：</label>
                    <input id='number' type="number" class="mui-input-clear mui-input" maxlength="11" placeholder="您的电话号码（选填）" v-model="form_1.number">
                </div>
                <div class="mui-input-row">
                    <label>邮箱：</label>
                    <input id='e-mail' type="email" class="mui-input-clear mui-input" maxlength="25" placeholder="您的邮箱地址（选填..）" v-model="form_1.email"  @keyup.enter="getRegister">
                </div>

                <div class="page-datetime">
                    <div class="male">
                        <label>选择您的性别：</label>
                        <select id="sel" v-model="opt" @click="sexSelect">
                            <option value="1">男</option>
                            <option value="2">女</option>
                        </select>
                        <span class="item">▽</span>
                    </div>

                    <mt-datetime-picker
                            ref="picker"
                            type="date"
                            v-model="value"
                            year-format="{value} 年"
                            month-format="{value} 月"
                            date-format="{value} 日"
                            :start-date="startDate"
                            :end-date="endDate"
                            @confirm="handleChange">
                    </mt-datetime-picker>
                </div>

            </form>

            <div class="mui-content-padded">
                <mt-button id='login' type="danger" size="large" plain @click="getRegister">
                    注册
                </mt-button>
            </div>
        </div>

    </div>

</template>


<script>
    import Vue from 'vue'
    import { MessageBox } from 'mint-ui'


    // 引入moment用来格式化时间
    import moment from "moment";
    Vue.prototype.$moment = moment;

    Vue.directive('focus', {
        inserted: function (el) {
            el.focus();
        }
    });

    export default {
        inject: ['reload'],
        data() {
            return {
                msg: '',
                timer: '',      //出生年月日选项
                showname: true,

                form_1: {
                    username: '',
                    password: '',
                    password_2: '',
                    number: '',
                    email: '',
                    sex: ''
                },
                opt: 1,
                userInfo: [],

                value: null,
                visible: false,

                startDate: new Date("1901-01-01"),
                endDate: new Date()
            };
        },
        created() {},
        methods: {
            getRegister() {
                //判断文本框是否为空
                if (this.form_1.username.length === 0 || this.form_1.password.length === 0) {
                    return this.$toast('用户名或密码不能为空！');
                }else if (this.form_1.password !== this.form_1.password_2) {
                    return this.$toast('请确认您两次输入的密码是否一致！');
                }else if (this.form_1.number.length !== 11) {
                    return this.$toast('您的电话号码长度不对，请确认！');
                }else {
                    for (var i = 0; i <= this.form_1.email.length; i++) {
                        if (this.form_1.email.indexOf("@") === -1) {         //如果有 "@" 字符，则返回 0，如果没有就返回-1
                            return this.$toast("您输入的邮箱格式不正确！应包含字符 '@' 和 '.com' 等");
                        }
                    }
                }
                console.log(this.form_1.sex);

                var cmt = {
                    username: this.form_1.username,
                    password: this.form_1.password,
                    number: this.form_1.number,
                    email: this.form_1.email,
                    birthday: this.timer,
                    sex: this.form_1.sex
                };

                // console.log(this.timer);
                // console.log(this.form_1.sex.male.value);

                this.$http
                    .post("postRegisterMsg_1", cmt, { emulateJSON: true })
                    .then(result => {
                        // console.log(result);

                        if (result.status === 200) {
                            if (result.body.flag === 1) {
                                return MessageBox('提示', '此用户名已存在，请重定义您的名称!');
                            }

                            this.postComment(cmt);
                        }
                    });
            },

            postComment(cmt) {
                this.$http
                    .post("postRegisterMsg", cmt, { emulateJSON: true })
                    .then(result => {
                        // console.log(result);

                        if (result.status === 200) {
                            if (result.body.flag === 0) {
                                this.$toast("账号或者密码不对！");
                            }else if (result.body.flag === 3) {

                                MessageBox.alert('信息录入成功，赶紧去登录吧!').then(action => {
                                    this.$router.push("/home/newpage");
                                });

                                // this.form_1.username = this.form_1.password = this.form_1.number = this.form_1.email = "";
                            }
                        }
                    });
            },

            open(picker) {
                this.$refs[picker].open();
                // this.reload();
            },

            handleChange(value) {
                // console.log(value);

                let t = moment(value).format("YYYY-MM-DD");
                // console.log(t);

                this.$toast({
                    // message: '已选择 ' + value.toString(),
                    message: '已选择 ' + t,
                    position: 'center'
                });

                this.timer = t;
                this.showname = false;

            },

            sexSelect() {
                // console.log(11);

                switch (this.opt) {
                    case '1':
                        this.$toast('已选择：男');
                        this.form_1.sex = '男';
                        break;
                    case '2':
                        this.$toast('已选择：女');
                        this.form_1.sex = '女';
                }
                // if (this.opt === 1) {
                //     // console.log(this.form_1.sex.male);
                //     this.$toast('已选择：男');
                //     this.form_1.sex = '男';
                // }else if (this.opt === 2) {
                //     // console.log(this.form_1.sex.female);
                //     this.$toast('已选择：女');
                //     this.form_1.sex = '女';
                // }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .content-box {
        /*margin-top: 40px;*/
        background-color: #efeff4;
        height: 100%;
    }
    .mui-bar-nav[data-v-1e4edd6a] {
        top: 0;
    }

    .page-datetime-wrapper {
        border-bottom: 1px solid #8f8f94;
        padding-top: 10px;
    }

    .mui-bar-nav.mui-bar .mui-icon {
        font-size: 16px;
        margin-top: 5px;
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

    .male {
        display: flex;
        justify-content: space-between;
    }

    .male label {
        padding-left: 10px;
        width: 29%;
        position: relative;
    }
    .male select {
        /*margin-left: 7px;*/
        width: 65%;
        margin-right: 10px;
    }
    .male .item {
        position: absolute;
        margin-top: 10px;
        right: 20px;
        margin-left: -15px;
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

    .page-datetime-wrapper {
        display: flex;
        justify-content: space-between;
    }
    .page-datetime-wrapper label {
        padding-left: 10px;
        padding-top: 10px;
    }
    .btn {
        width: 65%;
        margin-bottom: 10px;
        margin-right: 10px;
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
        border: 1px solid #8f8f94;
    }

    .mui-input-row[data-v-1e4edd6a] {
        border-bottom: 1px solid #8f8f94;
    }

    .mui-input-group:first-child {
        margin-top: 20px;
    }

    .mui-input-group label {
        width: 29%;
        font-size: 14px;
    }


    .mui-input-row label~input,
    .mui-input-row label~select,
    .mui-input-row label~textarea {
        width: 71%;
    }
    .mui-input-row {
        padding-bottom: 25px;
        /*background-color: red;*/
        width: 98%;
        margin: 25px 5px;
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