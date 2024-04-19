<template>
  <Skeleton v-if="skeletonLoading" :row="4" animate :loading="skeletonLoading">
  </Skeleton>
  <view id="container" v-else class="page normalPaddingTop">
    <view class="headerBox">
      <swiper class="my-swipe" circular :indicator-dots="banners.length > 1" :autoplay="true">
        <swiper-item v-for="(item, index) in banners" :key="index" @click.stop="swiperClickHandler(item)">
          <view class="subItem">
            <image class="pic swiper-pic" mode="aspectFill" lazy-load :src="item.image"></image>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <scroll-view id="tabsWYFL" class="tabBarsBox sticky-box" :scroll-x="true" :show-scrollbar="false"
      :scroll-into-view="scrollInto">
      <view v-for="(tab, index) in datalist" :key="tab.id" :id="tab.id" class="uni-tab-item tap-active"
        :class="tabIndex == index ? 'active' : ''" :data-current="index" @click="changeTab">
        <text class="uni-tab-item-title" :class="tabIndex == index ? 'active' : ''">{{ tab.labelName }}</text>
      </view>
    </scroll-view>
    <view id="goodsList">
      <view class="list">
        <template v-if="!currentTabObj.isLoad">
          <block v-for="(index) in 8" :key="index">
            <TaskItemSkeleton class="taskItem">
            </TaskItemSkeleton>
          </block>
        </template>
        <template v-else>
          <block v-for="(item, index) in currentTabObj.tempList" :key="index">
            <TaskItem :taskItemInfo="item" class="taskItem" @goToDetailHandler="goToDetailHandler">
            </TaskItem>
          </block>
        </template>
      </view>
      <MyEmpty v-if="currentTabObj.isLoad && currentTabObj.tempList.length === 0"></MyEmpty>
      <uni-load-more v-else :status="currentTabObj.status"></uni-load-more>
      <view class="emptyForTabbar"></view>
    </view>
  </view>
</template>

