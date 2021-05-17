<template>
  <swiper class="detail-item">
    <swiper-item v-for="item in topImages" >
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>

  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props: {
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detail-item{
    height: 300px;

  }
</style>
