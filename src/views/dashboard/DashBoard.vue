<template>
    <div id="dashboard">
        <van-tabbar v-model="active">
            <van-tabbar-item replace to="/dashboard/home">
                <van-icon name="wap-home" size="1rem"/>
                <span style="display: block">首页</span>
            </van-tabbar-item>
            <van-tabbar-item replace to="/dashboard/category">
                <van-icon name="bars" size="1rem"/>
                <span style="display: block">分类</span>
            </van-tabbar-item>
            <van-tabbar-item replace to="/dashboard/cart" :info="goodsNum>0?goodsNum:''">
                <van-icon name="shopping-cart" size="1rem"/>
                <span style="display: block">购物车</span>
            </van-tabbar-item>
            <van-tabbar-item replace to="/dashboard/mine">
                <van-icon name="manager" size="1rem"/>
                <span style="display: block">我的</span>
            </van-tabbar-item>
        </van-tabbar>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapActions} from "vuex"
    export default {
        name: "DashBoard",
        data() {
            return {
                active: Number(sessionStorage.getItem("tabBarActiveIndex")) || 0,
                icon: {
                    active: 'https://img.yzcdn.cn/vant/user-active.png',
                    inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
                    cart:'https://img.yzcdn.cn/vant/cart-active.png'
                }
            }
        },
        methods:{
            ...mapMutations(["INIT_SHOP_CART"]),
            ...mapActions(["reqUserInfo"]),
        },
        // 监视
        watch:{
            active(value){
                this.active = value;
                let tabBarActiveIndex = value>0 ? value: 0;
                sessionStorage.setItem("tabBarActiveIndex",tabBarActiveIndex);

            }
        },
        //计算属性----从vuex中获取的所有数据都放到computed里面
        computed:{
            //取数据
            ...mapState(["shopCart"]),
            goodsNum(){
                if(this.shopCart){
                    //总的购物车商品数量
                    let num = 0;
                    // console.log(Object.values(this.shopCart));
                    Object.values(this.shopCart).forEach((goods,index)=>{
                        num += goods.num;
                    });
                    return num;
                }else {
                    return 0;
                }
            }
        },
        mounted(){//此钩子，是页面初始化完毕后调用

            //1.自动登陆
            this.reqUserInfo();

            //2.获取购物车的数据
            this.INIT_SHOP_CART();

        },

    }

</script>

<style lang="less" scoped>
    #dashboard{
        width: 100%;
        height: 100%;
        background-color: transparent;
    }
    .van-tabbar--fixed{
        bottom:0rem
    }
    .van-tabbar-item{
        text-align: center;
    }
    .van-tabbar-item--active {
        color: #1989fa;
        //text-align: center;
    }
</style>
