import {
    getTelCode,
    register
} from "@/api/user";
import {
    mapGetters,
    mapMutations
} from "vuex";

export default {
    data() {
        return {
            phoneNumber: "", // 手机号
            codeNumber: "", // 
            verificationCodeInfo: {
                disabled: true,
            },
            isAgree: false
        }
    },
    computed: {
        ...mapGetters(["headPortraitUrl", "nick", "wxCode"]),
    },

    watch: {
        phoneNumber(val) {
            if (!/^1[3456789][0-9]{9}$/g.test(val)) {
                this.verificationCodeInfo.disabled = true;
                this.codeNumber = ""
            } else {
                this.verificationCodeInfo.disabled = false;
            }
        },
    },
    methods: {
        ...mapMutations(["SET_TOKEN", "SET_LOGIN_STATE", "SET_WX_CODE", "SET_CODE_IS_VAILD", "SET_LOGIN_BY_PHONE_POPUP_SHOW", "SET_PRIVACY_AGREEMENT_POPUP_SHOW", "SET_USER_AGREEMENT_POPUP_SHOW"]),
        clearWxCode() {
            this.SET_WX_CODE("")
        },
        // 微信一键登录按钮 - 调用获取手机号方法获取到手机号code
        getphonenumber(e) {
            let code = e.detail.code
            if (code) {
                let params = {
                    headPortraitUrl: this.headPortraitUrl,
                    nick: this.nick,
                    wxCode: code
                };
                this.registerHandler(params)
            }
        },
        // 手机验证码登录
        loginByPhoneCode({
            switchTabMy = false
        }) {
            let _self = this;
            if (!this.isAgree) {
                this.$baseUtil.showToast({
                    title: "请先阅读并同意协议"
                });
                return;
            }
            if (!this.validataPhone()) return;
            if (this.codeNumber === "") {
                this.$baseUtil.showToast({
                    title: "请输入验证码"
                });
                return;
            }
            if (this.codeNumber.length < 6) {
                this.$baseUtil.showToast({
                    title: "验证码错误"
                });
                return;
            }
            let params = {
                tel: this.phoneNumber,
                telCode: this.codeNumber,
                headPortraitUrl: this.headPortraitUrl,
                nick: this.nick
            };
            this.registerHandler(params, switchTabMy)
        },
        registerHandler(params, switchTabMy) {
            this.$baseUtil.showLoading({
                title: "加载中",
            });
            register(params).then(res => {
                uni.hideLoading();
                this.$baseUtil.showToast({
                    title: '登录成功'
                });
                this.SET_TOKEN(res.data.tokenId)
                this.SET_LOGIN_STATE(res.data.isLogin)
                this.SET_LOGIN_BY_PHONE_POPUP_SHOW(false)
                if (switchTabMy) {
                    setTimeout(() => {
                        uni.reLaunch({
                            url: '/pages/My/index'
                        });
                    }, 1000)
                }
            }).catch(err => {
                uni.hideLoading();
                this.$baseUtil.normalErrMsgHandler(err)
            })
        },
        // 验证手机号
        validataPhone() {
            let phoneNumber = this.phoneNumber;
            if (phoneNumber.length <= 0) {
                this.$baseUtil.showToast({
                    title: "请输入手机号码"
                });
                return false;
            } else {
                const reg = /^1[3456789][0-9]{9}$/g
                if (!reg.test(phoneNumber)) {
                    this.$baseUtil.showToast({
                        title: "手机号码错误"
                    });
                    reg.lastIndex = 0;
                    return false;
                } else {
                    return true;
                }
            }
        },
        // 格式化输入内容
        limitInput(val, type) {
            if (val === "phone") {
                this.phoneNumber = this.phoneNumber.replace(/\D/g, "");
            } else {
                this.codeNumber = this.codeNumber.replace(/\D/g, "");
            }
        },
        // 获取验证码
        getTelCode() {
            let params = {
                Tel: this.phoneNumber,
            };
            getTelCode(params).then(res => {
                this.$baseUtil.showToast({
                    title: res.msg
                });
            }).catch(err => {
                this.$baseUtil.normalErrMsgHandler(err)
            })
        },
        // 手机号码变了
        phoneNumberChange() {
            this.codeNumber = ''
        },
        // 查看协议
        checkAgreement(type) {
            switch (type) {
                case 'user':
                    this.SET_USER_AGREEMENT_POPUP_SHOW(true);
                    break;
                case 'privacy':
                    this.SET_PRIVACY_AGREEMENT_POPUP_SHOW(true);
                    break;
            }
        }
    },
}