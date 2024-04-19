<template>
  <view v-if="getLoginPopupShow" class="myPopupBox" @click.stop="closeHandler">
    <view class="loginPopup" @click.stop>
      <view class="modifyOne"></view>
      <span class="iconfont iconguanbi" @click="closeHandler"></span>
      <image
        class="logo"
        mode="aspectFill"
        src="../static/image/logo.png"
        lazy-load
      ></image>
      <view class="mainPart">
        <button
          class="wxBtn btn tap-active"
          type="default"
          open-type="getPhoneNumber"
          @getphonenumber="getphonenumber"
        >
          <view class="subCon">
            <span class="iconfont iconweixin"></span>
            微信一键登录
          </view>
        </button>
        <view class="phoneBtn btn tap-active" @click="loginByPhoneBtnHandler">
          <view class="subCon">
            <span class="iconfont iconshouji1"></span>
            手机号登录
          </view>
        </view>
        <view class="tip">
          注册/登录则视为你同意<navigator
            class="nav tap-active"
            url="/pages/Agreement/privacyAgreement"
            >隐私政策</navigator
          >和<navigator
            class="nav tap-active"
            url="/pages/Agreement/userAgreement"
            >服务条款</navigator
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import registerMixins from "@/mixins/registerMixins";
export default {
  mixins: [registerMixins],
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(["getLoginPopupShow"]),
  },
  methods: {
    ...mapMutations(["SET_LOGIN_POPUP_SHOW", "SET_LOGIN_BY_PHONE_POPUP_SHOW"]),
    closeHandler() {
      this.SET_LOGIN_POPUP_SHOW(false);
    },
    loginByPhoneBtnHandler() {
      this.closeHandler();
      this.SET_LOGIN_BY_PHONE_POPUP_SHOW(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.loginPopup {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 620rpx;
  height: 680rpx;
  border-radius: 10rpx;
  background-color: #fff;
  padding: 120rpx 0 28rpx;
  box-sizing: border-box;
  overflow: hidden;
  .modifyOne {
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-20%, -20%);
    width: 200rpx;
    height: 200rpx;
    background: linear-gradient(
      165deg,
      rgba(245, 78, 102, 0) 30%,
      rgb(254, 238, 240) 80%
    );
    border-radius: 50%;
  }
  .iconguanbi {
    position: absolute;
    top: 44rpx;
    right: 32rpx;
    font-size: 26rpx;
    color: #666666;
  }
  .logo {
    width: 320rpx;
    height: 160rpx;
  }
  .mainPart {
    .btn {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 480rpx;
      height: 72rpx;
      border-radius: 36rpx;
      box-sizing: border-box;
      font-size: 28rpx;

      &.wxBtn {
        background: #45c55e;
        color: #ffffff;

        .subCon {
          .iconfont {
            margin-right: 8rpx;
          }
        }
      }

      &.phoneBtn {
        color: #353535;
        border: 1px solid #aaaaaa;
        margin: 26rpx 0 54rpx;
      }

      .subCon {
        .iconfont {
          margin-right: 4rpx;
        }
      }
    }
    .tip {
      font-size: 24rpx;
      color: $tipColor;
      .nav {
        display: inline-block;
        color: $themeColor;
      }
    }
  }
}
</style>
