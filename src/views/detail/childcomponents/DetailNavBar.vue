<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             class="title-item"
             :class='{active:index==currentIndex}'
             @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    data(){
      return {
        titles:['商品','参数','评论','详情'],
        currentIndex:0
      }
    },
    methods:{
      backClick(){
        this.$router.back()
      },
      titleClick(index){
        this.currentIndex = index
        this.$emit('titleClick',index)
      }
    }
  }
</script>

<style scoped>

  .title{
    display: flex;
  }
  .title-item{
    flex: 1;
  }
  .back img{
    vertical-align: middle;
  }
  .active{
    color: var(--color-high-text);
  }

</style>
