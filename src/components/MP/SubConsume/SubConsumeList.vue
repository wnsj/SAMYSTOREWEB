<!-- add and modify patient -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel">消费列表</h4>
		</div>
		<div class="tableContent">
			<nobr class="widthmax">
				<div class="table-responsive pre-scrollable" style=" max-height:464px">
					<table class="table table-bordered table-hover user-table" id="datatable">
						<thead>
							<tr>
								<th class="text-center">会员卡号</th>
								<th class="text-center">消费门店</th>
								<th class="text-center">姓名</th>
								<th class="text-center">时间</th>
								<th class="text-center">维护人</th>
								<th class="text-center">消费金额</th>

							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in consumeList" :key="index">
								<td>{{item.memNum}}</td>
								<td>{{item.storeName}}</td>
								<td>{{item.memName}}</td>
								<td>{{item.createDate | dateFormatFilter('YYYY-MM-DD')}}</td>
								<td>{{item.empName}}</td>
								<td>{{item.momey}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</nobr>
		</div>

	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	export default {
		components: {
			dPicker,
		},
		data() {
			return {
				consumeList: [],
			};
		},
		methods: {
			// Initialization patient’s content

			closeCurrentPage() {
				$("#addConsume").modal("hide")
				console.log('关闭添加患者界面')
			},
			//Query patient's information based on the hosNum
			conditionCheck(param) {
				if (this.isBlank(param)) {
					return
				}
				console.log('查询消费详情' + param.MEM_NUM)
				var url = this.url + '/accountRecordAction/queryAccountRecord'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						memNum: param.MEM_NUM,
						costType: '2',
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						if (res.retData != null) {
							this.consumeList = res.retData
						}
					}else{
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('消费详情插叙失败')
				});
			},

		}

	}
</script>

<style>

</style>
