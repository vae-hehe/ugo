<template>
  <view class="wrapper">
    <!-- 收货信息 -->
    <view class="shipment">
      <block v-if="addr">
        <view class="dt">收货人: </view>
        <view class="dd meta">
          <text class="name">{{addr.userName}}</text>
          <text class="phone">{{addr.telNumber}}</text>
        </view>
        <view class="dt">收货地址:</view>
        <view class="dd">{{addr.addr_detail}}</view>
      </block>

      <button type="primary" @tap="get_addr" v-else>当点击获取收货地址</button>
    </view>
    <!-- 购物车 -->
    <view class="carts">
      <view class="item">
        <!-- 店铺名称 -->
        <view class="shopname">优购生活馆</view>
        <view class="goods" v-for="(item, index) in data" :key="item.goods_id">
          <!-- 商品图片 -->
          <image class="pic" :src="item.goods_small_logo"></image>
          <!-- 商品信息 -->
          <view class="meta">
            <view class="name">{{item.goods_name}}</view>
            <view class="price">
              <text>￥</text>{{item.goods_price}}<text>.00</text>
            </view>
            <!-- 加减 -->
            <view class="amount">
              <text class="reduce" @tap="change(index, -1)">-</text>
              <input type="number" :value="item.goods_number" class="number">
              <text class="plus" @tap="change(index, 1)">+</text>
            </view>
          </view>
          <!-- 选框 -->
          <view class="checkbox">
            <icon
              type="success"
              size="20"
              :color="item.goods_checked ? '#ea4451' : '#ccc'"
              @tap="checked(index)"
            ></icon>
          </view>
        </view>
      </view>
    </view>
    <!-- 其它 -->
    <view class="extra">
      <label class="checkall">
        <icon type="success" :color="is ? '#ea4451' : '#ccc'" size="20" @tap="checkAll"></icon>
        全选
      </label>
      <view class="total">
        合计: <text>￥</text><label>{{sum}}</label><text>.00</text>
      </view>
      <view class="pay" @tap="goPay">结算({{data.length}})</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        data: [],
        addr: null
      }
    },

    computed: {
      // 反选
      data_buy() {
        // 把选中的商品筛选出来
        var arr = []
        this.data.forEach(function(item) {
          if (item.goods_checked) {
            arr.push(item)
          }
        })
        return arr
      },
      // 看选中的商品的长度和整个数组的长度是否一致
      is() {
        return this.data.length === this.data_buy.length
      },

      // 总价
      sum() {
        var sum = 0
        this.data_buy.forEach(function(item) {
          sum += item.goods_price * item.goods_number
        })
        return sum
      }
    },

    methods: {
      // 加减
      change(index, step) {
        if (step === -1 && this.data[index].goods_number <= 1) {
          uni.showToast({
            title: '商品数量不能小于1',
            icon: 'none'
          })
          return
        }
        if (step === 1 && this.data[index].goods_number >= 10) {
          uni.showToast({
            title: '限购不能大于10件',
            icon: 'none'
          })
          return
        }
        this.data[index].goods_number += step

        uni.setStorageSync('list', this.data)
      },

      //单选
      checked(index) {
        this.data[index].goods_checked = !this.data[index].goods_checked
        uni.setStorageSync('list', this.data)
      },

      //全选
      checkAll() {
        // 1. 全选现在的状态 this.is
        // 2. 点击之后的全选的状态
        var ck = !this.is
        // 3. 点击之后的状态赋值给全部数据
        this.data.forEach(function(item) {
          item.goods_checked = ck
        })
        // 4. 改变的数据存入本地
        uni.setStorageSync('list', this.data)
      },

      // 获取地址
      get_addr() {
        uni.chooseAddress({
          success: (res) => {
            this.addr = res
            this.addr.addr_detail = res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
      },

      // 结算前校验
      goPay() {
        if (!this.addr) {
          uni.showToast({
            title: "没有收货地址",
            icon: 'none'
          })
          return
        }
        if (!this.data_buy.length) {
          uni.showToast({
            title: '没有结算的商品',
            icon: 'none'
          })
          return
        }
        if (!uni.getStorageSync('token')) {
          uni.navigateTo({
            url: '/pages/auth/index'
          })
          uni.showToast({
            title: '请获取token',
            icon: 'none'
          })
        } else {
          uni.navigateTo({
            url: '/pages/order/index'
          })
        }
      }
    },

    // 由于 data和 onLoad 在页面初始时, 只加载一次, 所以使用 onShow()
    onShow() {
      this.data = uni.getStorageSync('list')
      console.log(this.data)
    }
  }
</script>

<style scoped lang="less">
  .shipment {
    height: 100rpx;
    line-height: 2;
    padding: 30rpx 30rpx 40rpx 30rpx;
    font-size: 27rpx;
    color: #333;
    background-color: #fff;
    background-image: url(http://static.botue.com/ugo/images/cart_border%402x.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;

    .dt {
      width: 140rpx;
      float: left;
      clear: both;
    }

    .dd {
      padding-left: 160rpx;
    }

    .meta {
      padding-right: 50rpx;
    }

    text.phone {
      float: right;
    }
  }

  .carts {
    background-color: #f4f4f4;
    padding-bottom: 110rpx;
    overflow: hidden;

    .shopname {
      padding: 30rpx;
      margin-top: 20rpx;
      font-size: 30rpx;
      color: #333;
      background-color: #fff;
      border-top: 1rpx solid #eee;
      border-bottom: 1rpx solid #eee;
    }

    .goods {
      display: flex;
      padding: 30rpx 20rpx 30rpx 0;
      margin-left: 100rpx;
      border-bottom: 1rpx solid #eee;
      background-color: #fff;
  
      position: relative;

      .checkbox {
        width: 101rpx;
        height: 100%;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        left: -100rpx;
        top: 0;
      }

      &:last-child {
        border-bottom: none;
      }

      .pic {
        width: 200rpx;
        height: 200rpx;
        margin-right: 30rpx;
      }

      .meta {
        flex: 1;
        font-size: 27rpx;
        color: #333;
        position: relative;
      }

      .name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        position: absolute;
        bottom: 0;

        color: #ea4451;
        font-size: 33rpx;

        text {
          font-size: 22rpx;
        }
      }

      .amount {
        position: absolute;
        bottom: 0;
        right: 20rpx;

        height: 48rpx;
        text-align: center;
        border: 1rpx solid #ddd;
        border-radius: 8rpx;

        display: flex;
        align-items: center;

        text {
          display: block;
          width: 60rpx;
          line-height: 48rpx;
          font-size: 36rpx;
          color: #ddd;
          text-align: center;
        }

        input {
          width: 60rpx;
          height: 48rpx;
          min-height: 48rpx;
          font-size: 27rpx;
          border-left: 1rpx solid #ddd;
          border-right: 1rpx solid #ddd;
        }
      }
    }
  }

  .extra {
    position: fixed;
    bottom: 0;
    /* #ifdef H5 */
    bottom: 50px;
    /* #endif */
    left: 0;
    z-index: 9;

    width: 750rpx;
    height: 96rpx;
    text-align: center;
    line-height: 96rpx;
    font-size: 36rpx;
    border-top: 1rpx solid #eee;
    background-color: #fff;
    color: #333;
    display: flex;

    .checkall {
      width: 140rpx;
      line-height: 1;
      margin-left: 25rpx;
      display: flex;
      align-items: center;

      icon {
        margin-right: 20rpx;
      }
    }

    .total {
      display: flex;
      justify-content: center;
      flex: 1;

      label, text {
        color: #ea4451;
        vertical-align: bottom;
        position: relative;
        bottom: -2rpx;
      }

      text {
        position: relative;
        bottom: -3rpx;
        font-size: 24rpx;

        &:first-child {
          margin-left: 10rpx;
        }
      }
    }

    .pay {
      width: 200rpx;
      background-color: #ea4451;
      color: #fff;
    }
  }
</style>

