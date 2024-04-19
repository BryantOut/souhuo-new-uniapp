<template>
  <Skeleton
    v-if="!getCheckNoticeInfo || skeletonLoading"
    :row="4"
    animate
    :loading="skeletonLoading"
  >
  </Skeleton>
  <view v-else class="page">
    <AlertTip v-if="auditStatus === 0" tip="恢复申请审核中，请耐心等待"></AlertTip>
    <!-- 顶部展现通告相关信息 -->
    <NoticeInfoCard></NoticeInfoCard>
    <view class="part submitOrder">
      <view class="mainTitle">{{ isEdit ? '申请原因': '填写申请原因' }}</view>
      <textarea
        v-model="applyReason"
        :disabled="auditStatus !== undefined"
        class="inputBox textarea"
        placeholder="请填写申请原因"
      ></textarea>
      <view v-if="auditStatus === 2 && auditRemark" class="alertTip2">
        <span class="iconfont icon-jinggao"></span>
        <span>{{ "恢复申请审核不通过，请重新提交或联系通告主处理" }} <br />
					{{ "不通过原因：" + auditRemark }}</span>
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
import { mapGetters, mapMutations } from "vuex";
import { getResumeDetail, submitResumeAudit } from "@/api/tNoticeTaskResume.js";
import NoticeInfoCard from "@/components/NoticeInfoCard.vue";
export default {
  components: {
    NoticeInfoCard,
  },
  computed: {
    ...mapGetters(["getCheckNoticeInfo"]),
    isEdit() {
      if (this.auditStatus === undefined) {
        return false;
      }
      return true;
    },
    isShowSubmitBtn() {
      if (this.auditStatus === 0) {
        return false;
      }
      return true;
    },
  },
  data() {
    return {
      applyReason: undefined, // 申请原因
      auditStatus: undefined, // 审核状态, 待审核(0), 审核通过(1), 审核不通过(2)
      auditRemark: undefined, // 审核不通过原因
    };
  },
  created() {
    if (!this.getCheckNoticeInfo) {
      this.$baseUtil.navToHome();
    }
  },
  onLoad() {},
  methods: {
    async init() {
      await this.getResumeDetail();
      this.$nextTick(() => {
        this.skeletonLoading = false;
      });
    },
    async getResumeDetail() {
      try {
        const { taskId } = this.getCheckNoticeInfo;
        const { applyReason, auditStatus, auditRemark } = (
          await getResumeDetail({
            id: taskId,
          })
        ).data;
        this.applyReason = applyReason !== null ? applyReason : undefined;
        this.auditStatus = auditStatus !== null ? auditStatus : undefined;
        this.auditRemark = auditRemark !== null ? auditRemark : undefined;
      } catch (err) {
        this.$baseUtil.normalErrMsgHandler(err);
      }
    },
    submitHandler() {
      if (this.isEdit) {
        this.applyReason = undefined;
        this.auditStatus = undefined;
      } else {
        if (!this.applyReason) {
          this.$baseUtil.showToast({
            title: "请填写申请原因",
          });
          return;
        }
        this.submitResumeAudit();
      }
    },
    async submitResumeAudit() {
      try {
        this.$baseUtil.showLoading({
          title: "提交中...",
        });
        const { taskId } = this.getCheckNoticeInfo;
        const res = await submitResumeAudit({
          taskId,
          applyReason: this.applyReason,
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
</style>
