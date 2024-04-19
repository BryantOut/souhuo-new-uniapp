<template>
	<Skeleton v-if="!getCheckNoticeInfo" :row="4" animate :loading="skeletonLoading">
	</Skeleton>
	<view v-else class="page">
		<!-- 顶部展现通告相关信息 -->
		<NoticeInfoCard></NoticeInfoCard>
		<view class="part submitOrder">
			<view class="mainTitle">提交物流单号</view>
			<view class="inputList">
				<section class="item">
					<view class="label">快递单号</view>
					<input v-model="num" class="uni-input" placeholder="请输入快递单号" @input="autoHandler"/>
				</section>
				<section class="item">
					<view class="label">快递公司</view>
					<view @click="chooseComHandler" class="companyInfo">
						<template v-if="currentComInfo">
							<image v-if="currentComInfo.logo" class="expressLogo" mode="aspectFill"
								:src="currentComInfo.logo"></image>
							<span>{{ currentComInfo.comName }}</span>
						</template>
						<template v-else>
							<view class="tip">切换快递</view>
						</template>
						<span class="iconfont icon-xiangyou1"></span>
					</view>
				</section>
				<section v-if="isShowPhoneInput" class="item">
					<view class="label">手机号</view>
					<input v-model="expressTel" class="uni-input" placeholder="请输入寄件人或收件人手机号" />
				</section>
			</view>
		</view>
		<view class="pageFooterEmptyBox"></view>
		<view class="pageFooter">
			<view class="main">
				<view class="btnGroups">
					<view class="cancelBtn btn tap-active" @click="$baseUtil.backHandler()">返回</view>
					<view class="comfirmBtn btn tap-active" @click="submitExpressHandler">提交</view>
				</view>
			</view>
			<view class="emptyBox"></view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from "vuex";
	import {
		auto,
		submitExpress,
		submitReturnExpress
	} from "@/api/express.js";
	import NoticeInfoCard from "@/components/NoticeInfoCard.vue";
	export default {
		components: {
			NoticeInfoCard,
		},
		computed: {
			...mapGetters(["getCheckNoticeInfo", "getSubmitExpressTempParams"]),
			currentComInfo() {
				console.log(this.comCode)
				if (this.comCode) {
					return this.$baseUtil.filterComCode(this.comCode);
				}
				return;
			},
			// 在选中【顺丰速运】、【顺丰快运】、【丰网速运】时，需要在下方增加展现手机号输入框 - 必填
			isShowPhoneInput() {
				return this.flag.includes(this.comCode);
			},
		},
		onShow() {
			if (this.getSubmitExpressTempParams) {
				const {
					num,
					expressTel,
					comCode
				} = this.getSubmitExpressTempParams;
				this.num = num;
				this.comCode = comCode
				if (this.flag.includes(comCode)) {
					this.expressTel = expressTel;
				}
			}
		},
		data() {
			return {
				num: undefined, // 快递单号
				comCode: undefined, // 快递单号公司编码
				expressTel: undefined, // 快递手机号码
				flag: ["shunfeng", "sf", "fengwang"], // 在选中【顺丰速运】、【顺丰快运】、【丰网速运】时，需要在下方增加展现手机号输入框 - 必填
			};
		},
		created() {
			if (!this.getCheckNoticeInfo) {
				this.$baseUtil.navToHome();
			}
		},
		// onLoad() {
		//   if (this.getSubmitExpressTempParams) {
		//     const { num, expressTel, comCode } = this.getSubmitExpressTempParams;
		//     this.num = num;      
		//     this.comCode = comCode
		//     if (this.flag.indexOf(comCode) !== -1) {
		//       this.expressTel = expressTel;
		//     }
		//   }
		// },
		onBackPress() {
			this.SET_SUBMIT_EXPRESS_TEMP_PARAMS(null)
		},
		methods: {
			...mapMutations(["SET_SUBMIT_EXPRESS_TEMP_PARAMS"]),
			async autoHandler() {
				try {
					const {
						data
					} = await auto({
						num: this.num
					});
					if (data) {
						this.comCode = data.comCode;
					} else {
						this.comCode = undefined
					}
				} catch (err) {
					console.log(err);
					this.comCode = undefined
					// this.$baseUtil.normalErrMsgHandler(err);
				}
			},
			async submitExpressHandler() {
				if (!this.num) {
					this.$baseUtil.showToast({
						title: "请输入快递单号",
					});
					return;
				}
				if (!this.comCode) {
					this.$baseUtil.showToast({
						title: "请选择快递公司",
					});
					return;
				}
				if (!this.expressTel && this.flag.includes(this.comCode)) {
					this.$baseUtil.showToast({
						title: "请输入寄件人或收件人手机号",
					});
					return;
				}
				try {
					const com = this.comCode;
					const expressNumber = this.num;
					let {
						taskId,
						taskStatus
					} = this.getCheckNoticeInfo;
					let tempMethedName;
					// 任任务状态 - 【合作中(0),待收货(1),待提交(2),待审核(3),待寄回(4),待确认(5),已完成(6),已取消(7),已超时(8),取消中(9)】
					if ([0].includes(taskStatus)) {
						// 获取物流信息接口
						tempMethedName = submitExpress;
					} else if ([4].includes(taskStatus)) {
						// 获获取回寄物流信息接口
						tempMethedName = submitReturnExpress;
					} else {
						this.$baseUtil.navToHome();
					}
					const expressTel = this.expressTel;
					const {
						msg,
						data
					} = await tempMethedName({
						com,
						expressNumber,
						taskId,
						expressTel,
					});
					if (data && data.taskStatus) {
						taskStatus = data.taskStatus
					}
					this.$baseUtil.showToast({
						title: msg
					});
					this.$EventBus.$emit("updateCooperation");
					setTimeout(() => {
						if ([5, 6].includes(taskStatus)) {
							uni.redirectTo({
								url: `/pages/Result/submitSuccess?status=${taskStatus}`
							});
							return
						}
						uni.navigateBack();
					}, 1000)
				} catch (err) {
					this.$baseUtil.normalErrMsgHandler(err);
				}
			},
			chooseComHandler() {
				this.SET_SUBMIT_EXPRESS_TEMP_PARAMS({
					num: this.num,
					expressTel: this.expressTel,
					comCode: this.comCode
				});
				this.$baseUtil.navigateToHandler("/pages/Express/companyList");
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "../NoticeSignUp/css/index.scss";

	.submitOrder {
		.inputList {
			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 100rpx;
				border-bottom: 1px solid $borderColor;

				.uni-input {
					text-align: right;
					flex: 1;
					font-size: 28rpx;
				}
			}
		}
	}
</style>