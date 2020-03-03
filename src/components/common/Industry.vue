<template>
	<select class="form-control" v-model="indId" v-on:change="industryChange()">
		<option value="0">--未选择--</option>
		<option v-for="(item,index) in indList" :key="index" v-bind:value="item.indId">
			{{item.indName}}
		</option>
	</select>
</template>

<script>
	export default {
		name: 'department',
		data() {
			return {
				indName: '',
				indId: '0',
				indList: [],
				indObj: {
					indId: '',
					indName: '',
				},
			};
		},
		methods: {
			//提交岗位名称和ID
			industryChange: function() {
				// console.log('岗位1：'+this.storeObj.storeId)
				this.indObj = this.exchangeIndName(this.indId)
				// console.log('岗位2：'+this.storeObj.storeId)
				this.$emit('industryChange', this.indObj)
			},
			setInd: function(indId) {
				this.indId = indId
				// console.log('设置岗位'+this.storeId)
			},
			//添加前缀的部门名字兑换原来的名字
			exchangeIndName: function(param) {
				var industry = {}
				for (var i = 0; i < this.indList.length; i++) {
					industry = this.indList[i];
					if (industry.indId == param) {
						return industry
					}
				}
			},

			async getIndustry() {
				var url = this.url + '/industryAction/queryIndustry'
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
							this.indList = res.retData
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
			// this.getIndustry()
		},
	}
</script>

<style>

</style>
