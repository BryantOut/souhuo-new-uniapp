<template>
  <view class="taskItem" @click="goToDetail">
    <image class="pic" mode="aspectFill" lazy-load :src="taskItemInfo.productImgs ? taskItemInfo.productImgs.split(',')[0] : ''
      "></image>
    <view class="main">
      <view class="topPart">
        <view class="titleBox">
          <image class="platform" mode="aspectFit" :src="getPlatformItemSingleValueByPlatformTypeAndKey({
            platformType: taskItemInfo.platformType,
            key: 'logoSrc',
          })
            "></image>
          <view class="title oneRow" v-text="taskItemInfo.title"> </view>
        </view>
        <view class="tagList">
          <uni-tag class="tag" :text="rewardTypeHandler(taskItemInfo.rewardType)" type="primary" size="mini"
            custom-style="background-color: transparent; border-color: #FF9900; color: #FF9900;" />
          <uni-tag class="tag" :text="amountOfMoneyHandler({
            noticeInfo: taskItemInfo,
          })" type="primary" size="mini"
            custom-style="background-color: #F2F2F2; border-color: #F2F2F2; color: #888888;" />
          <uni-tag class="tag" :text="fansDemandFilter(taskItemInfo.fansDemand) + '粉丝'" type="primary" size="mini"
            custom-style="background-color: #F2F2F2; border-color: #F2F2F2; color: #888888;" />
          <uni-tag class="tag" :text="cooperationTypeHandler(taskItemInfo.cooperationType).text" type="primary"
            size="mini" custom-style="background-color: #F2F2F2; border-color: #F2F2F2; color: #888888;" />
        </view>
      </view>
      <view class="bottomPart">
        <view class="day">{{ taskItemInfo.createTime | formatTime("MM-DD") }}发布</view>
        <view class="num">
          <span class="iconfont icon-renshutongji"></span>
          <span>{{
            joinSituation({
              signUpNum: taskItemInfo.signUpNum,
              cooperationNumber: taskItemInfo.cooperationNumber,
            })
          }}</span>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import noticeShowHandler from "@/mixins/noticeShowHandler";
export default {
  mixins: [noticeShowHandler],
  props: {
    taskItemInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    goToDetail() {
      this.$emit('goToDetailHandler', this.taskItemInfo.noticeIdStr)
      // this.$baseUtil.navigateToHandler(
      //   `/pages/NoticeDetail/index?id=${this.taskItemInfo.noticeIdStr}`
      // );
    },
  },
};
</script>

<style lang="scss" scoped>
.taskItem {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 260rpx;
  background-color: #fff;
  border-bottom: 1rpx solid $borderColor;

  .pic {
    width: 200rpx;
    height: 200rpx;
    border-radius: 6rpx;
    flex-shrink: 0;
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

      // .tagList {
      //   .tag {
      //     margin-bottom: 0;
      //   }
      // }
    }

    .bottomPart {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $tipColor;
      font-size: 24rpx;
      line-height: 1em;

      .num {
        display: flex;
        align-items: center;

        .iconfont {
          margin-right: 6rpx;
        }
      }
    }
  }
}
</style>
