<!-- 内容审核状态，0待审核，1审核通过，2审核不通过 -->
<template>
	<Skeleton v-if="!getCheckNoticeInfo || skeletonLoading" :row="4" animate :loading="skeletonLoading">
	</Skeleton>
	<view v-else class="page">
		<AlertTip v-if="[0].includes(auditStatus)" tip="提交内容审核中，请耐心等待"></AlertTip>
		<!-- 顶部展现通告相关信息 -->
		<NoticeInfoCard></NoticeInfoCard>
		<view class="part submitOrder">
			<view class="mainTitle">{{ !isEdit ? '上传已完成截图（单张截图）' : '已完成截图' }}</view>
			<view class="alertTipMain tip">
				<span class="iconfont icon-31tishi"></span>
				<span>请先与通告主确认内容后再上传发布</span>
			</view>
			<view class="picPart of9">
				<view class="picBox">
					<image class="pic mask" mode="aspectFill" :src="submitContentScreenshotDemo" @click.stop="
						$baseUtil.previewAloneImage(submitContentScreenshotDemo)
					">
					</image>
				</view>
				<view v-if="!screenshot && !isEdit" class="picBox uploader tap-active" @click.stop="uploadScreenshot">
					<span class="iconfont icon-jiahao"></span>
				</view>
				<view class="picBox" v-if="screenshot">
					<image class="pic" mode="aspectFill" :src="screenshot" @click.stop="
						$baseUtil.previewAloneImage(screenshot)
					"></image>
					<view v-if="!isEdit" class="clear tap-active" @click.stop="delScreenshotHandler()">
						<span class="iconfont icon-guanbi"></span>
					</view>
				</view>
			</view>
		</view>
		<view class="part submitOrder">
			<view class="mainTitle">{{ !isEdit ? '上传已拍摄图片（最多10张）' : '已拍摄图片' }}</view>
			<view class="alertTipMain tip">
				<span class="iconfont icon-31tishi"></span>
				<span>请同步上传已拍摄的所有图片，内容越多，接单越容易</span>
			</view>
			<view class="picPart of9">
				<view v-if="!isEdit && pictures.length < 10" class="picBox uploader tap-active"
					@click.stop="uploadPictureshot">
					<span class="iconfont icon-jiahao"></span>
				</view>
				<view class="picBox" v-for="(item, index) in pictures" :key="index">
					<image class="pic" mode="aspectFill" :src="item" @click.stop="
						$baseUtil.previewImage({
							current: index,
							urls: pictures,
						})
					"></image>
					<view v-if="!isEdit" class="clear tap-active" @click.stop="delPicturesHandler(index)">
						<span class="iconfont icon-guanbi"></span>
					</view>
				</view>
			</view>
			<view v-if="auditStatus === 2 && auditRemark" class="alertTip2">
				<span class="iconfont icon-jinggao"></span>
				<span>{{ "取消申请审核不通过，请重新提交或联系公众号客服处理" }} <br />
					{{ "不通过原因：" + auditRemark }}</span>
			</view>
		</view>
		<view class="pageFooterEmptyBox"></view>
		<view class="pageFooter">
			<view class="main">
				<view class="btnGroups">
					<view class="cancelBtn btn tap-active" @click="$baseUtil.backHandler()">返回</view>
					<view v-if="isShowSubmitBtn" class="comfirmBtn btn tap-active" @click="submitHandler">
						{{ isEdit ? "重新提交" : "提交" }}
					</view>
				</view>
			</view>
			<view class="emptyBox"></view>
		</view>
	</view>
</template>

