<template>
  <Skeleton v-if="!getCheckNoticeInfo" :row="4" animate :loading="skeletonLoading">
  </Skeleton>
  <view v-else class="page">
    <uni-search-bar
      v-model="searchValue"
      placeholder="请输入搜索内容"
    ></uni-search-bar>
    <view class="allList">
      <uni-indexed-list :options="tempList" @click="bindClick" />
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import express from "@/common/express.js";
export default {
  components: {},
  computed: {
    ...mapGetters(["getSubmitExpressTempParams", "getCheckNoticeInfo"]),
    tempList() {
      if (!this.searchValue) return express.list
      let tempList = JSON.parse(JSON.stringify(express.list))
      tempList.forEach((val) => {
        const tempData = val.data.filter((subVal) => {
          const { comCode, comName } = subVal;
          return ((comCode.indexOf(this.searchValue) !== -1) || (comName.indexOf(this.searchValue) !== -1));
        });
        val.data = tempData        
      });
      return tempList
    },
  },
  data() {
    return {
      searchValue: "",
      list: express.list,
    };
  },
  created() {
    if (!this.getCheckNoticeInfo) {
      this.$baseUtil.navToHome();
    }
  },
  methods: {
    ...mapMutations(["SET_SUBMIT_EXPRESS_TEMP_PARAMS"]),
    bindClick(e) {
      const { comCode } = e.item;
      this.SET_SUBMIT_EXPRESS_TEMP_PARAMS({
        ...this.getSubmitExpressTempParams,
        comCode,
      });
      // uni.redirectTo({
      //   url: `/pages/Express/submitOrder`,
      // });
	  uni.navigateBack();
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
}

.allList {
  position: relative;
  width: 100%;
  flex: 1;
}
</style>
