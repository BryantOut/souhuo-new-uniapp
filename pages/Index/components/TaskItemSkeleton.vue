<template>
  <view class="taskItem" @click="goToDetail">
    <image class="pic" mode="aspectFill" lazy-load :src="taskItemInfo.productImgs ? taskItemInfo.productImgs.split(',')[0] : ''
      "></image>
    <view class="main">
      <Skeleton :row="2" animate>
      </Skeleton>
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
    background-color: #f2f3f5;
    animation-duration: 1.5s;
		animation-name: blink;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
  }

  @keyframes blink {
		50% {
			opacity: 0.6;
		}
	}

  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    height: 190rpx;
    margin-left: 18rpx;
    overflow: hidden;
  }
}
</style>
