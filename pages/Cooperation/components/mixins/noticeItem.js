import { mapMutations } from "vuex";
import noticeShowHandler from "@/mixins/noticeShowHandler";
import { TASK_STATUS } from '@/constants/index';
export default {
  mixins: [noticeShowHandler],
  props: {
    noticeItemInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    expressJsonFilter() {
      return JSON.parse(this.noticeItemInfo.expressJson);
    },
    isMainNode() {
      return this.$baseUtil.isMainNode(this.expressJsonFilter);
    },
  },
  methods: {
    ...mapMutations(["SET_CHECK_NOTICE_INFO"]),
    // 查看详情
    checkDetail() {
      this.$emit('goToDetailHandler')
      this.SET_CHECK_NOTICE_INFO(this.noticeItemInfo);
      // this.$baseUtil.navigateToHandler("/pages/NoticeDetail/status2");
    },
    // 开始合作
    biginCooperation() {
      this.SET_CHECK_NOTICE_INFO(this.noticeItemInfo);
      this.$baseUtil.navigateToHandler(`/pages/NoticeDetail/status2`);
    },
    currentBtn(row) {
      let tempText;
      let tempMethed;
      let isActive = true;
      // 报名状态signUpStatus：待筛选(0),已选中(1),未选中(2),已取消(3)
      // 任务状态taskStatus：合作中(0),待收货(1),待提交(2),待审核(3),待寄回(4),待确认(5),已完成(6),已取消(7),已超时(8),取消中(9)
      const { taskStatus, signUpStatus } = row;
      switch (taskStatus) {
        case 0:
          // 若当前任务状态为【合作中】，则底部按钮展现为【提交物流】 - 点击跳转到提交快递单号页面
          tempText = "提交物流";
          tempMethed = this.submitOrder;
          isActive = false;
          break;
        case 2:
          // 若当前任务状态为【待收货】/【待提交】，则底部按钮展现为【提交内容】 - 点击跳转到提交内容页面
          tempText = "提交内容";
          tempMethed = this.submitContent;
          break;
        case 8:
          // 若当前任务状态为【已超时】，则底部按钮展现为【申请恢复】 - 点击跳转到申请恢复合作页面
          tempText = "申请恢复";
          tempMethed = this.applyForRest;
          break;
        case 4:
          // 若当前任务状态为【待寄回】，则底部按钮展现为【提交回寄】 - 点击跳转到提交寄回单号页面
          tempText = "提交回寄";
          tempMethed = this.submitOrder;
          isActive = false;
          break;
        default:
          break;
      }
      return {
        tempText,
        tempMethed,
        isActive
      };
    },
    // 提交物流
    submitOrder() {
      this.SET_CHECK_NOTICE_INFO(this.noticeItemInfo);
      this.$baseUtil.navigateToHandler("/pages/Express/submitOrder");
    },
    // 提交内容
    submitContent() {
      this.SET_CHECK_NOTICE_INFO(this.noticeItemInfo);
      this.$baseUtil.navigateToHandler("/pages/SubmitContent/index");
      // this.$baseUtil.navigateToHandler("/pages/SubmitContent/submitSuccess")
    },
    // 申请恢复
    applyForRest() {
      this.SET_CHECK_NOTICE_INFO(this.noticeItemInfo);
      this.$baseUtil.navigateToHandler("/pages/SubmitApplyForRest/index");
    },
    // 查看物流
    expressInfo() {
	  this.SET_CHECK_NOTICE_INFO(this.noticeItemInfo);
      this.$baseUtil.navigateToHandler("/pages/Express/expressInfo");
    },
    clickItemHandler() {
      this.checkDetail();
    },
    isShowAddWxBtn({taskStatus}) {
      // 若状态为【合作中】，按钮优化为展现：【提交物流】（左侧，黑色）&【添加微信】
      return taskStatus === TASK_STATUS['合作中']
    },
    isShowContactBusinessBtn({taskStatus}) {
      // 若状态为【待寄回】，按钮优化为展现：【提交回寄】（左侧，黑色）&【联系商家】
      return taskStatus === TASK_STATUS['待寄回']
    }
  },
};
