<template>
    <div class="goodsdesc-container">
        <header id="header" class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav mui-pull-left" to="/home"></router-link>
            <h1 class="mui-title">导航栏</h1>
        </header>
        <content-box :id="this.$route.params.id"></content-box>
    </div>
</template>

<script>
import comment from '../subcomponent/comment.vue'

    export default {
        components: {
            "content-box": comment
        }
    }
</script>

<style lang="scss" scoped>
    .goodsdesc-container {
        padding-top: 50px;
    }
</style>
