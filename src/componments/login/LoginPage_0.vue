<template>
    <div>
        <form class="regform">
            <h3 class="login-text">手机注册</h3>
            <div>
                <span v-show="sendAuthCode" class="auth_text auth_text_blue" @click="getAuthCode">获取验证码</span>
                <br>
                <span v-show="!sendAuthCode" class="auth_text">
                    <span class="auth_text_blue">{{auth_time}} 秒之后重新发送验证码 </span>
                </span>
            </div>
        </form>




    </div>
</template>

<script>

    export default {
        data () {
            return {
                sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮'还是‘倒计时' */
                auth_time: 0, /*倒计时 计数器*/
            }
        },
        methods: {
            //  验证
            getAuthCode:function () {
                this.sendAuthCode = false;
                //设置倒计时秒
                this.auth_time = 10;
                var auth_timetimer = setInterval(()=>{
                    this.auth_time--;
                    if(this.auth_time <= 0){
                        this.sendAuthCode = true;
                        clearInterval(auth_timetimer);
                    }
                }, 1000);
            }
        }
    }
</script>

<style>
    .regform {
        margin: 20px auto;
        width: 310px;
        background: #fff;
        box-shadow: 0 0 10px #B4BCCC;
        padding: 30px 30px 0 30px;
        border-radius: 25px;
    }
    .auth_input{
        width:140px;
        height:38px;
        margin-bottom:20px;
        border:1px solid #DCDFE6;
        /* color:red; */
        padding-left:10px;
        border-radius: 8%;
    }
    .regform[data-v-92def6b0]{
        width:370px;
        min-height: 440px;
    }
    .login-text{
        text-align: center;
        margin-bottom:20px;
    }
</style>