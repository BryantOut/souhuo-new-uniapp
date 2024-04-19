<template>
	<view class="page">
		<view class="content">
			<image class="logo" mode="aspectFit" src="../../static/image/icon2.png"></image>
			<view class="bottomPart">
				<!-- #ifdef MP-WEIXIN -->
				<button class="wxLogin btn tap-active" type="default" open-type="getPhoneNumber" @getphonenumber="getphonenumber">
					微信一键登录
				</button>
				<!-- #endif -->
				<navigator url="/pages/Login/loginByPhone" hover-class="none">
					<view class="phoneLogin tap-active">手机号登录/注册</view>
				</navigator>
				<view class="agreementTip">
				  注册/登录则视为你同意<navigator
				    url="/pages/Agreement/userAgreement"
				    hover-class="navigator-hover"
				    class="link"
				  >
				    隐私政策</navigator
				  >和<navigator
				    url="/pages/Agreement/userAgreement"
				    hover-class="navigator-hover"
				    class="link"
				    >服务条款</navigator
				  >
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import registerMixins from "@/mixins/registerMixins";
export default {
	mixins: [registerMixins],
}
</script>

<style>
page {
  background-color: #fff;
}
</style>

<style lang="scss" scoped>
	@import './css/index.scss';	
	.logo {
		width: 488rpx;
		height: 124rpx;
		margin-top: 220rpx;
	}
</style>