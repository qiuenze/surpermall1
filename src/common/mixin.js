import {debounce} from "./utils"
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('imageLoad',this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
   BackTop
  },
  data(){
    return{
      isShowBackTop: false
    }
  },
  methods:{
    //返回顶部方法操作
    backClick(){
      this.$refs.scroll.scrollTo(0, 0,300);
    },
    listenShowBackTop(position){
      this.isShowBackTop = (-position.y) > 1000
    }
  }


 }
