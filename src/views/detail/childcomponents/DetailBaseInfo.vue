<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">
      <span>{{goods.title}}</span>
    </div>
    <div class="info-price">
      <span>{{goods.newPrice}}</span>
      <span>{{goods.oldPrice}}</span>
      <span>{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <span class="info-services-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>

</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods:{
        type:Object,
        default(){
        return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info{
    margin-top: 15px;
    padding:0 8px;
    color: #999;
    border-bottom:5px solid #f2f5f8;
  }

  .info-title{
    color: #0f0202;
  }

  .info-price{
    margin-top: 10px;

  }

  .info-price :nth-child(1){
    font-size: 24px;
    color: var(--color-high-text);
  }

  .info-price :nth-child(2){
    font-size: 13px;
    margin-left: 5px;
    /*划线*/
    text-decoration: line-through;
  }

  .info-price :nth-child(3){
    color: #ffffff;
    padding: 2px 5px;
    background: var(--color-high-text);
    margin:0 5px;
    border-radius: 8px;
    font-size: 14px;

    position: relative;
    top: -8px;
  }

  .info-other{
    display: flex;
    margin-top: 15px;
    line-height: 30px;
    font-size: 13px;
    border-bottom: 2px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }

  .info-services{
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }

  .info-services-item img{
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }

  .info-services-item span{
    font-size: 13px;
    color: #333;
  }

</style>
