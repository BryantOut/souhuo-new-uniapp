<template>
  <Skeleton v-if="skeletonLoading" :row="4" animate :loading="skeletonLoading">
  </Skeleton>
  <view v-else class="page">
    <view class="content">
      <view class="myBusinessCardList">
        <section
          class="businessCardItem tap-active"
          v-for="(item, index) in dataList"
          :key="index"
          @click="handlerCheck(item)"
        >
          <template v-if="item.platformType !== 5">
            <view class="topPart">
              <view class="leftPart">
                <view class="headerBox">
                  <image
                    class="header"
                    mode="aspectFill"
                    :src="
                      item.headPic
                        ? item.headPic
                        : '../../static/image/icon6.png'
                    "
                  ></image>
                  <image
                    class="platform"
                    mode="aspectFit"
                    :src="
                      getPlatformItemSingleValueByPlatformTypeAndKey({
                        platformType: item.platformType,
                        key: 'logoSrc',
                      })
                    "
                  ></image>
                </view>
                <view class="infoBox">
                  <view class="subTopPart">
                    <view class="title">{{ item.nick | stringModify(8) }}</view>
                    <uni-tag
                      class="tag"
                      :text="$baseUtil.statusFilter(item.auditStatus).str"
                      type="primary"
                      size="mini"
                      :custom-style="
                        $baseUtil.statusFilter(item.auditStatus).customStyle
                      "
                    />
                  </view>
                  <view class="tip">
                    <view class="tipItem"
                      >粉丝: {{ item.fansNum | formatMaxNum }}</view
                    >
                    <view class="tipItem"
                      >赞藏数: {{ item.likeNum | formatMaxNum }}</view
                    >
                  </view>
                </view>
              </view>
              <span class="iconfont icon-xiangyou1"></span>
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
                      item.headPic
                        ? item.waitAuditModelPic.split(',')[0]
                        : '../../static/image/icon6.png'
                    "
                  ></image>
                  <image
                    class="platform"
                    mode="aspectFit"
                    :src="
                      getPlatformItemSingleValueByPlatformTypeAndKey({
                        platformType: item.platformType,
                        key: 'logoSrc',
                      })
                    "
                  ></image>
                </view>
                <view class="infoBox">
                  <view class="subTopPart">
                    <view class="title">{{ '网拍模特认证' }}</view>
                    <uni-tag
                      class="tag"
                      :text="$baseUtil.statusFilter(item.auditStatus).str"
                      type="primary"
                      size="mini"
                      :custom-style="
                        $baseUtil.statusFilter(item.auditStatus).customStyle
                      "
                    />
                  </view>
                </view>
              </view>
              <span class="iconfont icon-xiangyou1"></span>
            </view>
          </template>
        </section>
      </view>
      <MyEmpty v-if="isLoad && dataList.length === 0"></MyEmpty>
    </view>
    <view class="pageFooterEmptyBox"></view>
    <view class="pageFooter transparent">
      <view class="main">
        <view
          class="fixedBottomBtn status1Btn addBtn tap-active"
          @click="
            $baseUtil.navigateToHandler(
              '/pages/BusinessCardAuthentication/stepOne'
            )
          "
        >
          <view class="con">
            <span class="iconfont icon-jiahao1 icon"></span>
            添加名片
          </view>
        </view>
      </view>
      <view class="emptyBox"></view>
    </view>
  </view>
</template>

<script>
import { getMyInfo } from "@/api/businessCard";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      isNeedRefreshPage: true,
      isLoad: false,
      dataList: [],
    };
  },
  computed: {
    ...mapGetters(["getPlatformItemSingleValueByPlatformTypeAndKey"]),
  },
  onLoad() {},
  methods: {
    ...mapMutations(["SET_CHECK_BUSINESS_CARD_INFO"]),
    async init() {
      await this.getMyInfo();
      this.skeletonLoading = false;
    },
    // 获取名片列表
    getMyInfo() {
      return new Promise((resolve) => {
        getMyInfo()
          .then((res) => {
            this.isLoad = true;
            this.dataList = res.data;
            resolve();
          })
          .catch((err) => {
            this.$baseUtil.normalErrMsgHandler(err);
          });
      });
    },
    // 查看名片详情
    handlerCheck(itemInfo) {
      this.SET_CHECK_BUSINESS_CARD_INFO(itemInfo);
      this.$baseUtil.navigateToHandler("/pages/MyBusinessCard/detail");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
