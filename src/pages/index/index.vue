<template lang="wxml">
<view class="content" :style="{'height': height, 'overflow': 'hidden'}">
  <!-- 搜索框 -->
  <search-index @windowHeight="windowHeight"></search-index>

  <!-- 轮播图 -->
  <swiper class="swiper"
    indicator-dots
	indicator-color="rgba(255,255,255,.3)"
	indicator-active-color="#fff"
	autoplay
	interval="2000"
	circular
  >
	<swiper-item
	  class="item"
	  v-for="(item, index) in swiper_arr"
	  :key="index"
	>
	  <image :src="item.image_src" />
	</swiper-item>
  </swiper>

  <!-- 导航栏 -->
  <view class="nav">
	<navigator v-for="(item, index) in nav_arr" :key="index">
	  <image :src="item.image_src" />
	</navigator>
  </view>

  <!-- 楼层数据 -->
  <view class="floors">

	<view
	  class="floor"
	  v-for="(item, index) in list"
	  :key="index"
	>
	  <view class="title">
		<navigator>
			<image :src="item.floor_title.image_src" />
		</navigator>
	  </view>
	  <view class="imgs_1">
		<navigator v-for="one in item.product_list" :key="one.name">
			<image :src="one.image_src" />
		</navigator>
	  </view>
	</view>

  </view>

  <!-- 回到顶部 -->
  <view class="top" @click="goTop" v-if="scrollTop > 200">
	<icon type="top" size="23" />
  </view>
</view>
</template>


<script>
import SearchIndex from "../../components/search"
export default {
  data() {
	return {
		height: "", // 高度默认是空
		swiper_arr: [],
		nav_arr: [],
		list: [],
		scrollTop: 0
	}
  },
  components: {
    SearchIndex
  },
  onLoad() {
	this.get_swiper(),
	this.get_nav(),
	this.get_floors()
  },
  methods: {
	// 执行事件函数
    windowHeight(e) {
	  console.log(e)
	  this.height = e 
	},

	// 渲染轮播图
	// async get_swiper() {
	//   const [err, res] = await uni.request({
	// 	url: 'https://api-ugo-web.itheima.net/api/public/v1/home/swiperdata'
	//   })
	//   console.log(res)
	//   this.swiper = res.data.message
	// }


	async get_swiper() {
	  const {message} = await this.request({
		url: '/api/public/v1/home/swiperdata'
	  })
	//   console.log(res)
	  this.swiper_arr = message
	},

	async get_nav() {
	  const {message} = await this.request({
		url: '/api/public/v1/home/catitems'
	  })
	  this.nav_arr = message
	},

	async get_floors() {
	  const {message} = await this.request({
		url: '/api/public/v1/home/floordata'
	  })
	  this.list = message
	},

	goTop() {
	  // 将页面滚动到指定位置
      uni.pageScrollTo({
		scrollTop: 0
	  })
	}
  },
  onPageScroll(e) {
	this.scrollTop = e.scrollTop
  }
}
</script>

<style lang="less">

.swiper {
  image {
	width: 750rpx;
	height: 340rpx;
  }
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  image {
	width: 128rpx;
	height: 128rpx;
	margin-top: 14rpx;
	margin-bottom: 29rpx;
  }
}

.floor {
  .title {
	image {
	  width: 750rpx;
	  height: 90rpx;
	}
  }
  .imgs {
	padding: 20rpx 16rpx;
	overflow: hidden;
	navigator {
	  float: left;
	  image {
		width: 100%;
		height: 100%;
	  }
	}
	navigator:nth-child(1) {
	  width: 232rpx;
	  height: 386rpx;
	  margin-right: 10rpx;
	}
	navigator:nth-child(2),navigator:nth-child(5) {
	  width: 273rpx;
	  height: 188rpx;
	}
	navigator:nth-child(3),navigator:nth-child(4) {
	  width: 203rpx;
	  height: 188rpx;
	}
	navigator:nth-child(2),navigator:nth-child(4) {
	  margin-right: 10rpx;
	}
	navigator:nth-child(2),navigator:nth-child(3) {
	  margin-bottom: 10rpx;
	}
  }
  .imgs_1 {
	padding: 20rpx 16rpx;
	overflow: hidden;
	navigator {
	  float: left;
	  image {
		width: 100%;
		height: 100%;
	  }
	}
	navigator:nth-child(1) {
	  width: 232rpx;
	  height: 386rpx;
	  margin-right: 10rpx;
	}
	navigator {
	  width: 238rpx;
	  height: 188rpx;
	}
	navigator:nth-child(2),navigator:nth-child(4) {
	  margin-right: 10rpx;
	}
	navigator:nth-child(2),navigator:nth-child(3) {
	  margin-bottom: 10rpx;
	}
  }
}

.top {
  position: fixed;
  right: 40rpx;
  bottom: 30rpx;
  width: 100rpx;
  height: 100rpx;
//   background-color: #fff ;
  border-radius: 50%;
  background: rgba(255, 255, 255, .8);
}
</style>
