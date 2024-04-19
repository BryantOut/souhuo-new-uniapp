<template>
  <Skeleton v-if="skeletonLoading" :row="4" animate :loading="skeletonLoading">
  </Skeleton>
  <view v-else class="page">
    <AlertTip v-if="alertPartInfo" :tip="alertPartInfo.alertText" :iconfont="alertPartInfo.icon"></AlertTip>
    <view class="partOne part">
      <view class="topPart">
        <view class="title"
          >{{ currentPlatformTypeItem.platform }}主页链接</view
        >
        <view class="linkBox" :class="{ disabled: !isBeforeSubmitUrl }">
          <input
            v-model="homeUrl"
            class="uni-input linkInput"
            :placeholder="
              '复制粘贴填入' + currentPlatformTypeItem.platform + '主页链接'
            "
            @input="homeUrlInputHandler"
            onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            :disabled="!isBeforeSubmitUrl"
          />
          <!-- <view v-if="showClearIcon && !isEdit" class="closeBox">
            <span
              class="iconfont icon-guanbi2fill iconClose"
              @click.stop="clearIcon"
            ></span>
          </view> -->
          <!-- #ifdef MP-WEIXIN -->
          <view
            v-if="!isBeforeSubmitUrl"
            class="pasteBtn tap-active"
            @click="pasteHandler"
            >点击粘贴</view
          >
          <!-- #endif -->
        </view>
      </view>
      <view v-if="isBeforeSubmitUrl" class="bottomPart">
        <view class="status1Btn getBtn tap-active" @click="getBtn"
          >点击获取</view
        >
        <view
          class="link tap-active"
          @click="howToBehavior(currentPlatformTypeItem.howToGetHomeUrl)"
        >
          <span class="iconfont icon-wenhao"></span>
          <span>如何获取主页链接</span>
        </view>
      </view>
      <!-- <view v-else class="inputInfoBox">
        <view class="subItem">
          <view class="leftPart">粉丝数</view>
          <input
            v-model="fansNum"
            class="uni-input infoInput"
            placeholder="无法获取，等待平台审核输入"
            type="number"
            disabled
          />
        </view>
        <view class="subItem">
          <view class="leftPart">赞藏数</view>
          <input
            v-model="likeNum"
            class="uni-input infoInput"
            placeholder="无法获取，等待平台审核输入"
            type="number"
            disabled
          />
        </view>
      </view> -->
    </view>
    <template v-if="!isBeforeSubmitUrl">
      <view v-if="verificationCode" class="partTwo part">
        <view class="topPart">
          <view class="title">
            <span>主页截图验证码：{{ verificationCode }}</span>
            <span
              class="copyBtn tap-active"
              @click="$baseUtil.copyText(verificationCode)"
              >复制</span
            >
          </view>
        </view>
        <view class="link tap-active howToGetCode">
          <span class="iconfont icon-wenhao"></span>
          <span
            @click="
              howToBehavior(currentPlatformTypeItem.howToSetScreenshotCode)
            "
            >如何设置截图验证码？</span
          >
        </view>
      </view>
      <view class="partThree part">
        <view class="topPart">
          <view class="title">
            <span>{{ currentPlatformTypeItem.platform }}个人主页截图</span>
          </view>
          <view class="picPart">
            <view
              v-if="!homePic"
              class="picBox uploader tap-active"
              @click.stop="uploadPic"
            >
              <span class="iconfont icon-jiahao"></span>
            </view>
            <view v-else class="picBox">
              <image
                class="pic"
                mode="aspectFill"
                :src="homePic"
                @click.stop="$baseUtil.previewAloneImage(homePic)"
              ></image>
              <view v-if="canEdit" class="clear tap-active" @click.stop="homePic = ''">
                <span class="iconfont icon-guanbi"></span>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="pageFooterEmptyBox"></view>
      <view v-if="submitBtnTextHandler" class="pageFooter transparent">
        <view class="main">
          <view
            class="fixedBottomBtn status1Btn addBtn tap-active"
            @click="saveHandler"
          >
            <view class="con"> {{ submitBtnTextHandler }} </view>
          </view>
        </view>
        <view class="emptyBox"></view>
      </view>
    </template>
    <HowToBehaviorPopup></HowToBehaviorPopup>
  </view>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { create, editCard } from "@/api/businessCard";
