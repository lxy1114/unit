<template>
	<view class="container">
		<navigator class="albums" url="./albums">相册</navigator>
		<canvas class="canvas" 
			canvas-id="myCanvas" 
			disable-scroll="true" 
			@touchstart="touchstart" 
			@touchmove="touchmove"
			@touchend="touchend">
		</canvas>
		<view class="but">
			<view class="but-text" @click="clear(true)">清除画布</view>
			<view class="but-text" @click="colorShow = !colorShow">{{!colorShow ? '设置' : '隐藏设置'}}</view>
			<!-- <view class="but-text">历史记录</view> -->
			<view class="but-text" @click="showAll">全部显示</view>
			<view class="but-text" @click="toCanvas">{{id ? '保存图片' : '生成图片'}}</view>
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
				<view class="addColor" @click="custom = true">自定义颜色</view>
			</view>
		</view>
		<view class="width" v-if="colorShow">
			<view class="title">画笔尺寸</view>
			<view class="reduce" @click="changeWidth('reduce')">-</view>
			<input class="input" v-model="width"/>
			<view class="line" :style="'height:'+(width*2)+'rpx;background:'+color"></view>
			<view class="add" @click="changeWidth('add')">+</view>
		</view>
		<view class="mask" v-if="custom"></view>
		<view class="custom" v-if="custom">
			<view class="custom-title">自定义颜色值</view>
			<input class="custom-input" placeholder="支持十六进制、RGB、RGBA、HSL、HSLA颜色" placeholder-class="placeholder" v-model="newColor"/>
			<view class="custombut">
				<button class="custombut-text" @click="cancel">取消</button>
				<button class="custombut-text" @click="addColor">添加颜色</button>
			</view>
		</view>
		<view class="history">
			<view class="step" v-for="(item,index) in list" :key="index">
				<view class="step-text">{{'第'+(index+1)+'步'}}</view>
				<view class="step-but">
					<view class="step-but-text" :style="item.only ? 'color: blue;' : ''" @click="checkStep(item,'only')">仅显示此步</view>
					<view class="step-but-text" :style="item.hide ? 'color: blue;' : ''" @click="checkStep(item,'hide')">
						{{item.hide ? '显示' : '隐藏'}}
					</view>
					<view class="step-but-text" @click="getDelete(index)">删除</view>
				</view>
			</view>
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
			colorShow: false,
			custom: false,
			list: [],
			img: '',
			newColor: '',
			albumsList: [],
			id: ''
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
			// if(this.point.length > 2){
				this.draw()
			// }		
		},
		touchend() {
			var obj = {
				point: this.point,
				only: false,
				hide: false
			}
			this.list.push(obj)
			this.point = []
		},
		draw(start,end,last) {
			var point1 = start || this.point[this.point.length-2]
			var point2 = end || this.point[this.point.length-1]
			this.ctx.setLineWidth(this.width)
			if(last){
				this.ctx.beginPath()
			}
			this.ctx.moveTo(point1.x, point1.y)
			this.ctx.lineTo(point2.x, point2.y)
			this.ctx.setStrokeStyle(this.color)
			this.ctx.stroke()
			
			this.ctx.draw(true)
		},
		clear(type) {
			wx.createSelectorQuery().select('.canvas').boundingClientRect((res) => {
			   this.ctx.clearRect(0, 0, res.width*2, res.height*2)
			   this.ctx.draw(true)
				if(type) {
					return this.list = []
				}
			   for(var i in this.list){
					if(this.list[i].hide){
						continue;
					}
					for(var j in this.list[i].point){
					   j = typeof j == 'number' ? j : parseInt(j)
						var last = j == this.list[i].point.length-1
						if(!last){
							this.draw(this.list[i].point[j],this.list[i].point[j+1],last)
						}					   
					}
			   }
			}).exec()
		},
		changeWidth(type) {
			var width = typeof this.width == 'number' ? this.width : parseInt(this.width)
			this.width = type == 'reduce' && this.width != 1 ? width-1 : 
							 type == 'add' ? width+1 : this.width
		},
		checkStep(item,type) {
			if(type == 'only'){
				for(var i in this.list){
					this.list[i].hide = !item.only
					this.list[i].only = false
				}
				item.hide = false
				item.only = !item.only
			}
			item.hide = type == 'hide' ? ! item.hide :item.hide
			var num = 0
			for(var i in this.list){
				if(!this.list[i].hide){
					num ++
				}
			}
			if(num > 1){
				for(var i in this.list){
					this.list[i].only = false
				}
			}
			this.clear()
		},
		getDelete(index) {
			uni.showModal({
				title: '提示',
				content: '是否删除',
				success:(res) => {
					if(res.confirm){
						this.list.splice(index,1)
						this.clear()
					}
				}
			})
		},
		showAll() {
			for(var i in this.list){
				this.list[i].hide = false
				this.list[i].only = false
			}
			this.clear()
		},
		toCanvas() {
			uni.canvasToTempFilePath({
				canvasId: 'myCanvas',
				success:(res) => {
					this.img = res.tempFilePath
					var id = uni.getStorageSync('canvasId') ? uni.getStorageSync('canvasId') : 1
					var date = new Date()
					date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()					
					var obj = {
						img: res.tempFilePath,
						list: this.list,
						date,
						id
					}
					if(this.id){
						for(var i in this.albumsList){
							if(this.albumsList[i].id == this.id){
								this.albumsList[i] = obj
							}
						}
					}else{
						this.albumsList.splice(0,0,obj)
					}				
					uni.setStorageSync('albumsList',JSON.stringify(this.albumsList))
					this.$utils.toast(this.id ? '保存成功' : '生成成功，已保存到相册')
					this.list = []
					this.clear(true)
					id ++
					uni.setStorageSync('canvasId',id)
				}
			})
		},
		cancel() {
			this.custom = false
		},
		addColor() {
			this.colorList.push(this.newColor)
			this.custom = false
		},
	},
	onLoad(e) {
		console.log(e)
		this.list = e.item ? JSON.parse(e.item).list : [],
		this.id = e.id || ''
		if(uni.getStorageSync('albumsList')){
			this.albumsList = JSON.parse(uni.getStorageSync('albumsList'))
		}
	},
	onReady() {
		this.ctx = uni.createCanvasContext('myCanvas')
		// setTimeout(() => {
		// 	wx.createSelectorQuery().select('.canvas').boundingClientRect((res) => {
		// 		console.log(res,'res')
		// 		this.ctx.fillStyle = "#007AFF";
		// 		this.ctx.fillRect(0,0,res.width*2,res.height*2)
		// 		this.ctx.draw()
		// 	}).exec()
		// },100)
		if(this.list){
			this.clear()
		}
	}
}
</script>

