// 将components目录下的所有通用组件进行全局注册
import ImageView from './ImageView/index.vue'
import Sku from './Sku/index.vue'

export const componentPlugin = {
  install (app) {
    // app.component('组件名字'，组件配置对象)
    app.component('GImageView', ImageView)
    app.component('GSku', Sku)
  }
}