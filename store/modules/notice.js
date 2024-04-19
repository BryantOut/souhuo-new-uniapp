import {
    optSignUp
} from "@/api/tNotice";
import baseUtil from "@/utils/baseUtils";

const getDefaultState = () => {
    return {
        checkNoticeInfo: null
    }
}

const noticeHandler = {
    state: {
        checkNoticeInfo: uni.getStorageSync('checkNoticeInfo') ? uni.getStorageSync('checkNoticeInfo') : null // 通告详情信息
    },
    actions: {
        optSignUp({
            state
        }, {
            contentText,
            optType,
            id
        }) {
            return new Promise((resolve) => {
                uni.showModal({
                    title: "提示",
                    content: `你确定要${contentText}吗？`,
                    success: (res) => {
                        if (res.confirm) {
                            // optType 0=取消;1=删除
                            optSignUp({
                                    id,
                                    optType
                                })
                                .then((res) => {
                                    baseUtil.showToast({
                                        title: res.msg,
                                    });
                                    resolve()
                                })
                                .catch((err) => {
                                    baseUtil.normalErrMsgHandler(err);
                                    resolve()
                                });
                        }
                    },
                });
            })
        },
    },
    mutations: {
        SET_CHECK_NOTICE_INFO: (state, checkNoticeInfo) => {
            state.checkNoticeInfo = checkNoticeInfo
            uni.setStorageSync('checkNoticeInfo', checkNoticeInfo)
        },
        RESET_ALL_FILTERS: (state) => {
            const initState = getDefaultState()
            Object.keys(initState).forEach(key => {
                state[key] = initState[key]
                uni.setStorageSync(key, initState[key])
            })
        },
    },
    getters: {
        getCheckNoticeInfo: (state) => state.checkNoticeInfo
    }
}

export default noticeHandler