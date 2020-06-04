<template>
  <view :style="{height: pageHeight, overflow: 'hidden'}">
	<!-- 搜索框 -->
    <search @search="disableScroll" />

    <!-- 轮播图 -->
    <swiper class="banner" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff">
      <swiper-item v-for="item in swiper" :key="item.goods_id">
        <navigator :url="'/pages/goods/index?id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 导航条 -->
    <view class="navs">
      <navigator
	    open-type="switchTab"
		url="/pages/category/index"
		v-for="(item, index) in nav_list"
		:key="index"
	  >
        <image :src="item.image_src"></image>
      </navigator>
    </view>

    <!-- 楼层 -->
    <view class="floors">

      <view class="floor" v-for="(item, index) in floors" :key="index">
        <view class="title">
          <image :src="item.floor_title.image_src"></image>
        </view>
        <view class="items">
          <navigator :url="one.navigator_url" v-for="(one, index) in item.product_list" :key="index">
            <image :src="one.image_src"></image>
          </navigator>
        </view>
      </view>

    </view>

    <!-- 回到顶部 -->
    <view
	  class="goTop icon-top"
	  @tap="goTop"
	  v-if="scrollTop > 100"
	></view>
  </view>
</template>

<script>
  import search from '@/components/search';

  export default {

    data () {
      return {
		pageHeight: 'auto',
		swiper: [],
		nav_list: [],
		floors: [],
		scrollTop: 0
      }
    },

    components: {
      search
    },
    
    methods: {
      disableScroll (ev) {
        this.pageHeight = ev.pageHeight + 'px';
	  },
	  
	  // 获取轮播图
	  async get_swiper() {
		const {message} = await this.request({
		  url: '/api/public/v1/home/swiperdata'
		})
		this.swiper = message
	  },

	  // 导航
	  async get_nav() {
		const {message} = await this.request({
		  url:'/api/public/v1/home/catitems'
		})
		this.nav_list = message
	  },

	  // 楼层
	  async get_floors() {
		const {message} = await this.request({
		  url: '/api/public/v1/home/floordata'
		})
		this.floors = message
	  },
	  
	  // 回到顶部
	  goTop() {
		uni.pageScrollTo({
		  scrollTop: 0
		})
	  }
	},
	
	onLoad() {
	  this.get_swiper(),
	  this.get_nav(),
	  this.get_floors()
	},

	// 滚动距离, 回调函数
	onPageScroll(e) {
	  this.scrollTop = e.scrollTop
	},

	onPullDownRefresh() {
	  this.get_swiper(),
	  this.get_nav(),
	  this.get_floors()
	  // 停止刷新
	  uni.stopPullDownRefresh()
	}
  }
</script>

<style scoped lang="less">
  .banner {
    width: 100%;
    height: 340rpx;

    image {
      width: 100%;
      height: 340rpx;
    }
  }

  .navs {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 44rpx;

    image {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor {

    .title {
      width: 750rpx;
      height: 60rpx;
      padding: 20rpx 0 0 8rpx;
      background-color: #f4f4f4;
    }

    .items {
      padding: 20rpx 16rpx;
      overflow: hidden;

      navigator {
        width: 193rpx;
        height: 188rpx;
        margin-left: 10rpx;
        margin-bottom: 10rpx;
        float: left;
      }

      navigator:first-child {
        width: 232rpx;
        height: 386rpx;
        margin-left: 0rpx;
      }

      navigator:nth-child(2),
      navigator:nth-child(5) {
        width: 273rpx;
      }
    }

    &:first-child {

      .items {

        navigator {
          width: 233rpx;
        }
      }
    }
  }

  .goTop {
    position: fixed;
    bottom: 30rpx;
    /* #ifdef H5 */
    bottom: 65px;
    /* #endif */
    right: 30rpx;
  
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100rpx;
    height: 100rpx;
    font-size: 48rpx;
    color: #666;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
  }
</style>