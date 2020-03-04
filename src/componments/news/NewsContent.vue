<template>

    <div class="content-container">

        <form>
            <input type="text" placeholder="请输入文章标题.." class="title" v-model="titleMsg">

            <textarea placeholder="请输入文章内容" class="content-box" v-model="contentMsg"></textarea>
        </form>

<!--        <router-link to="/home/newslist">-->
            <mt-button type="primary" size="large" @click="postContent">发布</mt-button>
<!--        </router-link>-->

        <div id="time">
            <span class="select-box-title">选择发送时间：</span>
            <input class="form-control select-box-input" v-model="time" type="text"
                   id="messageSendTime">
        </div>

    </div>

</template>

<script>

    import Toast from 'mint-ui'
    import $ from 'jquery'
    import { MessageBox } from 'mint-ui'

    export default {
        data() {
            return {
                newList: [],     //新闻列表
                titleMsg: [],     //文章标题内容
                contentMsg: [],     //文章内容
                time: ''
            }
        },
        created() {
            // this.getNewsList();
            var userName = JSON.parse(localStorage.getItem('cmts' || []));
           /* if (userName.length === 0) {
                // console.log("=====================_");

                // MessageBox('提示', '操作成功');
                MessageBox.alert('未登录！请先登录过后再发表文章..', '提示').then(action => {
                    // ...
                    // console.log(action);
                    if (action === "confirm") {
                        // console.log(123);
                        this.$router.push("/member");
                    }else {
                        this.msg = "";
                    }

                });
            }*/
        },
        mounted() {
          this.dateDefind();
        },
        methods: {
            postContent() {
                function getDate() {
                    var now = new Date(),
                        y = now.getFullYear(),
                        m = now.getMonth() + 1,
                        d = now.getDate();
                    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
                }

                // console.log(getDate());

                if (this.titleMsg.length === 0 || this.contentMsg.length === 0) {
                    return this.$toast("文章标题或内容不能为空！");
                }


                var userName = JSON.parse(localStorage.getItem('cmts' || []));
                // console.log(userName[0].username);
                // console.log(userName.length);

                if (userName.length !== 0) {
                    var com = {
                        title: this.titleMsg,
                        add_time: getDate(),
                        author: userName[0].username,
                        common: this.contentMsg,
                        click: 7,
                        img_url: "http://localhost:3000/www/images/4.jpg"
                    };
                }else {
                    // MessageBox('提示', '操作成功');
                    MessageBox.confirm('未登录！请先登录过后再作评论..', '提示').then(action => {
                        // ...
                        // console.log(action);
                        if (action === "confirm") {
                            // console.log(123);
                            this.$router.push("/member");
                        }else {
                            this.msg = "";
                        }
                    });
                }

                this.$http
                    .post("addNewsList", com, { emulateJSON: true })
                    .then(result => {
                        if (result.status === 200) {
                            this.titleMsg = this.contentMsg = "";
                            MessageBox('提示', '操作成功');
                            this.$router.push("/home/newslist");
                        }
                    });
            },

            goDetail() {
                this.$router.push("/home/newslist");
            },

            dateDefind () {
                var d, s;
                var self = this;
                d = new Date();
                s = d.getFullYear() + "-";       //取年份
                s = s + (d.getMonth() + 1) + "-";//取月份
                s += d.getDate() + " ";     //取日期
                s += d.getHours() + ":";    //取小时
                s += d.getMinutes() + ":";  //取分
                s += d.getSeconds();     //取秒
                self.time = s;
                //初始化
                $('#messageSendTime').datetimepicker({
                    startDate: s,
                    minView: "hour", //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    todayBtn: 1,
                    autoclose: 1
                });
                //当选择器隐藏时，讲选择框只赋值给data里面的time
                $('#messageSendTime').datetimepicker()
                    .on('hide', function (ev) {
                        var value = $("#messageSendTime").val();
                        self.time = value;
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
.content-container {
    .title {

    }
    .content-box {
        height: 380px;
    }
}
</style>