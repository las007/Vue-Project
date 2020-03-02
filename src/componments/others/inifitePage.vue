<template>

    <div class="goodsinfo-container">

        <header id="header" class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">导航栏</h1>
        </header>

        <div class="mui-card">
            <div class="mui-card-content">

            </div>
        </div>

        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
            <div v-for="item in data" :key="item.index">{{item.name}}</div>
        </div>


    </div>

</template>

<script>

    export default {
        data() {
            return {
                count: 0,
                data: [],
                busy: false
            }
        },
        methods: {
            loadMore: function() {
                this.busy = true
                setTimeout(() => {
                    for (var i = 0, j = 10; i < j; i++) {
                        this.data.push({name: this.count++ })
                    }
                    console.log(this.data)
                    this.busy = false
                }, 1000)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>