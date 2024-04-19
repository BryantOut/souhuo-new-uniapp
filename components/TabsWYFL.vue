<template>
  <view class="tabBarsBox sticky-box">
    <view
      v-for="(tab, index) in tabBars"
      :key="tab.tbkMaterialType"
      class="uni-tab-item tap-active"
      :class="tabIndex == index ? 'active' : ''"
      :data-current="index"
      @click="ontabtap"
    >
      <text
        class="uni-tab-item-title"
        :class="tabIndex == index ? 'active' : ''"
        >{{ tab.labelName }}</text
      >
    </view>
  </view>
</template>

<script>
export default {
  props: {
    tabBars: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tabIndex: {
      type: Number,
      default: () => {
        return 0;
      },
    },
  },
  methods: {
    ontabtap(e) {
      let index = e.target.dataset.current || e.currentTarget.dataset.current;
      this.$emit("ontabtap", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabBarsBox {	
  display: flex;
  /* #ifdef H5 */
  width: 100%;
  /* #endif */
  height: 88rpx;
  box-sizing: border-box;
  background-color: #fff;
  overflow: scroll;
  .uni-tab-item {
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    flex-wrap: nowrap;
    // padding-left: 34rpx;
    // padding-right: 34rpx;
    box-sizing: border-box;
    width: 20%;
    height: 100%;
    &.active {
      position: relative;
      &::before {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        content: "";
        width: 60rpx;
        height: 14rpx;
        background-color: $themeColor;
        border-radius: 10rpx;
      }
    }
  }
  .uni-tab-item-title {
    display: flex;
    align-items: center;
    color: #555;
    font-size: 28rpx;
    height: 100%;
    // line-height: 60rpx;
    flex-wrap: nowrap;
    /* #ifndef APP-PLUS */
    white-space: nowrap;
    /* #endif */
    &.active {
      position: relative;
      font-weight: 700;
      font-size: 30rpx;
    }
  }
  //   .tabs__line {
  //     position: absolute;
  //     bottom: 30rpx;
  //     left: 0;
  //     z-index: 1;
  //     width: 80rpx;
  //     height: 6rpx;
  //     background-color: #ee0a24;
  //     border-radius: 3rpx;
  //   }
}
</style>