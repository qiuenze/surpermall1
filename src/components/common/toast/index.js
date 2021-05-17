import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
  //1.创建构造器
  const toastConstructor = Vue.extend(Toast)
  //2.根据构造器,创建组件对象
  const toast = new toastConstructor()
  //3.将组件对象挂载到某一元素
  toast.$mount(document.createElement('div'))
  //4.toast.$el就是div了，将div挂载到body上
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
}

export default obj
