<template>
  <view class="page">
    <view class="content">
      <view class="title">
        <span class="iconfont icon-xuanzhongxuanzhong"></span>
        <span>提交成功，等待审核</span>
      </view>
      <image
        src="../../static/image/contact_me_qr.png"
        class="logo"
        mode="aspectFit"
      ></image>
      <view class="tip">
        管理员将在24小时内审核完成。长按扫码添<br />加小助手，第一时间收到审核结果以及<br />最新通告匹配
      </view>
    </view>
    <view class="pageFooterEmptyBox"></view>
    <view class="pageFooter transparent">
      <view class="main">
        <view class="btnGroups fixedBottomBtn">
          <view
            class="cancelBtn btn tap-active isAloneBtn"
            @click="confirmBtnHandler()"
            >返回</view
          >
        </view>
      </view>
      <view class="emptyBox"></view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    confirmBtnHandler() {
      uni.redirectTo({
        url: "/pages/MyBusinessCard/index",
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.page {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 110rpx auto 0;
    .title {
      display: flex;
      align-items: center;
      font-size: 36rpx;
      .iconfont {
        font-size: 55rpx;
        color: #52c41a;
        margin-right: 16rpx;
      }
    }
    .logo {
      width: 414rpx;
      height: 414rpx;
      margin-top: 80rpx;
    }
    .tip {
      text-align: center;
      margin-top: 40rpx;
      line-height: 48rpx;
      font-size: 32rpx;
    }
  }
}
</style>