<script>
import TabsWYFL from "../../components/TabsWYFL";
import TaskItem from "./components/TaskItem";
import TaskItemSkeleton from './components/TaskItemSkeleton.vue'
import { IMG_BASE_URL } from "@/config.js";
import { mapGetters } from "vuex";
import { getNoticeList } from "@/api/tNotice";
import refreshSwitchTab from "@/mixins/refreshSwitchTab";
export default {
  mixins: [refreshSwitchTab],
  components: {
    TabsWYFL,
    TaskItem,
    TaskItemSkeleton
  },
  data() {
    return {
      banners: [
        {
          image: IMG_BASE_URL + "/upaiyun/TongGao/Sys/Other/5388289825943607013.jpg",
          link: 'https://mp.weixin.qq.com/s/f9XJEOrW3SfjF-Vb7eZFnw'
        }
      ],
      tabIndex: 0,
      datalist: [],
      isNeedRefreshPage: true,
      scrollInto: "",
      goodsListOffsetTop: 0,
    };
  },
  computed: {
    ...mapGetters(["platformTypeList"]),
    currentTabObj() {
      return this.datalist[this.tabIndex]
    }
  },
  onLoad() {
    // 重置首页
    uni.$on("updateHomePage", () => {
      this.tabIndex = 0
      this.init()
    });
  },
  created() {
    this.resetData();
  },
  onPullDownRefresh() {
    this.init();
  },
  onReachBottom() {
    this.getNoticeList()
  },
  methods: {
    switchTabHandler() {
      this.isNeedRefreshPage = true
      this.resetData();
    },
    goToDetailHandler(id) {
      this.isNeedRefreshPage = false
      this.$baseUtil.navigateToHandler(
        `/pages/NoticeDetail/index?id=${id}`
      );
    },
    swiperClickHandler(swiperItem) {
      const { link } = swiperItem
      window.open(link, '_blank')
    },
    // resetData
    resetData() {
      let tempArr = [];
      this.platformTypeList.forEach((val) => {
        let { platformType, platform } = val;
        tempArr.push({
          platformType,
          labelName: platform,
          isLoad: false,
          page: 1,
          tempList: [],
          finished: false,
          status: "more",
          id: "temp" + this.$baseUtil.randomNuber(),
        });
      });
      tempArr.unshift({
        platformType: "",
        labelName: "全部",
        isLoad: false,
        page: 1,
        tempList: [],
        finished: false,
        status: "more",
        id: "temp" + this.$baseUtil.randomNuber(),
      });
      this.datalist = tempArr;
    },
    refreshData() {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0,
      });
      this.datalist.forEach((val) => {
        val.list = [];
        val.isLoad = false;
        val.page = 1;
        val.tempList = [];
        val.finished = false;
        val.status = "more";
      });
    },
    // 触发tab组件
    async changeTab(e) {
      let tempActive =
        e.target.dataset.current || e.currentTarget.dataset.current;
      await this.beforeChange();
      let that = this;
      uni.pageScrollTo({
        scrollTop: this.goodsListOffsetTop,
        duration: 0,
        success: () => {
          that.resetData()
          that.switchTab(tempActive);
        },
      });
    },
    beforeChange() {
      let that = this;
      return new Promise((resolve) => {
        let containerScrollTop = 0;
        let goodsListAcrollTop = 0;
        let tabsWYFLHeight = 0;
        let isSticky = false;
        let info = uni.createSelectorQuery().select("#container");
        info
          .boundingClientRect(function (data) {
            containerScrollTop = data.top > 0 ? data.top : -data.top;
            let info = uni.createSelectorQuery().select("#goodsList");
            info
              .boundingClientRect(function (data) {
                goodsListAcrollTop = data.top > 0 ? data.top : -data.top;
                isSticky = data.top <= 0;
                let info = uni.createSelectorQuery().select("#tabsWYFL");
                info
                  .boundingClientRect(function (data) {
                    console.log(data)
                    tabsWYFLHeight = data.height;
                    if (isSticky) {
                      that.goodsListOffsetTop =
                        containerScrollTop -
                        goodsListAcrollTop -
                        tabsWYFLHeight;
                    } else {
                      that.goodsListOffsetTop = containerScrollTop;
                    }
                    console.log(that.goodsListOffsetTop)
                    resolve();
                  })
                  .exec();
              })
              .exec();
          })
          .exec();
      });
    },
    // 切换tab
    switchTab(tempActive) {
      this.tabIndex = tempActive;
      this.scrollInto = this.datalist[tempActive].id;
      this.getNoticeList();
    },
    async init() {
      this.refreshData();
      await this.getNoticeList();
      uni.stopPullDownRefresh();
      this.skeletonLoading = false;
    },
    setJSSDK() {
      // 分享设置
      this.$wxUtils.shareApi({
        title: '万有通告', // 分享标题
        desc: '上万有通告，体验生活小美好', // 分享描述
        redirectRouter: encodeURIComponent(`/pages/Index/index`), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: `${IMG_BASE_URL}/upaiyun/TongGao/Sys/Other/5642153627177632358.jpg`, // 分享图标
      })
    },
    // 获取通告列表数据接口
    getNoticeList() {
      let currentObj = this.datalist[this.tabIndex];
      if (currentObj.status === "loading" || currentObj.status === "no-more") {
        return;
      }
      currentObj.status = "loading";
      let { page, platformType } = currentObj;
      return new Promise((resolve) => {
        getNoticeList({
          page,
          platformType,
        })
          .then((res) => {
            let { rows, total } = res.data;
            currentObj.tempList = [...currentObj.tempList, ...rows];
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
            this.$baseUtil.normalErrMsgHandler(err);
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  // height: 100%;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 155rpx;
    background-color: $themeColor;
    z-index: 1;
  }


}

.headerBox {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  z-index: 2;
  width: 100%;
  height: 220rpx;
  box-sizing: border-box;
  margin-bottom: 20rpx;

  &::before {
    position: absolute;
    top: 50%;
    left: 0;
    content: "";
    width: 100%;
    height: 50%;
    height: calc(50% + 20rpx);
    background-color: #fff;
  }

  .my-swipe {
    width: 700rpx;
    height: 220rpx;
    border-radius: 20rpx;
    overflow: hidden;

    .subItem {
      height: 100%;
      border-radius: 20rpx;
      overflow: hidden;
    }

    .swiper-pic {
      width: 700rpx;
      height: 220rpx;
      border-radius: 20rpx;
      overflow: hidden;
    }
  }
}

.tabBarsBox {
  position: sticky;
}

.list {
  background-color: #fff;

  .taskItem {
    width: 700rpx;
    margin: 0 auto;
  }
}
</style>
