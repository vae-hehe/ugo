<template>
  <!-- 搜索 -->
  <div class="search" :class="{focused: focused}">
    <!-- 搜索框 -->
    <div class="input-wrap" @click="goSearch">
      <input
        type="text"
        :placeholder="placeholder"
        v-model="query"
        @input="input"
        @confirm="confirm"
      >
      <span class="cancle" @click.stop="cancleSearch">取消</span>
    </div>
    <!-- 搜索结果 -->
    <div class="content">
      <div class="title">搜索历史<span class="clear" @tap="clear"></span></div>
      <div class="history" v-if="result.length === 0">
        <navigator
          :url="'/pages/list/index?query=' + item"
          v-for="(item, index) in history"
          :key="index"
        >{{item}}</navigator>
      </div>
      <!-- 搜索建议 -->
      <scroll-view scroll-y class="result" v-else>
        <navigator :url="'/pages/goods/index?id=' + item.goods_id" v-for="(item, index) in result" :key="index">{{item.goods_name}}</navigator>
      </scroll-view>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        focused: false,
        placeholder: '',
        // 搜索内容
        query: '',
        // 搜索结果
        result: [],
        // 历史搜索
        history: uni.getStorageSync('history') || []
      }
    },
    methods: {
      // 获取焦点
      goSearch (ev) {
        this.focused = true;
        this.placeholder = '请输入您要搜索的内容';
        
        // 触发父组件自定义事件
        this.$emit('search', {
          pageHeight: uni.getSystemInfoSync().windowHeight
        });

        // 隐藏tabBar
        uni.hideTabBar();
      },

      // 失去焦点
      cancleSearch () {
        this.focused = false;
        this.placeholder = '';

        // 触发父组件自定义事件
        this.$emit('search', {
          pageHeight: 'auto'
        });

        // 显示tabBar
        uni.showTabBar();

        this.query = ""
        this.result = []
      },

      // 获取搜索建议
      async input() {
        // 判断, 输入的是否是空值, 空值则提示用户输入内容
        // if (this.query.trim.length === 0) {
        //   this.result = []
        //   return
        // }
        const {message} = await this.request({
          url: '/api/public/v1/goods/qsearch',
          data: {
            query: this.query
          }
        })
        this.result = message
      },

      // 确认列表, 回车进入确认页面
      confirm() {
        // if (this.query.trim.length === 0) {
        //   uni.showToast({
        //     title: ' 请输入内容',
        //     icon: 'none'
        //   })
        //   return
        // }

        // 添加历史搜索
        // 将查询字符串添加到历史搜索的数组中
        this.history.push(this.query)
        // 使用集合将数组去重
        this.history = [...new Set(this.history)]
        // 存入本地
        uni.setStorageSync('history', this.history)

        uni.navigateTo({
          url: '/pages/list/index?query=' + this.query
        })
      },

      // 清除历史记录
      clear() {
        this.history = []
        uni.setStorageSync('history', this.history)
      }
    },

    onLoad() {
      this.input()
    }
  }
</script>


<style lang="less" scoped>
  .search {
    display: flex;
    flex-direction: column;
    
    // 搜索框
    .input-wrap {
      display: flex;
      height: 100rpx;
      padding: 20rpx 30rpx;
      background-color: #ea4451;
      box-sizing: border-box;
      position: relative;

      &::before,
      &::after {
        height: 44rpx;
        line-height: 1;
        background-image: url(http://static.botue.com/ugo/images/icon_search%402x.png);
        background-size: 32rpx;
        background-position: 6rpx center;
        background-repeat: no-repeat;

        position: absolute;
        top: 28rpx;
        z-index: 9;
      }

      &::before {
        content: '搜索';
        display: block;

        width: 100rpx;
        padding: 11rpx 0 10rpx 44rpx;
        box-sizing: border-box;
        color: #666;
        font-size: 24rpx;
        left: 325rpx;
      }

      &::after {
        display: none;
        content: '';
        width: 44rpx;
        left: 40rpx;
      }

      input {
        flex: 1;
        height: 60rpx;
        padding: 0 20rpx 0 64rpx;
        background-color: #fff;
        border-radius: 8rpx;
        font-size: 24rpx;
        color: #666;
      }

      span.cancle {
        display: none;
        width: 80rpx;
        text-align: right;
        line-height: 60rpx;
        font-size: 27rpx;
        color: #666;
      }
    }

    // 搜索结果
    .content {
      display: none;
      flex: 1;
      padding: 27rpx;
      background-color: #fff;
      position: relative;

      .title {
        font-size: 27rpx;
        line-height: 1;
        color: #333;
      }

      .clear {
        display: block;
        width: 27rpx;
        height: 27rpx;
        float: right;
        background-image: url(http://static.botue.com/ugo/images/clear.png);
        background-size: cover;
      }

      .history {
        padding-top: 30rpx;

        navigator {
          display: inline-block;
          line-height: 1;
          padding: 15rpx 20rpx 12rpx;
          background-color: #ddd;
          font-size: 24rpx;
          margin-right: 20rpx;
          margin-bottom: 15rpx;
          color: #333;
        }
      }

      .result {
        // display: none;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #fff;

        navigator {
          line-height: 1;
          padding: 20rpx 30rpx;
          font-size: 24rpx;
          color: #666;
          border-bottom: 1px solid #eee;

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
    
    // 获得焦点状态
    &.focused {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 9;

      .input-wrap {
        background-color: #eee;

        &::before {
          display: none;
        }

        &::after {
          display: block;
        }
      }

      span.cancle {
        display: block;
      }

      .content {
        display: block;
      }
    }
  }
</style>