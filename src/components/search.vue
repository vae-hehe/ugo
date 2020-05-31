<template>
<view class="search-container">
  
  <!-- 搜索框 -->
  <view class="search">
	<input type="text" />
  </view>


</view>
</template>

<script>
export default {
  name: 'SearchIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less">
.search {
  background-color: #ff2d4a;
  padding: 20rpx 16rpx;
  input {
	height: 60rpx;
	background-color: #fff;
	border-radius: 10rpx;
  }
}
</style>
