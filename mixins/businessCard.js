import {
    submitUrl,
    getSubmitUrlResult
} from "@/api/businessCard";
export default {
    data() {
        return {
            requestTimes: 0
        }
    },
    methods: {
        // 更新数据
        updateHandler({
            platformType = 0,
            homeUrl = '',
            isUpdate = true
        }) {
            this.requestTimes = 0
            this.$baseUtil.showLoading({
                title: "获取中",
            });
            submitUrl({
                    platformType,
                    url: homeUrl,
                    isUpdate
                })
                .then((res) => {
                    setTimeout(() => {
                        this.getSubmitUrlResult({
                            platformType,
                            homeUrl,
                            isUpdate
                        })
                    }, 3000);
                })
                .catch((err) => {                    
                    this.$baseUtil.normalErrMsgHandler(err)
                });
        },
        // 获取名片主页信息接口
        getSubmitUrlResult({
            platformType = 0,
            homeUrl = '',
            isUpdate = true
        }) {
            getSubmitUrlResult({
                    platformType,
                    url: homeUrl,
                    isUpdate
                })
                .then((res) => {
                    if (!res.data && this.requestTimes < 5) {
                        setTimeout(() => {
                            this.requestTimes++;
                            this.getSubmitUrlResult({
                                platformType,
                                homeUrl,
                                isUpdate
                            })
                        }, 1000);
                    } else if (!res.data && this.requestTimes >= 5) {
                        this.updateError()
                        this.upDateComplate()
                        uni.hideLoading();
                    } else {
                        this.updateSuccess(res.data)
                        this.upDateComplate()
                        uni.hideLoading();
                    }
                })
                .catch((err) => {
					uni.hideLoading();
                    if (err.errMsg === '该名片已添加，请勿重复添加') {
                        uni.showModal({
                            title: "提示",
                            content: err.errMsg,
                            confirmText: "我知道了",
							showCancel: false,
                            success: (res) => {
                                this.$baseUtil.navigateToHandler('/pages/MyBusinessCard/index')
                            },
                        }); 
                        return
                    }
                    this.$baseUtil.normalErrMsgHandler(err)
                });
        },
        upDateComplate() {},
        updateSuccess(res) {},
        updateError() {
            this.$baseUtil.showToast({
                title: `获取主页数据失败，请稍后再试`,
            });
        }
    }
}