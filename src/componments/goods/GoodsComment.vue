<template>
    <div class="goodsdesc-container">
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

</style>
