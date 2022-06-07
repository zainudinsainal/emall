<template>
    <div id="myAddress">
        <van-nav-bar
                title="我的地址"
                left-arrow
                :fixed=true
                :border=true
                @click-left="onClickLeft"
        ></van-nav-bar>
        <van-address-list
                v-model="chosenAddressId"
                :list="list"
                default-tag-text="默认"
                @add="onAdd"
                @edit="onEdit"
                style="margin-top: 3rem;"
        ></van-address-list>
        <!--一定要有出口出口出口-->
        <transition name="router-slide" mode="out-in">
            <router-view></router-view>
        </transition>

    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name: "MyAddress",
        data() {
            return {
                chosenAddressId: '1',
                list: [
                    {
                        id: '1',
                        name: '张三',
                        tel: '13000000000',
                        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
                    },
                    {
                        id: '2',
                        name: '李四',
                        tel: '1310000000',
                        address: '浙江省杭州市拱墅区莫干山路 50 号'
                    }
                ],
            }
        },
        methods:{
            //点击了左边
            onClickLeft(){
                this.$router.go(-1);
            },
            onAdd() {
                // Toast('新增地址');
                this.$router.push({
                    path:"/confirmOrder/myAddress/addAddress"
                })
            },
            onEdit(item, index) {
                // Toast('编辑地址:' + index);
                this.$router.push({
                    path:"/confirmOrder/myAddress/editAddress"
                })
            }
        }
    }
</script>

<style scoped>
    #myAddress{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 200;
        background-color: #f5f5f5;
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
