<template>
	<view class="container">
		<view class="list" v-for="(item,index) in list" :key="index">
			<view class="list-text" v-for="(items,index1) in item.list" :key="index1" @click="check(items,index,index1)">
				<view class="piece" :style="'background:'+items.color" v-if="items.color"></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data () {
		return {
			list: [],
			type: true
		}
	},
	methods: {
		check(items,index,index1){
			if(items.color){
				return this.$utils.toast('此处已有棋子')
			}
			items.color = this.type ? '#000' : '#fff'
			this.type = !this.type
			this.judge(items,index,index1)
		},
		//横向判断
		line(items,index,index1) {
			var samenum = 1
			for(var i=index1-1; i>0; i--){
				if(items.color == this.list[index].list[i].color){
					samenum ++
				}else{
					break;
				}
			}
			var num = 5-samenum
			for(var i=1; i<=num; i++){
				if(items.color == this.list[index].list[i+index1].color){
					samenum ++
				}else{
					break;
				}
			}
			if(samenum >= 5){
				return true
			}
		},
		//纵向判断
		row(items,index,index1) {
			var samenum = 1
			for(var i=index-1; i>0; i--){
				if(items.color == this.list[i].list[index1].color){
					samenum ++
				}else{
					break;
				}
			}
			var num = 5-samenum
			for(var i=1; i<=num; i++){
				if(items.color == this.list[i+index].list[index1].color){
					samenum ++
				}else{
					break;
				}
			}
			if(samenum >= 5){
				return true
			}
		},
		//斜率1判断
		slantTop(items,index,index1) {
			var samenum = 1
			for(var i=index1-1; i>=0; i--){
				if(items.color == this.list[index1-i+index].list[i].color){
					samenum ++
				}else{
					break;
				}
			}
			for(var i=index-1; i>=0; i--){
				if(items.color == this.list[i].list[index-i+index1].color){
					samenum ++
				}else{
					break;
				}
			}
			if(samenum >= 5){
				return true
			}
		},
		//斜率-1判断
		slantBottom(items,index,index1) {
			var samenum = 1
			var minIndex = Math.min(index,index1)
			for(var i=0; i<minIndex; i++){
				if(items.color == this.list[index-i-1].list[index1-i-1].color){
					samenum ++
				}else{
					break;
				}
			}
			var maxIndex = Math.max(index,index1)
			for(var i=1; i<=10-maxIndex; i++){
				if(items.color == this.list[index+i].list[index1+i].color){
					samenum ++
				}else{
					break;
				}
			}
			if(samenum >= 5){
				return true
			}
		},
		//任意一个方向连成五颗均获胜
		judge(items,index,index1){
			if(this.line(items,index,index1) || this.row(items,index,index1) ||
				this.slantTop(items,index,index1) || this.slantBottom(items,index,index1)){
				var winner = items.color == '#000' ? '黑旗获胜' : '白棋获胜'
				this.$utils.modal(winner)	
			}
		}
	},
	onLoad() {
		//生成10*10棋盘
		for(var i=0; i<=10; i++){
			var obj = {
				list: []
			}
			for(var j=0; j<=10; j++){
				var obj1 = {
					color: ''
				}
				obj.list.push(obj1)
			}
			this.list.push(obj)
		}
	}
}
</script>

<style lang="less" scoped>
.container{
	padding: 30rpx 0rpx;
}
.list{
	display: flex;
	justify-content: center;
	&-text{
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		position: relative;
	}
	&-text::before{
		content: '';
		display: block;
		width: 100%;
		height: 2rpx;
		background: #000000;
		position: absolute;
		top: 50%;
		left: 0rpx;
	}
	&-text::after{
		content: '';
		display: block;
		width: 2rpx;
		height: 100%;
		background: #000000;
		position: absolute;
		top: 0rpx;
		left: 48%;
	}
}
.list .list-text:nth-child(1)::before{
	width: 50%;
	left: 50%;
}
.list:nth-child(1) .list-text::after{
	height: 50%;
	top: 50%;
}
.list .list-text:nth-last-child(1)::before{
	width: 50%;
}
.list:nth-last-child(1) .list-text::after{
	height: 50%;
}
.piece{
	width: 20rpx;
	height: 20rpx;
	background: #FFFFFF;
	border-radius: 100%;
	position: relative;
	z-index: 999;
	box-shadow: 2rpx 2rpx 10rpx #999999;
}
</style>
