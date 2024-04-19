<template>
  <view class="alertPart">
    <span class="iconfont" :class="iconfont"></span>
    {{ tip }}
  </view>
</template>

<script>
export default {
  props: {
    tip: {
      type: String,
      default: () => {
        return "暂无数据";
      },
    },
    iconfont: {
      type: String,
      default: () => {
        return "icon-bianji";
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.alertPart {
  width: 690rpx;
  margin: 20rpx auto 0;
  background-color: #fdf2e3;
  border-radius: 20rpx;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  color: #ff9900;
}
.alertPart .iconfont {
  margin-right: 4rpx;
}
</style>
