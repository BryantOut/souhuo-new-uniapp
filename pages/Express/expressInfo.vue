<template>
  <Skeleton
    v-if="!getCheckNoticeInfo || skeletonLoading"
    :row="4"
    animate
    :loading="skeletonLoading"
  >
  </Skeleton>
  <view v-else class="page">
    <!-- 顶部展现通告相关信息 -->
    <NoticeInfoCard></NoticeInfoCard>
    <view class="part">
      <view class="mainTitle">物流详情</view>
      <section class="companyInfo">
        <image
          v-if="currentComInfo.logo"
          class="expressLogo"
          mode="aspectFill"
          :src="currentComInfo.logo"
        ></image>
        <span>{{ currentComInfo.comName }}</span>
        <span class="expressNumber">{{ expressNumber }}</span>
      </section>

      <block v-for="(item, index) in tracesData" :key="index">
        <trackNode
          :is-first="index === tracesData.length - 1"
          :is-newest="index === 0"
          :node-data="item"
        ></trackNode>
      </block>
    </view>
    <view class="pageFooterEmptyBox" :class="!isReturn ? 'hasTip':''"></view>
    <view class="pageFooter" :class="!isReturn ? 'hasTip':''">
      <view class="main">
        <view v-if="!isReturn" class="tip">已收到货？可直接提交内容</view>
        <view class="btnGroups">
          <view
            class="cancelBtn btn tap-active"
            @click="$baseUtil.backHandler()"
            >返回</view
          >
          <view v-if="!isReturn" class="comfirmBtn btn tap-active" @click="submitContent">提交</view>
        </view>
      </view>
      <view class="emptyBox"></view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getUTaskExpress, getUTaskReturnExpress } from "@/api/express.js";
import trackNode from "../../components/trackNode.vue";
import NoticeInfoCard from "@/components/NoticeInfoCard.vue";
export default {
  components: {
    trackNode,
    NoticeInfoCard,
  },
  computed: {
    ...mapGetters(["getCheckNoticeInfo", "getSubmitExpressTempParams"]),
    currentComInfo() {
      if (this.comCode) {
        return this.$baseUtil.filterComCode(this.comCode);
      }
      return;
    },
    isReturn() {
      if (this.getCheckNoticeInfo) {
        return this.getCheckNoticeInfo.taskStatus === 5
      }
      return false
    }
  },
  data() {
    return {
      expressNumber: undefined,
      tracesData: [],
      comCode: undefined,
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
      await this.getUTaskExpressHandler();
      this.$nextTick(() => {
        this.skeletonLoading = false;
      });
    },
    async getUTaskExpressHandler() {
      try {
        const { taskId, taskStatus } = this.getCheckNoticeInfo;
        let tempMethedName;
        // 任任务状态 - 【合作中(0),待收货(1),待提交(2),待审核(3),待寄回(4),待确认(5),已完成(6),已取消(7),已超时(8),取消中(9)】
        if ([1,2].includes(taskStatus)) {
          // 获取物流信息接口
          tempMethedName = getUTaskExpress;
        } else if ([5].includes(taskStatus)) {
          // 获获取回寄物流信息接口
          tempMethedName = getUTaskReturnExpress;
        } else {
          this.$baseUtil.navToHome();
        }
        const { com, data, expressNumber } = (
          await tempMethedName({
            taskId,
          })
        ).data;
        this.expressNumber = expressNumber;
        this.comCode = com;
        this.tracesData = JSON.parse(data);
      } catch (err) {
        this.$baseUtil.normalErrMsgHandler(err);
      }
    },
	// 提交内容
	submitContent() {
	  this.$baseUtil.navigateToHandler("/pages/SubmitContent/index");
	},
  },
};
</script>

<style lang="scss" scoped>
@import "../NoticeSignUp/css/index.scss";
.companyInfo {
  margin: 30rpx 0;
}
</style>
