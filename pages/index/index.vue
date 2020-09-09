<template>
	<view class="content">
		<navigator class="list" v-for="(item,index) in list" :key="index" :url="item.url">
			{{item.title}}
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{title: '涂鸦',url: '/pages/writing/writing'},
						{title: '五子棋',url: '/pages/gomoku/gomoku'},
						{title: '拼图',url: '/pages/puzzle/puzzle'}]
			}
		},
		methods: {

		},
		onLoad() {
		
		},
	}
</script>

<style>
.content {
	padding-top: 150rpx;
}
.list{
	width: 500rpx;
	height: 80rpx;
	line-height: 80rpx;
	border: 2rpx solid #DDDDDD;
	border-radius: 8rpx;
	font-size: 28rpx;
	color: #666666;
	text-align: center;
	margin: 0rpx auto 50rpx;
}
</style>
