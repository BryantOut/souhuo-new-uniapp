<template>
  <view class="partOne part">
    <image class="pic" mode="aspectFill" :src="getCheckNoticeInfo.productImgs
        ? getCheckNoticeInfo.productImgs.split(',')[0]
        : ''
      "></image>
    <view class="main">
      <view class="topPart">
        <view class="titleBox">
          <image class="platform" mode="aspectFit" :src="getPlatformItemSingleValueByPlatformTypeAndKey({
            platformType: getCheckNoticeInfo.platformType,
            key: 'logoSrc',
          })
            "></image>
          <view class="title oneRow" v-text="getCheckNoticeInfo.title"> </view>
        </view>
        <view class="tagList">
          <uni-tag class="tag" :text="rewardTypeHandler(getCheckNoticeInfo.rewardType)" type="primary" size="mini"
            custom-style="background-color: transparent; border-color: #FF9900; color: #FF9900;" />
            <uni-tag class="tag" :text="amountOfMoneyHandler({
            noticeInfo: getCheckNoticeInfo,
          })" type="primary" size="mini"
            custom-style="background-color: #F2F2F2; border-color: #F2F2F2; color: #888888;" />
          <uni-tag class="tag" :text="fansDemandFilter(getCheckNoticeInfo.fansDemand) + '粉丝'" type="primary" size="mini"
            custom-style="background-color: #F2F2F2; border-color: #F2F2F2; color: #888888;" />
          <uni-tag class="tag" :text="cooperationTypeHandler(getCheckNoticeInfo.cooperationType).text
            " type="primary" size="mini"
            custom-style="background-color: #F2F2F2; border-color: #F2F2F2; color: #888888;" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from "vuex";
import noticeShowHandler from "@/mixins/noticeShowHandler";
export default {
  mixins: [noticeShowHandler],
  computed: {
    ...mapGetters(["getCheckNoticeInfo"]),
  },
};
</script>

<style lang="scss" scoped>
.partOne {
  display: flex;
  align-items: center;

  .pic {
    width: 200rpx;
    height: 200rpx;
    flex-shrink: 0;
    border-radius: 6rpx;
  }

  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    height: 190rpx;
    margin-left: 18rpx;
    overflow: hidden;

    .topPart {
      .titleBox {
        display: flex;
        align-items: center;
        margin-bottom: 18rpx;

        .title {
          flex: 1;
        }
      }
    }
  }
}
</style>
