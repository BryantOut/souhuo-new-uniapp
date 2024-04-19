<template>
	<Skeleton v-if="skeletonLoading" :row="4" animate :loading="skeletonLoading">
	</Skeleton>
	<view v-else class="page normalPaddingTop">
		<view class="content">
			<view class="headerBox" @click.stop="checkLoginBeforeOperation(null, 1)">
				<image class="header" mode="aspectFit" :src="loginState && personalInfo.headPortraitUrl
						? personalInfo.headPortraitUrl
						: '../../static/image/icon6.png'
					"></image>
				<view class="info tap-active">
					<view v-if="loginState" class="userName">{{
						personalInfo.nick | stringModify
					}}</view>
					<view v-else class="userName">点击登录</view>
					<view v-if="!loginState" class="tip">登录万有通告，体验生活小美好~</view>
				</view>
			</view>

			<view v-if="loginState" class="cellList">
				<view class="cellItem tap-active" @click="$baseUtil.navigateToHandler('/pages/MyBusinessCard/index')">
					<view class="leftPart">
						<image class="icon" mode="heightFix" src="../../static/image/icon3.png"></image>
						<view class="label">我的名片</view>
						<view class="platformList">
							<image v-for="(item, index) in personalInfo.cardPlatformTypeList" :key="index"
								class="platformItem" mode="aspectFit" :src="getPlatformItemSingleValueByPlatformTypeAndKey({
									platformType: item,
									key: 'logoSrc',
								})
									"></image>
						</view>
					</view>
					<span class="iconfont icon-xiangyou1"></span>
				</view>
				<!-- <view class="cellItem tap-active">
					<view class="leftPart">
						<image class="icon" mode="heightFix" src="../../static/image/icon4.png"></image>
						<view class="label">我的收藏</view>
					</view>
					<span class="iconfont icon-xiangyou1"></span>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
import refreshSwitchTab from "@/mixins/refreshSwitchTab";
import {
	personalInfo
} from "@/api/user";
import {
	mapGetters
} from "vuex";
export default {
	mixins: [refreshSwitchTab],
	data() {
		return {
			personalInfo: {
				headPortraitUrl: "",
				nick: "",
			},
			isNeedRefreshPage: true,
		};
	},
	computed: {
		...mapGetters(["getPlatformItemSingleValueByPlatformTypeAndKey"]),
	},
	methods: {
		loginHandler() {
			// #ifdef MP-WEIXIN
			this.$baseUtil.navigateToHandler("/pages/Login/index");
			// #endif
			// #ifdef H5
			this.$baseUtil.navigateToHandler("/pages/Login/loginByPhone");
			// #endif
		},
		async init() {
			if (this.loginState) {
				await this.getPersonalInfo();
				this.skeletonLoading = false
				return
			}
			this.skeletonLoading = false
		},
		// 获取用户个人信息接口
		getPersonalInfo() {
			return new Promise((resolve) => {
				personalInfo()
					.then((res) => {
						if (res.data === null) {
							return;
						}
						this.personalInfo = res.data;
						resolve()
					})
					.catch((err) => {
						this.$baseUtil.normalErrMsgHandler(err)
					});
			})
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;

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

	.content {
		position: relative;
		z-index: 2;

		.headerBox {
			display: flex;
			align-items: center;
			position: relative;
			z-index: 2;
			width: 700rpx;
			height: 176rpx;
			background-color: #fff;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 0 22rpx;

			.header {
				width: 132rpx;
				height: 132rpx;
				border-radius: 50%;
				margin-right: 22rpx;
			}

			.info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 80rpx;

				.userName {
					font-size: 30rpx;
					line-height: 1em;
				}

				.tip {
					font-size: 24rpx;
					color: $tipColor;
					line-height: 1em;
				}
			}
		}

		.cellList {
			width: 100%;
			background-color: #fff;
			overflow: hidden;
			box-sizing: border-box;
			padding: 0 20rpx;
			margin-top: 22rpx;
			border-radius: 20rpx;

			.cellItem {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 120rpx;
				border-bottom: 1px solid $borderColor;
				padding: 0 10rpx;

				&:last-child {
					border-bottom: 0;
				}

				.leftPart {
					display: flex;
					align-items: center;

					.icon {
						height: 50rpx;
					}

					.label {
						line-height: 1em;
						font-size: 28rpx;
						margin: 0 16rpx 0 20rpx;
					}

					.platformList {
						display: flex;
						flex-wrap: wrap;

						.platformItem {
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
							background-color: #fff;
							margin-right: -8rpx;
						}
					}
				}
			}
		}
	}
}
</style>