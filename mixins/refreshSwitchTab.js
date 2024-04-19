export default {
  onLoad: function () {
    let that = this;
    uni.addInterceptor("switchTab", {
      //监听tabBar跳转
      success: (res) => {
        // this.resetData();
        that.switchTabHandler()
      },
    });
  },
  methods: {
    switchTabHandler() {
      this.isNeedRefreshPage = true
    }
  }
};
