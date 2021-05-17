<template>
<div id="detail">
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
  <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @detailImage="detailImage"/>
    <detail-param-info :param-info="paramInfo" ref="params"/>
    <detail-comment-info :comment-info="commentInfo" ref="comment"/>
    <good-list :goods="recommend" ref="recommend"/>
  </scroll>
  <detail-bottom-bar @addToCart="addToCart"/>
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
</div>
</template>

<script>
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

  import {debounce} from "common/utils";

  import DetailSwiper from './childcomponents/DetailSwiper'
  import DetailNavBar from './childcomponents/DetailNavBar'
  import DetailBaseInfo from "./childcomponents/DetailBaseInfo"
  import DetailShopInfo from "./childcomponents/DetailShopInfo"
  import DetailGoodsInfo from "./childcomponents/DetailGoodsInfo"
  import DetailParamInfo from "./childcomponents/DetailParamInfo"
  import DetailCommentInfo from "./childcomponents/DetailCommentInfo"
  import DetailBottomBar from "./childcomponents/DetailBottomBar"

  import GoodList from "components/content/goods/GoodList"
  import {itemListenerMixin ,backTopMixin}  from 'common/mixin'

  import Scroll from "components/common/scroll/Scroll"

  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodList,
      Scroll
    },
    mixins:[
      itemListenerMixin,
      backTopMixin
    ],
    data(){
      return {
        iid:null,
        topImages:[],
        recommend:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo: {},
        itemImgListener:null,
        themeTopYs:[0,1000,2000,3000],
        getThemeTopY:null,
        positionY:0,
        currentIndex:0
      }
    },
    mounted() {
    },
    destroyed(){
      //取消全局事件，这个事件是GoodListItem的事件
      this.$bus.$off('imageLoad',this.itemImgListener)
    },
    created(){
      //1.将传入的iid保存
      this.iid = this.$route.params.iid
      //2.根据iid获取顶部图片
      getDetail(this.iid).then(res =>{
        // console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages

        //3.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //4.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //5.保存商品的详情数据
        this.detailInfo = data.detailInfo

        //6.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //7.保存评论数据
        if(data.rate.list !== 0){
          this.commentInfo = data.rate.list[0]
        }


      })
      getRecommend().then(res => {
        console.log(res);
        this.recommend = res.data.list
      })

      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //添加一个最大值后面if判断
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      },100)

    },
    methods:{
      ...mapActions([
        'addCart'
      ]),
      detailImage(){
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],20)
      },
      contentScroll(position){
        //返回为正数，加负号
        this.positionY = -position.y;
        // console.log(this.positionY);
        let lenth = this.themeTopYs.length
        for (let i= 0; i< lenth-1;i++){
          if (this.currentIndex !== i &&(this.positionY >= this.themeTopYs[i] &&
            this.positionY < this.themeTopYs[i+1])){
            this.currentIndex = i;
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        //点击标签是否回到顶部
        this.listenShowBackTop(position)
      },
      addToCart(){
        //1.请求购物车信息
        const product = {}
        product.iid = this.iid
        product.imgURL = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        //2.将商品加入购物车
        // this.$store.dispatch('addCart',product).then(res =>{
          // this.show = true;
          // this.message = res;
          //
          // setTimeout(() => {
          //   this.show = false;
          //   this.message = '';
          // },1500)
        //   this.$toast.show(res ,2000)
        // })
        this.addCart(product).then(res => {
          this.$toast.show(res ,2000)
        })
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: white;
    top:-1px;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
</style>
