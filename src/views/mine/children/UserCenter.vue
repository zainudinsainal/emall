<template>
    <div id="userCenter">
        <van-nav-bar
                title="用户中心"
                left-arrow
                :fixed=true
                :border=true
                @click-left="$router.go(-1)"
        ></van-nav-bar>
        <div class="logout">
            <button class="logout" @click.prevent="logOut">退出登陆</button>
        </div>
    </div>
</template>

<script>
    import { getLogOut } from "./../../../service/api/index"
    import { mapMutations } from "vuex"
    import { Toast } from 'vant'
    export default {
        name: "UserCenter",
        methods:{
            ...mapMutations(["RESET_USER_INFO","CLEAR_CART"]),
            async logOut(){
                let result = await getLogOut();
                if(result.success_code===200){
                    //清空本地的数据
                    this.RESET_USER_INFO();
                    //清空本地的购物车
                    this.CLEAR_CART();
                    Toast({
                        message:"退出成功",
                        duration:500
                    });
                }
            }
        }
    }
</script>

<style scoped>
    #userCenter{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 200;
        background-color: #f5f5f5;
    }
    .logout{
        height: 3rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        margin-top: 2.5rem;
        border: 0;
        outline: none;
    }
    .logout button{
        height: 3rem;
        background-color: #ffffff;
    }
</style>
