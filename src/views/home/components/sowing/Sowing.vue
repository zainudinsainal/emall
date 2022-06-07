<template>
    <swiper id="swiper" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="sowing in sowing_list" :key="sowing.public_id">
            <img :src="sowing.icon_url" :alt="sowing.public_name">
        </swiper-slide>

        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        name: "Sowing",
        components: {
            swiper,
            swiperSlide
        },
        props:{
            sowing_list:Array
        },
        data() {
            return {
                swiperOption: {
                    // some swiper options/callbacks
                    // 所有的参数同 swiper 官方 api 参数
                    // ...
                    notNextTick:true,
                    //分页
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    //循环
                    loop: true,
                    //自动切换
                    autoplay: {
                        delay: 1000,
                    },
                    //速度
                    speed:500,
                    //滑动后回调函数
                    on:{
                        slideChangeTransitionEnd(){
                            // console.log(this.activeIndex);
                        },
                    }


                }
            }
        }
    }
</script>

<style scoped>
    #swiper{
        width: 100%;
        height: 12rem;
        background: #ffffff;
    }
    #swiper img{
        width: 100%;
        height: 100%;
    }
    /*穿透修改样式 最高级 一步到位*/
    #swiper >>> .swiper-pagination-bullet-active{
        background: #75a342;
    }
</style>
