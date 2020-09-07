<template>
	<view class="container">
		<view class="con">
			
		</view>
		<view class="line">
			<!-- <view class="list" 
					v-for="(item,index) in list" 
					:key="index"
					:style="'background: rgba('+item.a+','+item.b+','+item.c+',1);height:'+(1/list.length*100)+'%'">
			</view> -->
			<view class="check"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: []
		}
	},
	methods: {
		
	},
	onLoad() {
		var colorMax = 255
		var colorMin = 0
		for(var i=0; i<255; i++){
			var obj = {
				a: 255,
				b: i,
				c: 0
			}
			this.list.push(obj)			
		}
		for(var i=255; i>0; i--){
			var obj = {
				a: i,
				b: 255,
				c: 0
			}
			this.list.push(obj)
		}
		for(var i=0; i<255; i++){
			var obj = {
				a: 0,
				b: 255,
				c: i
			}
			this.list.push(obj)
		}
		for(var i=255; i>0; i--){
			var obj = {
				a: 0,
				b: i,
				c: 255
			}
			this.list.push(obj)
		}
		for(var i=0; i<255; i++){
			var obj = {
				a: i,
				b: 2,
				c: 255
			}
			this.list.push(obj)
		}
		for(var i=255; i>0; i--){
			var obj = {
				a: 255,
				b: 0,
				c: i
			}
			this.list.push(obj)
		}
		console.log(this.list)
	}
}
</script>

<style lang="scss" scoped>
.container{
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 690rpx;
	height: 500rpx;
	margin: 30rpx auto;
}
.con{
	width: 500rpx;
	height: 500rpx;
	border: 2rpx solid #EEEEEE;
}
.line{
	width: 80rpx;
	height: 500rpx;
	margin-right: 30upx;
	border: 2rpx solid #EEEEEE;
	position: relative;
	.list{
		width: 100%;
	}
}
.check{
	width: 60rpx;
	height: 6rpx;
	background: #000;
	position: absolute;
	right: -30upx;
}
</style>
