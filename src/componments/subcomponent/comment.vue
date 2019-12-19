<template>

    <div class="cmt-container">

        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容..（最多允许120字）" maxlength="120" v-model="msg"></textarea>

        <mt-button type="primary" size="large">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in commentList" :key="item.content ">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dataFormat}}
                </div>
                <div class="cmt-body">
                    {{ item.content === undefined ? '此用户很懒，啥都没说' : item.content }}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多..</mt-button>
    </div>

</template>

<script>
    import Toast from 'mint-ui'

    export default {
        data() {
            return {
                commentList: [],       //获取到的评论数据
                artid: 1,
                msg: []     //评论输入的内容
            }
        },
        created() {
            this.getComment();
            // this.postComment();
        },
        methods: {
            getComment() {      //获取评论信息
                this.$http.get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/comment.json").then(result => {
                    // console.log(result);
                    if (result.status === 200) {
                        //获取成功
                        // this.commentList = result.body[this.id];
                        // console.log(this.commentList);
                        //每当获取新评论数据的时候，不要把老数据清空覆盖，而是应以老数据拼 接上新数据
                        this.commentList = this.commentList.concat(result.body[this.id -1][this.artid]);
                        // console.log(this.commentList);
                    }else {
                        //失败
                        Toast('获取评论数据失败...');
                    }
                });
            },
            getMore() {
                //加载更多
                this.artid++;
                this.getComment();
            },

        /*
             postComment() {
                // 校验是否为空内容
                if (this.msg.length === 0) {
                    // return Toast('评论内容不能为空！');
                }

                //发表评论
                // 参数1： 请求的URL地址
                // 参数2： 提交给服务器的数据对象 { content: this.msg }
                // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }
                this.$http
                    .post("https://raw.githubusercontent.com/las007/Vue-Project/master/src/page1", { content: this.msg }, {emulateJSON: true})
                    .then(result => {
                        // console.log(result);

                        if (result.status === 200) {
                            //1.拼接出一个对象
                            var cmt = {
                                user_name: "匿名用户",
                                add_time: Date.now(),
                                content: this.msg
                            };
                            this.commentList.unshift(cmt);
                            this.msg = "";
                        }
                });
            }
            */
        },
        props: ["id"]
    };
</script>

<style lang="scss" scoped>
.cmt-container {
    h3 {
        font-size: 18px;
    }
    textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }

    .cmt-list {
        margin: 5px 0;

        .cmt-item {
            font-size: 13px;

            .cmt-title {
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body {
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>