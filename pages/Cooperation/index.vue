<template>
  <Skeleton v-if="skeletonLoading" :row="4" animate :loading="skeletonLoading">
  </Skeleton>
  <view v-else class="page">
    <view class="content">
      <scroll-view id="tab-bar" class="tabBarsBox" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
      <view v-for="(tab, index) in datalist" :key="tab.id" :id="tab.id" class="uni-tab-item tap-active"
        :class="tabIndex == index ? 'active' : ''" :data-current="index" @click="changeTab">
        <text class="uni-tab-item-title" :class="tabIndex == index ? 'active' : ''">{{ tab.labelName }}</text>
      </view>
    </scroll-view>
    <swiper class="swiper-box" :current="tabIndex" @change="onSwiperChange">
      <swiper-item class="swiper-item" v-for="item in datalist" :key="item.id">
        <scroll-view class="list" scroll-y @scrolltolower="getData()">
          <view class="subList">
            <template v-if="tabIndex === 0">
              <NoticeItem v-for="(subItem, subIndex) in item.tempList" :key="subIndex" :noticeItemInfo="subItem"
                @update="init()" @goToDetailHandler="goToDetailHandler"></NoticeItem>
            </template>
            <template v-else>
              <NoticeItem2 v-for="(subItem, subIndex) in item.tempList" :key="subIndex" :noticeItemInfo="subItem"
                @update="init()" @goToDetailHandler="goToDetailHandler"></NoticeItem2>
            </template>
          </view>
          <MyEmpty v-if="item.isLoad && item.tempList.length === 0"></MyEmpty>
          <uni-load-more v-else :status="item.status"></uni-load-more>
        </scroll-view>
      </swiper-item>
    </swiper>
    <view class="emptyForTabbar"></view>
    </view>
  </view>
</template>

<script>
import TabsWYFL from "@/components/TabsWYFL";
import NoticeItem from "./components/NoticeItem";
import NoticeItem2 from "./components/NoticeItem2.vue";
import { mySignedUpList, myTaskList } from "@/api/tNotice";
import { mapGetters } from "vuex";
import refreshSwitchTab from "@/mixins/refreshSwitchTab";
export default {
  mixins: [refreshSwitchTab],
  components: {
    TabsWYFL,
    NoticeItem,
    NoticeItem2,
  },
  data() {
    return {
      scrollInto: "",
      tabIndex: 0,
      datalist: [],
      isNeedRefreshPage: true,
    };
  },
  computed: {
    ...mapGetters(["inCooperationSignUpNum"]),
  },
  created() {
    // 若【合作中通告数】大于0，则默认进入合作中状态
    // 若【合作中通告数】等于0，则默认进入已报名状态
    if (this.inCooperationSignUpNum && this.inCooperationSignUpNum > 0) {
      this.tabIndex = 1;
    } else {
      this.tabIndex = 0;
    }
    this.resetData();

    this.$EventBus.$on("updateCooperation", () => {
      this.init();
    });
  },
  onPullDownRefresh() {
    this.init();
  },
  methods: {
    goToDetailHandler() {
      this.isNeedRefreshPage = false
      this.$baseUtil.navigateToHandler("/pages/NoticeDetail/status2");
    },
    // resetData
    resetData() {
      let tempArr = [
        {
          labelName: "已报名",
        },
        {
          labelName: "合作中",
          taskStatus: 0,
        },
        {
          labelName: "已完结",
          taskStatus: 1,
        },
      ];
      let tempArr2 = [];
      tempArr.forEach((val) => {
        tempArr2.push({
          ...val,
          isLoad: false,
          page: 1,
          tempList: [],
          finished: false,
          status: "more",
          id: "temp" + this.$baseUtil.randomNuber(),
        });
      });
      this.datalist = tempArr2;
    },
    // 触发tab组件
    changeTab(e) {
      let tempActive =
        e.target.dataset.current || e.currentTarget.dataset.current;
      this.switchTab(tempActive);
    },
    // 触发swiper组件
    onSwiperChange(e) {
      let tempActive = e.target.current || e.detail.current;
      this.switchTab(tempActive);
    },
    // 切换tab
    switchTab(tempActive) {
      this.tabIndex = tempActive;
      this.scrollInto = this.datalist[tempActive].id;
      this.getData();
    },
    refreshData() {
      this.datalist.forEach((val) => {
        val.list = [];
        val.isLoad = false;
        val.page = 1;
        val.tempList = [];
        val.finished = false;
        val.status = "more";
      });
    },
    init() {
      this.refreshData();
      this.getData();
      this.skeletonLoading = false;
      uni.stopPullDownRefresh();
    },
    async getData() {
      let currentLabelName = this.datalist[this.tabIndex].labelName;
      if (currentLabelName === "已报名") {
        await this.mySignedUpList();
      } else {
        await this.myTaskList();
      }
    },
    // 用户端-获取用户已报名列表数据接口
    mySignedUpList() {
      let currentObj = this.datalist[this.tabIndex];
      if (currentObj.status === "loading" || currentObj.status === "no-more") {
        return;
      }
      currentObj.status = "loading";
      let { page } = currentObj;
      return new Promise((resolve) => {
        mySignedUpList({
          page,
        })
          .then((res) => {
            let { dataList, total } = res.data;
            currentObj.tempList = [...currentObj.tempList, ...dataList];
            currentObj.page++;
            currentObj.status = "more";
            if (currentObj.tempList.length >= total) {
              currentObj.status = "no-more";
            }
            if (!currentObj.isLoad) {
              currentObj.isLoad = true;
            }
            resolve();
          })
          .catch((err) => {
            currentObj.status = "no-more";
            this.$baseUtil.normalErrMsgHandler(err);
          });
      });
    },
    // 用户端-获取用户任务列表接口
    myTaskList() {
      let currentObj = this.datalist[this.tabIndex];
      if (currentObj.status === "loading" || currentObj.status === "no-more") {
        return;
      }
      currentObj.status = "loading";
      let { page, taskStatus } = currentObj;
      return new Promise((resolve) => {
        myTaskList({
          page,
          taskStatus,
        })
          .then((res) => {
            let { dataList, total } = res.data;
            currentObj.tempList = [...currentObj.tempList, ...dataList];
            currentObj.page++;
            currentObj.status = "more";
            if (currentObj.tempList.length >= total) {
              currentObj.status = "no-more";
            }
            if (!currentObj.isLoad) {
              currentObj.isLoad = true;
            }
            resolve();
          })
          .catch((err) => {
            currentObj.status = "no-more";
            this.$baseUtil.normalErrMsgHandler(err);
          });
      });
    },
  },  
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100vh;

  .content {
    display: flex;
    flex-direction: column;
    // align-items: center;
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    overflow: hidden;
  
  }

  .uni-tab-item {
    width: 33.33%;
  }

  .swiper-box {
    height: 100%;
    .list {
      .subList {
        .taskItem {
          width: 700rpx;
          margin: 0 auto 22rpx;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
