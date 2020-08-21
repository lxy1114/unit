<template>
	<view class="container">
		<view class="line">
			<view class="list" 
					v-for="(item,index) in list" 
					:key="index"
					:style="'background: rgba('+item+',1)'">
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: Array(100).fill('')
		}
	},
	methods: {
		
	},
	onLoad() {
		console.log(this.list)
	}
}
</script>

<style lang="scss" scoped>
.container{
	width: 690rpx;
	height: 690rpx;
	border: 2rpx solid #EEEEEE;
	margin: 30rpx auto;
}
.line{
	width: 50rpx;
	.list{
		width: 100%;
		height: 2rpx;
	}
}
</style>
