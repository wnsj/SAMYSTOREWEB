<!-- add and modify order -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}预约</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">会员号</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="orderClick.memNum" v-on:change="checkMemNum(orderClick.memNum)">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">姓名</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="orderClick.appName" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">手机号</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="orderClick.phone" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">预约时间</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<dPicker v-model="orderClick.appDate" format="YYYY-MM-DD" style="width:100%;" v-on:change="checkEmpSchedule()"></dPicker>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询师</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<emp ref="counlorEmp" @employeeChange="counlorEmpChange"></emp>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">课程</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<project ref="project" @projectChange="projectChange"></project>
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<h4 id="myModalLabel" class="modal-title pull-left">预约时间</h4>
					</div>
					<div class="col-md-12 form-group clearfix">
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[0]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time1" class="form-control" :disabled="orderCounselorOld.time1"
								 v-on:click="setOrder(1,order.time1)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[1]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time2" class="form-control" :disabled="orderCounselorOld.time2"
								 v-on:click="setOrder(2,order.time2)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[2]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time3" class="form-control" :disabled="orderCounselorOld.time3"
								 v-on:click="setOrder(3,order.time3)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[3]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time4" class="form-control" :disabled="orderCounselorOld.time4"
								 v-on:click="setOrder(4,order.time4)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[4]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time5" class="form-control" :disabled="orderCounselorOld.time5"
								 v-on:click="setOrder(5,order.time5)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[5]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0; '>
								<input type="checkbox" v-model="order.time6" class="form-control" :disabled="orderCounselorOld.time6"
								 v-on:click="setOrder(6,order.time6)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[6]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time7" class="form-control" :disabled="orderCounselorOld.time7"
								 v-on:click="setOrder(7,order.time7)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[7]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time8" class="form-control" :disabled="orderCounselorOld.time8"
								 v-on:click="setOrder(8,order.time8)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[8]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time9" class="form-control" :disabled="orderCounselorOld.time9"
								 v-on:click="setOrder(9,order.time9)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[9]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time10" class="form-control" :disabled="orderCounselorOld.time10"
								 v-on:click="setOrder(10,order.time10)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[10]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time11" class="form-control" :disabled="orderCounselorOld.time11"
								 v-on:click="setOrder(11,order.time11)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[11]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time12" class="form-control" :disabled="orderCounselorOld.time12"
								 v-on:click="setOrder(12,order.time12)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[12]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time13" class="form-control" :disabled="orderCounselorOld.time13"
								 v-on:click="setOrder(13,order.time13)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[13]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time14" class="form-control" :disabled="orderCounselorOld.time14"
								 v-on:click="setOrder(14,order.time14)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[14]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time15" class="form-control" :disabled="orderCounselorOld.time15"
								 v-on:click="setOrder(15,order.time15)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[15]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time16" class="form-control" :disabled="orderCounselorOld.time16"
								 v-on:click="setOrder(16,order.time16)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[16]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time17" class="form-control" :disabled="orderCounselorOld.time17"
								 v-on:click="setOrder(17,order.time17)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[17]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time18" class="form-control" :disabled="orderCounselorOld.time18"
								 v-on:click="setOrder(18,order.time18)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%; margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[18]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time19" class="form-control" :disabled="orderCounselorOld.time19"
								 v-on:click="setOrder(19,order.time19)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[19]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time20" class="form-control" :disabled="orderCounselorOld.time20"
								 v-on:click="setOrder(20,order.time20)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%;margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[20]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time21" class="form-control" :disabled="orderCounselorOld.time21"
								 v-on:click="setOrder(21,order.time21)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%;margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[21]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time22" class="form-control" :disabled="orderCounselorOld.time22" v-on:click="setOrder(22,order.time22)">
							</div>
						</div>
						<div class="col-md-3 form-group clearfix btnBg" style="padding-left:0;padding-right:0;width:22%;margin-right:4%;">
							<label class="col-md-8 control-label text-right nopad" style="padding:0;line-height:34px;">{{timeArray[22]}}</label>
							<div class="col-md-4" style='line-height:34px;padding-right:0;'>
								<input type="checkbox" v-model="order.time23" class="form-control" :disabled="orderCounselorOld.time23" v-on:click="setOrder(23,order.time23)">
							</div>
						</div>
					</div>
					<div class="form-group clearfix">
						<div class="col-md-12">
							<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
							 v-on:click="closeCurrentPage()">返回</button>
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
							 v-on:click="addOrder(title)">确认</button>
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
				timeArray: [
					'8:30 - 9:00',
					'9:00 - 9:30',
					'9:30 - 10:00',
					'10:00 - 10:30',
					'10:30 - 11:00',
					'11:00 - 11:30',
					'11:30 - 12:00',
					'13:00 - 13:30',
					'13:30 - 14:00',
					'14:00 - 14:30',
					'14:30 - 15:00',
					'15:00 - 15:30',
					'15:30 - 16:00',
					'16:00 - 16:30',
					'16:30 - 17:00',
					'17:00 - 17:30',
					'17:30 - 18:00',
					'18:00 - 18:30',
					'18:30 - 19:00',
					'19:00 - 19:30',
					'19:30 - 20:00',
					'20:00 - 20:30',
					'20:30 - 21:00',
				],
				order: {//预约数据
					afternoon: '',
					createDate: '',
					empId: '',
					morning: '0',
					storeId: this.storeId(),
					operatorId: '',
					schId: '1',
					schedulingDate: this.moment('', 'YYYY-MM-DD 00:00:00.000'),
					time1: false,
					time2: false,
					time3: false,
					time4: false,
					time5: false,
					time6: false,
					time7: false,
					time8: false,
					time9: false,
					time10: false,
					time11: false,
					time12: false,
					time13: false,
					time14: false,
					time15: false,
					time16: false,
					time17: false,
					time18: false,
					time19: false,
					time20: false,
					time21: false,
					time22: false,
					time23: false,
				},
				title: '新增',
				testParam: true,
				orderCounselorOld: {},
				isContinnue: '0',
				orderClick: {//记录预约时间前的数据
					memNum: '',
					appName: '',
					phone: '',
					storeId: this.storeId(),
					appDate: '',
					empId: '',
					proId: '',
				},
				counselorList: [],
				numArr: [], //记录被选中的时间
			};
		},
		methods: {
			// Initialization order’s content
			initData(param, order) {
				this.orderClick = {
					memNum: '',
					appName: '',
					phone: '',
					appDate: '',
					storeId: this.storeId(),
					empId: '',
					proId: '',
					frequency: '',
				}
				this.numArr = []
				this.order = {
					afternoon: '',
					createDate: '',
					empId: '',
					morning: '0',
					operatorId: this.accountId(),
					storeId: this.storeId(),
					schId: '1',
					schedulingDate: this.moment('', 'YYYY-MM-DD 00:00:00.000'),
					time1: false,
					time2: false,
					time3: false,
					time4: false,
					time5: false,
					time6: false,
					time7: false,
					time8: false,
					time9: false,
					time10: false,
					time11: false,
					time12: false,
					time13: false,
					time14: false,
					time15: false,
					time16: false,
					time17: false,
					time18: false,
					time19: false,
					time20: false,
					time21: false,
					time22: false,
					time23: false,
				}
				if (param == 'add') {
					console.log('Initialization order’s content, which adds order')
					this.title = '新增'

					this.counselorList = []
					Object.assign(this.orderClick, this.order)
					this.$refs.counlorEmp.setPosName('咨询师')
					this.$refs.counlorEmp.setEmp("")
					this.$refs.project.setEmpId("0")
					this.$refs.project.setProject("0")
				} else if (param == 'modify') {
					console.log('Initialization order’s content, which modifies order')
					this.title = '修改'
					Object.assign(this.orderClick, order)
					this.checkEmpSchedule()

					this.operatorId = this.accountId()
					this.$refs.counlorEmp.setPosName('咨询师')
					this.$refs.counlorEmp.setEmp(this.orderClick.empId)
				}
			},
			itemAction(item, index) {
				console.log("item:" + JSON.stringify(item) + index)
			},
			modifyOrder() {
				this.numArr=[]
				for (var i = 1; i <= 23; i++) {
					var timeParam = 'time'.concat(i)
					if (this.orderClick[timeParam] == true) {
						this.orderCounselorOld[timeParam] = false
						this.numArr.push(i)
					}
				}
				// console.log('orderCounselorOld:' + JSON.stringify(this.orderCounselorOld))
			},
			setOrder(index, value) {
				console.log("param:" + index + value)
				var timeParam = 'time'.concat(index)
				var isContain = false //是否包含,false:不包含，true：包含，
				var numIndex = 0 //第几个
				if (this.numArr.length > 0) {
					for (var i = 0; i < this.numArr.length; i++) {
						var num = this.numArr[i]
						if (num == index) {
							isContain = true
							numIndex = i
							break
						}
					}

					if (isContain == true) {
						this.numArr.splice(numIndex, 1)
					} else {
						this.numArr.push(index)
					}
					console.log(this.numArr)
				} else {
					this.numArr.push(index)
				}
				this.orderClick[timeParam] = !value
				// console.log('orderClick:'+JSON.stringify(this.orderClick))
			},

			//feedback employee information
			projectChange: function(param) {
				// console.log('科室：'+JSON.stringify(param))
				if (this.isBlank(param)) {
					this.orderClick.proId = ""
				} else {
					this.orderClick.proId = param.proId
					// 					if (this.counselorList != null && this.counselorList.length > 0) {
					// 						for (var i = 0; i < this.counselorList[0].proList.length; i++) {
					// 							var project = this.counselorList[0].proList[i]
					// 							if (this.consume.proId == project.proId) {
					// 								this.orderClick.frequency = project.frequency + 1
					// 								break;
					// 							}
					// 						}
					// 					}
				}
			},
			//feedback employee information
			counlorEmpChange: function(param) {
				// console.log('科室：'+JSON.stringify(param))
				if (this.isBlank(param)) {
					this.orderClick.empId = ""
				} else {
					this.orderClick.empId = param.empId
					this.$refs.project.setEmpId(this.orderClick.empId)
					this.checkEmpSchedule()
				}
			},

			//the event of addtional button
			addOrder(param) {
				var reg =
					/(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}14[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}16[0-9]{9}$)|(^0{0,1}17[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)/;

				// console.log('orderClick:'+JSON.stringify(this.orderClick))
				if (this.isBlank(this.orderClick.appName)) {
					alert("姓名不能为空")
					return
				}
				if (this.isBlank(this.orderClick.phone)) {
					alert("手机号不能为空")
					return
				} else if (reg.test(this.orderClick.phone) == false) {
					alert("不是完整的11位手机号或者正确的座机号！");
					return
				}

				if (this.isBlank(this.orderClick.empId)) {
					alert('咨询师不能为空')
					return
				}
				// 				if(this.isBlank(this.orderClick.proId) || this.orderClick.proId=='0'){
				// 					alert('咨询师课程不能为空')
				// 					return
				// 				}
				if (!this.isBlank(this.orderClick.appDate)) {
					this.orderClick.appDate = this.moment(this.orderClick.appDate, 'YYYY-MM-DD 00:00:00.000')
				} else {
					alert("预约时间不能为空")

					return
				}
				
				
				
				if(this.numArr.length>0){
					var num=null
					var copyNum=null
					this.numArr=this.numArr.sort(function(a,b){
						return a-b;
					})
					console.log(this.numArr)
					if(this.numArr[this.numArr.length-1]-this.numArr[0]!=this.numArr.length-1){
						alert('预约时间之间不能有间隔')
						return
					}
				}else{
					alert('没有预约时间，请选择预约时间')
					return
				}
				
				
				switch (param) {
					case '新增':
						var url = this.url + '/appointmentAction/addAppointment';
						break;
					case '修改':
						var url = this.url + '/appointmentAction/updateAppointment'
						break;
				}
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: this.orderClick,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('addOrder')
						$("#orderContent").modal("hide");
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('预约提交请求失败')
				});
			},
			closeCurrentPage() {
				$("#orderContent").modal("hide")
				console.log('关闭添加患者界面')
			},
			//咨询师排班
			checkEmpSchedule() {
				if (!this.isBlank(this.orderClick.appDate)) {
					this.orderClick.appDate = this.moment(this.orderClick.appDate, 'YYYY-MM-DD 00:00:00.000')
				} else {
					this.order.appDate = ''
				}
				console.log("schedulingDate:" + this.orderClick.appDate)

				var url = this.url + '/schedulingAction/querySchedulingByEmpIdOrTime'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						empId: this.orderClick.empId,
						schedulingDate: this.orderClick.appDate,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if (res.retData.length > 0) {
							this.order = res.retData[0]
							Object.assign(this.orderCounselorOld, this.order)

							this.modifyOrder()
						} else {
							this.orderClick.empId = ''
							this.$refs.counlorEmp.setEmp("")
							alert("没有排班信息，请给咨询师排完班在进行预约")
						}
					} else {
						console.log('没有查到员工排班信息')
					}
				}).catch((error) => {
					console.log('员工排班信息查询失败')
				});
			},
			//Query member's information based on the memNum
			checkMemNum(param) {
				console.log('checkMemNum')
				if (this.isBlank(param)) {
					return
				}
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
						var member = res.retData.mem
						// console.log('member'+JSON.stringify(member))
						var counselorList = res.retData.counselorList
						if (member != null) {
							this.orderClick.memNum = member.memNum
							this.orderClick.appName = member.memName
							this.orderClick.phone = member.phone
						}
						if (counselorList.length > 0) {
							console.log("有未完成的项目")
							this.orderClick.empId = counselorList[0].counselor
							this.$refs.counlorEmp.setEmp(this.orderClick.empId)
						} else {
							alert("没有未完成的项目，可以直接进行预约")
						}
					} else {
						console.log('没有查到会员信息，请添加会员后充值')
						this.consume.appName = ''
						this.consume.phone = ''
					}

				}).catch((error) => {
					console.log('会员查询请求失败')
				});
			},

		}

	}
</script>

<style>
	.btnBg {
		background: #f5f5f5;
	}

	.btnBg label {
		margin-bottom: 0;
	}

	.btnBg input {
		margin-top: 10px;
	}
</style>
