<template>
  <view class="page">
    <view class="part">
      <view class="title">
        <span class="iconfont icon-31tishi"></span>
        <span>模特照片要求</span>
      </view>
      <view class="tipList">
        <view
          class="tipItem"
          v-for="(item, index) in tipList"
          :key="index"
          v-text="item"
        ></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tipList: [
        `请挑选拍摄质量好、拍摄场景自然、能突出本人特点的
        照片进行上传。有过往的优质拍摄案例可以优先进行选
        择上传。`,
        `上传照片存在以下明显缺陷的，将直接审核不通过：`,
        `1.图片模糊、光线昏暗/不佳`,
        `2.乱用滤镜/特效，照片特效让产品变色、变形`,
        `3.照片中出现打码、遮挡、涂鸦`,
        `4.除非商家要求不露脸，否则请尽量露脸拍摄`,
        `5.主体不突出，产品不突出，占画面小于1/3。`,
        `6.背景杂乱、难看`,
        `7.构图不当,不可以倒图、歪斜严重，角度不佳`,
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
.page {
  .part {
    height: 1062rpx;
    justify-content: flex-start;
    .title {
      display: flex;
      align-items: center;
      font-size: 34rpx;
      color: #3D3D3D;
      .iconfont {
        margin-right: 10rpx;
        font-size: 34rpx;
      }
    }
    .tipList {
        line-height: 50rpx;
        .tipItem {
            margin-top: 26rpx;
        }
    }
  }
}
</style>
