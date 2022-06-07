<template>
    <div id="home">
        <div v-if="!showLoading">
            <Header />
            <!--轮播图-->
            <Sowing :sowing_list="sowing_list"/>
            <!--中部导航-->
            <Nav :nav_list="nav_list"/>
            <!--秒杀-->
            <FlashSale :flash_sale_list="flash_sale_list"/>
            <!--猜你喜欢-->
            <YouLike :you_like_list="you_like_list"/>
            <!--返回顶部-->
            <MarkPage v-if="showBackStatus" :scrollToTop="scrollToTop"/>
        </div>
        <van-loading
            v-else
            type="spinner"
            color="#75a342"
            size="24px"
            style="position: absolute;top: 40%;left: 50%;transform: translate(-50%)"
        >
            数据加载中...
        </van-loading>
    </div>
</template>

<script>
    import {getHomeData} from "./../../service/api/index"
    //2.引入组件
    import Header from "./components/header/Header"
    import Sowing from "./components/sowing/Sowing"
    import Nav from "./components/nav/Nav"
    import FlashSale from "./components/flashSale/FlashSale"
    import YouLike from "./components/youlike/YouLike"
    import MarkPage from "./components/markPage/MarkPage"
    //3.引入回到顶部
    import {showBack,animate} from "../../config/global";
    //4.引入消息订阅组件
    import PubSub from "pubsub-js"
    import { Toast } from 'vant';
    //5.引入vuex
    import {mapMutations,mapState} from "vuex"
    //6.引入购物车接口
    import {addGoodsToCart} from "./../../service/api/index"
    export default {
        name: "Home",
        components:{//注册组件
            Header,
            Sowing,
            Nav,
            FlashSale,
            YouLike,
            MarkPage
        },
        data(){
            return {
                //轮播图数据
                sowing_list:[],
                //导航数据
                nav_list:[],
                //秒杀数据
                flash_sale_list:[],
                //猜你喜欢数据
                you_like_list:[],
                //是否显示加载图标
                showLoading:true,
                //是否显示返回顶部的按钮
                showBackStatus:false
            }
        },
        created() {
            //2.请求网络数据
            this.reqData();
        },
        computed:{
            ...mapState(["userInfo"])
        },
        mounted(){
            //订阅消息（添加到购物车的消息）
            PubSub.subscribe("homeAddToCart",(msg,goods)=>{
                if(msg==="homeAddToCart"){
                    //判断用户是否登陆
                    if(this.userInfo.token){//已经登陆
                        this.dealAddGoods(goods);//抽离出来，处理商品的添加
                    }else{
                        //没有登陆
                        this.$router.push("/login")
                    }
                }
            })
        },
        methods:{
            ...mapMutations(["ADD_GOODS"]),//调用ADD_GOODS方法
            async reqData(){
                 let res = await getHomeData();
                console.log(res);
                if(res.success){
                     this.sowing_list = res.data.list[0].icon_list;
                     this.nav_list = res.data.list[2].icon_list;
                     this.flash_sale_list = res.data.list[3].product_list;
                     this.you_like_list = res.data.list[12].product_list;
                     this.showLoading = false;
                     //开始监听滚动
                     showBack((status)=>{
                         this.showBackStatus = status;
                     });
                 }
            },
            scrollToTop(){
                //做缓动动画，返回顶部
                let docB = document.documentElement || document.body;
                animate(docB,{scrollTop:"0"},400,"ease-out");
            },
            //实现商品添加的方法-添加商品到购物车方法 异步
            async dealAddGoods(goods){
                //调用添加到购物车的接口
               let result = await addGoodsToCart(goods.id, goods.name, goods.price, goods.small_image,);
                console.log(result);
                if(result.success_code === 200){
                    //同步本地数据
                    this.ADD_GOODS({//追加
                        goodsId:goods.id,
                        goodsName:goods.name,
                        smallImage:goods.small_image,
                        goodsPrice:goods.price
                    });
                    Toast({
                        message:"添加购物车成功！",
                        duration:800
                    });
                }
            }
        },
        beforeDestroy() {
            PubSub.unsubscribe("homeAddToCart");
        }
    }
</script>

<style lang="less" scoped>
    #home{
        width: 100%;
        height: 300rem;
        background-color: transparent;
    }
</style>
