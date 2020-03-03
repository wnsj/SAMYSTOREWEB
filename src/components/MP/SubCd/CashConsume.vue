<!-- add and modify consume -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h2 id="myModalLabel" class="modal-title">课程消费</h2>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">姓名</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.memName">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">手机号</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.phone">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">定金余额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.phone">
						</div>
					</div>
					
					<div class="col-md-12 form-group clearfix text-left">
						<h4 id="myModalLabel" class="modal-title">课程：</h4>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询师</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<emp ref="counselorEmp" @employeeChange="counselorEmpChange"></emp>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">课程</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<project ref="project" @projectChange="projectChange"></project>
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
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.discount" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">折前总额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.receivable" disabled="disabled">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">折后总额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.realCross" disabled="disabled">
						</div>
					</div>
					
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">维护人</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<emp ref="emp" @employeeChange="empChange"></emp>
						</div>
					</div>
			</div>
			<div class="tab-pane fade in active martop" id="basic" v-show="isShow==true">
					<div class="col-md-12 form-group clearfix text-left">
						<h4 id="myModalLabel" class="modal-title">合计：</h4>
					</div>
					<div class="col-md-6 clearfix">
						<div class="col-md-3">
							<input type="checkbox" class="form-control" v-model="isSelect">
						</div>
						<label for="cyname" class="col-md-9 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">使用定金</label><span
						 class="sign-left">:</span>
						 <div class="col-md-7" >
						 	<input type="text" class="form-control" :disabled="isSelect" v-model="consume.realCross">
						 </div>
					</div>
					
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">实交总额</label><span
						 class="sign-left">:</span>
						<div class="col-md-7">
							<input type="text" class="form-control" v-model="consume.realCross">
						</div>
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
			};
		},
		methods: {
			// Initialization consume’s content
			initData(param) {
				this.member={
					memNum: '',//会员号
					memName: '',//会员名
					phone: '',//手机
					balance:'',
					counselorEmpId:'',
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
					empId: '',//咨询师助理id
					state: '',/**状态 * 0：充值 * 1：完结 * 2：退费 */
					storeId: this.storeId(),//店铺
					visitType: '',/** 0：初访 1：在访 */
					isfirst: '',/** 0:非初办 1:是 */
					operatorId:this.accountId(),//操作人
					firstCharge: '',/** 1:实体卡首充（不计算提成） 0:计算 */
					consumCount: '0',//消费次数
					piId:'',
					
				}
				this.consumeReceivable='0.0'
				this.$refs.counselorEmp.setPosName("咨询师")
				this.$refs.counselorEmp.setEmp("")
				this.$refs.emp.setPosName("咨询顾问")
				this.$refs.project.setEmpId("0")
				
			},
			//咨询师
			counselorEmpChange: function(param) {
				if (this.isBlank(param)) {
					this.consume.counselor = ""
				} else {
					this.consume.counselor = param.empId
					this.$refs.project.setEmpId(this.consume.counselor)
					this.$refs.project.setProject("")
					this.consume.price = '0'
					this.consume.actualCount = '0'
					this.consume.discount= '0'
					this.consume.receivable='0'
					this.consume.realCross='0'
					this.consumeReceivable=''
				}
			},
			//课程
			projectChange: function(param) {
				if (this.isBlank(param)) {
					this.consume.proId = ""
				} else {
					this.consume.proId = param.proId
					this.consume.price = param.price
					this.consume.actualCount = param.frequency
					this.consume.discount= param.discount
					this.consume.receivable=param.price*param.frequency
					this.consume.realCross=param.price*param.frequency*param.discount/100
					if(this.counselorList != null && this.counselorList.length > 0){
						var isSame=0
						console.log("counselorList:"+JSON.stringify(this.counselorList))
						for(var i=0;i < this.counselorList[0].proList.length;i++ ){
							var project = this.counselorList[0].proList[i]
							if(this.consume.proId==project.proId){
								this.isShow=false
								this.consume.piId=project.piId
								this.consume.consumCount=project.consumCount+1
								this.$refs.emp.setEmp(project.empId)
								isSame=1
								break;
							}
							
						}
						if(isSame==0){
							this.isShow=true
							this.consume.consumCount=this.consume.consumCount+1
							this.consume.piId=''
						}
					}
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
			
			//the event of addtional button
			addFee() {
				console.log('the event of addtional button')
				
				this.consume.memName=this.member.memName
				this.consume.phone=this.member.phone
				
				if (this.isBlank(this.consume.memName)) {
					alert("姓名不能为空")
					return
				}
				if (this.isBlank(this.consume.phone)) {
					alert("手机号不能为空")
					return
				}
				
				if (this.isBlank(this.consume.counselor)) {
					alert("咨询师不能为空")
					return
				}
				if (this.isBlank(this.consume.proId)) {
					alert("购买课程不能为空")
					return
				}
				if (this.isBlank(this.consume.empId)) {
					alert("维护人不能为空")
					return
				}
				var url = this.url + '/purchasedItemsAction/consum'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: this.consume,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						this.$router.push({
							name: 'SettleSummary',
						});	
						$("#addCustom").modal("hide")
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			closeCurrentPage() {
				$("#ccContent").modal("hide")
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
							this.consume.memNum=this.member.memNum
							this.consume.memName=this.member.memName
							this.consume.phone=this.member.phone
						}
						if(this.counselorList.length>0){
							console.log("有未完成的项目")
							var counselorEmpId = this.counselorList[0].counselor
							this.$refs.counselorEmp.setEmp(counselorEmpId)
							
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
