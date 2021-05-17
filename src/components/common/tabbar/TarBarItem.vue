<template>
  <div class="tar-bar-item" @click="itemClick()">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-isActive"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:{
        type: String
      },
      activeColor:{
        type: String,
        default:'red'
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return this.isActive ? {color: this.activeColor} :{}
      }
    }
    ,
    data(){
      return{
        // isActive:false
      }
    }
  }
</script>

<style scoped>
  .tar-bar-item{
    flex:1;
    text-align: center;
    margin-top: 3px;
    height:49px;
    font-size: 14px;
  }

  .tar-bar-item img{
    height:24px;
    width:24px;
    vertical-align:middle;
    margin-bottom: 3px;
  }


</style>
