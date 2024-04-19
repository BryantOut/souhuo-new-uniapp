<template>
  <view class="MyEmpty">
    <view class="con">
      <!-- <span class="iconfont iconsousuo"></span> -->
      <image
        src="@/static/image/icon8.png"
        mode="aspectFit"
        class="icon"
      ></image>
      <span class="tip">{{ tip }}-</span>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    tip: {
      type: String,
      default: () => {
        return '暂无数据';
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.MyEmpty {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  // height: 100%;
  background-color: transparent;
  padding: 100rpx 0;
  .con {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $tipColor;
    .icon {
      width: 200rpx;
      height: 200rpx;
    }
    .tip {
      font-size: 30rpx;
      margin-top: 10rpx;
    }
  }
}
</style>