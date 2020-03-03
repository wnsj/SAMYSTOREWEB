<!-- add and modify patient -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel">岗位列表</h4>
		</div>
		<div class="tableContent">
			<nobr class="widthmax">
				<div class="table-responsive pre-scrollable" style=" max-height:464px">
					<table class="table table-bordered table-hover user-table" id="datatable">
						<thead>
							<tr>
								<th class="text-center">ID</th>
								<th class="text-center">岗位名称</th>
								<th class="text-center">是否停用</th>
							</tr>
						</thead> 
						<tbody>
							<tr v-for="(item2,index2) in patientList" :key="index2">
								<td>{{item2.hospNum}}</td>
								<td>{{item2.name}}</td>
								<td>{{item2.age}}</td>
								<td>{{item2.DEPTNAME}}</td>
								<td>{{item2.patitypename}}</td>
								<td>{{item2.mitypename}}</td>
								<td>{{item2.mitypename}}</td>
								<td>{{item2.inHosp==1 ? '在' : '否'}}</td>
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
				patient:{
					hospTime:'',
					name:'',
					outHosp:'',
					sex:'1',
					age:'',
				},
				type:'',
				title:'新增',
				isModify:false,
				projectList:[],
				hospNum:'',
				isExist:'0',
				accountId:this.accountId(),
			};
		},
		methods:{
			// Initialization patient’s content
			initData(param,patient) {
				if(param=='add'){
					console.log('Initialization patient’s content, which adds patient')
					this.type='add'
					this.title='新增'
					this.isExist='0'
					this.isModify=false
					this.patient={}
					this.$refs.dept.setDpart('0')
					this.$refs.ps.setObjId('0')
					this.$refs.mis.setObjId('0')
					this.hospNum=''
					this.patient.sex='1'
					this.patient.inHosp='1'
					// this.patient.hospTime=this.moment('','YYYY-MM-DD HH:mm:ss.000')
				}else if(param=='modify'){
					console.log('Initialization patient’s content, which modifies patient')
					this.type='modify'
					this.isExist='1'
					this.isModify=true
					this.title='修改'
					// console.log("patient"+JSON.stringify(patient))
					Object.assign(this.patient,patient)
					this.hospNum=this.patient.hospNum
					this.$refs.dept.setDpart(this.patient.deptId)
					this.$refs.ps.setObjId(this.patient.patitypeid)
					this.$refs.mis.setObjId(this.patient.mitypeid)
				}
			},
			//date formatting 
			dateAction(param){
				if(param=='1'){
					if(!this.isBlank(this.patient.hospTime)){
						this.patient.hospTime=this.moment(this.patient.hospTime,'YYYY-MM-DD HH:mm:ss.000')
					}else{
						this.patient.hospTime=''
					}
				}else if(param=='2'){
					if(!this.isBlank(this.patient.outHosp)){
						this.patient.outHosp=this.moment(this.patient.outHosp,'YYYY-MM-DD HH:mm:ss.000')
					}else{
						this.patient.outHosp=''
					}
				}
			},
			//feedback department information
			departChange:function(param){
				// console.log('科室：'+JSON.stringify(param))
				if(this.isBlank(param)){
					this.patient.deptId=""
				}else{
					this.patient.deptId=param.deptId
				}
				console.log('科室：'+this.patient.deptId)
			},
			//feedback PatientStype information
			psChange:function(param){
				if(this.isBlank(param)){
					this.patient.patitypeid=''
				}else{
					this.patient.patitypeid=param.patitypeid
				}
			},
			//feedback MedicalInsuranceStype information
			misChange:function(param){
				if(this.isBlank(param)){
					this.patient.mitypeid=''
				}else{
					this.patient.mitypeid=param.mitypeid
				}
			},
			//the event of addtional button
			addPatient(){
				console.log('the event of addtional button')
				if(this.isExist=='1'){
					if(!confirm("是否确定提交，提交将覆盖原有患者数据！！！")){
						return
					}
				}
				this.patient.hospNum=this.hospNum
				if(this.isBlank(this.patient.hospNum)){
					alert("住院号不能为空")
					return
				}
				if(this.isBlank(this.patient.patitypeid)){
					alert("患者类型不能为空")
					return
				}
				if(this.isBlank(this.patient.mitypeid)){
					alert("医保类型不能为空")
					return
				}
				if(this.isBlank(this.patient.name) ){
					alert("姓名不能为空")
					return
				}
				if(this.isBlank(this.patient.deptId)){
					alert("科室不能为空")
					return
				}
				if(this.patient.inHosp != '1' && this.patient.inHosp != '0'){
					alert("是否在院不能为空")
					return
				}
				if(!this.isBlank(this.patient.outHosp)){
					this.patient.outHosp=this.moment(this.patient.outHosp,'YYYY-MM-DD HH:mm:ss.000')
				}
				if(!this.isBlank(this.patient.hospTime)){
					this.patient.hospTime=this.moment(this.patient.hospTime,'YYYY-MM-DD HH:mm:ss.000')
				}else{
					alert("入院时间不能为空")
					return
				}
				this.patient.paymentList=this.projectList
				this.patient.accountId=this.accountId
				// console.log('the event of addtional button'+JSON.stringify(this.patient))
				var url = this.url + '/patientAction/addPatient'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:this.patient,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('addPatient')
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			closeCurrentPage(){
				$("#departmentContent").modal("hide")
				console.log('关闭添加患者界面')
			},
			//Query patient's information based on the hosNum
			conditionCheck(param){
				console.log('checkhosNum')
				if(this.isBlank(param)){
					return
				}
				var url = this.url + '/patientAction/queryPatientByHospNum'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						hospNum:param
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						if (res.retData != null) {
							this.patient = res.retData
							this.isExist = '1'
							
							this.$refs.dept.setDpart(this.patient.deptId)
							this.$refs.ps.setObjId(this.patient.patitypeid)
							this.$refs.mis.setObjId(this.patient.mitypeid)
						}else{
							this.patient={}
							this.patient.sex='1'
							this.patient.inHosp='1'
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
