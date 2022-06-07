<template>
    <div id="mine" v-if="userInfo.token">
        <van-nav-bar
            title="我的"
            :fixed=true
            :border="true"
        ></van-nav-bar>
        <van-cell-group style="margin-top: 2.6rem">
            <van-cell
                style="background-color:#2eba5a;color: #ffffff"
                is-link
                :center=true
                @click="$router.push('/dashboard/mine/userCenter')"
            >
                <template slot="title">
                    <div class="personMsg">
                        <img :src="userInfo.icon_url" alt="">
                        <div class="personInfo">
                            <span>{{userInfo.real_name}}</span>
                            <span>手机号：{{userInfo.phone}}</span>
                        </div>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>

        <van-cell-group>
            <van-cell icon="label" title="我的订单" value="查看所有的订单" is-link></van-cell>
            <van-grid :column-num="4">
                <van-grid-item
                        v-for="(order,index) in orderData"
                        :key="index"
                        :icon="order.icon"
                        :text="order.title"
                ></van-grid-item>
            </van-grid>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem;">
            <van-cell icon="bill" title="我的优惠券" value="查看所有的订单" is-link></van-cell>
            <van-cell icon="location" title="我的收获地址" value="查看所有的订单" is-link></van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem;">
            <van-cell icon="phone" title="联系客服" value="客服时间07：00-22：00" is-link></van-cell>
            <van-cell icon="phone-circle" title="意见反馈" value="查看所有的订单" is-link></van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem;">
            <van-cell icon="wap-home" title="小撩买菜" value="下载APP体验更加" is-link></van-cell>
        </van-cell-group>

        <!--路由出口-->
        <transition name="router-slide" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
    <SelectedLogin v-else/>
</template>

<script>
    import SelectedLogin from './../../views/login/SelectedLogin';
    import {mapState} from "vuex";
    export default {
        name: "Mine",
        components:{
            SelectedLogin
        },
        data(){
            return{
                orderData:[
                    {icon:"cart-circle-o",title:"待支付"},
                    {icon:"gift-o",title:"待收货"},
                    {icon:"smile-comment-o",title:"待评价"},
                    {icon:"cash-back-record",title:"售后/退款"},
                ]
            }
        },
        computed:{
            ...mapState(["userInfo"]),//取数据
        }
    }
</script>

<style lang="less" scoped>
    #mine{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
    }
    .van-nav-bar{
        background-color: #3bba63;
    }
    .van-nav-bar__title{
        color: #ffffff;
        font-size: 1.2rem;
    }
    .personMsg{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .personMsg>img{
        width: 4rem;
        height: 4rem;
        border-radius: 2rem;
        border: 0.2rem solid #FFF;
    }
    .personInfo{
        display: flex;
        flex-direction: column;
        margin-left: 2rem;
    }

    .van-icon-label{
        font-size: 1.2rem;
        color: orange;
    }

    /*转场动画*/
    .router-slide-enter-active,.router-slide-leave-active{
        transition: all 0.5s;
    }
    .router-slide-enter,.router-slide-leave{
        transform: translate3d(2rem,0,0);
        opacity: 0;
    }
</style>
