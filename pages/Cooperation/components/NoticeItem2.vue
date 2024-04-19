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
                  taskStatus: noticeItemInfo.taskStatus,
                }).tempStr
              }}</view>
              <view class="statusTag" :class="signUpStatusFilter({
                    taskStatus: noticeItemInfo.taskStatus,
                  }).className
                  ">{{
      signUpStatusFilter({
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
              noticeItemInfo.expirationDate | formatTime("YYYY/MM/DD hh:mm:ss")
            }}</view>
          </view>
        </view>
      </view>
      <view v-if="[1, 2, 5].includes(noticeItemInfo.taskStatus)" class="expressPart">
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
        <template v-if="currentBtn(noticeItemInfo).tempText">
          <view class="tap-active btnType1" :class="currentBtn(noticeItemInfo).isActive ? 'conmfirm' : 'cancel'"
            @click.stop="currentBtn(noticeItemInfo).tempMethed()" v-text="currentBtn(noticeItemInfo).tempText"></view>
        </template>
        <view v-if="isShowAddWxBtn({ taskStatus: noticeItemInfo.taskStatus })" class="conmfirm btnType1 tap-active">添加微信
        </view>
        <view v-if="isShowContactBusinessBtn({ taskStatus: noticeItemInfo.taskStatus })"
          class="conmfirm btnType1 tap-active">联系商家</view>
        <template v-if="[6, 7].includes(noticeItemInfo.taskStatus)">
          <view class="cancel btnType1 tap-active" @click.stop="checkDetail">查看详情</view>
        </template>
      </view>
    </view>
  </view>
</template>

<script>
import noticeItem from "./mixins/noticeItem";
export default {
  mixins: [noticeItem],
  methods: {
    // 根据报名状态及任务状态过滤标签
    signUpStatusFilter({ taskStatus }) {
      // 任务状态taskStatus：合作中(0),待收货(1),待提交(2),待审核(3),待寄回(4),待确认(5),已完成(6),已取消(7),已超时(8)
      let tempStr = "";
      let className = "";
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
      return {
        tempStr,
        className,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
