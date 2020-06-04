// 导出函数

export default function(Vue) {
  // Vue 构造函数: 只要在 Vue 构造函数原型对象上面设置方法, 那么所有的 Vue 实例都可以直接使用该方法  this.XXX
  // 不同的请求路径 作为形参, 拼接到基础路径上面 = 完整路径
  Vue.prototype.request = async function(opts) {
      // 基础路径
      var baseUrl = "https://api-ugo-web.itheima.net"

      //  加载
      uni.showLoading({
        title: '加载中...',
        mask: true
      })

      // 封装请求, uni-app 支持 promise async await处理
      const [err, res] = await uni.request({
        url: baseUrl + opts.url,
        data: opts.data
      })

      // 结束加载
      uni.hideLoading()
      
      // 简化返回数据的格式
      return res.data

  }

}