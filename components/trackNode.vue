<template>
  <div class="total-wrap" :style="{marginTop: isMainNode?'22rpx':'6rpx'}">
    <div class="node-container">
      <div class="node-container-left">
        <div class="tag-container">
          <view v-if="isMainNode" class="mainNode" :class="isNewest?'isFirst':''">
            <span class="iconfont" :class="[isMainNode.iconfont]"></span>
          </view>
          <div v-else class="node-tag-container">
            <div class="node-tag"></div>
          </div>
        </div>
        <div class="line-container" :style="{height: isMainNode?'142rpx':'88rpx', paddingTop: isMainNode?'22rpx':'8rpx'}">
          <div v-if="!isFirst" class="line" :style="{height: isMainNode?'120rpx':'80rpx'}"></div>
        </div>
      </div>
      <div class="node-container-right" :style="{paddingTop: isMainNode?'0':'8rpx'}">
        <div v-if="isMainNode" class="node-title" :style="{color: isNewest?'#FF0000':'#999'}">{{nodeData.status}}</div>
        <div class="node-ftime">{{nodeData.ftime}}</div>
        <div class="node-desc" :style="{color: isNewest?'#4b4b4b':'#999', marginTop: isMainNode?'10rpx':'0'}">{{contextFixed}}</div>
        <div v-if="nodeData.phone" class="node-phone">{{nodeData.phone}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isNewest: {
      type: Boolean,
      default: false
    },
    isFirst: {
      type: Boolean,
      default: false
    },
    nodeData: {
      type: Object,
      default () {
        return {
          status: '',
          ftime: '2019-01-01 00:00:00',
          context: 'xxxxxx'
        }
      }
    }
  },
  computed: {
    isMainNode() {
      return this.$baseUtil.isMainNode(this.nodeData)
    },
    contextFixed () {
      if (!this.nodeData.context) return ''
      return this.nodeData.context.replace(/(\d{3})\d{4}(\d{4})/, '')
    }
  }
}
</script>
<style lang="scss" scoped>
.total-wrap {
  // margin-top: 22rpx;
  width: 100%;
  .node-container {
    width: 100%;
    height: auto;
    display: flex;
    &-left {
      width: 44rpx;
      height: auto;
      .tag-container {
        width: 44rpx;
        height: 44rpx;
        img {
          width: 44rpx;
          height: 44rpx;
        }
        .mainNode {
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 44rpx;
          height: 44rpx;
          background-color: #dcdcdc;
          border-radius: 50%;
          overflow: hidden;
          &.isFirst {
            background-color: #FF0000;
          }
          .iconfont {
            font-size: 32rpx;
            color: #ffffff;
          }
        }
        .node-tag-container {
          width: 44rpx;
          height: 44rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          .node-tag {
            width: 14rpx;
            height: 14rpx;
            background-color: #dcdcdc;
            border-radius: 50%;
          }
        }
      }
      .line-container {
        box-sizing: border-box;
        width: 44rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        .line {
          width: 2rpx;
          background-color: #dcdcdc;
        }
      }
    }
    &-right {
      flex: 1;
      box-sizing: border-box;
      padding: 0 10rpx 0 24rpx;
      .node-title {
        width: 100%;
        height: 40rpx;
        line-height: 44rpx;
        color: #222;
        font-size: 28rpx;
        font-family: 'PingFangSC-Medium';
      }
      .node-desc {
        margin-top: 16rpx;
        width: 100%;
        min-height: 30rpx;
        line-height: 30rpx;
        color: #222;
        font-size: 24rpx;
        font-family: 'PingFangSC-Regular';
        word-wrap: break-word;
        word-break: normal;
      }
      .node-phone {
        margin-top: 8rpx;
        width: 100%;
        height: 26rpx;
        line-height: 26rpx;
        color: #FE4E2C;
        font-size: 26rpx;
        font-family: 'Avenir-Medium';
      }
      .node-ftime {
        margin-top: 12rpx;
        width: 100%;
        height: 34rpx;
        line-height: 34rpx;
        color: #999;
        font-size: 24rpx;
        font-family: 'Avenir-Book';
      }
    }
  }
}
</style>