<template>

    <div class="photo-container">

        <header id="header" class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">导航栏</h1>
        </header>

<!--        顶部滑动区域-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
                        {{ item.title }}
                    </a>

                </div>
            </div>

        </div>

<!--        图片列表区域-->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
                <img v-lazy="item.img_url" alt="404error..">
                <div class="info">
                    <div class="info-title">{{ item.title }}</div>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>

    </div>

</template>

<script>

    import { Toast } from 'mint-ui'
    //1.导入 mui.js 包
    import mui from '../../lib/mui/js/mui.min.js'


    export default {
        data() {
            return {
                cates: [],     //新闻列表的数组
                list: []       //图片列表的数据
            }
        },
        created() {
            this.getAllCategory();
            //默认进入页面，就主动请求 所有图片列表的数据
            this.getPhotoListByCateId(0);
        },
        mounted() {
            // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
            // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
            // 2. 初始化滑动控件
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.1005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods: {
            getAllCategory() {
                //获取新闻列表
                this.$http
                    // .get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/category.json")
                    .get("getCategory")
                    .then(result => {
                    // console.log(result);
                    if (result.status === 200) {
                        //获取数据成功，获取到的数据应该保存到 data 上
                        result.body.list.message.unshift({ title: "推荐", id: 0 });
                        this.cates = result.body.list.message;
                    }else {
                        //获取失败
                        Toast('获取数据失败..');
                    }
                });
            },
            getPhotoListByCateId(cateId) {
                //根据分类 Id，获取图片列表
                this.$http
                    // .get("https://raw.githubusercontent.com/las007/Vue-Project/master/src/comments/" + cateId + "/pageImg.json")
                    .get("getPhotos")
                    .then(result => {
                        // console.log(result);
                        // console.log(cateId);
                        if (result.status === 200) {
                            this.list = result.body.list[cateId];
                            // console.log(this.list);
                        }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
* {
    touch-action: pan-y;
}

.photo-list {
    list-style: none;
    margin: 0;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 60px;
    li {
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;

        img {
            width: 100%;
            vertical-align: middle;
        }

        img[lazy="loading"] {
            width: 40px;
            height: 300px;
            margin: auto;
        }

        .info {
            width: 100%;
            color: #fff;
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
            max-height: 84px;

            .info-title {
                font-size: 14px;
            }
            .info-body {
                font-size: 13px;
            }
        }
    }
}

    .mui-slider {
        /*margin-top: 50px;*/
        padding-top: 50px;
    }

</style>