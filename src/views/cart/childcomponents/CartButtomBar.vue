<template>
  <div class="bottom-bar">
    <div class="check-content">
    <check-button class="check-button"
                 :is-check="isSelectAll"
                 @click.native="checkBtnClick"></check-button>

    <span class="all">全选</span>
    </div>
    <div class="total-price">合计:{{totalPrice}}</div>
    <div class="buy-product" @click="calcClick">去计算({{length}})</div>
  </div>
</template>

<script>
  import CheckButton from  'components/content/checkButton/CheckButton'
  import {mapGetters} from 'vuex'
  export default {
    name: "CartButtomBar",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters([
        'carLength',
        'carList'
      ]),
      totalPrice(){
        return '￥' + this.$store.getters.carList.filter(item => {
          return item.checked
        }).reduce((PreValue,item) => {
          return PreValue + item.price* item.count
        },0).toFixed(2)
      },
      isSelectAll(){
        if (this.$store.getters.carList.length === 0) return false
        for (let item of this.$store.getters.carList) {
          if (!item.checked){
            return false
          }
        }
        return true
      },
      length(){
        return this.$store.getters.carList.filter(item =>{ return item.checked}).length
      }
    },
    methods:{
      checkBtnClick() {
        if (this.isSelectAll){
          this.$store.getters.carList.forEach(item => item.checked = false)
        }else {
          this.$store.getters.carList.forEach(item => item.checked = true)
        }

      },
      calcClick(){
        if(!this.isSelectAll ){
          this.$toast.show('请选择购买的商品',2000)
        }
      }

    }
  }
</script>

<style scoped>
  .bottom-bar{
    display: flex;
    height: 40px;
    position: relative;
    line-height: 40px;
    background-color: #eeeeee;
  }

  .check-content{
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: 90px;
  }

  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 10px;
  }
  .total-price{
    flex: 1;
    margin-left: 20px;
  }
  .buy-product{
    width: 90px;
    background-color: red;
    text-align: center;
  }
</style>
