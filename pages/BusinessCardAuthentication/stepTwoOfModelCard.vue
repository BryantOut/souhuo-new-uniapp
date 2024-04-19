<template>
  <Skeleton v-if="skeletonLoading" :row="4" animate :loading="skeletonLoading">
  </Skeleton>
  <view v-else class="page">
    <AlertTip v-if="alertPartInfo" :tip="alertPartInfo.alertText" :iconfont="alertPartInfo.icon"></AlertTip>
    <view class="part">
      <view class="topPart">
        <!-- <view class="title">
          <span>上传认证视频</span>
        </view>
        <view class="picPart">
          <view
            v-if="!homeUrl"
            class="picBox uploader tap-active"
            @click.stop="uploadVideo"
          >
            <span class="iconfont icon-jiahao"></span>
          </view>
          <view v-else class="picBox">
            <NoticeVideo
              :homeUrl="homeUrl"
              :posterImg="posterImg"
            ></NoticeVideo>
            <view
              v-if="canEdit"
              class="clear tap-active"
              @click.stop="delVideoHandler()"
            >
              <span class="iconfont icon-guanbi"></span>
            </view>
          </view>
          <view class="tipList">
            <view class="tipItem">1.请上传大于5秒的露脸原声视频</view>
            <view class="tipItem">2.视频需要清晰且露出上半身</view>
            <view class="tipItem">3.视频仅作认证使用，不会公开</view>
          </view>
        </view> -->

        <view class="title">
          <span>上传模特照片（3张）</span>
          <view
            class="rightPart"
            @click.tap="
              $baseUtil.navigateToHandler(
                '/pages/BusinessCardAuthentication/requestOfPic'
              )
            "
          >
            <span class="iconfont icon-31tishi"></span>
            <span>查看照片要求</span>
          </view>
        </view>
        <view class="picPart of3">
          <view
            v-if="headPic.length < 3"
            class="picBox uploader tap-active"
            @click.stop="uploadPic"
          >
            <span class="iconfont icon-jiahao"></span>
          </view>
          <view class="picBox" v-for="(item, index) in headPic" :key="index">
            <image
              class="pic"
              mode="aspectFill"
              :src="item"
              @click.stop="
                $baseUtil.previewImage({
                  current: index,
                  urls: headPic,
                })
              "
            ></image>
            <view
              v-if="canEdit"
              class="clear tap-active"
              @click.stop="delPicHandler(index)"
            >
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
  </view>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { IMG_BASE_URL } from "@/config.js";
import NoticeVideo from "@/components/NoticeVideo/index.vue";
import { create, editModelCard } from "@/api/businessCard";
import businessCardStatus from "@/mixins/businessCardStatus.js";
export default {
  mixins: [businessCardStatus],
  components: { NoticeVideo },
  data() {
    return {
      platformType: undefined, // 平台类型
      isEdit: false, // 是否是编辑模式
      auditStatus: undefined, // 审核状态, 待审核(0), 审核通过(1), 审核不通过(2)
      auditRemark: undefined, // 审核备注
      idStr: undefined, // id,编辑文章用
      headPic: [], // 名片头像/网拍：9张模特照片(多张用逗号隔开)
      // homeUrl: undefined, // 主页链接/网拍：认证视频(必填)
      posterImg: require("@/static/image/videoLogo.jpg"), // 视频封面
    };
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
  computed: {
    ...mapGetters(["getCheckBusinessCardInfo"]),    
  },
  methods: {
    ...mapActions(["getUploadUserInfo"]),
    async init() {
      // 获取上传图片信息接口
      await this.getUploadUserInfo();
      this.$nextTick(() => {
        if (this.isEdit) {
          let { idStr, auditStatus, auditRemark, waitAuditModelPic } =
            this.getCheckBusinessCardInfo;
          this.headPic = waitAuditModelPic ? waitAuditModelPic.split(",") : [];
          // this.homeUrl = homeUrl;
          this.idStr = idStr;
          this.auditStatus = auditStatus;
          this.auditRemark = auditRemark ? auditRemark : "暂无";
        }
        this.skeletonLoading = false;
      });
    },
    // 上传视频
    // uploadVideo() {
    //   this.$baseUtil.uploadVideo().then((res) => {
    //     this.homeUrl = IMG_BASE_URL + res;
    //   });
    // },
    // 上传照片
    uploadPic() {
      this.$baseUtil
        .chooseImagesHandler({ count: 3 - this.headPic.length })
        .then((res) => {
          this.headPic = [...this.headPic, ...res];
        });
    },
    // 删除照片
    delPicHandler(index) {
      this.headPic.splice(index, 1);
    },
    // 删除视频
    // delVideoHandler() {
    //   this.homeUrl = "";
    // },
    // 提交按钮
    saveHandler() {
      // if (!this.homeUrl) {
      //   this.$baseUtil.showToast({
      //     title: `请上传大于5秒的露脸原声视频`,
      //   });
      //   return;
      // }
      if (this.headPic.length < 3) {
        this.$baseUtil.showToast({
          title: `请上传3张模特照片`,
        });
        return;
      }
      if (this.submitBtnTextHandler === "重新提交") {
        this.isEdit = false;
        this.headPic = [];
        // this.homeUrl = undefined;
        this.auditRemark = undefined;
        this.auditStatus = undefined;
        return;
      }
      if (this.idStr) {
        this.edit();
      } else {
        this.create();
      }
    },
    async edit() {
      try {
        this.$baseUtil.showLoading({
          title: "提交中...",
        });
        const res = await editModelCard({
          headPic: this.headPic.join(","),
          // homeUrl: this.homeUrl,
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
    // 创建
    async create() {
      try {
        this.$baseUtil.showLoading({
          title: "提交中...",
        });
        const res = await create({
          headPic: this.headPic.join(","),
          // homeUrl: this.homeUrl,
          platformType: this.platformType,
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
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";

// .videoPart {
//   justify-content: flex-start;
//   .tipList {
//     height: 160rpx;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-around;
//     margin-left: 30rpx;
//   }
// }
</style>
