<template>
  <view
    v-if="getHowToBehaviorPopupShow.isShow"
    class="myPopupBox"
    @click.stop="closeHandler"
  >
    <view class="content" @click.stop>
      <view class="title" v-text="getHowToBehaviorPopupShow.title"></view>
      <swiper
        class="swiper"
        :indicator-dots="true"
        indicator-active-color="#FF9900"
      >
        <swiper-item
          class="swiperItem"
          v-for="(item, index) in getHowToBehaviorPopupShow.imgList"
          :key="index"
        >
          <view class="numBox">
            <view class="num" v-text="item.step">第一步</view>
          </view>
          <image :src="item.src" mode="aspectFill" class="swiperPic"></image>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(["getHowToBehaviorPopupShow"]),
  },
  methods: {
    ...mapMutations(["SET_HOW_TO_BEHAVIOR_POPUP_SHOW"]),
    closeHandler() {
      this.SET_HOW_TO_BEHAVIOR_POPUP_SHOW({
        isShow: false, // 是否展示教程弹窗
        title: "", // 弹窗标题
        imgList: [], // 教程图片列表
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.myPopupBox {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 1098rpx;
  border-top-left-radius: 40rpx;
  border-top-right-radius: 40rpx;
  background-color: #f2f2f2;
  overflow: hidden;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 80rpx;
    background-color: #fff;
  }
  .swiper {
    width: 100%;
    flex: 1;
    margin-bottom: 40rpx;
    .swiperItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      flex: 1;
      .numBox {
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 100rpx;
        .num {
          position: relative;
          line-height: 50rpx;
          &::before {
            position: absolute;
            content: "";
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 10rpx;
            background-color: #ff9900;
          }
        }
      }

      .swiperPic {
        width: 680rpx;
        height: 800rpx;
      }
    }
  }
}
</style>