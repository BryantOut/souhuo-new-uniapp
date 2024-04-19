<template>
  <view class="page">
    <AlertTip v-if="alertPartInfo" :tip="alertPartInfo.alertText" :iconfont="alertPartInfo.icon"></AlertTip>
    <view class="content">
      <view class="myBusinessCardList">
        <section class="businessCardItem">
          <template v-if="getCheckBusinessCardInfo.platformType !== 5">
            <view class="topPart">
              <view class="leftPart">
                <view class="headerBox">
                  <image
                    class="header"
                    mode="aspectFill"
                    :src="
                      getCheckBusinessCardInfo.headPic
                        ? getCheckBusinessCardInfo.headPic
                        : '../../static/image/icon6.png'
                    "
                  ></image>
                  <image
                    class="platform"
                    mode="aspectFit"
                    :src="
                      getPlatformItemSingleValueByPlatformTypeAndKey({
                        platformType: getCheckBusinessCardInfo.platformType,
                        key: 'logoSrc',
                      })
                    "
                  ></image>
                </view>
                <view class="infoBox">
                  <view class="subTopPart">
                    <view class="title">{{
                      getCheckBusinessCardInfo.nick | stringModify(8)
                    }}</view>
                    <uni-tag
                      class="tag"
                      :text="
                        $baseUtil.statusFilter(
                          getCheckBusinessCardInfo.auditStatus
                        ).str
                      "
                      type="primary"
                      size="mini"
                      :custom-style="
                        $baseUtil.statusFilter(
                          getCheckBusinessCardInfo.auditStatus
                        ).customStyle
                      "
                    />
                  </view>
                  <view class="tip">
                    <view class="tipItem"
                      >粉丝:
                      {{
                        getCheckBusinessCardInfo.fansNum | formatMaxNum
                      }}</view
                    >
                    <view class="tipItem"
                      >赞藏数:
                      {{
                        getCheckBusinessCardInfo.likeNum | formatMaxNum
                      }}</view
                    >
                  </view>
                </view>
              </view>
              <view
                class="btn themeBtn normal tap-active"
                @click="
                  $baseUtil.windowOpen({
                    url: getCheckBusinessCardInfo.homeUrl,
                  })
                "
                >查看主页</view
              >
            </view>
            <view
              v-if="getCheckBusinessCardInfo.auditStatus === 1"
              class="bottomPart"
              @click="updateBusiness"
            >
              <view class="center">
                <span>账户数据不对</span>
                <view class="update tap-active">
                  <span class="iconfont icon-shuaxin"></span>
                  更新数据
                </view>
              </view>
            </view>
          </template>
          <template v-else>
            <view class="topPart">
              <view class="leftPart">
                <view class="headerBox">
                  <image
                    class="header"
                    mode="aspectFill"
                    :src="
                      getCheckBusinessCardInfo.waitAuditModelPic
                        ? getCheckBusinessCardInfo.waitAuditModelPic.split(',')[0]
                        : '../../static/image/icon6.png'
                    "
                  ></image>
                  <image
                    class="platform"
                    mode="aspectFit"
                    :src="
                      getPlatformItemSingleValueByPlatformTypeAndKey({
                        platformType: getCheckBusinessCardInfo.platformType,
                        key: 'logoSrc',
                      })
                    "
                  ></image>
                </view>
                <view class="infoBox">
                  <view class="subTopPart">
                    <view class="title">{{ "网拍模特认证" }}</view>
                    <uni-tag
                      class="tag"
                      :text="
                        $baseUtil.statusFilter(
                          getCheckBusinessCardInfo.auditStatus
                        ).str
                      "
                      type="primary"
                      size="mini"
                      :custom-style="
                        $baseUtil.statusFilter(
                          getCheckBusinessCardInfo.auditStatus
                        ).customStyle
                      "
                    />
                  </view>
                </view>
              </view>
            </view>
          </template>
        </section>
      </view>
    </view>
    <view class="pageFooterEmptyBox"></view>
    <view class="pageFooter transparent">
      <view class="main">
        <view class="btnGroups fixedBottomBtn">
          <view
            v-if="isShowDelBtn"
            class="cancelBtn btn tap-active"
            :class="{ alone: isAloneBtn }"
            @click="deleteHandler"
            >删除</view
          >
          <view
            v-if="isShowEditBtn"
            class="comfirmBtn btn tap-active"
            :class="{ alone: isAloneBtn }"
            @click="editHandler"
            >编辑</view
          >
        </view>
      </view>
      <view class="emptyBox"></view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { deleteBusinessCard } from "@/api/businessCard";
