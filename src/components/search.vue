<template lang="wxml">
<view class="search-container" :class="{'focus': showHistory}">
  
  <!-- 搜索框 -->
  <view class="search">
	<input type="text" @focus="focus" :placeholder="placeholder" />
    <view class='cancel' @click="blur">取消</view>

    <!-- 图标1 -->
    <view class="icon_1">搜索</view>
    <view class="icon_2"></view>
  </view>

  <view class="history">1</view>

</view>
</template>

<script>
export default {
  name: 'SearchIndex',
  components: {},
  props: {},
  data () {
    return {
      showHistory: false, // 是否显示历史搜索页面
      placeholder: "" // 获取焦点的时候, 输入框默认没有数据
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    focus() {
      this.showHistory = true
      this.placeholder = "请输入要搜索的商品"

      // 获取窗口的高度
      var obj = uni.getSystemInfoSync()
      this.$emit('windowHeight', obj.windowHeight + "px")

    },
    blur() {
      this.showHistory = false
      this.placeholder = ""

      // 如果失去焦点的话, 默认页面还是会出现滚动条
      this.$emit('windowHeight', "")
    }
  }
}
</script>

<style lang="less">
// 默认状态下, 搜索框中内容的显示状态
.search-container {

  
  .search {
    background-color: #ff2d4a;
    padding: 20rpx 16rpx;
    position: relative;
    input {
      height: 60rpx;
      background-color: #fff;
      border-radius: 10rpx;
    }
    .cancel {
      display: none;
    }

    // 图标
    .icon_1 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      // 只能使用网络地址 或者 base64 数据流
      background: url(http://static.botue.com/ugo/images/icon_search%402x.png) no-repeat;
      background-size: 32rpx;
      padding-left: 50rpx;
      font-size: 24rpx;
      color: #bbbbbb;
    }
    .icon_2 {
      display: none;
    }
  }


  .history {
    display: none;
  }
}

// 获取焦点的时候
.focus {
  z-index: 9999;
  position: absolute;
  width: 100%;
  height: 100%;
  .search {
    background-color: #eeeeee;
    padding: 20rpx 16rpx;
    display: flex;
    position: relative;
    input {
      flex: 1;
      height: 60rpx;
      background-color: #fff;
      border-radius: 10rpx;
      font-size: 24rpx;
      color: #808080;
      padding-left: 80rpx;
    }
    .cancel {
      display: block;
      width: 160rpx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      color: #333333;
      font-size: 29rpx;
      border: 1px solid #bebebe;
      border-radius: 10rpx;
      margin-left: 10rpx;
    }

    // 图标
    .icon_1 {
      display: none;
    }
    .icon_2 {
      display: block;
      position: absolute;
      top: 50%;
      left: 50rpx;
      transform: translateY(-50%);
      width: 32rpx;
      height: 32rpx;
      background: url(http://static.botue.com/ugo/images/icon_search%402x.png) no-repeat;
      background-size: 32rpx;
      padding-left: 50rpx;
    }
  }

  // 历史搜索页面应该显示一整个窗口
  // 此时出现问题: 页面有滚动条, 因为页面覆盖在首页上, 所以会出现滚动条问题
  // 父子组件之间通信
  .history {
    display: block;
    background-color: pink;
    position: absolute;
    top: 88rpx;
    bottom: 0;
    left: 0;
    right: 0;
  } 
}
</style>
