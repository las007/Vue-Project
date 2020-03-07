<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, i) in bannerList" v-bind:key="item.url">
<!--                <router-link :to="'/home/photoinfo/' + i">-->
                    <img :src="item.img" alt="error404..." :class="{ 'full': isfull }">
<!--                </router-link>-->
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props: ["bannerList", "isfull"]
    }
</script>

<style lang="scss" scoped>

    .mint-swipe{
        height: 200px;
        text-align: center;

        .mint-swipe-item {

            img {
                /*width: 100%;*/
                height: 100%;
            }
        }
    }
    .full {
        width: 100%;
    }
</style>
