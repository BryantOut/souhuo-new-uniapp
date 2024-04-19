import {
    mapGetters
} from "vuex";
export default {
  computed: {
    ...mapGetters(["getPlatformItemSingleValueByPlatformTypeAndKey"]),
    submitBtnTextHandler() {
      // 审核状态, 待审核(0), 审核通过(1), 审核不通过(2)
      if (this.isEdit) {
        switch (this.auditStatus) {
          case 1:
            return "重新提交";
          case 2:
            return "重新提交";
          default:
            return "";
        }
      } else {
        return "提交";
      }
    },
    canEdit() {
      return (
        this.submitBtnTextHandler === "编辑" ||
        this.submitBtnTextHandler === "提交"
      );
    },
    alertPartInfo() {
      // 审核状态, 待审核(0), 审核通过(1), 审核不通过(2)
      let icon = "";
      let alertText = "";
      if (!this.getCheckBusinessCardInfo) return
      const { auditStatus, platformType, auditRemark } = this.getCheckBusinessCardInfo
      const platformFullName = this.getPlatformItemSingleValueByPlatformTypeAndKey({
        platformType: platformType,
        key: 'platformFullName',
      })
      if (this.isEdit) {
        switch (auditStatus) {
          case 1:
            alertText = `${platformFullName}已审核通过`;
            icon = "icon-wancheng";
            break;
          case 2:
            alertText = `审核不通过：${auditRemark}`;
            icon = "icon-cuowu";
            break;
          default:
            alertText = `${platformFullName}审核中，请耐心等待`;
            icon = "icon-bianji";
            break;
        }
        return {
          icon,
          alertText,
        };
      }
      return null;
    },
  },
};
