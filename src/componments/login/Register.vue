<template>

    <div class="content-box">

        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">注册详情页</h1>
        </header>

        <div class="mui-content">

            <form id='login-form' class="mui-input-group">
                <div class="mui-input-row">
                    <label>账号：</label>
                    <input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号" v-model="form_1.username" v-focus>
                </div>
                <div class="mui-input-row">
                    <label>密码：</label>
                    <input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="form_1.password">
                </div>
                <div class="mui-input-row">
                    <label>号码：</label>
                    <input id='number' type="password" class="mui-input-clear mui-input" maxlength="11" placeholder="请输入您的电话号码（选填）" v-model="form_1.number">
                </div>
                <div class="mui-input-row">
                    <label>邮箱：</label>
                    <input id='e-mail' type="password" class="mui-input-clear mui-input" placeholder="请输入您的邮箱地址（选填..）" v-model="form_1.email">
                </div>
            </form>

            <div class="mui-content-padded">
                <mt-button id='login' type="danger" size="large" plain @click="postComment">
                    注册
                </mt-button>
            </div>


            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>

        </div>

    </div>

</template>


<script>
    import Vue from 'vue'
    import { MessageBox } from 'mint-ui'
    import { DatetimePicker } from 'mint-ui';

    Vue.component(DatetimePicker.name, DatetimePicker);

    Vue.directive('focus', {
        inserted: function (el) {
            el.focus();
        }
    });

    export default {
        data() {
            return {
                msg: '',

                form_1: {
                    username: '',
                    password: '',
                    number: '',
                    email: ''
                },
                userInfo: [],


                pickerVisible: [],

                slots: [
                    {
                        flex: 1,
                        values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ]

            };

        },
        created() {
            this.onValuesChange();
        },
        methods: {

            onValuesChange(picker, values) {
                if (this.slots.values[0] > this.slots.values[1]) {
                    picker.setSlotValue(1, values[0]);
                    console.log(this.slots.values[0]);
                }
            },

            getRegister() {
                this.$http
                    .get("http://localhost:3000/postRegisterMsg")
                    .then(result => {
                        console.log(result);

                        if (result.status === 200) {


                        }
                    });
            },

            postComment() {
                //判断文本框是否为空
                if (this.form_1.username.length === 0 || this.form_1.password.length === 0) {
                    return this.$toast('用户名或密码不能为空！');
                }

                var cmt = {
                    username: this.form_1.username,
                    password: this.form_1.password,
                    number: this.form_1.number,
                    email: this.form_1.email,
                };

                this.$http
                    .post("http://localhost:3000/postRegisterMsg", cmt, { emulateJSON: true })
                    .then(result => {
                        console.log(result);

                        if (result.status === 200) {

                            if (result.body.flag === 0) {
                                this.$toast("账号或者密码不对！");
                            }else if (result.body.flag === 1) {

                                MessageBox.alert('信息录入成功，赶紧去登录吧!').then(action => {
                                    this.$router.push("/login");
                                });

                                this.form_1.username = this.form_1.password = this.form_1.number = this.form_1.email = "";

                            }
                        }
                    });
            },

            handleConfirm() {}

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
        width: 25%;
    }

    .mui-input-row label~input,
    .mui-input-row label~select,
    .mui-input-row label~textarea {
        width: 75%;
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