import HowToBehaviorPopup from "@/components/HowToBehaviorPopup";
import howToBehavior from "@/mixins/howToBehavior.js";
import businessCard from "@/mixins/businessCard.js";
import businessCardStatus from "@/mixins/businessCardStatus.js";
export default {
  mixins: [howToBehavior, businessCard, businessCardStatus],
  components: {
    HowToBehaviorPopup,
  },
  data() {
    return {
      isBeforeSubmitUrl: true, // 是否是提交个人主页链接之前的状态
      platformType: '', // 平台类型
      homeUrl: '', // 主页链接
      homePic: '', // 主页截图
      fansNum: '', // 粉丝数
      likeNum: '', // 赞藏数
      headPic: '', // 名片头像
      verificationCode: '', // 验证码
      currentPlatformTypeItem: null,
      requestTimes: 0, // 请求次数
      showClearIcon: false, // 是否展示清除按钮
      isEdit: false, // 是否是编辑模式
      auditStatus: '', // 审核状态, 待审核(0), 审核通过(1), 审核不通过(2)
      idStr: '', // id,编辑文章用
      appUserId: '', // 平台用户id
    };
  },
  watch: {
    homeUrl(val) {
      if (val.length > 0) {
        this.showClearIcon = true;
      } else {
        this.showClearIcon = false;
      }
    },
  },
  computed: {
    ...mapGetters([
      "getPlatformTypeItemByPlatformType",
      "getCheckBusinessCardInfo",
    ]),
    homeUrlHandler() {
      let reg = /http\S*/g; // 只取链接
      return this.homeUrl.match(reg) ? this.homeUrl.match(reg)[0] : "";
    },
  },
  onLoad(option) {
    this.isEdit = option.isEdit ? true : false;
    this.platformType =
      option.platformType !== undefined ? option.platformType : "";
    if (this.platformType === "") {
      this.$baseUtil.navToHome();
      return;
    }
  },
  methods: {
    ...mapActions(["getUploadUserInfo"]),
    async init() {
      // 获取上传图片信息接口
      await this.getUploadUserInfo();
      this.currentPlatformTypeItem = this.getPlatformTypeItemByPlatformType(
        this.platformType
      );
      this.$nextTick(() => {
        if (this.isEdit) {
          let {
            fansNum,
            headPic,
            homePic,
            homeUrl,
            likeNum,
            nick,
            verificationCode,
            idStr,
            auditStatus
          } = this.getCheckBusinessCardInfo;
          this.fansNum = fansNum !== null ? fansNum : "";
          this.headPic = headPic;
          this.likeNum = likeNum !== null ? likeNum : "";
          this.nick = nick;
          this.verificationCode = verificationCode;
          this.homePic = homePic;
          this.homeUrl = homeUrl;
          this.idStr = idStr;
          this.isBeforeSubmitUrl = false;
          this.auditStatus = auditStatus;
        }
        this.skeletonLoading = false;
      });
    },
    homeUrlInputHandler(val) {
      let tempStr = val.detail.value;
      this.homeUrl = tempStr.trim();
    },
    // 点击获取按钮
    getBtn() {
      let regForSubmitUrl = this.currentPlatformTypeItem.regForSubmitUrl; // 判断输入链接是否为对应平台的格式
      if (!regForSubmitUrl.test(this.homeUrlHandler)) {
        regForSubmitUrl.lastIndex = 0;
        this.$baseUtil.showToast({
          title: `请输入正确的${this.currentPlatformTypeItem.platform}主页链接`,
        });
        return;
      }
      regForSubmitUrl.lastIndex = 0;
      // this.updateHandler({
      //   platformType: this.platformType,
      //   homeUrl: this.homeUrlHandler,
      //   isUpdate: false,
      // });
      this.upDateComplate()
    },
    updateSuccess(res) {
      let {
        fansNum,
        headPortrait,
        likeNum,
        nick,
        verificationCode,
        appUserId,
      } = res;
      this.fansNum = fansNum !== null ? fansNum : "";
      this.headPic = headPortrait;
      this.likeNum = likeNum !== null ? likeNum : "";
      this.nick = nick;
      this.verificationCode = verificationCode;
      this.appUserId = appUserId;
    },
    updateError() {
      this.$baseUtil.showToast({
        title: `获取主页数据失败，请手动填写粉丝数和获赞数`,
      });
    },
    // 完成请求执行
    upDateComplate() {
      this.isBeforeSubmitUrl = false;
    },
    // 上传照片
    uploadPic() {
      this.$baseUtil.chooseImage().then((res) => {
        this.homePic = res;
      });
    },
    // 提交名片认证接口
    saveHandler() {
      if (this.homePic === "" || this.homePic === null) {
        this.$baseUtil.showToast({
          title: `请上传主页截图`,
        });
        return;
      }
      if (this.submitBtnTextHandler === '重新提交') {
        this.isEdit = false
        this.homePic = undefined
        return
      }
      if (this.idStr) {
        this.edit();
      } else {
        this.create();
      }
    },
    // 创建
    async create() {
      try {
        this.$baseUtil.showLoading({
          title: "提交中...",
        });
        const res = await create({
          appUserId: this.appUserId,
          fansNum: this.fansNum,
          headPic: this.headPic,
          homePic: this.homePic,
          homeUrl: this.homeUrlHandler,
          likeNum: this.likeNum,
          nick: this.nick,
          platformType: this.platformType,
          verificationCode: this.verificationCode,
        });
        this.$baseUtil.showToast({
          title: res.msg,
        });
        setTimeout(() => {
          uni.redirectTo({
            url: "/pages/BusinessCardAuthentication/result",
          });
        }, 1000);
      } catch (error) {
        this.$baseUtil.normalErrMsgHandler(error);
      } finally {
        uni.hideLoading();
      }
    },
    async edit() {
      try {
        this.$baseUtil.showLoading({
          title: "提交中...",
        });
        const res = await editCard({
          homePic: this.homePic,
          id: this.idStr,
        });
        this.$baseUtil.showToast({
          title: res.msg,
        });
        setTimeout(() => {
          uni.redirectTo({
            url: "/pages/BusinessCardAuthentication/result",
          });
        }, 1000);
      } catch (error) {
        this.$baseUtil.normalErrMsgHandler(error);
      } finally {
        uni.hideLoading();
      }
    },
    // 清除按钮
    clearIcon: function () {
      this.isBeforeSubmitUrl = true;
      this.currentPlatformTypeItem = this.getPlatformTypeItemByPlatformType(
        this.platformType
      );
      this.homeUrl = "";
      this.homePic = "";
      this.fansNum = "";
      this.likeNum = "";
      this.headPic = "";
      this.verificationCode = "";
      this.requestTimes = 0;
    },
    // 复制助手
    pasteHandler() {
      uni.getClipboardData({
        success: function (res) {
          console.log(res.data);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
