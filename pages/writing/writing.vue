<template>
	<view class="container">
		<canvas class="canvas" 
			canvas-id="myCanvas" 
			disable-scroll="true" 
			@touchstart="touchstart" 
			@touchmove="touchmove"
			@touchend="touchend">
		</canvas>
		<view class="but">
			<view class="but-text" @click="clear">清除画布</view>
			<view class="but-text" @click="colorShow = !colorShow">{{!colorShow ? '设置' : '隐藏设置'}}</view>
			<view class="but-text">历史记录</view>
		</view>
		<view class="color" v-if="colorShow">
			<view class="title">画笔颜色</view>
			<view class="scroll">
				<view class="color-text"
					:class="{'color-text1': color == item}"
					v-for="(item,index) in colorList" 
					:key="index" 
					:style="'background:'+item"
					@click="color = item">
				</view>
				<view class="addColor">自定义颜色</view>
			</view>
		</view>
		<view class="width" v-if="colorShow">
			<view class="title">画笔尺寸</view>
			<view class="reduce" @click="changeWidth('reduce')">-</view>
			<input class="input" v-model="width"/>
			<view class="line" :style="'height:'+(width*2)+'rpx;background:'+color"></view>
			<view class="add" @click="changeWidth('add')">+</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			color: 'black',
			width: 3,
			point: [],
			colorList: ['black','red','orange','yellow','green','cyan','blue','purple'],
			colorShow: false
		}
	},
	methods: {
		touchstart(e) {
			this.point.push({
				x: e.changedTouches[0].x,
				y: e.changedTouches[0].y
			})
		},
		touchmove(e) {
			this.point.push({
				x: e.changedTouches[0].x,
				y: e.changedTouches[0].y
			})
			if(this.point.length > 2){
				this.draw()
			}		
		},
		touchend() {
			this.point = []
		},
		draw() {
			var point1 = this.point[0]
			var point2 = this.point[1]
			this.point.shift()
			this.ctx.setLineWidth(this.width)
			this.ctx.moveTo(point1.x, point1.y)
			this.ctx.lineTo(point2.x, point2.y)
			this.ctx.setStrokeStyle(this.color)
			this.ctx.stroke()
			
			this.ctx.draw(true)
		},
		clear() {
			wx.createSelectorQuery().select('.canvas').boundingClientRect((res) => {
			  this.ctx.clearRect(0, 0, res.width*2, res.height*2)
			  this.ctx.draw(true)
			}).exec()
		},
		changeWidth(type) {
			var width = typeof this.width == 'number' ? this.width : parseInt(this.width)
			this.width = type == 'reduce' && this.width != 1 ? width-1 : 
							 type == 'add' ? width+1 : this.width
		},
	},
	onReady() {
		this.ctx = uni.createCanvasContext('myCanvas')
	}
}
</script>

<style lang="less" scoped>
.container{
	width: 690rpx;
	height: 400rpx;
	margin: 60rpx auto;
}
uni-canvas{
	width: 100%;
	height: 100%;
	border: 2rpx solid #EEEEEE;
}
.but{
	display: flex;
	justify-content: space-between;
	margin-top: 30rpx;
	&-text{
		padding: 4rpx 20rpx;
		border: 2rpx solid #DDDDDD;
		border-radius: 4rpx;
		font-size: 28rpx;
		color: #666666;
	}
}
.title{
	font-size: 28rpx;
	color: #333333;
	margin-right: 20rpx;
	flex: none;
}
.color{
	display: flex;
	align-items: center;	
	width: 100%;
	white-space: nowrap;
	overflow-y: scroll;
	margin-top: 30rpx;
	&-text{
		flex: none;
		width: 50rpx;
		height: 50rpx;
		margin-right: 16rpx;
	}
	&-text.color-text1{
		width: 60rpx;
		height: 60rpx;
	}
}
.scroll{
	display: flex;
	align-items: center;
	overflow-x: scroll;
}
.addColor{
	flex: none;
	padding: 4rpx 20rpx;
	border: 2rpx solid #DDDDDD;
	border-radius: 4rpx;
	font-size: 28rpx;
	color: #666666;
}
.width{
	display: flex;
	align-items: center;
	width: 100%;
	margin-top: 30rpx;
	.reduce,.add{
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		border: 2rpx solid #999999;
		border-radius: 4rpx;
		font-size: 40rpx;
		color: #999999;
		text-align: center;
	}
	.input{
		width: 60rpx;
		padding: 0rpx 20rpx;
		text-align: center;
	}
	.line{
		width: 60rpx;
		background: #000000;
		margin: 0rpx 20rpx;
	}
}
</style>
