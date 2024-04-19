<template>
  <Skeleton v-if="skeletonLoading" :row="4" animate :loading="skeletonLoading">
  </Skeleton>
  <view v-else class="page">
    <view class="noticeBar">
      <view class="main">
        <span class="iconfont icon-31tishi"></span>
        <span class="con oneRow">请选择需要添加名片的平台~</span>
      </view>
    </view>
    <view class="myBusinessCardList">
      <view
        v-for="(item, index) in platformTypeListFilter"
        :key="index"
        class="businessCardItem"
        :class="{ active: active === item.platformType }"
        @click="active = item.platformType"
      >
        <view class="leftPart">
          <image class="platform" mode="aspectFit" :src="item.logoSrc"></image>
          <view class="title" v-text="item.platformFullName"></view>
        </view>
        <span
          class="iconfont"
          :class="
            active === item.platformType
              ? 'icon-xuanzhongxuanzhong'
              : 'icon-shixinyuanxing'
          "
        ></span>
      </view>
    </view>
    <view class="pageFooterEmptyBox"></view>
    <view class="pageFooter transparent">
      <view class="main">
        <view
          class="fixedBottomBtn status1Btn addBtn tap-active"
          @click="nextBtn"
        >
          <view class="con">下一步，去认证</view>
        </view>
      </view>
      <view class="emptyBox"></view>
    </view>
  </view>
</template>

<script>
import { getMyInfo } from "@/api/businessCard";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isNeedRefreshPage: true,
      active: "",
      isHavePlatformType5: false,
    };
  },
  computed: {
    ...mapGetters(["platformTypeList"]),
    platformTypeListFilter() {
      if (this.isHavePlatformType5) {
        return this.platformTypeList.filter((val) => val.platformType !== 5);
      }
      return this.platformTypeList;
    },
  },
  onLoad(option) {
    this.active =
      option.platformType !== undefined ? Number(option.platformType) : "";
  },
  methods: {
    async init() {
      await this.getMyInfo();
      this.skeletonLoading = false;
    },
    // 获取名片列表
    getMyInfo() {
      return new Promise((resolve) => {
        getMyInfo()
          .then((res) => {
            const { data } = res;
            this.isHavePlatformType5 = Boolean(
              data.filter((val) => {
                return val.platformType === 5;
              }).length
            );
            resolve();
          })
          .catch((err) => {
            this.$baseUtil.normalErrMsgHandler(err);
          });
      });
    },
    // 下一步
    nextBtn() {
      if (this.active === "") {
        this.$baseUtil.showToast({
          title: "请选择需要添加名片的平台",
        });
        return;
      }
      switch (this.active) {
        case 5:
          this.$baseUtil.navigateToHandler(
            `/pages/BusinessCardAuthentication/stepTwoOfModelCard?platformType=${this.active}`
          );
          break;

        default:
          this.$baseUtil.navigateToHandler(
            `/pages/BusinessCardAuthentication/stepTwo?platformType=${this.active}`
          );
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  .noticeBar {
    display: flex;
    align-items: center;
    width: 100%;
    height: 72rpx;
    color: #eb5252;
    background-color: #ffecec;
    font-size: 24rpx;
    padding: 0 20rpx;
    box-sizing: border-box;

    .main {
      display: flex;
      align-items: center;

      .iconfont {
        font-size: 32rpx;
        margin-right: 10rpx;
      }
    }
  }

  .myBusinessCardList {
    .businessCardItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 710rpx;
      height: 120rpx;
      border-radius: 20rpx;
      background: #ffffff;
      box-sizing: border-box;
      border: 1px solid #ffffff;
      margin: 20rpx auto 0;
      padding: 0 26rpx 0 35rpx;

      &.active {
        border: 1px solid $themeColor;
      }

      .leftPart {
        display: flex;
        align-items: center;

        .platform {
          width: 50rpx;
          height: 50rpx;
          border-radius: 50%;
          margin-right: 20rpx;
        }

        .title {
          color: $textColor;
        }
      }

      .iconfont {
        font-size: 36rpx;
        border-radius: 50%;

        &.icon-xuanzhongxuanzhong {
          color: $themeTextColor;
        }

        &.icon-shixinyuanxing {
          color: $borderColor;
        }
      }
    }
  }

  .nextBtn {
  }
}
</style>
