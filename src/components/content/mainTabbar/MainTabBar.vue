<template>
  <tar-bar class="tar-bar">
    <tar-bar-item path="home">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-isActive" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tar-bar-item>

    <tar-bar-item path="category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-isActive" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tar-bar-item>

    <tar-bar-item path="cart" >
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="item-icon-isActive" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tar-bar-item>

    <tar-bar-item path="profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-isActive" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tar-bar-item>
  </tar-bar>
</template>

<script>
  import TarBar from "../../common/tabbar/TarBar";
  import TarBarItem from "../../common/tabbar/TarBarItem";

  export default {
    name: "MainTabBar",
    components: {
      TarBar,
      TarBarItem
    }
  }
</script>

<style scoped>
  .tar-bar{
    z-index: 9;
  }
</style>
