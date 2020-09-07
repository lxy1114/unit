<template>
	<view class="content">
		<view class="edit" @click="edit = !edit">{{edit ? '完成' : '编辑'}}</view>
		<view class="imgbox" v-for="(item,index) in list" :key="index">
			<image class="imgbox-img" :src="item.img" mode="widthFix"></image>
			<view class="imgbox-date">{{item.date}}</view>
			<!-- <image class="delete" src="../../static/delete.png"></image> -->
			<!-- <view class="but" v-if="edit">
				<navigator class="but-text" :url="'./writing?item='+JSON.stringify(item)+'&id='+item.id">修改</navigator>
				<view class="but-text" @click="getDelete(index)">删除</view>
			</view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			edit: false,
			imgList: []
		}
	},
	methods: {
		getDelete(index) {
			uni.showModal({
				title: '提示',
				content: '是否删除',
				success:(res) => {
					if(res.confirm){
						this.list.splice(index,1)
						uni.setStorageSync('albumsList',JSON.stringify(this.list))
					}
				}
			})
		},
		getPevrew(index) {
			uni.previewImage({
				current: index,
				urls: this.imgList
			})
		},
	},
	onLoad() {
		if(uni.getStorageSync('albumsList')){
			this.list = JSON.parse(uni.getStorageSync('albumsList'))
			for(var i in this.list){
				this.imgList.push(this.list[i].img)
			}
		}
		console.log(this.list)
	}
}
</script>

<style lang="scss" scoped>
.edit{
	width: 720rpx;
	font-size: 28rpx;
	color: red;
	text-align: right;
	margin-top: 30rpx;
}
.imgbox{
	display: inline-block;
	width: 29%;
	margin: 20rpx 0rpx 0rpx 25rpx;
	font-size: 24rpx;
	color: #666666;
	&-img{
		width: 100%;
		height: 200rpx;
		border: 2rpx solid #EEEEEE;
		border-radius: 8rpx;
	}
	&-date{
		text-align: right;
	}
}
.but{
	display: flex;
	justify-content: space-between;
	&-text{
		background: #FFFFFF;
		border: 2rpx solid #EEEEEE;
		border-radius: 8rpx;
		padding: 2rpx 25rpx;
		font-size: 24rpx;
		color: #666666;
		margin-top: 20rpx;
	}
}
</style>
