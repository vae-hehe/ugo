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
	<navigator>
	  <image src="../../static/uploads/icon_index_nav_1@2x.png" />
	</navigator>
	<navigator>
	  <image src="../../static/uploads/icon_index_nav_2@2x.png" />
	</navigator>
	<navigator>
	  <image src="../../static/uploads/icon_index_nav_3@2x.png" />
	</navigator>
	<navigator>
	  <image src="../../static/uploads/icon_index_nav_4@2x.png" />
	</navigator>
  </view>

  <!-- 楼层数据 -->
  <view class="floors">

    <!-- 第一层 -->
	<view class="floor">
	  <view class="title">
		<navigator>
			<image src="../../static/uploads/pic_floor01_title.png" />
		</navigator>
	  </view>
	  <view class="imgs_1">
		<navigator>
			<image src="../../static/uploads/pic_floor01_1@2x.png" />
		</navigator>
		<navigator>
			<image src="../../static/uploads/pic_floor01_2@2x.png" />
		</navigator>
		<navigator>
			<image src="../../static/uploads/pic_floor01_3@2x.png" />
		</navigator>
		<navigator>
			<image src="../../static/uploads/pic_floor01_4@2x.png" />
		</navigator>
		<navigator>
			<image src="../../static/uploads/pic_floor01_5@2x.png" />
		</navigator>
	  </view>
	</view>

	<!-- 第二层 -->
	<view class="floor">
	  <view class="title">
		<navigator>
			<image src="../../static/uploads/pic_floor02_title.png" />
		</navigator>
	  </view>
	  <view class="imgs">
		<navigator>
			<image src="../../static/uploads/pic_floor02_1@2x.png" />
		</navigator>
		<navigator>
			<image src="../../static/uploads/pic_floor02_2@2x.png" />
		</navigator>
		<navigator>
			<image src="../../static/uploads/pic_floor02_3@2x.png" />
		</navigator>
		<navigator>
			<image src="../../static/uploads/pic_floor02_4@2x.png" />
		</navigator>
		<navigator>
			<image src="../../static/uploads/pic_floor02_5@2x.png" />
		</navigator>
	  </view>
	</view>

	<!-- 第三层 -->
    <view class="floor">
	  <view class="title">
		<navigator>
			<image src="../../static/uploads/pic_floor03_title.png" />
		</navigator>
	  </view>
	  <view class="imgs">
		<navigator>
			<image src="../../static/uploads/pic_floor03_1@2x.png" />
		</navigator>
		<navigator>
			<image src="../../static/uploads/pic_floor03_2@2x.png" />
		</navigator>
		<navigator>
			<image src="../../static/uploads/pic_floor03_3@2x.png" />
		</navigator>
		<navigator>
			<image src="../../static/uploads/pic_floor03_4@2x.png" />
		</navigator>
		<navigator>
			<image src="../../static/uploads/pic_floor03_5@2x.png" />
		</navigator>
	  </view>
	</view>

  </view>
</view>
</template>


<script>
import SearchIndex from "../../components/search"
export default {
  data() {
	return {
		height: "", // 高度默认是空
		swiper_arr: []
	}
  },
  components: {
    SearchIndex
  },
  onLoad() {
	this.get_swiper()	
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
	}
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
</style>
