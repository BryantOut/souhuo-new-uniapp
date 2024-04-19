<!-- 未报名状态 -->
<template>
  <Skeleton v-if="skeletonLoading" :row="4" animate :loading="skeletonLoading">
  </Skeleton>
  <view v-else class="page normalPaddingTop">
    <view class="partOne part">
      <view class="topPart">
        <view class="subLeftPart">
          <image class="platform" mode="aspectFit" :src="getPlatformItemSingleValueByPlatformTypeAndKey({
            platformType: tempData.platformType,
            key: 'logoSrc',
          })
            "></image>
          <span class="oneRow title" v-text="tempData.title"></span>
        </view>
        <uni-tag class="tag" :text="rewardTypeHandler(tempData.rewardType)" type="primary" size="mini"
          custom-style="background-color: #FF9900; border-color: #FF9900; color: #FFFFFF;" />
      </view>
      <view class="bottomPart">
        <view class="title">合作形式</view>
        <view v-if="cooperationTypeIncludePic(tempData.cooperationType)" class="item">
          <span class="iconfont icon-tupian"></span>
          <span>图文单篇</span>
        </view>
        <view v-if="cooperationTypeIncludeVideo(tempData.cooperationType)" class="item">
          <span class="iconfont icon-shipin"></span>
          <span>视频单篇</span>
        </view>
      </view>
    </view>
    <view class="partTwo part">
      <view class="mainTitle">
        <view class="leftPast">通告要求</view>
      </view>
      <view class="requirementList">
        <view v-if="tempData.submitEndTime || tempData.expirationDate" class="item">
          <view class="subItem subTitle">档期要求</view>
          <view v-if="tempData.expirationDate" class="subItem">
            <view class="key">截止时间：</view>
            <view class="value">{{
              tempData.expirationDate | formatTime("YYYY年MM月DD日")
            }}</view>
          </view>
          <view v-if="tempData.submitEndTime" class="subItem">
            <view class="key">提交内容截止时间：</view>
            <view class="value">{{
              tempData.submitEndTime | formatTime("YYYY年MM月DD日")
            }}</view>
          </view>
        </view>
        <view class="item">
          <view class="subItem subTitle">账号要求</view>
          <view class="subItem">
            <view class="key">粉丝要求：</view>
            <view class="value">{{ fansDemandFilter(tempData.fansDemand) }} 粉丝</view>
          </view>
        </view>
        <view class="item">
          <view class="subItem subTitle">人数要求</view>
          <view class="subItem">
            <view class="key">招募人数：</view>
            <view class="value">{{ fansDemandFilter(tempData.cooperationNumber) }} 人</view>
          </view>
        </view>
        <view class="item">
          <view class="subItem subTitle">通告奖励</view>
          <view class="subItem" v-if="tempData.rewardType !== 1">
            <view class="key">稿费金额：</view>
            <view class="value">￥{{
              paymentHandler({
                minPayment: tempData.minPayment,
                maxPayment: tempData.maxPayment,
              })
            }}
            </view>
          </view>
          <template v-if="tempData.rewardType !== 0">
            <view class="subItem">
              <view class="key">赠品名称：</view>
              <view class="value">
                {{ tempData.giftName }}
              </view>
            </view>
            <view class="subItem">
              <view class="key">赠品价值：</view>
              <view class="value">
                {{ formatMaxNum(tempData.giftAmount) }}
              </view>
            </view>
          </template>
        </view>
        <view v-if="tempData.noticeContent" class="item">
          <view class="subItem subTitle">合作须知</view>
          <view class="subItem special">
            <view class="key" v-html="tempData.noticeContent"></view>
          </view>
        </view>
        <view class="item">
          <view class="imageList">
            <image v-for="(item, index) in tempProductImgsList" :key="index" class="productImgs" mode="widthFix"
              :src="item" @click.stop="
                $baseUtil.previewImage({
                  current: index,
                  urls: tempProductImgsList,
                })
                "></image>
          </view>
        </view>
      </view>
    </view>
    <view class="partThree part">
      <view class="mainTitle">
        <view class="leftPast">任务流程</view>
      </view>
      <view class="taskStepBox">
        <view v-for="(item, index) in stepList" :key="index" class="stepItem" :class="{ active: item.isActive }">
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
    <view class="partFour part">
      <view class="mainTitle">
        <view class="leftPast">报名人数</view>
        <view class="rightPart">
          <view class="item">{{ formatMaxNum(tempData.viewNum) }}人看过</view>
          <view class="item">{{ formatMaxNum(tempData.signUpNum) }}人报名</view>
        </view>
      </view>
      <view class="con">
        <view v-if="tempData.signUpHeadPic.length > 0" class="headerList">
          <image class="headerItem" v-for="(item, index) in tempData.signUpHeadPic" :key="index" mode="aspectFill"
            :src="item.split(',')[0]"></image>
          <view v-if="tempData.signUpNum >= 30" class="headerItem more">
            <span class="iconfont icon-gengduo"></span>
          </view>
        </view>
        <view v-else class="signUpNumisZero"> 暂无人报名 </view>
      </view>
    </view>
    <view class="pageFooterEmptyBox"></view>
    <view class="pageFooter">
      <view class="main">
        <view class="item tap-active" @click="$baseUtil.navToHome(false)">
          <view class="con">
            <image src="~@/static/image/home_active.png" mode="aspectFit" class="icon"></image>
            <span class="text">首页</span>
          </view>
        </view>
        <view class="item tap-active" @click="checkLoginBeforeOperation(shareHandler, 0)">
          <view class="con">
            <image src="~@/static/image/icon5.png" mode="aspectFit" class="icon"></image>
            <span class="text">分享</span>
          </view>
        </view>
        <view class="signUpBtn tap-active" @click="checkLoginBeforeOperation(signUpHandler, 0)">报名参加</view>
      </view>
      <view class="emptyBox"></view>
    </view>
    <LoginPopup></LoginPopup>
    <LoginByPhone></LoginByPhone>
    <PrivacyAgreement></PrivacyAgreement>
    <UserAgreement></UserAgreement>
    <!-- 登录弹窗 end -->
  </view>
