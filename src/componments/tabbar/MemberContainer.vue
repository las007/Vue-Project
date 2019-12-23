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

        <comment-box></comment-box>

        <router-link to="/login">
            <mt-button type="primary">前去登录/注册</mt-button>
        </router-link>

    </div>
</template>

<script>
import axios from 'axios'
import ab from '../../../static/json/first.json'

import app from '../../App.vue'

import Toast from 'mint-ui'
import comment from '../subcomponent/comment.vue'

    export default {
        data() {
            return {
                memberList: [],
                msg: ""
            }
        },
        created() {
            // this.getMemberContent();
        },
        methods: {
            // getMemberContent() {
            //     // this.$http.get("../../../static/json/first.json").then(result => {
            //     this.$http.get("http://localhost:3000/messages").then(result => {
            //         console.log(result);
            //         if (result.status === 200) {
            //             this.memberList = result.body.list;
            //         }
            //     });
            // },
            // postComment() {
            //     // 校验是否为空内容
            //     if (this.msg.trim().length === 0) {
            //         return this.$toast('输入内容不能为空！');
            //     }
            //
            //     // 发表评论
            //     // 参数1： 请求的URL地址
            //     // 参数2： 提交给服务器的数据对象 { content: this.msg }
            //     // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }
            //     this.$http
            //         .post("http://localhost:3000/addMessage", { name: "匿名用户啊", desc: this.msg.trim() }, { emulateJSON:true })
            //         .then(result => {
            //             // console.log(result);
            //             // console.log(result.body.flag);
            //             if (result.status === 200) {
            //             // if (result.body.flag === 1) {
            //                 //1.拼接出一个评论对象
            //                 var cmt = {
            //                     name: "匿名用户啊",
            //                     desc: this.msg.trim()
            //                 };
            //                 //2.将数据加到数组中
            //                 this.memberList.unshift(cmt);
            //                 //3.清空文本框
            //                 this.msg = '';
            //             }
            //     });
            //
            // }
        },
        components: {
            "comment-box": comment,
            app
        }
    }
</script>

<style lang="scss" scoped>
.member-container {
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
}
</style>