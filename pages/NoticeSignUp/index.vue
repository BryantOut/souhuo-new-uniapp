<!-- 报名页面 -->
<template>
  <Skeleton v-if="skeletonLoading" :row="4" animate :loading="skeletonLoading">
  </Skeleton>
  <view v-else class="page">
    <view class="partOne part">
      <image class="pic" mode="aspectFill" :src="getCheckNoticeInfo.productImgs
          ? getCheckNoticeInfo.productImgs.split(',')[0]
          : '../../static/image/icon6.png'
        "></image>
      <view class="main">
        <view class="topPart">
          <view class="titleBox">
            <image class="platform" mode="aspectFit" :src="getPlatformItemSingleValueByPlatformTypeAndKey({
              platformType: getCheckNoticeInfo.platformType,
              key: 'logoSrc',
            })
              "></image>
            <view class="title oneRow" v-text="getCheckNoticeInfo.title">
            </view>
          </view>
          <view class="tagList">
            <uni-tag class="tag" :text="rewardTypeHandler(getCheckNoticeInfo.rewardType)" type="primary" size="mini"
              custom-style="background-color: transparent; border-color: #FF9900; color: #FF9900;" />
            <uni-tag class="tag" :text="amountOfMoneyHandler({
              noticeInfo: getCheckNoticeInfo,
            })" type="primary" size="mini"
              custom-style="background-color: #F2F2F2; border-color: #F2F2F2; color: #888888;" />
            <uni-tag class="tag" :text="fansDemandFilter(getCheckNoticeInfo.fansDemand) + '粉丝'" type="primary" size="mini"
              custom-style="background-color: #F2F2F2; border-color: #F2F2F2; color: #888888;" />
            <uni-tag class="tag" :text="cooperationTypeHandler(getCheckNoticeInfo.cooperationType).text
              " type="primary" size="mini"
              custom-style="background-color: #F2F2F2; border-color: #F2F2F2; color: #888888;" />
          </view>
        </view>
      </view>
    </view>
    <view class="partTwo part">
      <view class="mainTitle">报名名片</view>
      <view class="myBusinessCardList">
        <template v-if="getCheckNoticeInfo.cardInfos.length > 0">
          <section v-for="(item, index) in getCheckNoticeInfo.cardInfos" :key="index" class="businessCardItem"
            :class="{ 'tap-active': getCheckNoticeInfo.cardInfos.length > 1 }" @click="cardId = item.cardId">
            <template v-if="getCheckNoticeInfo.platformType !== 5">
              <view class="leftPart">
                <view class="headerBox">
                  <image class="header" mode="aspectFill" :src="item.headPic"></image>
                  <image class="platform" mode="aspectFit" :src="getPlatformItemSingleValueByPlatformTypeAndKey({
                    platformType: getCheckNoticeInfo.platformType,
                    key: 'logoSrc',
                  })
                    "></image>
                </view>
                <view class="infoBox">
                  <view class="subTopPart">
                    <view class="title">{{ item.nick | stringModify(8) }}</view>
                    <view class="updateBtn tap-active" @click.stop="updateBusiness(item, index)">更新</view>
                  </view>
                  <view class="tip">
                    <view class="tipItem">粉丝: {{ item.fansNum | formatMaxNum }}</view>
                    <view class="tipItem">赞藏数: {{ item.likeNum | formatMaxNum }}</view>
                  </view>
                </view>
              </view>
              <span v-if="getCheckNoticeInfo.cardInfos.length > 1" class="iconfont" :class="cardId === item.cardId
                  ? 'icon-xuanzhongxuanzhong'
                  : 'icon-shixinyuanxing'
                "></span>
            </template>
            <template v-else>
              <view class="leftPart">
                <view class="headerBox">
                  <image class="header" mode="aspectFill" :src="item.headPic.split(',')[0]"></image>
                  <image class="platform" mode="aspectFit" :src="getPlatformItemSingleValueByPlatformTypeAndKey({
                    platformType: getCheckNoticeInfo.platformType,
                    key: 'logoSrc',
                  })
                    "></image>
                </view>
                <view class="infoBox">
                  <view class="subTopPart">
                    <view class="title">{{ "网拍模特认证" }}</view>
                  </view>
                </view>
              </view>
              <span v-if="getCheckNoticeInfo.cardInfos.length > 1" class="iconfont" :class="cardId === item.cardId
                  ? 'icon-xuanzhongxuanzhong'
                  : 'icon-shixinyuanxing'
                "></span>
            </template>
          </section>
        </template>
        <view v-else class="isEmptyBtnBox">
          <view class="themeBtn normal tap-active" @click.stop="
            $baseUtil.navigateToHandler(`/pages/MyBusinessCard/index`)
            ">
            暂无名片，去添加
          </view>
        </view>
      </view>
    </view>
    <view v-if="getCheckNoticeInfo.quoteType === 0" class="partThree part">
      <view class="mainTitle">合作形式及报价</view>
      <view v-if="cooperationTypeIncludePic(getCheckNoticeInfo.cooperationType)" class="modalityAndQuotationItem">
        <view class="leftPart">
          <span class="iconfont icon-tupian"></span>
          <span>图文单篇</span>
        </view>
        <view class="inputBox">
          <view class="unity">￥</view>
          <input v-model="picBidAmount" class="uni-input price" type="number" placeholder="0"
            @input="numberHandlerUtils($event, 'picBidAmount')" />
        </view>
      </view>
      <view v-if="cooperationTypeIncludeVideo(getCheckNoticeInfo.cooperationType)" class="modalityAndQuotationItem">
        <view class="leftPart">
          <span class="iconfont icon-shipin"></span>
          <span>视频单篇</span>
        </view>
        <view class="inputBox">
          <view class="unity">￥</view>
          <input v-model="videoBidAmount" class="uni-input price" type="number" placeholder="0"
            @input="numberHandlerUtils($event, 'videoBidAmount')" />
        </view>
      </view>
    </view>
    <view v-if="getCheckNoticeInfo.quoteType === 0" class="partFour part">
      <view class="mainTitle">报价补充（选填）</view>
      <textarea v-model="bidRemark" type="text" class="addMore" placeholder="请输入报价补充（选填）" />
    </view>
    <view class="pageFooterEmptyBox"></view>
    <view class="pageFooter">
      <view class="main">
        <view class="fixedBottomBtn status1Btn addBtn tap-active" @click="confirm">
          <view class="con"> 确认报名 </view>
        </view>
      </view>
      <view class="emptyBox"></view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import noticeShowHandler from "@/mixins/noticeShowHandler";
