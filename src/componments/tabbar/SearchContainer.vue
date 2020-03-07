<template>
    <div class="search-container">

        <header id="header" class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">SearchContainer</h1>
        </header>

        <div class="item">
            <input type="text" class="mintui mintui-search" placeholder="站内搜索.." @keyup.enter="postSearchMsg" v-model="name" v-focus>
            <span class="mui-icon mui-icon-search" @click="postSearchMsg"></span>
<!--            <input type="button" value="搜索" @click="postSearchMsg">-->
            <ul>
                <li v-for="(item, i) in result" :key="item.id">
                    {{ i + 1}}.&nbsp;{{ item.title }}
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'

    Vue.directive('focus', {
        inserted: function (el) {
            el.focus();
        }
    });
    export default {
        data() {
            return {
                id: this.$route.params.id,          //从路由获取到图片的 id
                result: [],
                name: '',
                info: []
            }
        },
        created() {},
        methods: {
            postSearchMsg() {
                var cmt = {
                    title: this.name,
                };

                this.$http
                    .post("postSearchMsg", cmt, { emulateJSON: true })
                    .then(result => {
                        // console.log(result);

                        if (result.status === 200) {
                            if (result.body.flag === 0) {
                                this.$toast("站内还没有这一片文章呢，不如就由你来填写吧！");
                            }else if (result.body.flag === 1) {
                                console.log(result.body.msg[0]);
                                this.result = result.body.msg;
                            }
                        }
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>

    .search-container {
        ul {
            list-style-type: none;
            padding: 0;
            margin: auto 15px;
        }
        li {
            /*background-color: aqua;*/
            border-bottom: 1px solid #404060;
            margin-bottom: 10px;
        }
        .mint-search .mint-searchbar {
            margin-top: 256px !important;
        }

        input[type=text] {
            margin: 5px 0px 5px 5px;
            width: 89%;
            border-radius: 5px;
        }

        .item {
            /*height: 44px;*/
            background-color: #d9d9d9;
            margin-top: 55px;
        }

        .mint-search {
            height: 110px;
        }
       /deep/ .mint-searchbar-inner {
             padding: 0;
        }

        /deep/ .mint-searchbar {
            margin-top: 50px;
        }

        /deep/ input[type=search] {
            width: 100%;
            height: 28px;
            margin-bottom: 0;
            text-align: left;
            border-radius: 0;
            background-color: #fff;
        }

        /deep/ .mint-search-list-warp {
             margin-top: 50px;
         }
    }
</style>