</template>

<script>
import { getNoticeDetail, getLastSignUpStatus } from "@/api/tNotice";
import noticeShowHandler from "@/mixins/noticeShowHandler";
import { mapActions, mapMutations } from "vuex";
import { IMG_BASE_URL } from "@/config.js";
export default {
  mixins: [noticeShowHandler],
  computed: {
    tempProductImgsList() {
      if (this.tempData.productImgs) {
        return this.tempData.productImgs.split(",");
      } else {
        return [];
      }
    },
  },
  data() {
    return {
      id: "", // 通告id
      signUpId: "", // 报名ID
      tempData: null, // 通告详情数据
      stepList: [
        {
          isActive: true,
          text: "我要报名",
        },
        {
          isActive: false,
          text: "添加微信",
        },
        {
          isActive: false,
          text: "执行合作",
        },
        {
          isActive: false,
          text: "提交完成",
        },
      ],
      isNeedRefreshPage: true,
      signUpStatus: "", // 通告报名状态
    };
  },
  onLoad(option) {
    this.id = option.id ? option.id : "";
    if (this.id === "") {
      this.$baseUtil.navToHome();
      return;
    }
  },
  methods: {
    ...mapActions(["optSignUp"]),
    ...mapMutations(["SET_CHECK_NOTICE_INFO", "SET_CHECK_NOTICE_INFO"]),
    async init() {
      await this.getLastSignUpStatus();
      await this.getNoticeDetail();
      // 分享设置
      this.$wxUtils.shareApi({
        title: this.tempData.title, // 分享标题
        // desc: this.tempData.noticeContent, // 分享描述
        desc: '上万有通告，体验生活小美好', // 分享描述
        redirectRouter: encodeURIComponent(`/pages/NoticeDetail/index?id=${this.id}`), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        // imgUrl: this.tempData.productImgs.split(",")[0], // 分享图标
        imgUrl: `${IMG_BASE_URL}/upaiyun/TongGao/Sys/Other/5642153627177632358.jpg`, // 分享图标

      });
      this.skeletonLoading = false;
    },
    // 获取通告详情数据接口
    getNoticeDetail() {
      return new Promise((resolve) => {
        getNoticeDetail({ id: this.id })
          .then((res) => {
            this.tempData = res.data;
            resolve();
          })
          .catch((err) => {
            this.$baseUtil.normalErrMsgHandler(err);
          });
      });
    },
    // 分享
    shareHandler() {
      this.$baseUtil.showToast({
        title:
          "分享功能正在开发中，您可以点击右上角，选择【转送给朋友】进行分享",
      });
    },
    // 报名
    signUpHandler() {
      // 返回状态：未报名(-1),待筛选(0), 已选中(1),未选中(2),已取消(3)
      // 判断用户是否存在该平台类的名片
      let { cardInfos, platformType } = this.tempData;
      let platform = this.getPlatformItemSingleValueByPlatformTypeAndKey({
        platformType,
        key: "platform",
      });
      if (cardInfos.length > 0) {
        switch (this.signUpStatus) {
          case 0:
            // 若报名状态为【待筛选】，则给出提示：已报名该通告，请等待通告主筛选
            this.$baseUtil.showToast({
              title: "已报名该通告，请等待通告主筛选",
            });
            break;
          case 1:
            // 若报名状态为【已选中】，则给出提示：该通告的报名申请已被选中，请勿重复报名，前往执行通告吧
            this.$baseUtil.showToast({
              title: "该通告的报名申请已被选中，请勿重复报名，前往执行通告吧",
            });
            break;
          default:
            // 若报名状态为空，或为【未选中】/【已取消】，则允许进入报名页面
            this.SET_CHECK_NOTICE_INFO({
              ...this.tempData,
              id: this.id,
            });
            this.$baseUtil.navigateToHandler("/pages/NoticeSignUp/index");
            break;
        }
      } else {
        const tempContent =
          platformType === 5
            ? "不存在已审核通过的模特认证，请先完成模特认证再报名网拍通告"
            : `不存在${platform}平台已审核通过的名片，请先添加名片后再报名`;
        const tempConfirmText = platformType === 5 ? "去认证" : "去添加";
        uni.showModal({
          title: "提示",
          content: tempContent,
          confirmText: tempConfirmText,
          cancelText: "我知道了",
          success: (res) => {
            if (res.confirm) {
              switch (platformType) {
                case 5:
                  this.$baseUtil.navigateToHandler(`/pages/BusinessCardAuthentication/stepTwoOfModelCard?platformType=${platformType}`);
                  break;

                default:
                  this.$baseUtil.navigateToHandler(`/pages/BusinessCardAuthentication/stepTwo?platformType=${platformType}`);
                  break;
              }
            }
          },
        });
      }
    },
    // 获取通告报名状态接口
    getLastSignUpStatus() {
      return new Promise((resolve) => {
        getLastSignUpStatus({
          noticeId: this.id,
        })
          .then((res) => {
            // 返回状态：未报名(-1),待筛选(0), 已选中(1),未选中(2),已取消(3)
            let { idStr, signUpStatus } = res.data;
            this.signUpId = idStr;
            this.signUpStatus = signUpStatus;
            resolve();
          })
          .catch((err) => {
            this.$baseUtil.normalErrMsgHandler(err);
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
