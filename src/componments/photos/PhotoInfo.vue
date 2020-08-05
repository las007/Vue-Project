<template>

    <div class="photoinfo-container">
        <header id="header" class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{ title }}</h1>
<!--            <h1 class="mui-title">导航栏</h1>-->
        </header>

        <div class="content-item">
            <p class="subtitle">
                <span>发表时间：{{ photoinfo.add_time | dataFormat }}</span>
                <span>点击：{{ photoinfo.id }}次</span>
            </p>

            <hr>

            <!--        缩略图区域-->
            <div class="thumbs">
                <vue-preview :slides="list" @close="handleClose" class="preview"></vue-preview>
                <!--            <img class="preview-img" v-for="(item, index) in list" :src="item.img" :msrc="item.img" height="100" :key="item.src">-->
            </div>

<!--            &lt;!&ndash;        图片内容区域&ndash;&gt;-->
<!--            <div class="content" v-html="photoinfo.common"></div>-->

            <!--        评论现成的 子组件-->
            <cmt-box :id="this.id"></cmt-box>
        </div>

    </div>

</template>

<script>

    import comment from '../subcomponent/comment.vue'

    import Vue from 'vue';
    //安装 图片预览插件
    import VuePreview from 'vue-preview'
    Vue.use(VuePreview);

    export default {
        data() {
            return {
                id: this.$route.params.id,          //从路由获取到图片的 id
                photoinfo: [],       //图片列表的数据
                list: [],            //缩略图的数组
                title: ""
            }
        },
        created() {
            //默认进入页面，就主动请求 所有图片列表的数据
            this.getPhotoInfo();
            this.getThumbs();
        },
        methods: {
            getPhotoInfo() {
                //根据分类 Id，获取图片列表
                this.$http
                    // .get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/newList.json")
                    .get("getPhotos")
                    .then(result => {
                        console.log(result);
                        if (result.status === 200) {
                            this.photoinfo = result.data.list[this.id-1][1];
                            console.log(this.id);
                            // console.log(result.body.message[this.id]);
                        }
                    });
            },
            getThumbs() {
                // 获取图片的详情
                this.$http
                    // .get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/message.json")
                        .get("getMessages/" + this.id)
                    .then(result => {
                        if (result.status === 200) {
                            // console.log(result);
                            var item = result.data;
                            // 循环每个图片数据，补全图片的宽和高
                            // for (var i = 0; i < item.length; i++) {
                            //     item.w = 600;
                            //     item.h = 400;
                            // }
                            result.data.forEach(item => {
                                item.w = 380;
                                item.h = 400;
                                item.title = item.title_1;
                                item.src = item.img;
                                item.msrc = item.img;
                            });
                            // 把完整的数据保存到 list 中
                            this.list = result.data;
                            this.title = this.list[0].title_1;
                        }
                    });
            },

            //关闭缩略图方法
            handleClose () {
                console.log('close event')
            }
        },
        components: {
            //评论子组件
            'cmt-box': comment
        }
    }
</script>

<style lang="scss" scoped>
    * img {
        width: 500px;
    }
    .photoinfo-container {
        padding: 5px;


        .content-item {
            padding: 0 4px;
            margin-top: 50px;
        }
        .content p {
            color: #000;
            font-size: 16px;
        }

        h3 {
            color: #26a2ff;
            font-size: 13px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }

        .content {
            font-size: 13px;
            line-height: 30px;
        }

        .thumbs {
            /deep/ img {
                margin: 0;
            }

            /deep/ .my-gallery {
                display: flex;
                flex-wrap: wrap;

                figure {
                    width: 30%;
                    margin: 5px;

                    img {
                        width: 100%;
                        height: 100%;
                        margin: 0;
                    }
                }
            }
        }
    }

</style>