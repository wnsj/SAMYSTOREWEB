<template>
	<select class="form-control" v-model="ttId" v-on:change="etChange()">
		<option value="0">--未选择--</option>
		<option v-for="(item,index) in etList" :key="index" v-bind:value="item.ttId">
			{{item.ttName}}
		</option>
	</select>
</template>

<script>
	export default {
		data() {
			return {
				ttName: '',
				ttId: '0',
				etList: [],
				etObj: {
					ttId: '0',
					ttName: '',
				},
			};
		},
		methods: {
			//提交岗位名称和ID
			etChange: function() {
				this.etObj = this.exchangeEtName(this.ttId)
				this.$emit('etChange', this.etObj)
			},
			setEt: function(proId) {
				this.proId = proId
			},
			//添加前缀的部门名字兑换原来的名字
			exchangeEtName: function(param) {
				var et = {}
				for (var i = 0; i < this.etList.length; i++) {
					et = this.etList[i];
					if (et.ttId == param) {
						return et
					}
				}
			},
			async getEt() {
				var url = this.url + '/testType/queryTestProblemTypeList'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						isUse: '1',
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						
						this.etList = res.retData
						
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('课程数据请求失败处理')
				});
			},
		},
		created() {
			this.getEt()
		},
	}
</script>

<style>

</style>
