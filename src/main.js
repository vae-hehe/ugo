import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// Vue 是构造函数
// 在构造函数的原型对象(prototype)上新设置一个函数, 那么所有实例对象都可以直接使用这个函数
// 得出: 只要在 Vue 构造函数原型对象上面设置方法, 那么所有的 Vue 实例化都可以直接使用该方法  this.XXX

// Vue 基础语法: 基础用和以前使用的不冲突
// 基础用法, use可以直接跟 参数: 是函数
//                       函数里会得到形参, 形参就是 Vue

// 配置插件:
// 一般用法, 插件一般是单独的JS方法
// 一会: 把 use() 里面的函数, 单独写在 JS文件内, 文件内可以得到 Vue 构造函数
// 单独把得到 JS 文件导入 main.js 内
// console.log(Vue)   

import request from './utils/request'                 
Vue.use(request)

const app = new Vue({
  ...App
})
app.$mount()
