export default {
	toast(msg) {
		return uni.showToast({
			title: msg,
			icon: 'none'
		})
	},
	modal(msg) {
		return uni.showModal({
			title: '提示',
			content: msg,
			showCancel: false
		})
	},
}