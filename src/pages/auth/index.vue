<template>
  <view>
    <button type="primary" @getuserinfo="btn_getUserInfo" open-type="getUserInfo">微信登录</button>
  </view>
</template>

<script>
  export default {
    methods: {
      // 1. 使用 JS api 获取 信息
      async JS_getUserInfo() {
        const [err, res] = await uni.getUserInfo()
        console.log(res) // res 是 undefined 说明,没有授权获取, 使用 用户点击获取
        if (res) {
          // 如果存在, 传入获取 token 的函数
          this.get_token(res)
        }
      },
      // 2. 用户点击获取token需要的数据
      btn_getUserInfo(e) {
        console.log(e.detail)
        this.get_token(e.detail)
      },

      // 3. 获取token
      // 前两个都是获取token值
      async get_token(four) {
        console.log(four)
        // 获取最后一个 code 值
        const [err, codeObj] = await uni.login()
        console.log(codeObj)
        // 请求token信息
        const {message, meta} = await this.request({
          url: '/api/public/v1/users/wxlogin',
          method: 'POST',
          data: {
            encryptedData: four.encryptedData,
            iv: four.iv,
            rawData: four.rawData,
            signature: four.signature,
            code: codeObj.code
          }
        })
        // 此时message是null, 因为必须使用企业的appid
        console.log(message)

        if (meta.status === 200) {
          // 存入token
          uni.setStorageSync('token', message.token)
          uni.navigateBack()
        }
      }
    },

    onLoad() {
      this.JS_getUserInfo()
    }
  }
</script>

<style lang="less" scoped>
  button {
    width: 600rpx;
    margin: 200rpx auto 0;
  }
</style>