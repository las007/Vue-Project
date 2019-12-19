<template>

    <div class="photoinfo-container">

        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>

        <hr>

<!--        缩略图区域-->
        <div class="thumbs">

            <vue-preview :slides="list" @close="handleClose" class="preview"></vue-preview>
<!--            <img class="preview-img" v-for="(item, index) in list" :src="item.img" :msrc="item.img" height="100" :key="item.src">-->
        </div>

<!--        图片内容区域-->
        <div class="content" v-html="photoinfo.common"></div>

<!--        评论现成的 子组件-->
        <cmt-box :id="this.id"></cmt-box>
    </div>

</template>

<script>

    import comment from '../subcomponent/comment.vue'


    import Vue from 'vue';
    //安装 图片预览插件
    import VuePreview from 'vue-preview'
    Vue.use(VuePreview);
    // with parameters install
    import preview from 'vue-preview'
    Vue.use(preview, {
        mainClass: 'pswp--minimal--dark',
        barsSize: {top: 0, bottom: 0},
        captionEl: false,
        fullscreenEl: false,
        shareEl: false,
        bgOpacity: 0.85,
        tapToClose: true,
        tapToToggleControls: false
    });

    export default {
        data() {
            return {
                id: this.$route.params.id,          //从路由获取到图片的 id
                photoinfo: [],       //图片列表的数据
                list: [],            //缩略图的数组

                slide1: [
                    {
                        src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                        msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                        alt: 'picture1',
                        title: 'Image Caption 1',
                        w: 600,
                        h: 400
                    },
                    {
                        src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
                        msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
                        alt: 'picture2',
                        title: 'Image Caption 2',
                        w: 1200,
                        h: 900
                    }
                ]
            }
        },
        created() {
            //默认进入页面，就主动请求 所有图片列表的数据
            this.getPhotoInfo();
            this.getThumbs();
        },
        mounted() {
            var img = getElementsByTagName('img');
            img.style.css({ "width": 500, "padding": 15});
        },
        methods: {
            getPhotoInfo() {
                //根据分类 Id，获取图片列表
                this.$http
                    .get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/newList.json")
                    .then(result => {
                        console.log(result);
                        if (result.status === 200) {
                            this.photoinfo = result.body.message[this.id];
                            // console.log(this.id);
                            console.log(result.body.message[this.id]);
                        }
                    });
            },
            getThumbs() {
                // 获取图片的详情
                this.$http
                    .get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/message.json")
                    .then(result => {
                        if (result.status === 200) {
                            console.log(result);
                            var item = result.body;
                            // 循环每个图片数据，补全图片的宽和高
                            // for (var i = 0; i < item.length; i++) {
                            //     item.w = 600;
                            //     item.h = 400;
                            // }
                            result.body.forEach(item => {
                                item.w = 380;
                                item.h = 400;
                                item.title = 'pics_1';
                                item.src = item.img;
                                item.msrc = item.img;
                            });
                            // 把完整的数据保存到 list 中
                            this.list = result.body;
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
        h3 {
            color: #26a2ff;
            font-size: 15px;
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

    /*.thumbs {*/
    /*    /deep/ .preview {*/
    /*        display: flex;*/
    /*        flex-wrap: wrap;*/
    /*        !*height: 100%;*!*/

    /*        figure {*/
    /*            float: left;*/
    /*            width: 30%;*/
    /*            !*height: 100%;*!*/
    /*            margin: 5px;*/
    /*        }*/

    /*        img {*/
    /*            width: 100%;*/
    /*            height: 100%;*/
    /*            margin: 0;*/
    /*        }*/
    /*    }*/
    /*}*/

</style>