<template>
  <view class="page">
    <view class="content">
      <view class="topPart">
        <image
          class="logo"
          mode="aspectFit"
          src="../../static/image/icon1.png"
        ></image>
        <view class="main">
          <view class="inputBox">
            <span class="iconfont icon-shouji1"></span>
            <input
              v-model="phoneNumber"
              class="uni-input"
              type="number"
              maxlength="11"
              placeholder="请输入手机号"
              @blur="limitInput('phone')"
              @change="phoneNumberChange"
            />
          </view>
          <view class="inputBox">
            <span class="iconfont icon-yanzhengma"></span>
            <input
              v-model="codeNumber"
              class="uni-input"
              type="number"
              maxlength="6"
              placeholder="请输入手机验证码"
              @blur="limitInput('code')"
            />
            <verification-code
              :verificationCodeInfo="verificationCodeInfo"
              class="verificationCode"
              @btnTapHandler="getTelCode()"
              @changeDisabledStatus="
                verificationCodeInfo.disabled = !verificationCodeInfo.disabled
              "
            >
            </verification-code>
          </view>
        </view>
      </view>
      <view class="bottomPart">
        <view
          class="wxLogin tap-active"
          @tap="loginByPhoneCode({ switchTabMy: true })"
          >登录</view
        >
        <view
          class="phoneLogin tap-active"
          @click="$baseUtil.switchTabHandler('/pages/My/index')"
          >暂不登录</view
        >
        <view class="agreementTip" @click="isAgree = !isAgree">
          <view class="con">
            <span class="iconfont agreeIcon" :class="isAgree? 'icon-dagou active' : 'icon-kuang'"></span>
            同意<view
              class="link"
              @click.stop="checkAgreement('privacy')"
            >
              隐私政策</view
            >和<view class="link" @click.stop="checkAgreement('user')"
              >服务条款</view
            >
          </view>
        </view>
      </view>
    </view>
    <PrivacyAgreement></PrivacyAgreement>
    <UserAgreement></UserAgreement>
  </view>
</template>

<script>
import VerificationCode from "@/components/VerificationCode";
import registerMixins from "@/mixins/registerMixins";
export default {
  mixins: [registerMixins],
  components: {
    VerificationCode,
  },
};
</script>

<style>
page {
  background-color: #fff;
}
</style>

<style lang="scss" scoped>
@import "./css/index.scss";
.content {
  padding: 0 72rpx;
  .topPart {
    width: 100%;
    margin-top: 220rpx;
    margin-bottom: 30rpx;
    .logo {
      width: 408rpx;
      height: 124rpx;
    }
    .main {
      margin-top: 58rpx;
      .inputBox {
        display: flex;
        align-items: center;
        width: 100%;
        height: 80rpx;
        border-bottom: 1px solid $borderColor;
        margin-bottom: 23rpx;
        &:last-child {
          margin-bottom: 0;
        }
        .iconfont {
          font-size: 36rpx;
          line-height: 1em;
          color: $themeTextColor;
          margin-right: 22rpx;
        }
        .uni-input {
          flex: 1;
          height: 100%;
          line-height: 100%;
          font-size: 28rpx;
        }
      }
    }
  }
}
</style>