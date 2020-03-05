<template>
    <div class="commit-container">

        <header id="header" class="mui-bar mui-bar-nav">
            <router-link class="mui-icon mui-icon-left-nav mui-pull-left" to="/home"></router-link>
            <h1 class="mui-title">导航栏</h1>
        </header>
        <comment-box></comment-box>
    </div>
</template>

<script>
    import comment from '../subcomponent/comment.vue'

    export default {

        components: {
            "comment-box": comment
        }
    }
</script>

<style lang="scss" scoped>
.commit-container {
    padding-top: 50px;
}
</style>