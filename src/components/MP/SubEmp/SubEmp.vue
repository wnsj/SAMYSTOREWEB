<!-- add and modify employee -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}员工</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">姓名</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="employee.name" placeholder="">
						</div>
					</div>
					<!-- <div class="col-md-6 form-group clearfix" v-show="accountType==true">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">门店</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<store ref="store" @storeChange='storeChange'></store>
						</div>
					</div> -->
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">手机号</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="employee.phone" placeholder="">
						</div>
					</div>
					<!-- <div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">年龄</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="employee.age" placeholder="">
						</div>
					</div> -->
					<!-- <div class="col-md-6 form-group clearfix">
						<label for="sex" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">性别</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="employee.sex">
								<option value="1">男</option>
								<option value="2">女</option>
							</select>
						</div>
					</div> -->
					<!-- <div class="col-md-6 form-group clearfix">
						<label for="gh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">岗位</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<pos ref="pos" @positionChange='positionChange'></pos>
						</div>
					</div> -->
					<!-- <div class="col-md-6 form-group clearfix">
						<label for="sex" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">岗位级别</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="employee.level">
								<option value="1">资深级</option>
								<option value="2">专家级</option>
								<option value="3">高级专家级</option>
							</select>
						</div>
					</div> -->
					<!-- <div class="col-md-6 form-group clearfix">
						<label for="gh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">上级</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<emp ref="emp" @employeeChange="employeeChange"></emp>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="sex" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">是否在用</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="employee.isuse">
								<option value="0">否</option>
								<option value="1">是</option>
							</select>
						</div>
					</div> -->
					<div class="form-group clearfix">
						<div class="col-md-12">
							<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
							 v-on:click="closeCurrentPage()">返回</button>
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
							 v-on:click="addEmp()">确认</button>
						</div>
					</div>
				</form>
			</div>
		</div>

	</div> 
</template>

<script>
	import dPicker from 'vue2-datepicker'
	import pos from '../../common/Position.vue'
	import emp from '../../common/Employee.vue'
	import store from '../../common/Store.vue'
	export default {
		components: {
			dPicker,
			pos,
			emp,
			store,
		},
		data() {
			return {
				employee: {
					saId: '',
					name: '',
					phone: '',
				},
				title: '新增',
			};
		},
		methods: {
			// Initialization employee’s content
			initData(param, employee) {
				if (param == 'add') {
					console.log('Initialization employee’s content, which adds employee')
					this.title = '新增'

					this.employee = {
						saId: '',
						name: '',
						phone: '0',
					}
				} else if (param == 'modify') {
					console.log('Initialization employee’s content, which modifies employee')
					this.title='修改'
					Object.assign(this.employee,employee)
					// this.$refs.store.setStore(this.employee.storeId)
				}
			},
			//date formatting 
			dateAction(param) {
				if (param == '1') {
					if (!this.isBlank(this.employee.hospTime)) {
						this.employee.hospTime = this.moment(this.employee.hospTime, 'YYYY-MM-DD HH:mm:ss.000')
					} else {
						this.employee.hospTime = ''
					}
				} else if (param == '2') {
					if (!this.isBlank(this.employee.outHosp)) {
						this.employee.outHosp = this.moment(this.employee.outHosp, 'YYYY-MM-DD HH:mm:ss.000')
					} else {
						this.employee.outHosp = ''
					}
				}
			},
			storeChange:function(param){
				if (this.isBlank(param)) {
					this.employee.storeId = ""
				} else {
					this.employee.storeId = param.storeId
				}
			},
			//feedback department information
			positionChange: function(param) {
				this.employee.level='1'
				if (this.isBlank(param)) {
					this.employee.posId = ""
				} else {
					this.employee.posId = param.posId
					// console.log("父级ID"+param.parentId)
					this.$refs.emp.setPosId(param.parentId)
				}
			},
			//feedback employeeStype information
			employeeChange: function(param) {
				if (this.isBlank(param)) {
					this.employee.leaderId = ''
				} else {
					this.employee.leaderId = param.empId
				}
			},
			
			//the event of addtional button
			addEmp() {
				var reg = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}14[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}16[0-9]{9}$)|(^0{0,1}17[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)/;
				if (this.isBlank(this.employee.name)) {
					alert("员工的姓名不能为空")
					return
				}
				var url = this.url + '/systemAccount/addUpdateEmp';
				 
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: [this.employee],
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('addEmp')
					}else{
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('员工请求失败')
				});
			},
			closeCurrentPage() {
				$("#emp").modal("hide")
				console.log('关闭添加员工界面')
			},
			//Query employee's information based on the hosNum
			conditionCheck(param) {
				console.log('checkhosNum')
				if (this.isBlank(param)) {
					return
				}
				var url = this.url + '/employeeAction/queryemployeeByHospNum'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						hospNum: param
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						if (res.retData != null) {
							this.employee = res.retData
							this.isExist = '1'

							this.$refs.dept.setDpart(this.employee.deptId)
							this.$refs.ps.setObjId(this.employee.patitypeid)
							this.$refs.mis.setObjId(this.employee.mitypeid)
						} else {
							this.employee = {}
							this.employee.sex = '1'
							this.employee.inHosp = '1'
							this.isExist = '0'
							this.$refs.dept.setDpart('0')
							this.$refs.ps.setObjId('0')
							this.$refs.mis.setObjId('0')
							alert("没有查到此住院号,可以进行添加")
						}
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},

		}

	}
</script>

<style>

</style>
