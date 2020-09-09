<template>
	<view class="content">
		<image class="banner" :src="img" mode="widthFix" @load="imgLoad"></image>
		<canvas canvas-id="myCanvas" id="canvas" :style="'width:'+(this.width/this.num)+'rpx;height:'+(this.height/this.num)+'rpx'"></canvas>
		<view @click="getCut">切割</view>
		<view class="canvas">
			<image :src="href"></image>
		</view>
		<image class="imglist" :src="item" v-for="(item,index) in imgList" :key="index" mode="widthFix"></image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			ctx: null,
			width: '',
			height: '',
			num: 9,
			img: '/static/banner.jpg',
			imgList: [],
			canvas: null,
			href: ''
		}
	},
	methods: {
		imgLoad(e) {
			this.width = e.detail.width
			this.height = e.detail.height
		},
		getCut() {
			for(var i=0; i<this.num; i++){
				for(var j=0; j<this.num; j++){
					console.log(i,j)
					var width = this.width/this.num
					var height = this.height/this.num
					this.ctx.drawImage(this.img,j*width,i*height,width,height,0,0,width,height)
					this.ctx.draw()
					const base64 = this.canvas.toDataURL("image/png")
					// let myCanvas = document.getElementsByTagName('canvas')
					// this.href = myCanvas[0].toDataURL('image/png')
					this.href = base64
					// let img = document.createElement('img')
					// img.src = base64
					// img.style.border = '5px solid red'
					//       img.style.marginBottom = '-5px'
					//       this.canvas.appendChild(img)
					// this.ctx.draw(true, setTimeout(() => {
					//     uni.canvasToTempFilePath({
					//       canvasId: 'myCanvas',
					//       quality: 0,
					//       success:(res) => {
					//        this.imgList.push(res.tempFilePath)
					//       },
					//       fail:(res) => {
					// 			console.log(res,'生成失败')
					//       }
					//    },this)
					// }, 100))
				}
			}
		},
	},
	onReady() {
		this.ctx = uni.createCanvasContext('myCanvas')
		this.canvas = document.createElement('canvas')
		console.log(this.canvas,111)
		this.num = Math.sqrt(this.num)
	}
}
</script>

<style lang="less" scoped>
.banner{
	display: block;
	width: 30%;
	margin: 50rpx auto;
}
.imglist{
	width: 100rpx;
	height: 50rpx;
}
</style>