<style lang="less" scoped>
.container{
	width: 690rpx;
	height: 400rpx;
	margin: 30rpx auto;
}
.albums{
	width: 100%;
	font-size: 28rpx;
	color: red;
	text-align: right;
	margin-bottom: 20rpx;
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
.custom{
	width: 630rpx;
	padding: 30rpx 0rpx;
	background: #FFFFFF;
	border-radius: 8rpx;
	position: fixed;
	top: 30%;
	left: 60rpx;
	text-align: center;
	font-size: 32rpx;
	&-input{
		width: 80%;
		padding: 10rpx;
		border: 2rpx solid #EEEEEE;
		margin: 30rpx auto 0rpx;
		border-radius: 8rpx;
	}
}
.custombut{
	display: flex;
	justify-content: center;
	margin-top: 30upx;
	&-text{
		width: 200rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 26rpx;
		color: #999999;
		background: #FFFFFF;
		border: 2rpx solid #EEEEEE;
		margin: 0rpx;
	}
	&-text:nth-last-child(1){
		background: #6CD921;
		color: #FFFFFF;
		margin-left: 50rpx;
	}
}
.step{
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 30upx;
	color: #333333;
	margin-top: 20rpx;
	&-but{
		display: flex;
		justify-content: space-between;
		width: 360rpx;
		&-text:nth-last-child(1){
			color: red;
		}
	}
}
.history{
	margin-top: 30rpx;
}
</style>
