<template>
	<select class="form-control" v-model="chaId" v-on:change="channelChange()">
		<option value="0">--未选择--</option>
		<option v-for="(item,index) in channelList" :key="index" v-bind:value="item.chaId">
			{{item.channelName}}
		</option>
	</select>
</template>

<script>
	export default {
		name: 'department',
		data() {
			return {
				channelName: '',
				chaId: '0',
				channelList: [],
				channelObj: {
					chaId: '',
					channelName: '',
				},
			};
		},
		methods: {
			//提交岗位名称和ID
			channelChange: function() {
				this.channelObj = this.exchangeChannelName(this.chaId)
				// console.log('岗位2：'+this.storeObj.storeId)
				this.$emit('channelChange', this.channelObj)
			},
			setChaId: function(chaId) {
				this.chaId = chaId
				// console.log('设置岗位'+this.chaId)
			},
			//添加前缀的部门名字兑换原来的名字
			exchangeChannelName: function(param) {
				var channel = {}
				for (var i = 0; i < this.channelList.length; i++) {
					channel = this.channelList[i];
					if (channel.chaId == param) {
						return channel
					}
				}
			},

			async getChannel() {
				var url = this.url + '/channelAction/queryChannel'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						isUse: '1'
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if (res.retData.length > 0) {
							this.channelList = res.retData
						}
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('渠道数据请求失败处理')
				});
			},

		},
		created() {
			// this.getChannel()
		},
	}
</script>

<style>

</style>
