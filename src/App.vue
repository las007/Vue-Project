<template>
    <div class="app-container">

        <!--    顶部 Header 区域-->
<!--        <mt-header fixed title="顶部状态栏"></mt-header>-->

        <!--    中间的 路由 router-view 区域-->
        <div id="app_1">
            <transition>
                <router-view v-if="isRouterAlive"></router-view>
            </transition>
        </div>

        <!--    底部 Tab-bar 区域-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item-jgz" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-jgz" to="/member">
                <span class="mui-icon mui-icon-list"></span>
                <span class="mui-tab-label">发现</span>
            </router-link>
            <router-link class="mui-tab-item-jgz" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
				</span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-jgz" to="/setting">
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">我的</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'app_1',
        provide () {
            return {
                reload: this.reload
            }
        },
        data () {
            return {
                isRouterAlive: true
            }
        },
        methods: {
            reload () {
                this.isRouterAlive = false;
                this.$nextTick(function () {
                    this.isRouterAlive = true;
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mint-header {
        z-index: 999;
    }
    .app-container {
        /*padding-top: 40px;*/
        /*padding-bottom: 50px;*/
        overflow-x: hidden;
        /*margin-top: -40px;*/
    }

    .v-enter {
        opacity: 0;
        transform: translateX(100%);
    }
    .v-leave-to {
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }

    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s ease;
    }

    .mui-bar-tab .mui-tab-item-jgz.mui-active {
        color: #007aff;
    }
    .mui-bar-tab .mui-tab-item-jgz {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }
    .mui-bar-tab .mui-tab-item-jgz .mui-icon~.mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .mui-bar-tab .mui-tab-item-jgz .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

</style>