<script>
export default {
	onLaunch: function () {
		console.log('App Launch')
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style class="scss">
/*每个页面公共css */
@import url("./static/css/iconfont.css");
@import url("./static/css/common.css");

.emptyForTabbar {
	width: 100%;
	height: var(--window-bottom);
}

.sticky-box {
	/* #ifndef APP-PLUS-NVUE */
	display: flex;
	position: -webkit-sticky;
	/* #endif */
	position: sticky;
	top: var(--window-top);
	z-index: 99;
	flex-direction: row;
	margin: 0px;
}
</style>
