<template>
  <view class="taskItem tap-active" @click="clickItemHandler">
    <view class="mainInfo">
      <view class="topPart">
        <image class="pic" mode="aspectFill" lazy-load :src="noticeItemInfo.productImgs
          ? noticeItemInfo.productImgs.split(',')[0]
          : ''
          "></image>

        <view class="main">
          <view class="subTopPart">
            <view class="titleBox">
              <image class="platform" mode="aspectFit" :src="getPlatformItemSingleValueByPlatformTypeAndKey({
                platformType: noticeItemInfo.platformType,
                key: 'logoSrc',
              })
                "></image>
              <view class="title oneRow" v-text="noticeItemInfo.title"> </view>
              <view class="statusTag seizeASeat">{{
                signUpStatusFilter({
                  signUpStatus: noticeItemInfo.signUpStatus,
                  taskStatus: noticeItemInfo.taskStatus,
                }).tempStr
              }}</view>
              <view class="statusTag" :class="signUpStatusFilter({
                    signUpStatus: noticeItemInfo.signUpStatus,
                    taskStatus: noticeItemInfo.taskStatus,
                  }).className
                  ">{{
      signUpStatusFilter({
        signUpStatus: noticeItemInfo.signUpStatus,
        taskStatus: noticeItemInfo.taskStatus,
      }).tempStr
    }}</view>
            </view>
            <view class="tagList">
              <uni-tag class="tag" :text="rewardTypeHandler(noticeItemInfo.rewardType)" type="primary" size="mini"
                custom-style="background-color: transparent; border-color: #FF9900; color: #FF9900;" />
              <uni-tag class="tag" :text="amountOfMoneyHandler({
                noticeInfo: noticeItemInfo,
              })" type="primary" size="mini"
                custom-style="background-color: #F2F2F2; border-color: #F2F2F2; color: #888888;" />
              <uni-tag class="tag" :text="fansDemandFilter(noticeItemInfo.fansDemand) + '粉丝'" type="primary" size="mini"
                custom-style="background-color: #F2F2F2; border-color: #F2F2F2; color: #888888;" />
              <uni-tag class="tag" :text="cooperationTypeHandler(noticeItemInfo.cooperationType).text
                " type="primary" size="mini"
                custom-style="background-color: #F2F2F2; border-color: #F2F2F2; color: #888888;" />
            </view>
          </view>
          <view v-if="noticeItemInfo.expirationDate" class="bottomPart">
            <view class="day">截止时间:{{
              noticeItemInfo.expirationDate
              | formatTime("YYYY/MM/DD hh:mm:ss")
            }}</view>
          </view>
        </view>
      </view>
      <view v-if="[1, 2, 5].includes(noticeItemInfo.taskStatus) &&
          noticeItemInfo.expressJson
          " class="expressPart">
        <template v-if="noticeItemInfo.expressJson">
          <span class="iconfont" :class="isMainNode.iconfont"></span>
          <span class="status">{{ expressJsonFilter.status }}</span>
          <span class="new">
            <view class="oneRow">{{ expressJsonFilter.context }}</view>
          </span>
        </template>
        <template v-else> 暂无详细物流信息 </template>
      </view>
    </view>
    <view class="bottomPart">
      <view class="subLeftPart">
        <image class="headPic" mode="aspectFill" lazy-load :src="noticeItemInfo.headPic
          ? noticeItemInfo.headPic.split(',')[0]
          : '../../static/image/icon6.png'
          "></image>
        <span>{{ noticeItemInfo.nick | stringModify(8) }}</span>
      </view>
      <view class="subRightPart">
        <!-- 报名状态：待筛选(0),已选中(1),未选中(2),已取消(3) -->
        <!-- 任务状态：合作中(0),待收货(1),待提交(2),待审核(3),待寄回(4),待确认(5),已完成(6),已取消(7),已超时(8),取消中(9) -->
        <view v-if="[0].includes(noticeItemInfo.signUpStatus)" class="cancel btnType1 tap-active" @click.stop="
          optSignUpHandler({ contentText: '取消报名', optType: '0' })
          ">取消报名</view>
        <view v-if="[1].includes(noticeItemInfo.signUpStatus) &&
          currentBtn(noticeItemInfo).tempText
          " class="tap-active btnType1" :class="currentBtn(noticeItemInfo).isActive ? 'conmfirm' : 'cancel'"
          @click.stop="currentBtn(noticeItemInfo).tempMethed()" v-text="currentBtn(noticeItemInfo).tempText"></view>
        <view v-if="isShowAddWxBtn({ taskStatus: noticeItemInfo.taskStatus })" class="conmfirm btnType1 tap-active">添加微信
        </view>
        <view v-if="isShowContactBusinessBtn({ taskStatus: noticeItemInfo.taskStatus })"
          class="conmfirm btnType1 tap-active">联系商家</view>
        <view v-if="[2].includes(noticeItemInfo.signUpStatus)" class="cancel btnType1 tap-active"
          @click.stop="optSignUpHandler({ contentText: '删除', optType: '1' })">删除</view>
        <view v-if="isShowCheckDetailBtn()" class="cancel btnType1 tap-active" @click.stop="checkDetail">查看详情</view>
      </view>
    </view>
  </view>
</template>

<script>
import noticeItem from "./mixins/noticeItem";
import { mapActions } from "vuex";
export default {
  mixins: [noticeItem],
  methods: {
    ...mapActions(["optSignUp"]),
    isShowCheckDetailBtn() {
      const { signUpStatus, taskStatus } = this.noticeItemInfo;
      return (
        [0, 2].includes(signUpStatus) ||
        ([1].includes(signUpStatus) && [6, 7].includes(taskStatus))
      );
    },
    // 根据报名状态及任务状态过滤标签
    signUpStatusFilter({ signUpStatus, taskStatus }) {
      // signUpStatus 报名状态：待筛选(0),已选中(1),未选中(2),已取消(3)
      // taskStatus 任务状态：合作中0,已完成1,已中止2
      let tempStr = "";
      let className = "";
      switch (signUpStatus) {
        case 0:
          // 若报名状态为【待筛选】，则展现为【待审核】，展现为灰色
          tempStr = "待审核";
          className = "unactive";
          break;
        case 1:
          switch (taskStatus) {
            case 0:
              tempStr = "合作中";
              className = "active";
              break;
            case 1:
              tempStr = "待收货";
              className = "active";
              break;
            case 2:
              tempStr = "待提交";
              className = "active";
              break;
            case 3:
              tempStr = "待审核";
              className = "unactive";
              break;
            case 4:
              tempStr = "待寄回";
              className = "active";
              break;
            case 5:
              tempStr = "待确认";
              className = "unactive";
              break;
            case 6:
              tempStr = "已完成";
              className = "unactive";
              break;
            case 7:
              tempStr = "已取消";
              className = "unactive";
              break;
            case 8:
              tempStr = "已超时";
              className = "unactive";
              break;
          }
          break;
        case 2:
          // 若报名状态为【未选中】，则展现为【未选中】，展现为灰色
          tempStr = "未选中";
          className = "unactive";
          break;
      }
      return {
        tempStr,
        className,
      };
    },
    async optSignUpHandler({ contentText, optType }) {
      let { idStr } = this.noticeItemInfo;
      await this.optSignUp({ contentText, optType, id: idStr });
      this.$emit("update");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
