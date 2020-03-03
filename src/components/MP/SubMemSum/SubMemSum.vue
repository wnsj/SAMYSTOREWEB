<!-- add and modify patient -->
<template>
	<div class="modal-content" style="width:720px">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel">会员列表</h4>
		</div>
		<div class="tableContent">
			<nobr class="widthmax">
				<div class="table-responsive pre-scrollable" style=" max-height:464px;">
					<table class="table table-bordered table-hover user-table" id="datatable">
						<thead>
							<tr>
								<th class="text-center">会员卡号</th>
								<th class="text-center">会员姓名</th>
								<th class="text-center">咨询师姓名</th>
								<th class="text-center">项目名</th>
								<th class="text-center">课时(小时)</th>
								<th class="text-center">时间</th>
								<th class="text-center">操作类型</th>
							</tr>
						</thead> 
						<tbody>
							<tr v-for="(item,index) in memberList" :key="index">
								<td>{{item.memNum}}</td>
								<td>{{item.memName}}</td>
								<td>{{item.empName}}</td>
								<td>{{item.proName}}</td>
								<td>共{{item.numberOfContracts}}课时</td>
								<td>{{item.createDate | dateFormatFilter('YYYY-MM-DD')}}</td>
								<td>{{item.type}}</td>
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
		components:{
			dPicker,
		},
		data() {
			return {
				memberList:["",],
			};
		},
		methods:{
			closeCurrentPage(){
				$("#detailMember").modal("hide")
				console.log('关闭添加患者界面')
			},
			//Query patient's information based on the hosNum
			conditionCheck(param){
				if(this.isBlank(param)){
					return
				}
				var url = this.url + '/accountRecordAction/queryMemberDetails'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						memNum:param.MEM_NUM,
                        piId:param.PI_ID
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						if (res.retData != null) {
							this.memberList = res.retData
						}
					}else{
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('会员消费详细信息请求失败')
				});
			},
			
		}
		
	}
</script>

<style>

</style>
