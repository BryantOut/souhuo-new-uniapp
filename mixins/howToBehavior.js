import { mapMutations } from "vuex";
export default {
    methods: {
        ...mapMutations(["SET_HOW_TO_BEHAVIOR_POPUP_SHOW"]),
        // 如何设置截图验证码
        howToBehavior(info) {
            this.SET_HOW_TO_BEHAVIOR_POPUP_SHOW({
                isShow: true,
                ...info
            })
        }
    }
}