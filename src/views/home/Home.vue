<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <good-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodList'
  import Scroll from 'components/common/scroll/Scroll'

  import HomeSwiper from './childcomps/HomeSwiper'
  import RecommendView from './childcomps/RecommendView'
  import FeatureView from './childcomps/FeatureView'

  import {itemListenerMixin,backTopMixin}  from 'common/mixin'

  import {getHomeMultidata,getHomeGoods} from 'network/home'

  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodList,
      Scroll,
    },
    mixins:[
      itemListenerMixin,
      backTopMixin
    ],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType:'pop',
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        itemImgListener:null
      }
    },
    computed:{
      //获取goods中其中之一的数据
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 10)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //保存Y值
      this.saveY = this.$refs.scroll.getscrollY()
      //取消全局事件的监听,这个事件是GoodListItem的事件
      this.$bus.$off('imageLoad',this.itemImgListener)
    },
    mounted() {
      // const refresh = debounce(this.$refs.scroll.refresh,50)
      // //单独的$bus无任何作用,需要用原型将其赋值为一个Vue实例，便可用实例来接受事件和发送事件
      // // 接受事件总线事件
      // this.itemImgListener = ()=>{
      //   refresh()
      // }
      // this.$bus.$on('imageLoad',this.itemImgListener)
    },
    methods:{
      /**
       *事件监听相关方法
       * */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        //将两个tabcontrol的选择保持一致
        this.$refs.tabControl1.currentIndex=index;
        this.$refs.tabControl2.currentIndex=index;
      },
      contentScroll(position){
        //得到isShowBackTop的布尔值,决定是否隐藏backTop
        this.listenShowBackTop(position)

        //决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //加载更多图片
      loadMore(){
        // console.log('加载更多');
        this.getHomeGoods(this.currentType)
      },

      //轮播图完成后再获取tabControl的offsetTop值
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        // console.log(this.tabOffsetTop);
      },



      /**
       *网络请求相关的方法tt
       * */
      //请求home-swiper和recommend-view中的数据
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          //不加finishPullUp()方法只能请求一次
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    position:relative;
    height:100vh;
  }

  .home-nav{
    background-color:var(--color-tint);
    color:#ffffff;

    /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*top: 0;*/
    /*right: 0;*/
    /*left: 0;*/
    /*z-index: 1;*/
  }
  .tab-control{
    position: relative;
    top:-1px;
    z-index:9;
  }

  .content{
    overflow: hidden;

    position:absolute;
    top:44px;
    bottom:49px;
    right:0;
    left:0;
  }
</style>
