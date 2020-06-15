<template>
	<select class="form-control" v-model="ccId" v-on:change="counselorChange()">
		<option value="0">--未选择--</option>
		<option v-for="(item,index) in ccList" :key="index" v-bind:value="item.ccId">
			{{item.ccName}}
		</option>
	</select>
</template>

<script>
	export default {
		name: 'department',
		data() {
			return {
				ccName: '',
				ccId:'0',
				ccList: [],
				ccObj: {
					ccId: '',
					ccName: '',
				},
			};
		},
		methods: {
			//提交岗位名称和ID
			counselorChange: function() {
				this.ccObj = this.exchangeCounselorName(this.ccId)
				// console.log('岗位2：'+this.counselorObj.counselorId)
				this.$emit('counselorChange', this.ccObj)
			},
			setCounselor: function(counselorId) {
				this.ccId = counselorId
				// console.log('设置岗位'+this.counselorId)
			},
			//添加前缀的部门名字兑换原来的名字
			exchangeCounselorName: function(param) {
				var counselor = {}
				for (var i = 0; i < this.ccList.length; i++) {
					counselor = this.ccList[i];
					if (counselor.ccId == param) {
						return counselor
					}
				}
			},

			async getCounselor() {
				var url = this.url + '/colClassify/queryColClassifyList'
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
							this.ccList = res.retData
						}
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('岗位数据请求失败处理')
				});
			},

		},
		created() {
			this.getCounselor()
		},
	}
</script>

<style>

</style>
