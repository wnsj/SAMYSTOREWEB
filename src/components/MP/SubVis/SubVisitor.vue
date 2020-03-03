<!-- add and modify visitor -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}咨客</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">姓名</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="visitor.visitorName" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">手机号</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="visitor.phone" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">生日</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<dPicker style="width:100%" v-model="visitor.birthday" value-type="format" format="YYYY-MM-DD"></dPicker>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">性别</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="visitor.sex">
								<option value="1">男</option>
								<option value="2">女</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">渠道</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<cha ref="cha" @channelChange="chaChange"></cha>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询方向</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="visitor.consDirection" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">接待人</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<emp ref="emp" @employeeChange="empChange"></emp>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">客户类型</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="visitor.visType">
								<option value="1">初访</option>
								<option value="2">复访</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">行业</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<ind ref="ind" @industryChange="indChange"></ind>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">紧急联系人</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="visitor.urgentName" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">联系电话</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="visitor.urgentPhone" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">微信号</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="visitor.vnum" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">邮箱地址</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="visitor.email" placeholder="">
						</div>
					</div>
					
					<div class="col-md-12 form-group clearfix">
						<label for="cyname" class="col-md-2 control-label text-right nopad end-aline" style="width:12%;padding:0;line-height:34px;">联系地址</label><span class="sign-left">:</span>
						<div class="col-md-10" style="width:84%;">
							<input type="text" class="form-control" v-model="visitor.address" placeholder="">
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<label for="cyname" class="col-md-2 control-label text-right nopad end-aline" style="width:12%;padding:0;line-height:34px;">备注</label><span class="sign-left">:</span>
						<div class="col-md-10" style="width:84%;">
							<input type="text" class="form-control" v-model="visitor.marker" placeholder="">
						</div>
					</div>
					<div class="form-group clearfix">
						<div class="col-md-12">
							<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal" v-on:click="closeCurrentPage()">返回</button>
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal" v-on:click="certainAction()">确认</button>	
						</div>
					</div>
				</form>
			</div>
	
		</div>
		
	</div>
</template>

<script>
	import ind from '../../common/Industry.vue'
	import cha from '../../common/Channel.vue'
	import emp from '../../common/Employee.vue'
	
	import dPicker from 'vue2-datepicker'
	export default {
		components:{
			dPicker,
			ind,
			cha,
			emp,
		},
		data() {
			return {
				visitor:{
					visitorName:'',
					sex:'1',
					phone:'',
					chaId:'',
					consDirection:'',
					empId:'',
					visType:'1',
					indId:'',
					storeId:this.storeId(),
					urgentName:'',
					urgentPhone:'',
					vnum:'',
					email:'',
					address:'',
					marker:'',
				},
				title:'',
			};
		},
		methods:{
			// Initialization visitor’s content
			initData(param,visitorContent) {
				if(param=='add'){
					console.log('Initialization visitor’s content, which adds visitor')
					
					this.title='新增'
					
					this.visitor={
						visitorName:'',
						sex:'1',
						phone:'',
						chaId:'',
						consDirection:'',
						empId:'',
						visType:'1',
						indId:'',
						storeId:this.storeId(),
						urgentName:'',
						urgentPhone:'',
						vNum:'',
						email:'',
						address:'',
						marker:'',
					}
					this.$refs.cha.setChaId('0')
					this.$refs.ind.setInd('0')
					this.$refs.emp.setEmp("")
					
				}else if(param=='modify'){
					console.log('Initialization visitor’s content, which modifies visitor')
					
					this.title='修改'
					// console.log(JSON.stringify(visitorContent))
					Object.assign(this.visitor,visitorContent)
					this.$refs.cha.setChaId(this.visitor.chaId)
					this.$refs.ind.setInd(this.visitor.indId)
					this.$refs.emp.setEmp(this.visitor.empId)
				}
			},
			
			//feedback position information
			indChange:function(param){
				console.log('岗位3：'+JSON.stringify(param))
				if(this.isBlank(param)){
					this.visitor.indId=""
				}else{
					this.visitor.indId=param.indId
				}
				console.log('岗位4：'+this.visitor.indId)
			},
			//feedback position information
			chaChange:function(param){
				// console.log('岗位3：'+JSON.stringify(param))
				if(this.isBlank(param)){
					this.visitor.chaId=""
				}else{
					this.visitor.chaId=param.chaId
				}
				// console.log('岗位4：'+this.visitor.posId)
			},
			//feedback position information
			empChange:function(param){
				// console.log('岗位3：'+JSON.stringify(param))
				if(this.isBlank(param)){
					this.visitor.empId=""
				}else{
					this.visitor.empId=param.empId
				}
				// console.log('岗位4：'+this.visitor.posId)
			},
			closeCurrentPage(){
				$("#visContent").modal("hide")
				console.log('关闭添加患者界面')
			},
			//the event of addtional button
			certainAction(){
				console.log('the event of addtional button')
				var reg = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}14[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}16[0-9]{9}$)|(^0{0,1}17[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)/;
			
				
				if(this.isBlank(this.visitor.visitorName)){
					alert("咨客姓名不能为空")
					return
				}
				if(this.isBlank(this.visitor.consDirection)){
					alert("咨客的咨询方向不能为空")
					return
				}
				if(this.isBlank(this.visitor.chaId)){
					alert("咨客的来源渠道不能为空")
					return
				}
				if(this.isBlank(this.visitor.empId) || this.visitor.empId==0){
					alert("接待人不能为空")
					return
				}
				if(this.isBlank(this.visitor.phone)){
					alert("联系人电话不能为空")
					return
				}else if(reg.test(this.visitor.phone)==false){
					alert("不是完整的11位手机号或者正确的座机号！");
					return
				}
				if(this.isBlank(this.visitor.urgentPhone)){
					alert("联系人电话不能为空")
					return
				}else if(reg.test(this.visitor.urgentPhone)==false){
					alert("不是完整的11位手机号或者正确的座机号！");
					return
				}
				if(this.visitor.address.length>20){
					alert('地址的长度不能超过20个字')
					return
				}
				if(this.visitor.address.length>100){
					alert('地址的长度不能超过100个字')
					return
				}
				
				switch(this.title){
					case '新增':
						var url = this.url + '/visitorAction/addVisitor';
						break;
					case '修改':
						var url = this.url + '/visitorAction/updateVisitor'
						break;	
				}
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:this.visitor,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('certainAction')
					}else{
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('添加或者修改咨客信息失败')
				});
			},
			
		}
		
	}
</script>

<style>
	
</style>

