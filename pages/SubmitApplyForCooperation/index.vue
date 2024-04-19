<template>
  <Skeleton
    v-if="!getCheckNoticeInfo || skeletonLoading"
    :row="4"
    animate
    :loading="skeletonLoading"
  >
  </Skeleton>
  <view v-else class="page">
    <AlertTip v-if="[0].includes(taskCancelAuditStatus)" tip="取消申请审核中，请耐心等待"></AlertTip>
    <!-- 顶部展现通告相关信息 -->
    <NoticeInfoCard></NoticeInfoCard>
    <view class="part submitOrder">
      <view class="mainTitle">取消原因</view>
      <textarea
        v-model="cancelReason"
        :disabled="isEdit"
        class="inputBox textarea"
        placeholder="请先与通告主确认后申请取消，合理填写取消原因并上传沟通截图"
      ></textarea>
    </view>
    <view class="part submitOrder">
      <view class="mainTitle">{{ !isEdit ? '上传沟通记录截图（最多3张）' : '沟通记录截图' }}</view>
      <view class="picPart of9">
        <view
          v-if="communicationPic.length < 3 && !isEdit"
          class="picBox uploader tap-active"
          @click.stop="uploadPic"
        >
          <span class="iconfont icon-jiahao"></span>
        </view>
        <view
          class="picBox"
          v-for="(item, index) in communicationPic"
          :key="index"
        >
          <image
            class="pic"
            mode="aspectFill"
            :src="item"
            @click.stop="
              $baseUtil.previewImage({
                current: index,
                urls: communicationPic,
              })
            "
          ></image>
          <view
            v-if="!isEdit"
            class="clear tap-active"
            @click.stop="delPicHandler(index)"
          >
            <span class="iconfont icon-guanbi"></span>
          </view>
        </view>
      </view>
      <view
        v-if="taskCancelAuditStatus === 3 && cancelReason"
        class="alertTip2"
      >
        <span class="iconfont icon-jinggao"></span>
        <span
          >{{ "取消申请审核不通过，请重新提交或联系公众号客服处理" }} <br />
          {{ "不通过原因：" + auditRemark }}</span
        >
      </view>
    </view>
    <view class="pageFooterEmptyBox"></view>
    <view class="pageFooter">
      <view class="main">
        <view class="btnGroups">
          <view
            class="cancelBtn btn tap-active"
            @click="$baseUtil.backHandler()"
            >返回</view
          >
          <view
            v-if="isShowSubmitBtn"
            class="comfirmBtn btn tap-active"
            @click="submitHandler"
            >{{ isEdit ? "重新提交" : "提交" }}</view
          >
        </view>
      </view>
      <view class="emptyBox"></view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { getResumeDetail, submitResumeAudit } from "@/api/tNoticeTaskResume.js";
import {
  getCancelApplyInfoVo,
  applyCancelCooperation,
} from "@/api/tNoticeTaskCancel.js";
import NoticeInfoCard from "@/components/NoticeInfoCard.vue";
export default {
  components: {
    NoticeInfoCard,
  },
  computed: {
    ...mapGetters(["getCheckNoticeInfo"]),
    isEdit() {
      if (this.taskCancelAuditStatus === undefined) {
        return false;
      }
      return true;
    },
    isShowSubmitBtn() {
      if (
        this.taskCancelAuditStatus === undefined ||
        this.taskCancelAuditStatus === 3
      ) {
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      cancelReason: undefined, // 取消原因
      auditRemark: undefined, //
      communicationPic: [], // 沟通记录截图（多张逗号隔开）
      taskCancelAuditStatus: undefined, // 任务取消审核状态 - 对应枚举TaskCancelAuditStatus【待商家审核(0)、待管理员审核(1)、审核通过(2)、审核不通过(3)】
    };
  },
  created() {
    if (!this.getCheckNoticeInfo) {
      this.$baseUtil.navToHome();
    }
  },
  onLoad() {},
  methods: {
    ...mapActions(["getUploadUserInfo"]),
    async init() {
      // 获取上传图片信息接口
      await this.getUploadUserInfo();
      await this.getCancelApplyInfoVo();
      this.$nextTick(() => {
        this.skeletonLoading = false;
      });
    },
    async getCancelApplyInfoVo() {
      try {
        const { taskId } = this.getCheckNoticeInfo;
        const {
          cancelReason,
          auditRemark,
          communicationPic,
          taskCancelAuditStatus,
          taskIdStr,
        } = (
          await getCancelApplyInfoVo({
            taskId,
          })
        ).data;
        if (taskIdStr) {
          this.cancelReason = cancelReason;
          this.auditRemark = auditRemark;
          this.communicationPic = communicationPic.split(",");
          this.taskCancelAuditStatus = taskCancelAuditStatus;
        }
      } catch (err) {
        this.$baseUtil.normalErrMsgHandler(err);
      }
    },
    submitHandler() {
      if (this.isEdit) {
        this.cancelReason = undefined;
        this.auditRemark = undefined;
        this.communicationPic = [];
        this.taskCancelAuditStatus = undefined;
      } else {
        if (!this.cancelReason) {
          this.$baseUtil.showToast({
            title: "请填写取消原因",
          });
          return;
        }
        if (this.communicationPic.length === 0) {
          this.$baseUtil.showToast({
            title: "请上传沟通记录截图",
          });
          return;
        }
        this.applyCancelCooperation();
      }
    },
    async applyCancelCooperation() {
      try {
        this.$baseUtil.showLoading({
          title: "提交中...",
        });
        const { taskId } = this.getCheckNoticeInfo;
        const res = await applyCancelCooperation({
          taskId,
          cancelReason: this.cancelReason,
          communicationPic: this.communicationPic.join(","),
        });
        this.$baseUtil.showToast({
          title: res.msg,
        });
        setTimeout(() => {
          this.$baseUtil.backHandler();
          this.$EventBus.$emit("updateCooperation");
        }, 1000);
      } catch (error) {
        this.$baseUtil.normalErrMsgHandler(error);
      } finally {
        uni.hideLoading();
      }
    },
    // 上传照片
    uploadPic() {
      this.$baseUtil
        .chooseImagesHandler({ count: 3 - this.communicationPic.length })
        .then((res) => {
          this.communicationPic = [...this.communicationPic, ...res];
        });
    },
    // 删除照片
    delPicHandler(index) {
      this.communicationPic.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../NoticeSignUp/css/index.scss";
.submitOrder {
  .textarea {
    height: 80rpx;
  }
  .alertTip2 {
    color: $uni-color-error;
    font-size: 24rpx;
    .iconfont {
      margin-right: 10rpx;
      line-height: 2em;
    }
  }
}

.picPart {
  position: relative;
  width: calc(3 * (160rpx) + 2 * (40rpx));
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: 160rpx auto;
  // width: calc(3*(160rpx) + 2*(60rpx));
  height: 160rpx;
  justify-items: center;
  align-items: center;
  // margin: 0 auto;
  // column-gap: 10rpx;
  &.of9 {
    row-gap: 40rpx;
    column-gap: 40rpx;
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(3, 1fr);
    height: 160rpx;
  }
  .tipList {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    grid-row: 1 / span 2;
    grid-column: 2 / span 2;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
