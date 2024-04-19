<template>
	<button class="mini-btn myEditClass tapActiveStatus1" size="mini" plain="true" v-text="btnText"
		:disabled="verificationCodeInfo.disabled" @click="btnEvent"></button>
</template>

<script>
	export default {
		props: {
			verificationCodeInfo: {
				type: Object,
				default: {
					disabled: true
				}
			}
		},
		data() {
			return {
				btnText: "获取验证码",
				timer: null,
				countdownTime: 60,
			};
		},
		methods: {
			btnEvent() {
				this.startCountdown();
			},
			startCountdown() {
				this.$emit('btnTapHandler')
				this.timer = setInterval(() => {
					if (this.countdownTime === 0) {
						clearInterval(this.timer);
						this.timer = null;
						this.btnText = "获取验证码";
						this.countdownTime = 60;
						return;
					}
					this.btnText = this.countdownTime + "s";
					this.countdownTime--;
				}, 1000);
			},
		},
		watch: {
			timer() {
				this.$emit('changeDisabledStatus')
			}
		}
	};
</script>

<style lang="scss">
	.mini-btn.myEditClass {
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-radius: 100rpx;
		font-size: 24rpx;
		height: 60rpx;
		min-width: 154rpx;
		padding: 0;
	}
</style>
