import {
  ADD_COUNTER,
  ADD_TO_CAR
} from './mutations-types'
export default {
  addCart(context,payload){
    return new Promise((resolve,reject) => {
      // 方法一
      //用iid判断数组中是否存在当前商品
      const OldProduct = context.state.carList.find(item => item.iid === payload.iid)
      //方法二
      // let OldProduct= null
      // for (let item in state.carList) {
      //   if (item.iid === payload.iid){
      //     OldProduct = item;
      //   }
      // }
      if (OldProduct){
        context.commit(ADD_COUNTER,OldProduct)
        resolve('商品数量+1')
      }else{
        payload.count = 1
        context.commit(ADD_TO_CAR,payload)
        resolve('添加商品成功')
      }
    })
  }
}