<script>
import {
	mapGetters,
	mapMutations,
	mapActions
} from "vuex";
import {
	getTaskContentDetail,
	submitTaskContent,
} from "@/api/tNoticeTaskContent.js";
import NoticeInfoCard from "@/components/NoticeInfoCard.vue";
export default {
	components: {
		NoticeInfoCard,
	},
	computed: {
		...mapGetters(["getCheckNoticeInfo", "getPlatformItemSingleValueByPlatformTypeAndKey"]),
		isEdit() {
			if (this.auditStatus === undefined) {
				return false;
			}
			return true;
		},
		isShowSubmitBtn() {
			if (
				this.auditStatus === undefined ||
				this.auditStatus === 2
			) {
				return true;
			}
			return false;
		},
		submitContentScreenshotDemo() {
			return this.getPlatformItemSingleValueByPlatformTypeAndKey({
				platformType: this.getCheckNoticeInfo.platformType,
				key: 'submitContentScreenshotDemo',
			})
		}
	},
	data() {
		return {
			auditRemark: undefined, // 取消原因
			auditRemark: undefined, //
			screenshot: undefined, // 已完成截图
			pictures: [], // 已拍摄图片
			auditStatus: undefined, // 内容审核状态，0待审核，1审核通过，2审核不通过
		};
	},
	created() {
		if (!this.getCheckNoticeInfo) {
			this.$baseUtil.navToHome();
		}
	},
	onLoad() { },
	methods: {
		...mapActions(["getUploadUserInfo"]),
		async init() {
			// 获取上传图片信息接口
			await this.getUploadUserInfo();
			await this.getTaskContentDetail();
			this.$nextTick(() => {
				this.skeletonLoading = false;
			});
		},
		async getTaskContentDetail() {
			try {
				const {
					taskId
				} = this.getCheckNoticeInfo;
				const {
					auditRemark,
					screenshot,
					auditStatus,
					pictures,
				} = (
					await getTaskContentDetail({
						id: taskId,
					})
				).data;
				if (auditStatus !== null) {
					this.auditRemark = auditRemark;
					this.screenshot = screenshot;
					this.pictures = pictures.split(",");
					this.auditStatus = auditStatus;
				}
			} catch (err) {
				this.$baseUtil.normalErrMsgHandler(err);
			}
		},
		submitHandler() {
			if (this.isEdit) {
				this.auditRemark = undefined;
				this.auditRemark = undefined;
				this.screenshot = undefined;
				this.pictures = []
				this.auditStatus = undefined;
			} else {
				if (!this.screenshot) {
					this.$baseUtil.showToast({
						title: "请上传已完成截图",
					});
					return;
				}
				if (this.pictures.length === 0) {
					this.$baseUtil.showToast({
						title: "请上传已拍摄图片",
					});
					return;
				}
				this.submitTaskContent();
			}
		},
		async submitTaskContent() {
			try {
				this.$baseUtil.showLoading({
					title: "提交中...",
				});
				const {
					taskId
				} = this.getCheckNoticeInfo;
				const res = await submitTaskContent({
					taskId,
					screenshot: this.screenshot,
					pictures: this.pictures.join(","),
				});
				this.$baseUtil.showToast({
					title: res.msg,
				});
				this.$EventBus.$emit("updateCooperation");
				setTimeout(() => {
					const { rewardType } = this.getCheckNoticeInfo
					let tempStatus;
					tempStatus = 0
					if ([1, 2].includes(rewardType)) {
						tempStatus = 1
					}
					uni.redirectTo({
						url: `/pages/Result/submitSuccess?status=${tempStatus}`
					});
				}, 1000);
			} catch (error) {
				this.$baseUtil.normalErrMsgHandler(error);
			} finally {
				uni.hideLoading();
			}
		},
		// 上传已完成截图
		uploadScreenshot() {
			this.$baseUtil
				.chooseImage()
				.then((res) => {
					this.screenshot = res;
				});
		},
		// 删除已完成截图
		delScreenshotHandler() {
			this.screenshot = undefined;
		},
		// 上传已拍摄图片
		uploadPictureshot() {
			let tempCount = (10 - this.pictures.length) >= 9 ? 9 :10 - this.pictures.length
			this.$baseUtil
				.chooseImagesHandler({ count: tempCount })
				.then((res) => {
					this.pictures = [...this.pictures, ...res];
				});
		},
		// 删除已拍摄图片
		delPicturesHandler(index) {
			this.pictures.splice(index, 1);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../NoticeSignUp/css/index.scss";

.submitOrder {
	.textarea {
		height: 80rpx;
	}

	.alertTip2 {
		color: $uni-color-error;
		font-size: 24rpx;

		.iconfont {
			margin-right: 10rpx;
			line-height: 2em;
		}
	}
}

.picPart {
	position: relative;
	width: calc(3 * (160rpx) + 2 * (40rpx));
	display: grid;
	grid-template-rows: repeat(1, 1fr);
	grid-template-columns: 160rpx auto;
	// width: calc(3*(160rpx) + 2*(60rpx));
	// height: 160rpx;
	justify-items: center;
	align-items: center;

	// margin: 0 auto;
	// column-gap: 10rpx;
	&.of9 {
		row-gap: 40rpx;
		column-gap: 40rpx;
		grid-template-rows: repeat(1, 1fr);
		grid-template-columns: repeat(3, 1fr);
		// height: 160rpx;
	}

	.tipList {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		grid-row: 1 / span 2;
		grid-column: 2 / span 2;
		height: 100%;
		box-sizing: border-box;
	}
}
</style>