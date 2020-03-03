<template>
	<select class="form-control" v-model="empId" v-on:change="employeeChange()">
		<option value="">--未选择--</option>
		<option v-for="(item,index) in employeeList" :key="index" v-bind:value="item.empId">
			{{item.empName}}
		</option>
	</select>
</template>

<script>
	export default {
		data() {
			return {
				empName: '',
				empId: '',
				posId:'',
				posName:'',
				leader:'',
				employeeList: [],
				empObj: {
					empId: '0',
					empName: '',
				},
			};
		},
		methods: {
			//员工列表
			employeeChange: function() {
				if(this.empId=='0'){
					this.$emit('employeeChange', '')
				}else{
					this.empObj = this.exchangeEmpName(this.empId)
					this.$emit('employeeChange', this.empObj)
				}
			},
			setEmp: function(empId) {
				this.empId = empId
				this.employeeChange()
				console.log('员工' + this.empId)
			},
			//添加前缀的部门名字兑换原来的名字
			exchangeEmpName: function(param) {
				var emp = {}
				for (var i = 0; i < this.employeeList.length; i++) {
					emp = this.employeeList[i];
					if (emp.empId == param) {
						return emp
					}
				}
			},
			
			setPosId(posId){
				// console.log('posId:'+posId)
				if(this.isBlank(posId)){
					this.posId=''
				}else{
					this.posId=posId
				}
				this.getEmployeeList()
			},
			setPosName(posName){
				// console.log('posName:'+posName)
				if(this.isBlank(posName)){
					this.posName=''
				}else{
					this.posName=posName
				}
				this.getEmployeeList()
			},
			setPosNameAndLeader(posName,leader){
				// console.log('posName:'+posName)
				if(this.isBlank(posName)){
					this.posName=''
				}else{
					this.posName=posName
				}
				if(this.isBlank(leader)){
					this.leader=''
				}else{
					this.leader=leader
				}
				this.getEmployeeList()
			},
			getEmployeeList() {
				var storeId=''
				if(this.accountType!=1){
					storeId = this.storeId()
				}else{
					storeId = ''
				}
				var url = this.url + '/employeeAction/queryEmp'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						posId:this.posId,
						posName:this.posName,
						leader:this.leader,
						storeId:storeId,
						isuse: '1',
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.employeeList = res.retData
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('员工数据请求失败处理')
				});
			},

		},
		mounted() {
			// this.getEmployeeList()
		},
	}
</script>

<style>

</style>
