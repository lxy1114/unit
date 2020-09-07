<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
/*每个页面公共css */
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
button{
	border-style: none;
}
.mask{
	width: 100%;
	height: 100%;
	background: #000000;
	opacity: 0.5;
	position: fixed;
	top: 0rpx;
	left: 0rpx;
}
.placeholder{
	font-size: 24rpx;
}
</style>
