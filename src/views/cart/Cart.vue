<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{carLength}})</div>
    </nav-bar>
    <!--商品列表-->
    <cart-list/>
    <!--汇总-->
    <cart-buttom-bar/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import NavBar from "components/common/navbar/NavBar";

  import CartList from "./childcomponents/CartList";
  import CartButtomBar from "./childcomponents/CartButtomBar";

    export default {
      name: "Cart",
      components:{
        CartList,
        NavBar,
        CartButtomBar
      },
      computed:{
        ...mapGetters(['carLength'])
      }
    }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
