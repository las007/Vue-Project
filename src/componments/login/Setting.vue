<template>
    <div class="content-container">

<!--        <h3>SettingContainer</h3>-->

        <!--页面主结构开始-->
        <div id="app" class="mui-views" data-view="1">
            <div class="mui-view">
                <div class="mui-navbar">
                    <div class="mui-navbar-inner mui-bar mui-bar-nav mui-navbar-center">
                        <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
                            <span class="mui-icon mui-icon-left-nav"></span>
                        </button>
                        <h1 class="mui-center mui-title" style="margin-left: -15px;">设置</h1>
                    </div>
                </div>
                <div class="mui-pages">
                    <div id="setting" class="mui-page mui-page-center">
                        <!--页面标题栏开始-->

                        <!--页面标题栏结束-->
                        <!--页面主内容区开始-->
                        <div class="mui-page-content">
                            <div class="mui-scroll-wrapper" data-scroll="2">
                                <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px);">
                                    <ul class="mui-table-view mui-table-view-chevron">
                                        <li class="mui-table-view-cell mui-media">
                                            <router-link class="mui-navigate-right" to="/home/newpage">
                                                <img class="mui-media-object mui-pull-left head-img" id="head-img" src="http://localhost:3000/www/images/4.jpg">

                                                <div class="mui-media-body" v-if="showname">
                                                    Hello MUI
                                                    <p class="mui-ellipsis">账号:hello mui</p>
                                                </div>

                                                <div class="mui-media-body" v-if="!showname">
                                                    {{ msg[0].username }}
                                                    <p class="mui-ellipsis">账号:{{ msg[0].username }}</p>
                                                </div>
                                            </router-link>
                                        </li>
                                    </ul>
                                    <ul class="mui-table-view mui-table-view-chevron">
                                        <li class="mui-table-view-cell">
                                            <a href="#account" class="mui-navigate-right">账号与安全</a>
                                        </li>
                                    </ul>
                                    <ul class="mui-table-view mui-table-view-chevron">
                                        <li class="mui-table-view-cell">
                                            <a href="#notifications" class="mui-navigate-right">新消息通知</a>
                                        </li>
                                        <li class="mui-table-view-cell">
                                            <a href="#privacy" class="mui-navigate-right">隐私</a>
                                        </li>
                                        <li class="mui-table-view-cell">
                                            <a href="#general" class="mui-navigate-right">通用</a>
                                        </li>
                                    </ul>
                                    <ul class="mui-table-view mui-table-view-chevron">
                                        <li class="mui-table-view-cell">
                                            <a href="#about" class="mui-navigate-right">关于MUI <i class="mui-pull-right update">V3.1.0</i></a>
                                        </li>
                                    </ul>
                                    <ul class="mui-table-view" v-if="showname">
                                        <li class="mui-table-view-cell" style="text-align: center;">
                                            <router-link to="/home/newpage">未登录，去登陆</router-link>
                                        </li>
                                    </ul>
                                    <ul class="mui-table-view" v-if="!showname">
                                        <li class="mui-table-view-cell" style="text-align: center;">
                                            <a @click="storageCancel">退出登录</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="mui-scrollbar mui-scrollbar-vertical"><div class="mui-scrollbar-indicator" style="transition-duration: 0ms; display: none; height: 617px; transform: translate3d(0px, 0px, 0px) translateZ(0px);"></div></div></div>
                        </div>
                        <!--页面主内容区结束-->
                    </div>
                </div>
            </div>
            <mt-button type="danger" size="large" plain @click="storageCancel" v-if="!showname">退出登录</mt-button>
        </div>
        <!--页面主结构结束-->


    </div>
</template>

<script>

    export default {
        data() {
            return {
                msg: [],
                showname: true
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
        methods: {
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content-container {
        margin-top: 40px;
        background-color: #efeff4;

        .mui-scroll {
            background-color: #efeff4;
        }
        .mui-scroll-wrapper {
            top: 45px;
        }

        .mui-table-view-chevron .mui-table-view-cell {
            border-bottom: 1px solid #eee;
        }

        .mui-table-view .mui-media-body {
            margin-top: 8px;
        }
        .mui-table-view .mui-media-object.mui-pull-left {
            width: 50px;
            height: 50px;
        }
        .mui-table-view .mui-media-object {
            line-height: 50px;
             max-width: 50px;
            height: 50px;
        }
        img {
            border-radius: 50%;
        }

        .mui-table-view {
            margin-top: 15px;
        }
    }
</style>