<template lang="wxml">
<view class="search-container" :class="{'focus': showHistory}">
  
  <!-- 搜索框 -->
  <view class="search">
	<input type="text" @focus="focus" />
    <view class='cancel' @click="blur">取消</view>
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
      showHistory: false // 是否显示历史搜索页面
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    focus() {
      this.showHistory = true
    },
    blur() {
      this.showHistory = false
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
    input {
      height: 60rpx;
      background-color: #fff;
      border-radius: 10rpx;
    }
    .cancel {
      display: none;
    }
  }


  .history {
    display: none;
  }
}

// 获取焦点的时候
.focus {
  .search {
    background-color: #eeeeee;
    padding: 20rpx 16rpx;
    display: flex;
    input {
      flex: 1;
      height: 60rpx;
      background-color: #fff;
      border-radius: 10rpx;
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
  }


  .history {
    display: block;
  } 
}
</style>
