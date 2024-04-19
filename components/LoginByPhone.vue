<template>
  <view
    v-if="getLoginByPhonePopupShow"
    class="myPopupBox"
    @click="closeHandler"
  >
    <view class="loginPopup" @click.stop>
      <span class="iconfont icon-guanbi" @click="closeHandler"></span>
      <image
        src="../static/image/icon7.png"
        class="logo"
        mode="heightFix"
      ></image>
      <view class="mainPart">
        <view class="subTop">
          <view class="item">
            <i class="iconfont icon-shouji1"></i>
            <view class="inputBox">
              <input
                class="uni-input myInput"
                v-model="phoneNumber"
                placeholder="请输入你的手机号"
                type="number"
                :adjust-position="false"
                maxlength="11"
                @blur="limitInput('phone')"
              />
            </view>
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
          <view class="item codeItem">
            <i class="iconfont icon-yanzhengma"></i>
            <view class="inputBox">
              <input
                class="uni-input myInput"
                v-model="codeNumber"
                placeholder="请输入你6位手机验证码"
                type="number"
                :adjust-position="false"
                maxlength="6"
                @blur="limitInput('code')"
              />
            </view>
          </view>
        </view>
        <view class="subBottom">
          <view class="loginBtn tap-active" @tap="loginByPhoneCode">登录</view>
          <view class="agreementTip" @click="isAgree = !isAgree">
            <view class="con">
              <span
                class="iconfont agreeIcon"
                :class="isAgree ? 'icon-dagou active' : 'icon-kuang'"
              ></span>
              同意<view class="link" @click="checkAgreement('privacy')">
                隐私政策</view
              >和<view class="link" @click="checkAgreement('user')"
                >服务条款</view
              >
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import VerificationCode from "@/components/VerificationCode";
import registerMixins from "@/mixins/registerMixins";
import { mapGetters, mapMutations } from "vuex";
export default {
  mixins: [registerMixins],
  components: {
    VerificationCode,
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(["getLoginByPhonePopupShow"]),
  },
  methods: {
    ...mapMutations(["SET_LOGIN_BY_PHONE_POPUP_SHOW"]),
    closeHandler() {
      this.clearWxCode();
      this.SET_LOGIN_BY_PHONE_POPUP_SHOW(false);
    },
  },
};
</script>

<style lang="scss" scoped>
.loginPopup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 620rpx;
  height: 680rpx;
  border-radius: 10rpx;
  background-color: #fff;
  padding: 56rpx 46rpx 28rpx;
  box-sizing: border-box;
  .icon-guanbi {
    position: absolute;
    top: 44rpx;
    right: 32rpx;
    font-size: 26rpx;
    color: #666666;
  }
  .logo {
    // width: 100rpx;
    height: 100rpx;
    align-self: flex-start;
  }
  .titleBox {
    width: 100%;
    .title {
      font-size: 40rpx;
      font-weight: 700;
      margin-bottom: 26rpx;
    }
    .label {
      font-size: 28rpx;
      color: $tipColor;
    }
  }
  .mainPart {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    flex: 1;
    margin-top: 30rpx;
    .item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 96rpx;
      border-bottom: 1px solid #dddddd;
      &.codeItem {
        margin-top: 38rpx;
      }
      .iconfont {
        font-size: 36rpx;
        color: $themeColor;
        margin-right: 22rpx;
      }
      .myInput {
        flex: 1;
      }
      .verificationCode {
        height: 60rpx;
        line-height: 60rpx;
      }
    }
    .loginBtn {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 480rpx;
      height: 84rpx;
      background-color: $themeColor;
      color: #ffffff;
      border-radius: 42rpx;
      margin: 0 auto 20rpx;
    }
  }
}
</style>