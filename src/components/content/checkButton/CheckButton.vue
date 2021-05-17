<template>
  <div>
    <div class="check-button" :class="{check: isCheck}">
      <img src="~assets/img/cart/tick.svg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
      isCheck:{
        type:Boolean,
        default:false
      }
    }

  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #aaa;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .check{
    background-color: red;
    border:2px solid red;
  }

</style>
