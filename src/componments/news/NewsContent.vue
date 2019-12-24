<template>

    <div class="content-container">

        <form>
            <input type="text" placeholder="请输入文章标题.." class="title" v-model="titleMsg">

            <textarea placeholder="请输入文章内容" class="content-box" v-model="contentMsg"></textarea>
        </form>

<!--        <router-link to="/home/newslist">-->
            <mt-button type="primary" size="large" @click="postContent">发布</mt-button>
<!--        </router-link>-->
    </div>

</template>

<script>

    import Toast from 'mint-ui'
    import { MessageBox } from 'mint-ui'

    export default {
        data() {
            return {
                newList: [],     //新闻列表
                titleMsg: [],     //文章标题内容
                contentMsg: []     //文章内容
            }
        },
        created() {
            // this.getNewsList();
            var userName = JSON.parse(localStorage.getItem('cmts' || []));
            if (userName.length === 0) {
                // console.log("=====================_");

                // MessageBox('提示', '操作成功');
                MessageBox.alert('未登录！请先登录过后再作评论..', '提示').then(action => {
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
                    .post("http://localhost:3000/addNewsList", com, { emulateJSON: true })
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