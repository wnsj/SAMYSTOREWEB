<!-- add and modify consume -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h2 id="myModalLabel" class="modal-title">课程退费</h2>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">会员卡号</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="refund.memNum" v-on:change="checkMemNum(refund.memNum)"
							 placeholder="卡号/手机号后4位">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">姓名</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="refund.memName" :disabled="isShow">
						</div>
					</div>
					
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">手机号</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="refund.phone" :disabled="isShow">
						</div>
					</div>
					
					<div class="col-md-12 form-group clearfix text-left">
						<h4 id="myModalLabel" class="modal-title">课程：</h4>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询师</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.counselorName" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">课程</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<select class="form-control" v-model="proId"  v-on:click="projectChange(proId)">
								<option value="">--未选择--</option>
								<option v-for="(item,index) in proList" :key="index" v-bind:value="item.proId">
									{{item.proName}}
								</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">单价</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.price" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">课时(次)</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.actualCount" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">折扣比例</label><span
						 class="sign-left">:</span>
						<div class="col-md-7 pos-re">
							<input type="text" class="form-control" v-model="consume.discount" disabled="disabled">
							<span class="pos-ab pos-tr">%</span>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">已用课时</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.consumCount" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">实交金额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.realCross" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">退费课时</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="refund.consumCount" v-on:change="receivableAction(refund.consumCount)">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">退费金额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="refund.receivable" disabled="disabled">
						</div>
					</div>
					<div class="col-md-12 col-lg-12">
						<p class="tips">* 退费将按照原价收取课时费用，并收取违约金</p>
						<p class="tips">* 退费总额 = 退费金额 - 违约金</p>
					</div>
					<div class="col-md-12 form-group clearfix text-left">
						<h4 id="myModalLabel" class="modal-title">退费合计：</h4>
					</div>
					
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">实退总额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="refund.realCross">
						</div>
					</div>
					
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">违约总额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="refund.balance">
						</div>
					</div>
					
					<div class="form-group clearfix">
						<div class="col-md-12">
							<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
							 v-on:click="closeCurrentPage()">返回</button>
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
							 v-on:click="addFee()">确认</button>
						</div>
					</div>

				</form>
			</div>

		</div>

	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	import emp from '../../common/Employee.vue'
	import project from '../../common/Project.vue'
	export default {
		components: {
			dPicker,
			emp,
			project,
		},
		data() {
			return {
				member:{
					memNum: '',//会员号
					memName: '',//会员名
					phone: '',//手机
					balance:'',
					counselorEmpId:'',
				},
				refund:{
					consumCount:'',//退课时
					receivable:'',//应退金额
					memNum: '',//会员号
					memName: '',//会员名
					phone: '',//手机
					piId:'',//课程Id
					realCross:'',//应退金额
					balance:'',//违约金
				},
				proList:[],
				counselorList:[],
				consume: {
					memNum: '',//会员名
					memName: '',//手机
					phone: '',//预约号
					appNum: '',
					receivable: '',//应交(折前)
					realCross: '',//实缴（折后）
					proId: '',//项目id
					discount: '',//折扣
					price: '',//折前单价
					disPrice: '',//折后单价
					totalCount: '',//总次数
					actualCount: '',//实际次数
					giveCount: '',//赠送次数
					giveProId: '',//赠送项目
					giveMoney: '',//赠送金额
					counselor: '',//咨询师id
					empId: '',//咨询师助理id
					state: '',/**状态 * 0：充值 * 1：完结 * 2：退费 */
					storeId: '',//店铺
					operatorId: '', //操作人
					consumCount: '0',//消费次数
					balance:'0',
					piId:'',
				},
				title: '',
				isShow:true,
				consumeReceivable:'',
				isSelect:true,
				proId:'',
				
			};
		},
		methods: {
			// Initialization consume’s content
			initData() {
				this.member={
					memNum: '',//会员号
					memName: '',//会员名
					phone: '',//手机
					balance:'',
					counselorEmpId:'',
					counselorName:'',
				},
				this.refund={
					consumCount:'',//退课时
					receivable:'',//应退金额
					memNum: '',//会员号
					memName: '',//会员名
					phone: '',//手机
					piId:'',//课程Id
					realCross:'',//应退金额
					balance:'',//违约金
					operatorId:this.accountId(),//操作人
				},
				this.consume = {
					memNum: '',//会员名
					memName: '',//手机
					phone: '',//预约号
					appNum: '',
					receivable: '0.0',//应交
					realCross: '0.0',//实缴
					proId: '',//项目id
					discount: '0',//折扣
					price: '0.0',//折前单价
					disPrice: '',//折后单价
					totalCount: '0',//总次数
					actualCount: '0',//实际次数
					giveCount: '0',//赠送次数
					giveProId: '',//赠送项目
					giveMoney: '0.0',//赠送金额
					counselor: '',//咨询师id
					operatorId:this.accountId(),//操作人
					consumCount: '0',//消费次数
					piId:'',
					
				}
				this.proList=[]
			},
			
			exchangeProjectId: function(param) {
				var project = {}
				for (var i = 0; i < this.proList.length; i++) {
					project = this.proList[i];
					if (project.proId == param) {
						return project
					}
				}
				return null
			},
			//课程
			projectChange: function(param) {
				
				if (this.isBlank(param)) {
					this.consume.proId = ""
				} else {
					this.consume = this.exchangeProjectId(param)
					console.log(JSON.stringify(this.consume))
				}
			},
			//feedback employee information
			empChange: function(param) {
				if (this.isBlank(param)) {
					this.consume.empId = ""
				} else {
					this.consume.empId = param.empId
				}
			},
			//feedback employee information
			clerkEmpChange: function(param) {
				if (this.isBlank(param)) {
					this.consume.clerkId = ""
				} else {
					this.consume.clerkId = param.empId
				}
			},

			receivableAction(param){
				if(param>=0){
					this.refund.receivable=param*this.consume.price*this.consume.discount/100
				}
			},

			//the event of addtional button
			addFee() {
				console.log('the event of addtional button')

				
					
				if (this.isBlank(this.refund.memNum)) {
					alert("会员号不能为空")
					return
				}
				if (this.isBlank(this.consume.piId)) {
					alert("课程不能为空")
					return
				}else{
					this.refund.piId = this.consume.piId
				}
				
				if (!this.isBlank(this.refund.consumCount) && this.refund.consumCount>=0 
					&& this.refund.consumCount <= (this.consume.actualCount-this.consume.consumCount)) {
					
				}else{
					alert("退费课时填写不正确")
					return
				}
				if (this.refund.realCross<=0 && this.refund.balance <= 0) {
					alert("实退金额和违约金至少一个大于0")
					return
				}
				
				
				var url = this.url + '/purchasedItemsAction/refund'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: this.refund,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						$("#addRefund").modal("hide")
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			closeCurrentPage() {
				$("#addRefund").modal("hide")
				console.log('关闭添加患者界面')
			},
			jumpLeft(index){
				$("#aside-menu li").removeClass("li-active");
				$("#aside-menu li").find("i.fa-table").removeClass("fa-circle");
				$("#aside-menu li").eq(index).addClass("li-active");
				$("#aside-menu li").eq(index).find("i.fa-table").addClass("fa-circle")
			},
			//Query member's information based on the memNum
			checkMemNum(param) {
				console.log('checkMemNum')
				if (this.isBlank(param)) {
					return
				}
				console.log('费用类型3：' + this.consume.costType)
				var url = this.url + '/purchasedItemsAction/queryMemUnfinished'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						memNum: param,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.member = res.retData.mem
						this.counselorList = res.retData.counselorList
						if(this.member != null){
							this.refund.memNum=this.member.memNum
							this.refund.memName=this.member.memName
							this.refund.phone=this.member.phone
						}
						if(this.counselorList.length>0){
							this.proList=this.counselorList[0].proList
							this.consume.counselorName = this.counselorList[0].counselorName
							this.refund.counselor = this.counselorList[0].counselor
						}else{
							alert("无可退费课程")
						}
					}
			
				}).catch((error) => {
					console.log('会员查询请求失败')
				});
			},

		}

	}
</script>

<style>

</style>
