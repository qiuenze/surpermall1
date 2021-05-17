<template>
  <div id="tar-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TarBar"
  }
</script>

<style scoped>
  #tar-bar{
    display: flex;
    background-color: #f6f6f6;

    position: fixed;
    bottom:0;
    right:0;
    left:0;
  }

</style>
