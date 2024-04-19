<!-- 已报名状态 -->
<template>
  <Skeleton
    v-if="!getCheckNoticeInfo || skeletonLoading"
    :row="4"
    animate
    :loading="skeletonLoading"
  >
  </Skeleton>
  <view v-else class="page normalPaddingTop">
    <view class="partOne part">
      <view class="topPart">
        <view class="subLeftPart">
          <image
            class="platform"
            mode="aspectFit"
            :src="
              getPlatformItemSingleValueByPlatformTypeAndKey({
                platformType: getCheckNoticeInfo.platformType,
                key: 'logoSrc',
              })
            "
          ></image>
          <span class="oneRow title" v-text="getCheckNoticeInfo.title"></span>
        </view>
        <uni-tag
          class="tag"
          :text="rewardTypeHandler(getCheckNoticeInfo.rewardType)"
          type="primary"
          size="mini"
          custom-style="background-color: #FF9900; border-color: #FF9900; color: #FFFFFF;"
        />
      </view>
      <view class="bottomPart">
        <view class="title">合作形式</view>
        <view
          v-if="cooperationTypeIncludePic(getCheckNoticeInfo.cooperationType)"
          class="item"
        >
          <span class="iconfont icon-tupian"></span>
          <span>图文单篇</span>
        </view>
        <view
          v-if="cooperationTypeIncludeVideo(getCheckNoticeInfo.cooperationType)"
          class="item"
        >
          <span class="iconfont icon-shipin"></span>
          <span>视频单篇</span>
        </view>
      </view>
    </view>
    <view
      v-if="confirmCooperationInfo.taskStatus !== null"
      class="part partTwo"
    >
      <view class="mainTitle">
        <view class="leftPast">通告主联系方式</view>
      </view>
      <view class="requirementList">
        <view class="item status2">
          <view class="subItem subTitle wx">
            通告主微信：
            <template
              v-if="!$baseUtil.isLink(confirmCooperationInfo.contactWechat)"
            >
              <span class="iconfont icon-weixin"></span>
              <span>{{ confirmCooperationInfo.contactWechat }}</span>
            </template>
          </view>
          <template
            v-if="$baseUtil.isLink(confirmCooperationInfo.contactWechat)"
          >
            <image
              :src="confirmCooperationInfo.contactWechat"
              class="qrCodeSrc"
              mode="aspectFit"
              @click.stop="
                $baseUtil.previewAloneImage(
                  confirmCooperationInfo.contactWechat
                )
              "
            ></image>
          </template>
        </view>
      </view>
    </view>
    <view class="partTwo part">
      <view class="mainTitle">
        <view class="leftPast">通告要求</view>
      </view>
      <view class="requirementList">
        <view v-if="confirmCooperationInfo.submitEndTime || confirmCooperationInfo.expirationDate" class="item">
          <view class="subItem subTitle">档期要求</view>
          <view v-if="confirmCooperationInfo.expirationDate" class="subItem">
            <view class="key">截止时间：</view>
            <view class="value">{{
              confirmCooperationInfo.expirationDate | formatTime("YYYY年MM月DD日")
            }}</view>
          </view>
          <view v-if="confirmCooperationInfo.submitEndTime" class="subItem">
            <view class="key">提交内容截止时间：</view>
            <view class="value">
              {{
              confirmCooperationInfo.submitEndTime | formatTime("YYYY年MM月DD日")
            }}</view>
          </view>
        </view>
        <view class="item">
          <view class="subItem subTitle">账号要求</view>
          <view class="subItem">
            <view class="key">粉丝要求：</view>
            <view class="value"
              >{{ fansDemandFilter(getCheckNoticeInfo.fansDemand) }} 粉丝</view
            >
          </view>
        </view>
        <!-- <view class="item">
          <view class="subItem subTitle">人数要求</view>
          <view class="subItem">
            <view class="key">招募人数：</view>
            <view class="value"
              >{{ fansDemandFilter(getCheckNoticeInfo.cooperationNumber) }} 人</view
            >
          </view>
          </view> -->
        <view class="item">
          <view class="subItem subTitle">通告奖励</view>
          <view class="subItem" v-if="getCheckNoticeInfo.rewardType !== 1">
            <view class="key">稿费金额：</view>
            <view class="value"
              >￥{{
                paymentHandler({
                  minPayment: getCheckNoticeInfo.minPayment,
                  maxPayment: getCheckNoticeInfo.maxPayment,
                })
              }}
            </view>
          </view>
          <template v-if="getCheckNoticeInfo.rewardType !== 0">
            <view class="subItem">
              <view class="key">赠品名称：</view>
              <view class="value">
                {{ getCheckNoticeInfo.giftName }}
              </view>
            </view>
            <view class="subItem">
              <view class="key">赠品价值：</view>
              <view class="value">
                {{ formatMaxNum(getCheckNoticeInfo.giftAmount) }}
              </view>
            </view>
          </template>
        </view>
        <view v-if="getCheckNoticeInfo.noticeContent" class="item">
          <view class="subItem subTitle">合作须知</view>
          <view class="subItem special">
            <view class="key" v-html="getCheckNoticeInfo.noticeContent"></view>
          </view>
        </view>
        <view class="item">
          <view class="imageList">
            <image
              v-for="(item, index) in tempProductImgsList"
              :key="index"
              class="productImgs"
              mode="widthFix"
              :src="item"
              @click.stop="
                $baseUtil.previewImage({
                  current: index,
                  urls: tempProductImgsList,
                })
              "
            ></image>
          </view>
        </view>
      </view>
    </view>
    <!-- 若任务状态为【待收货】/【待提交】/【待确认】，则在【通告主联系方式版块】下方展现发货/回寄快递信息：快递公司、快递单号、最新一条物流信息 -->
    <view
      v-if="[1, 2, 5].includes(confirmCooperationInfo.taskStatus) && expressDto"
      class="part partTwo logistics"
    >
      <view class="mainTitle">
        <view class="leftPast">物品快递单号</view>
      </view>
      <view class="requirementList">
        <view class="item">
          <view class="subItem subTitle"> 快递单号 </view>
          <view class="logisticsInfo">
            <view v-if="currentComInfo" class="companyAndOddNumbers">
              <image
                v-if="currentComInfo.logo"
                class="logo"
                :src="currentComInfo.logo"
              ></image>
              <view class="company">{{ currentComInfo.comName }}：</view>
              <view class="oddNumbers">{{ expressDto.expressNumber }}</view>
            </view>
            <view class="statusInfo" @click.stop="expressInfo()">
              <view class="main">
                <view class="leftPart">
                  <template v-if="expressDto.expressJson">
                    <view class="status">{{
                      expressDto.expressJson.status
                    }}</view>
                    <view>{{ expressDto.expressJson.ftime }}</view>
                  </template>
                  <template v-else> 暂无详细物流信息 </template>
                </view>
                <view class="checkDetail">
                  详细信息
                  <span class="iconfont icon-xiangyou1"></span>
                </view>
              </view>
              <view v-if="expressDto.expressJson" class="tip">
                {{ expressDto.expressJson.context }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="confirmCooperationInfo.platformType !== 5" class="part partTwo">
      <view class="mainTitle">
        <view class="leftPast">报名名片</view>
      </view>
      <section class="businessCardItem">
        <view class="leftPart">
          <view class="headerBox">
            <image
              class="header"
              mode="aspectFill"
              :src="
                confirmCooperationInfo.headPic
                  ? confirmCooperationInfo.headPic
                  : '../../static/image/icon6.png'
              "
            ></image>
            <image
              class="platform"
              mode="aspectFit"
              :src="
                getPlatformItemSingleValueByPlatformTypeAndKey({
                  platformType: confirmCooperationInfo.platformType,
                  key: 'logoSrc',
                })
              "
            ></image>
          </view>
          <view class="infoBox">
            <view class="subTopPart">
              <view class="title">{{
                confirmCooperationInfo.nick | stringModify(8)
              }}</view>
            </view>
            <view class="tip">
              <view class="tipItem"
                >粉丝: {{ confirmCooperationInfo.fansNum | formatMaxNum }}</view
              >
              <view class="tipItem"
                >赞藏数:
                {{ confirmCooperationInfo.likeNum | formatMaxNum }}</view
              >
            </view>
          </view>
        </view>
      </section>
    </view>
    <view v-else class="part partTwo">
      <view class="mainTitle">
        <view class="leftPast">模特认证</view>
      </view>
      <section class="businessCardItem">
        <view class="leftPart">
          <view class="headerBox">
            <image
              class="header"
              mode="aspectFill"
              :src="
                confirmCooperationInfo.wxHeadPortraitUrl
                  ? confirmCooperationInfo.wxHeadPortraitUrl
                  : '../../static/image/icon6.png'
              "
            ></image>
            <image
              class="platform"
              mode="aspectFit"
              :src="
                getPlatformItemSingleValueByPlatformTypeAndKey({
                  platformType: confirmCooperationInfo.platformType,
                  key: 'logoSrc',
                })
              "
            ></image>
          </view>
          <view class="infoBox">
            <view class="subTopPart">
              <view class="title">{{
                confirmCooperationInfo.wxNick | stringModify(8)
              }}</view>
            </view>
          </view>
        </view>
      </section>
    </view>
    <view
      v-if="
        confirmCooperationInfo.picBidAmount ||
        confirmCooperationInfo.videoBidAmount
      "
      class="part partTwo"
    >
      <view class="mainTitle">
        <view class="leftPast">合作形式及报价</view>
      </view>
      <view class="requirementList">
        <view
          v-if="confirmCooperationInfo.picBidAmount"
          class="modalityAndQuotationItem"
        >
          <view class="leftPart">
            <span class="iconfont icon-tupian"></span>
            <span>图文单篇</span>
          </view>
          <view class="inputBox">
            <view class="unity">￥</view>
            <input
              :value="confirmCooperationInfo.picBidAmount"
              disabled
              class="uni-input"
              type="number"
              placeholder="0"
              @input="numberHandlerUtils($event, 'picBidAmount')"
            />
          </view>
        </view>
        <view
          v-if="confirmCooperationInfo.videoBidAmount"
          class="modalityAndQuotationItem"
        >
          <view class="leftPart">
            <span class="iconfont icon-shipin"></span>
            <span>视频单篇</span>
          </view>
          <view class="inputBox">
            <view class="unity">￥</view>
            <input
              :value="confirmCooperationInfo.videoBidAmount"
              disabled
              class="uni-input"
              type="number"
              placeholder="0"
              @input="numberHandlerUtils($event, 'picBidAmount')"
            />
          </view>
        </view>
        <view
          v-if="confirmCooperationInfo.bidRemark"
          class="modalityAndQuotationItem"
        >
          <view class="leftPart">
            <span class="iconfont icon-16"></span>
            <span>报价补充</span>
          </view>
          <textarea
            :value="confirmCooperationInfo.bidRemark"
            disabled
            class="inputBox textarea"
            @input="numberHandlerUtils($event, 'picBidAmount')"
          ></textarea>
        </view>
      </view>
    </view>
    <view class="partThree part">
      <view class="mainTitle">
        <view class="leftPast">任务流程</view>
      </view>
      <view class="taskStepBox">
        <view
          v-for="(item, index) in stepList"
          :key="index"
          class="stepItem"
          :class="{ active: currentStep >= Number(index) + 1 }"
        >
          <view class="step">{{ index + 1 }}</view>
          <view class="text">{{ item.text }}</view>
        </view>
      </view>
      <view class="tipBox">
        <span class="iconfont icon-31tishi"></span>
        <span class="mainTip">
          二次确认信息以及最终确认合作的人选将通过短信、公众号通知发送给您，请及时关注。确认合作后，会以添加微信群的方式进行合作沟通，最终发布笔记。
        </span>
      </view>
    </view>
    <!-- 若当前任务状态为【合作中】，则在页面内容的最下方，增加展现【申请取消合作】按钮 - 点击跳转到提交申请取消页面 -->
    <view
      v-if="confirmCooperationInfo.taskStatus === 0"
      class="cancelBtn tap-active"
      @click="applyForCooperation"
      >申请取消合作
    </view>
    <view class="pageFooterEmptyBox"></view>
    <view class="pageFooter">
      <view class="main">
        <view class="item tap-active" @click="$baseUtil.navToHome(false)">
          <view class="con">
            <image
              src="~@/static/image/home_active.png"
              mode="aspectFit"
              class="icon"
            ></image>
            <span class="text">首页</span>
          </view>
        </view>
        <view
          class="item tap-active"
          @click="checkLoginBeforeOperation(shareHandler, 0)"
        >
          <view class="con">
            <image
              src="~@/static/image/icon5.png"
              mode="aspectFit"
              class="icon"
            ></image>
            <span class="text">分享</span>
          </view>
        </view>
        <view
          v-if="currentBtn.tempText"
          class="signUpBtn tap-active"
          @click="currentBtn.tempMethed()"
          >{{ currentBtn.tempText }}</view
        >
      </view>
      <view class="emptyBox"></view>
    </view>
    <LoginPopup></LoginPopup>
    <LoginByPhone></LoginByPhone>
    <PrivacyAgreement></PrivacyAgreement>
    <UserAgreement></UserAgreement>
    <!-- 登录弹窗 end -->
    <view
      v-if="isShowQrcodePopup"
      class="myPopupBox"
      @click="isShowQrcodePopup = false"
    >
      <image
        class="qrCode"
        mode="aspectFill"
        :src="qrCode"
        :show-menu-by-longpress="true"
        @click.stop
      ></image>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import noticeShowHandler from "@/mixins/noticeShowHandler";
import { getConsultantInfo } from "@/api/tNotice";
import { getConfirmCooperationInfo } from "@/api/tNoticeTask";
import { IMG_BASE_URL } from "@/config.js";
export default {
  mixins: [noticeShowHandler],
  data() {
    return {
      stepList: [
        {
          text: "我要报名",
        },
        {
          text: "添加微信",
        },
        {
          text: "执行合作",
        },
        {
          text: "提交完成",
        },
      ],
      qrCode: "", // 执行群二维码
      isShowQrcodePopup: false,
      confirmCooperationInfo: null, // 确认合作页面信息
      expressDto: null, // 获取确认合作页面接口-返回数据实体-快递信息
    };
  },
  computed: {
    ...mapGetters(["getCheckNoticeInfo"]),
    tempProductImgsList() {
      if (this.getCheckNoticeInfo.productImgs) {
        return this.getCheckNoticeInfo.productImgs.split(",");
      } else {
        return [];
      }
    },
    currentBtn() {
      let tempText;
      let tempMethed;
      if (this.confirmCooperationInfo) {
        const { taskStatus, isExistPendAudit } = this.confirmCooperationInfo;
        if (isExistPendAudit) {
          // 若接口回传的【是否存在待审核取消申请】为【是】，则底部按钮展现为【取消审核中】 - 点击跳转到申请取消合作页面，展现已提交的内容
          tempText = "取消审核中";
          tempMethed = this.applyForCooperation;
        } else {
          // 任务状态 - 【合作中(0),待收货(1),待提交(2),待审核(3),待寄回(4),待确认(5),已完成(6),已取消(7),已超时(8),取消中(9)】
          switch (taskStatus) {
            case 0:
              // 若当前任务状态为【合作中】，则底部按钮展现为【提交物流】 - 点击跳转到提交快递单号页面
              tempText = "提交物流";
              tempMethed = this.submitOrder;
              break;
            case 1:
              // 若当前任务状态为【待收货】/【待提交】，则底部按钮展现为【提交内容】 - 点击跳转到提交内容页面
              tempText = "提交内容";
              tempMethed = this.submitContent;
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
            case 3:
              // 若任务状态为【待审核】，则无需展现按钮
              tempText = "查看提交内容";
              tempMethed = this.submitContent;
              break;
            case 4:
              // 若当前任务状态为【待寄回】，则底部按钮展现为【提交回寄】 - 点击跳转到提交寄回单号页面
              tempText = "提交回寄";
              tempMethed = this.submitOrder;
              break;
            case 5:
              // 若当前任务状态为【待确认】，则底部按钮展现为【查看回寄物流】 - 点击跳转到提交寄回单号页面
              tempText = "查看回寄物流";
              tempMethed = this.expressInfo;
              break;
            case 6:
              // 若当前任务状态为【已完成】，则底部按钮展现为【查看提交内容】 - 点击跳转到提交内容页面
              tempText = "查看提交内容";
              tempMethed = this.submitContent;
              break;
            case 7:
              // 若当前任务状态为【已取消】，则底部按钮展现为【查看取消申请】 - 点击跳转到申请取消页面
              tempText = "查看取消申请";
              tempMethed = this.applyForCooperation;
              break;
            default:
              break;
          }
        }
      }
      return {
        tempText,
        tempMethed,
      };
    },
    currentComInfo() {
      if (this.expressDto && this.expressDto.com) {
        return this.$baseUtil.filterComCode(this.expressDto.com);
      }
      return;
    },
    currentStep() {
      // 合作中(0),待收货(1),待提交(2),待审核(3),待寄回(4),待确认(5),已完成(6),已取消(7),已超时(8)
      const { taskStatus } = this.confirmCooperationInfo;
      if ([1, 2, 3, 4, 5, 8].includes(taskStatus)) {
        return 3;
      } else if ([6].includes(taskStatus)) {
        return 4;
      }
      return 2;
    },
  },
  created() {
    if (!this.getCheckNoticeInfo) {
      this.$baseUtil.navToHome();
    }
    this.$EventBus.$on("updateCooperation", () => {
      this.init();
    });
  },
  methods: {
    ...mapMutations(["SET_CHECK_NOTICE_INFO"]),
    async init() {
      await this.getConfirmCooperationInfo();
      // 分享设置
      this.$wxUtils.shareApi({
        title: this.getCheckNoticeInfo.title, // 分享标题
        // desc: this.getCheckNoticeInfo.noticeContent, // 分享描述
        desc: "上万有通告，体验生活小美好", // 分享描述
        redirectRouter: encodeURIComponent(
          `/pages/NoticeDetail/index?id=${this.id}`
        ), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        // imgUrl: this.getCheckNoticeInfo.productImgs.split(",")[0], // 分享图标
        imgUrl: `${IMG_BASE_URL}/upaiyun/TongGao/Sys/Other/5642153627177632358.jpg`, // 分享图标
      });
      this.skeletonLoading = false;
    },
    // 获取确认合作页面接口
    async getConfirmCooperationInfo() {
      try {
        const { idStr: signUpId } = this.getCheckNoticeInfo;
        const { data } = await getConfirmCooperationInfo({ signUpId });
        this.confirmCooperationInfo = data;
        const { expressDto } = data;
        this.expressDto = {
          ...expressDto,
          expressJson: JSON.parse(expressDto.expressJson),
        };
        this.SET_CHECK_NOTICE_INFO({
          ...this.getCheckNoticeInfo,
          ...data,
        });
      } catch (err) {
        this.$baseUtil.normalErrMsgHandler(err);
      }
    },
    // 分享
    shareHandler() {
      this.$baseUtil.showToast({
        title:
          "分享功能正在开发中，您可以点击右上角，选择【转送给朋友】进行分享",
      });
    },
    // 加入执行群
    enterGroup() {
      // 获取顾问二维码接口
      getConsultantInfo()
        .then((res) => {
          this.qrCode = res.data;
          this.isShowQrcodePopup = true;
        })
        .catch((err) => {
          this.$baseUtil.normalErrMsgHandler(err);
        });
    },
    // 提交物流
    submitOrder() {
      this.$baseUtil.navigateToHandler("/pages/Express/submitOrder");
    },
    // 提交内容
    submitContent() {
      this.$baseUtil.navigateToHandler("/pages/SubmitContent/index");
    },
    // 申请恢复
    applyForRest() {
      this.$baseUtil.navigateToHandler("/pages/SubmitApplyForRest/index");
    },
    // 申请取消合作
    applyForCooperation() {
      this.$baseUtil.navigateToHandler(
        "/pages/SubmitApplyForCooperation/index"
      );
    },
    // 查看物流
    expressInfo() {
      this.$baseUtil.navigateToHandler("/pages/Express/expressInfo");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";

.partFive {
  .businessCardItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    // height: 160rpx;
    background-color: #fff;
    border-radius: 20rpx;
    padding: 0 4rpx;
    box-sizing: border-box;
    border-bottom: 1rpx solid $borderColor;
    margin-bottom: 18rpx;

    &:last-child {
      border: none;
    }

    .leftPart {
      display: flex;
      align-items: center;

      .headerBox {
        position: relative;
        width: 120rpx;
        height: 120rpx;

        .header {
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
        }

        .platform {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
        }
      }

      .infoBox {
        margin-left: 28rpx;
        line-height: 1em;

        .subTopPart {
          display: flex;
          align-items: center;
          margin-bottom: 24rpx;

          .title {
            font-size: 28rpx;
            color: $textColor;
            margin-right: 10rpx;
          }
        }

        .tip {
          display: flex;
          align-items: center;
          color: $tipColor;

          .tipItem {
            padding: 0 18rpx;
            border-right: 1px solid $borderColor;
            font-size: 26rpx;
            line-height: 1em;

            &:first-child {
              padding: 0 18rpx 0 0;
            }

            &:last-child {
              border: none;
            }
          }
        }
      }
    }

    .iconfont {
      font-size: 36rpx;
      border-radius: 50%;

      &.icon-xuanzhongxuanzhong {
        color: $themeTextColor;
      }

      &.icon-shixinyuanxing {
        color: $borderColor;
      }
    }
  }
}

.pageFooter {
  .normalBtn {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 228rpx;
    height: 74rpx;
    border-radius: 37rpx;
    background-color: $themeTextColor;
    margin-right: 16rpx;

    &:last-child {
      margin-right: 0;
    }

    &.acceptBtn {
      color: #fff;
    }

    &.refuseBtn {
      background: #ffffff;
      box-sizing: border-box;
      border: 1rpx solid #bbbbbb;
    }
  }
}

.myPopupBox {
  .qrCode {
    width: 400rpx;
    height: 400rpx;
  }
}

.logistics {
  .logisticsInfo {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 20rpx;
  }

  .companyAndOddNumbers {
    display: flex;
    align-items: center;
    margin-bottom: 16rpx;

    .logo {
      width: 32rpx;
      height: 32rpx;
      border-radius: 50%;
      margin-right: 12rpx;
    }

    .company {
      color: $textColor;
    }

    .oddNumbers {
      color: #999999;
    }
  }

  .statusInfo {
    padding-left: 44rpx;

    .main {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16rpx;
      color: #ff0000;

      &::before {
        position: absolute;
        content: "";
        top: 50%;
        left: -28rpx;
        transform: translate(-50%, -50%);
        width: 12rpx;
        height: 12rpx;
        background-color: #ff0000;
        border-radius: 50%;
      }

      .leftPart {
        display: flex;
        align-items: center;

        .status {
          margin-right: 20rpx;
        }
      }

      .checkDetail {
        display: flex;
        align-items: center;

        .iconfont {
          font-size: 24rpx;
          color: #ff0000;
        }
      }
    }

    .tip {
      color: $tipColor;
    }
  }
}

.cancelBtn {
  color: #0256ff;
  margin-top: 20rpx;
}

.textarea {
  height: 140rpx;
  padding: 14rpx;
}
</style>