import businessCard from "@/mixins/businessCard.js";
import businessCardStatus from "@/mixins/businessCardStatus.js";
export default {
  mixins: [businessCard, businessCardStatus],
  data() {
    return {
      isEdit: true,
      requestTimes: 0, // 请求次数
    };
  },
  computed: {
    ...mapGetters([
      "getPlatformItemSingleValueByPlatformTypeAndKey",
      "getCheckBusinessCardInfo",
    ]),
    isShowEditBtn () {
      const { auditStatus, platformType } = this.getCheckBusinessCardInfo
      if (auditStatus !== 1 || platformType === 5) {
        return true
      } else {
        return false
      }
    },
    isShowDelBtn() {
      const { auditStatus } = this.getCheckBusinessCardInfo
      // auditStatus: undefined, // 审核状态, 待审核(0), 审核通过(1), 审核不通过(2)
      if (auditStatus !== 0) {
        return true
      } else {
        return false
      }
    },
    isAloneBtn () {
      return !(this.isShowEditBtn && this.isShowDelBtn)
    }
  },
  onLoad() {},
  methods: {
    ...mapMutations(["SET_CHECK_BUSINESS_CARD_INFO"]),
    init() {},
    // 更新数据
    updateBusiness() {
      let { platformType, homeUrl } = this.getCheckBusinessCardInfo;
      this.updateHandler({
        platformType,
        homeUrl,
        isUpdate: true,
      });
    },
    updateSuccess(res) {
      let { fansNum, headPortrait, likeNum, nick } = res;
      var clone = this.$baseUtil.deepCopy(this.getCheckBusinessCardInfo);
      clone = {
        ...clone,
        fansNum,
        headPic: headPortrait,
        likeNum,
        nick,
      };
      this.SET_CHECK_BUSINESS_CARD_INFO(clone);
      this.$baseUtil.showToast({
        title: `更新成功`,
      });
    },
    // 删除
    deleteHandler() {
      uni.showModal({
        title: "提示",
        content: "删除后将失去报名任务资格，确认删除该名片吗？",
        success: (res) => {
          if (res.confirm) {
            this.deleteBusinessCard();
          }
        },
      });
    },
    // 名片删除接口
    deleteBusinessCard() {
      let { idStr: id } = this.getCheckBusinessCardInfo;
      deleteBusinessCard({ id })
        .then(() => {
          this.$baseUtil.showToast({
            title: "删除成功",
          });
          setTimeout(() => {
            uni.redirectTo({
              url: "/pages/MyBusinessCard/index",
            });
          }, 1000);
        })
        .catch((err) => {
          this.$baseUtil.normalErrMsgHandler(err);
          setTimeout(() => {
            uni.redirectTo({
              url: "/pages/MyBusinessCard/index",
            });
          }, 1000);
        });
    },
    // 编辑
    editHandler() {
      const { platformType } = this.getCheckBusinessCardInfo;
      if (platformType !== 5) {
        this.$baseUtil.navigateToHandler(
          `/pages/BusinessCardAuthentication/stepTwo?isEdit=true&platformType=${platformType}`
        );
      } else {
        this.$baseUtil.navigateToHandler(
          `/pages/BusinessCardAuthentication/stepTwoOfModelCard?isEdit=true&platformType=${platformType}`
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