import { signUp } from "@/api/tNotice";
import businessCard from "@/mixins/businessCard.js";
export default {
  mixins: [noticeShowHandler, businessCard],
  data() {
    return {
      cardId: "", // 名片id
      picBidAmount: "", // 图文报价金额
      videoBidAmount: "", // 视频报价金额
      bidRemark: "", // 报价补充
      updateBusinessCardIndex: "", // 更新的名片index
    };
  },
  computed: {
    ...mapGetters(["getCheckNoticeInfo"]),
    // 选中的名片信息
    chooseCardInfo() {
      return this.getCheckNoticeInfo.cardInfos.filter((val) => {
        return val.cardId === this.cardId;
      })[0];
    },
  },
  created() {
    if (!this.getCheckNoticeInfo) {
      this.$baseUtil.navToHome();
    }
    // 只存在一张名片则默认赋值
    if (this.getCheckNoticeInfo.cardInfos.length === 1) {
      this.cardId = this.getCheckNoticeInfo.cardInfos[0].cardId;
    }
  },
  onLoad() { },
  methods: {
    ...mapMutations(["SET_CHECK_NOTICE_INFO"]),
    init() {
      this.skeletonLoading = false;
    },
    // 更新名片
    updateBusiness(itemInfo, index) {
      this.updateBusinessCardIndex = index;
      const { platformType } = this.getCheckNoticeInfo;
      let homeUrl = itemInfo.homeUrl;
      this.updateHandler({
        platformType,
        homeUrl,
        isUpdate: true,
      });
    },
    updateSuccess(res) {
      let { fansNum, headPortrait, likeNum, nick } = res;
      let tempObj = this.$baseUtil.deepCopy(this.getCheckNoticeInfo);
      let tempTargetItem = tempObj.cardInfos[this.updateBusinessCardIndex];
      tempTargetItem = {
        ...tempTargetItem,
        nick,
        headPic: headPortrait,
        fansNum,
        likeNum,
      };
      tempObj.cardInfos[this.updateBusinessCardIndex] = tempTargetItem;
      this.SET_CHECK_NOTICE_INFO(tempObj);
      this.$baseUtil.showToast({
        title: "更新成功",
      });
    },
    // 确认报名
    confirm() {
      let { quoteType, cooperationType, id } = this.getCheckNoticeInfo;
      // quoteType 自报价 - 【需要=0、不需要=1】
      // cooperationType 合作类型 - 【图文=0、视频=1】

      // 验证名片id
      if (this.cardId === "") {
        this.$baseUtil.showToast({
          title: "请选择报名名片",
        });
        return;
      }
      // 判断粉丝数是否满足
      // 当前选中名片粉丝数
      let { fansNum } = this.chooseCardInfo;
      const { platformType } = this.getCheckNoticeInfo;
      // 当前通告要求粉丝数，【网拍】类型报名需要跳过粉丝量的逻辑
      let { fansDemand } = this.getCheckNoticeInfo;
      if (platformType !== 5 && fansDemand && fansNum < fansDemand) {
        this.$baseUtil.showToast({
          title: "当前名片的粉丝数量未达到要求，请更新名片信息或换张名片试试吧",
        });
        return;
      }
      // 若自报价为【不需要】，则无需验证自报价内容
      if (quoteType === 0) {
        if (cooperationType === 0 && this.picBidAmount === "") {
          this.$baseUtil.showToast({
            title: "请输入图文单篇报价",
          });
          return;
        }
        if (cooperationType === 1 && this.videoBidAmount === "") {
          this.$baseUtil.showToast({
            title: "请输入视频单篇报价",
          });
          return;
        }
      }

      this.$baseUtil.showLoading({
        title: "上传中...",
      });
      signUp({
        id: id,
        bidRemark: this.bidRemark,
        cardId: this.cardId,
        picBidAmount: this.picBidAmount,
        videoBidAmount: this.videoBidAmount,
      })
        .then((res) => {
          this.$EventBus.$emit('updateCooperation')
          this.$baseUtil.showToast({
            title: res.msg,
          });
          setTimeout(() => {
            this.$baseUtil.switchTabHandler(`/pages/Cooperation/index`)
          }, 1000);
          uni.hideLoading();
        })
        .catch((err) => {
          uni.hideLoading();
          let specialErr2 = ["该通告已失效，请返回首页查看其他通告任务吧"];
          if (specialErr2.includes(err.errMsg)) {
            uni.showModal({
              title: "提示",
              content: err.errMsg,
              confirmText: "我知道了",
              showCancel: false,
              success: (res) => {
                this.$baseUtil.navToHome();
              },
            });
            return;
          }
          let specialErr3 = [
            "您模特认证审核中，请等待模特认证审核通过后再报名网拍任务",
          ];
          if (specialErr3.includes(err.errMsg)) {
            uni.showModal({
              title: "提示",
              content: err.errMsg,
              confirmText: "我知道了",
              showCancel: false,
            });
            return;
          }
          let specialErr4 = [
            "您尚未进行模特认证，请先完成模特认证再报名网拍通告",
            "您的模特认证尚未通过，请先完成模特认证再报名网拍通告",
          ];
          if (specialErr4.includes(err.errMsg)) {
            uni.showModal({
              title: "提示",
              content: err.errMsg,
              confirmText: "去认证",
              cancelText: "我知道了",
              success: (res) => {
                if (res.confirm) {
                  this.$baseUtil.navigateToHandler(`/pages/BusinessCardAuthentication/stepTwoOfModelCard?platformType=5`);
                }
              },
            });
            return;
          }
          let specialErr6 =
            /您今日已报名\d+条通告，由于数量限制，暂时无法报名更多通告/g;
          let specialErr5 = [
            "您当前存在执行合作未提交物流单号的任务，暂时无法继续报名。请先沟通执行订单吧",
            "您当前存在超时未提交内容的任务，暂时无法继续报名。请先与通告主协商恢复通告后进行内容提交吧",
            "您当前存在待寄回产品给通告主的任务，暂时无法继续报名。请先将产品寄回给通告主吧",
          ];
          if (
            specialErr5.includes(err.errMsg) ||
            err.errMsg.match(specialErr6)
          ) {
            uni.showModal({
              title: "提示",
              content: err.errMsg,
              confirmText: "去查看",
              cancelText: "我知道了",
              success: (res) => {
                if (res.confirm) {
                  this.$baseUtil.switchTabHandler(`/pages/Cooperation/index`);
                }
              },
            });
            return;
          }
          let specialErr1 = [
            "您的名片已删除，请选择或添加其他名片进行报名",
            "您的名片未审核通过，请选择或添加其他名片进行报名",
            "当前名片的粉丝数量未达到要求，请更新名片信息后再试试吧",
          ];
          if (specialErr1.includes(err.errMsg)) {
            setTimeout(() => {
              uni.navigateBack();
            }, 1500);
          }
          this.$baseUtil.normalErrMsgHandler(err);
        });
    },
    // 数字处理工具
    numberHandlerUtils(event, tempkey) {
      const regRules1 = /^0+/g; // 不能以0开头
      const regRules2 = /[^0-9]\d*/g; // 不能是小数
      setTimeout(() => {
        this[tempkey] = this[tempkey]
          .replace(regRules1, "")
          .replace(regRules2, "");
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
