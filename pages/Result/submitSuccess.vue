<template>
	<view class="page">
		<view class="content">
			<image src="../../static/image/submitContentSuccessIcon.png" class="logo"></image>
			<view class="title">{{ currentText.tempTitle }}</view>
			<view class="tip" v-html="currentText.tempTip"></view>
		</view>
		<view class="pageFooterEmptyBox"></view>
		<view class="pageFooter transparent">
			<view class="main">
				<view class="btnGroups fixedBottomBtn">
					<view class="cancelBtn btn tap-active isAloneBtn" @click="$baseUtil.backHandler()">返回</view>
				</view>
			</view>
			<view class="emptyBox"></view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.status = option.status !== undefined ? Number(option.status) : 0
		},
		computed: {
			currentText() {
				let tempTip;
				let tempTitle = '提交成功，等待审核';
				switch (this.status) {
					case 0:
						tempTip = `您已成功提交内容，还需将物品寄回，请及<br>时与商家确认回寄。若有疑问，请在公众号留言联系客服`
						break;
					case 1:
						tempTip = `您已成功提交内容，请及时与商家确认返款<br>流程。若有疑问，请在公众号留言联系客服`
						break;
					case 6:
						tempTitle = `提交成功，回寄快递已签收`
						tempTip = `提交的回寄单号已经签收，合作已完成。请及时与商家确认确认返款流程。若有疑问，请在公众号留言联系客服`
						break;
					default:
						// 5
						tempTip = `您已成功提交回寄单号，请及时与商家确认<br>确认返款流程。若有疑问，请在公众号留言<br>联系客服`
						break;
				}
				return {
					tempTitle,
					tempTip
				}
			}
		},
		data() {
			return {
				status: 0
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page {
		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 580rpx;
			margin: 160rpx auto 0;

			.logo {
				width: 280rpx;
				height: 280rpx;
			}

			.title {
				font-size: 40rpx;
				margin-bottom: 20rpx;
			}

			.tip {
				text-align: center;
				line-height: 1.5em;
			}
		}
	}
</style>