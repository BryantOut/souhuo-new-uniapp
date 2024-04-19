<template>
  <view class="videoBox">
    <!-- <image class="posterImg" :src="posterImg" mode="aspectFill"></image> -->
    <view class="posterImg"></view>
    <video
      :id="videoId"
      :src="homeUrl"
      class="video"
      :show-center-play-btn="false"
      object-fit="contain"
      loop
      @fullscreenchange="fullscreenchange"
      :controls="Boolean(state)"
    ></video>
	<cover-view @click="state = !state">
		<span class="iconfont playIcon" :class="!state?'icon-24gf-playSquare':'icon-24gf-pauseSquare'"></span>
	</cover-view>
  </view>
</template>

<script>
export default {
  props: {
    homeUrl: {
      type: String,
      default() {
        return "";
      },
    },
    posterImg: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      VideoContext: {},
      videoId: "",
      state: false,
      duration: 0,
      isFullscreen: false,
    };
  },
  created() {
    this.videoId = Date.now() + Math.ceil(Math.random() * 10000000) + "";
  },
  mounted() {
    this.VideoContext = uni.createVideoContext(this.videoId);    
  },
  watch: {
    state(state, oldValue) {
      if (!state) {
        this.VideoContext.pause();
      } else {
        console.dir(this.VideoContext)
        this.VideoContext.play();
        // this.$nextTick(() => {
        //   this.VideoContext.requestFullScreen({ direction: this.direction });
        // });
        setTimeout(() => {
          this.VideoContext.requestFullScreen({ direction: this.direction });
        }, 100);
      }
    },
  },
  methods: {
    fullscreenchange(e) {
      this.isFullscreen = e.detail.fullScreen;
      this.state = e.detail.fullScreen;
    }
  },
};
</script>

<style lang="scss" scoped>
.videoBox {
  position: relative;
  width: 100%;
  height: 100%;
  .video {
    width: 0;
    height: 0;
  }

  .posterImg {
    width: 100%;
    height: 100%;
    background-color: black;
  }
  .playIcon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 60rpx;
    color: #fff;
  }
}
</style>
