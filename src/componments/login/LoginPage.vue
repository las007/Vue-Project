<template>
    <div>
        <div>
            <p class="fl">
                <input name="phone" type="number" placeholder="手机号"/>
                <button type="button" :disabled="disabled" @click="sendcode" class="btns">{{btntxt}}</button>
            </p>
            <p class="fl" style="margin-left: 20px;">
                <input type="text" placeholder="验证码"/>
            </p>
        </div>
        <input type="button" value="查询" class="btns search" @click="query"/>

        <hr>

        <form style="width: 400px;">
            <form  style="height: 40px;margin-bottom: 20px;">
                <input class="input" maxlength="8" placeholder="请输入验证码"></input>
                <div class="divIdentifyingCode" @click="getIdentifyingCode(true)">
                    <img id="imgIdentifyingCode" style="height:40px; width: 100px; cursor: pointer;" alt="点击更换"
                         title="点击更换" />
                </div>
            </form>
        </form>


        <div class="mui-content-padded">
            <p>这是图片放大预览示例，点击如下图片体验全屏预览功能</p>
            <p>
                <img src="http://localhost:3000/www/images/4.jpg " data-preview-src="" data-preview-group="1" />
            </p>
            <p>图片全屏后，双击或双指缩放均可对图片进行放大、缩小操作，左右滑动可查看同组(data-preview-group相同的图片为一组)其它图片，点击会关闭预览</p>
            <p>
                <img src="http://localhost:3000/www/images/4.jpg" data-preview-src="" data-preview-group="1" />
            </p>
            <p>第三张图片，纯粹为了占位： </p>
            <p>
                <img src="http://localhost:3000/www/images/4.jpg" data-preview-src="" data-preview-group="1" />
            </p>
        </div>

        <div id="__MUI_PREVIEWIMAGE" class="mui-slider mui-preview-image mui-fullscreen" data-slider=""
             style="display: none;">
            <div class="mui-preview-header">
                <span class="mui-preview-indicator">1/3</span>
            </div>
            <div class="mui-slider-group"
                 style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;">
                <div class="mui-slider-item mui-zoom-wrapper mui-active" data-zoomer="">
                    <div class="mui-zoom-scroller" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">
                        <img src="http://localhost:3000/www/images/4.jpg"
                             data-preview-lazyload=""
                             style="transition-duration: 0.5s; transform: translate3d(72.5px, -82.3333px, 0px) scale(0.537964);"
                             class="mui-zoom"></div>
                </div>
                <div class="mui-slider-item mui-zoom-wrapper " data-zoomer="">
                    <div class="mui-zoom-scroller">
                        <img src="http://localhost:3000/www/images/4.jpg"
                             data-preview-lazyload=""
                             style="-webkit-transform:translate3d(0,0,0) scale(0.5379644588045234);transform:translate3d(0,0,0) scale(0.5379644588045234)"
                             class="mui-zoom"></div>
                </div>
                <div class="mui-slider-item mui-zoom-wrapper " data-zoomer="">
                    <div class="mui-zoom-scroller">
                        <img src="http://localhost:3000/www/images/4.jpg"
                             data-preview-lazyload=""
                             style="-webkit-transform:translate3d(0,0,0) scale(0.9466666666666667);transform:translate3d(0,0,0) scale(0.9466666666666667)"
                             class="mui-zoom">
                    </div>
                </div>
            </div>
            <div class="mui-preview-footer mui-hidden"></div>
            <div class="mui-preview-loading">
                <span class="mui-spinner mui-spinner-white"></span>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        data: function () {
            return {
                disabled:false,
                time:0,
                btntxt:"获取验证码",
                formMess:{
                    email:this.email,
                    phone:this.phone
                }
            }
        },
        mounted: function () {

        },
        methods:{
            //验证手机号码部分
            sendcode(){
                // var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
                //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
                if(this.phone==''){
                    alert("请输入手机号码");
                }/*else if(!reg.test(this.phone)){
                    alert("手机格式不正确");
                }*/else{
                    this.time=60;
                    this.disabled=true;
                    this.timer();
                    /*axios.post(url).then(
                     res=>{
                     this.phonedata=res.data;
                    })*/
                }
            },
            timer() {
                if (this.time > 0) {
                    this.time--;
                    this.btntxt=this.time+"s后重新获取";
                    setTimeout(this.timer, 1000);
                } else{
                    this.time=0;
                    this.btntxt="获取验证码";
                    this.disabled=false;
                }
            },
            query(){
                var formMess=this.formMess
                Axios.post(api+"/order/select/reception", formMess)
                    .then(function (res) {
                        if(res.data.code==200){
                            console.log(res.data.data);
                            this.productResult=res.data.data;
                            this.productResult.length=3;
                        }else if(res.data.code==400){
                            alert(res.data.message)
                        }

                    }.bind(this))
            },
            //邮箱验证
            sendEmail(){
                var regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if(this.email==''){
                    alert("请输入邮箱");
                }else if(!regEmail.test(this.email)){
                    alert("邮箱格式不正确");
                }
            },


            /**
             * 窗口代码
             * @param {Boolean} bRefresh 是否刷新
             */
            getIdentifyingCode: function (bRefresh) {
                let identifyCodeSrc =  "https://www.xxx.xxx.xxx/imgCode";
                if (bRefresh) {
                    identifyCodeSrc = "https://www.xxx.xxx.xxx/imgCode?" + Math.random();
                }
                let objs = document.getElementById("imgIdentifyingCode");
                objs.src = identifyCodeSrc;
            },
        }
    }
</script>

<style>
    .divIdentifyingCode {
        position: absolute;
        /*top: 0;*/
        right: 0;
        z-index: 5;
        width: 102px; /*设置图片显示的宽*/
        height: 40px; /*图片显示的高*/
        background: #e2e2e2;
        margin-left: 10px;
    }

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


    .mui-content-padded p {
        width: 100%;
    }

    .mui-content-padded img {
        width: 100%;
    }
</style>



