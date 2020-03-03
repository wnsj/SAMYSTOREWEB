<!-- add and modify patient -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h3 id="myModalLabel">提成列表</h3>
		</div>
		<div class="tableContent">
			<nobr class="widthmax">
				<div class="table-responsive pre-scrollable mb20" style=" max-height:464px;" 
				v-show="posType=='店长' || posType=='店长助理' || posType=='咨询师' || posType=='咨询顾问'">
					<div class="modal-header pd0">
						<h4 class="pull-left mt0">会员消费提成</h4>
					</div>
					<table class="table table-bordered table-hover user-table mb0">
						<thead>
							<tr>
								<th class="text-center">会员卡号</th>
								<th class="text-center">姓名</th>
								<th class="text-center">提成金额</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in memRoy" :key="index">
								<td>{{item.empId}}</td>
								<td>{{item.empName}}</td>
								<td>{{item.royalty}}</td>
							</tr>
						</tbody>
					</table>
				</div>
				
				<div class="table-responsive pre-scrollable mb20" style=" max-height:464px;" 
				v-show="(posType=='店长' || posType=='店长助理' || posType=='咨询师' || posType=='咨询顾问') && summaryRoy.royalty > 0">
					<div class="modal-header pd0">
						<h4 class="pull-left mt0">流水提成</h4>
					</div>
					<table class="table table-bordered table-hover user-table mb0">
						
						<thead>
							<tr>
								<th class="text-center">流水金额</th>
								<th class="text-center">提成金额</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{{summaryRoy.balance}}</td>
								<td>{{summaryRoy.royalty}}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="table-responsive pre-scrollable mb20" style=" max-height:464px" 
				v-show="(posType=='店长' || posType=='店长助理'||posType=='咨询师' || posType=='咨询顾问') && refund.royalty > 0">
					<div class="modal-header pd0">
						<h4 class="pull-left">退费扣提成</h4>
					</div>
					<table class="table table-bordered table-hover user-table mb0">
						<thead>
							<tr>
								<!-- <th class="text-center">退费金额</th> -->
								<th class="text-center">扣提成金额</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<!-- <td>{{refund.balance}}</td> -->
								<td>{{refund.royalty}}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="table-responsive pre-scrollable mb20" style=" max-height:464px" 
				v-show="(posType=='咨询师' || posType=='咨询顾问') && counlorRefund.balance > 0">
					<div class="modal-header pd0">
						<h4 class="pull-left">退号扣款</h4>
					</div>
					<table class="table table-bordered table-hover user-table mb0">
						<thead>
							<tr>
								<th class="text-center">初访人数</th>
								<th class="text-center">退号人数</th>
								<th class="text-center">扣费金额</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{{counlorRefund.royalty}}</td>
								<td>{{counlorRefund.balance}}</td>
								<td>{{counlorRefund.refund}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</nobr>
		</div>

	</div>
</template>

<script>
	export default {

		data() {
			return {
				memRoy: [],

				// 员工流水提成 
				summaryRoy: {
					"royalty": '', //提成总额
					"balance": '', //总流水
				},

				// 退费扣款 
				refund: {
					"refund": '', //扣款总额
					"balance": '', //退费总额
				},

				// 文员初访提成 
				clerkFirstRoy: {
					royalty: '', //提成
					balance: '', //总人数
				},

				// 文员再访提成 
				clerkTwoRoy: {
					"royalty": '', //提成
					"balance": '', //总人数
				},

				// 文员退号扣款 
				clerkRefund: {
					"refund": '', //扣费总额
					"balance": '', //总人数
				},

				// 咨询师助理退号扣款 
				counlorRefund: {
					"refund": '', //扣费总额
					"balance": '', //总人数
				},
				posType: '',
				clerkContent:'',
			}
		},
		methods: {
			// Initialization patient’s content
			initData(param) {
				this.memRoy= []
				
				// 员工流水提成 
				this.summaryRoy= {
					"royalty": '', //提成总额
					"balance": '', //总流水
				}
				
				// 退费扣款 
				this.refund= {
					"refund": '', //扣款总额
					"balance": '', //退费总额
				}
				
				// 文员初访提成 
				this.clerkFirstRoy= {
					royalty: '', //提成
					balance: '', //总人数
				}
				
				// 文员再访提成 
				this.clerkTwoRoy= {
					"royalty": '', //提成
					"balance": '', //总人数
				}
				
				// 文员退号扣款 
				this.clerkRefund= {
					"refund": '', //扣费总额
					"balance": '', //总人数
				}
				
				// 咨询师助理退号扣款 
				this.counlorRefund= {
					"refund": '', //扣费总额
					"balance": '', //总人数
				}
				this.posType = param.posName
				console.log(JSON.stringify(param))
				this.clerkContent = param
				this.checkDetail(param)
			},
			checkDetail(param) {
				console.log('the event of addtional button')

				var url = this.url + '/employeeAction/queryEmpRoyaltyInfo'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						empId: param.empId,
					},
					dataType: 'json',
				}).then((response) => {
					var retData = response.data.retData
					if(retData.memRoy.length > 0){
						this.memRoy=retData.memRoy
					}
					if(!this.isBlank(retData.summaryRoy)){
						this.summaryRoy=retData.summaryRoy
					}
					if(!this.isBlank(retData.refund)){
						this.refund=retData.refund
					}
					if(!this.isBlank(retData.clerkFirstRoy)){
						this.clerkFirstRoy=retData.clerkFirstRoy
					}
					if(!this.isBlank(retData.clerkTwoRoy)){
						this.clerkTwoRoy=retData.clerkTwoRoy
					}
					if(!this.isBlank(retData.clerkRefund)){
						this.clerkRefund=retData.clerkRefund
					}
					if(!this.isBlank(retData.counlorRefund)){
						this.counlorRefund=retData.counlorRefund
					}

				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			closeCurrentPage() {
				$("#subRoy").modal("hide")
				console.log('关闭添加患者界面')
			},
		}

	}
</script>

<style>
	h3{font-weight: 800 !important; font-size: 30px;}
	.pd0{ padding:0;}
	.mb0{ margin-bottom:0;}
	.mt0{ margin-top:0;}
	.mb20{ margin-bottom:20px;}
</style>
