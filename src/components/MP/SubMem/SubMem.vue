<!-- add and modify member -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}会员</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">姓名</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="member.memName" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">手机号</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="member.phone" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="sex" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">性别</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="member.sex">
								<option value="1">男</option>
								<option value="2">女</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">生日</label><span class="sign-left">:</span>
						<dPicker class="col-md-8" style="width:65%;" v-model="member.birthday"></dPicker>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">是否启用</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="member.isuse">
								<option value="1">在用</option>
								<option value="0">停用</option>
							</select>
						</div>
					</div>
					<!-- <div class="col-md-6 form-group clearfix"> 
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">推荐人</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<emp ref='emp' @employeeChange='empChange'></emp>
						</div>
					</div> -->
					<div class="col-md-6 form-group clearfix">
						<label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">实卡用户</label><span class="sign-left">:</span>
						<div class="col-md-8" style="text-align:left; line-height:34px;">
							<label class="bui-radios-label">
								<input type="radio" name="entityEmp" v-model="member.memType" :disabled="isShow" value="1"/><i class="bui-radios"></i> 是
							</label>
							<label class="bui-radios-label">
								<input type="radio" name="entityEmp" v-model="member.memType" :disabled="isShow" value="0"/><i class="bui-radios"></i> 否
							</label>
							<!--是：<input type="radio" name="entityEmp" v-model="member.memType" value="1" class="form-control">
							否：<input type="radio" name="entityEmp" v-model="member.memType" value="0" class="form-control">-->
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						
						<p class="tips">* 注意：</p>
						<p class="tips">1.未从微信公众号注册的会员，将不能推送微信消息，请操作员悉知并确认操作无误。</p>
						<p class="tips">2.若客户之前已有实体会员卡，请勾选“是”，并将用户已经购买的课程通过“课程购买”进行购买。</p>
						<p class="tips">  此项操作不可逆，若选“否”，客户可以正常上课，但是将会影响提成数据。请谨慎操作。</p>
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
	import dPicker from 'vue2-datepicker'
	import emp from '../../common/Employee.vue'
	export default {
		components:{
			dPicker,
			emp,
		},
		data() {
			return {
				member:{
					memName:'',
					phone:'',
					storeId:'',
					empId:'',
					memType:'0',
					sex:'1',
					isuse:'1',
					birthday:'',
					
				},
				title:'新增',
				item:[],
				isShow:false,
			};
		},
		methods:{
			// Initialization member’s content
			initData(param,member) {
				this.member={
					memName:'',
					phone:'',
					posId:'0',
					empId:'0',
					storeId:this.storeId(),
					memType:'0',
					sex:'1',
					isuse:'1',
					birthday:'',
				}
				if(param=='add'){
					console.log('Initialization member’s content, which adds member')
					this.title='新增'
					
					// this.$refs.emp.setEmp('0')
				}else if(param=='modify'){
					console.log('Initialization member’s content, which modifies member')
					this.title='修改'
					console.log(JSON.stringify(member))
					Object.assign(this.member,member)
					// this.$refs.emp.setEmp(this.member.empId)
					this.conditionCheck()
				}
			},
			CheckItem(item){
				item.value = !item.value;
				$('#hahah').val(item.value)
				console.log($('#hahah').val());
			},
			
			//feedback employee information
			empChange:function(param){
				if(this.isBlank(param)){
					this.member.empId=""
					this.member.storeId=""
				}else{
					this.member.empId=param.empId
					this.member.storeId=param.storeId
				}
			},
			
			//the event of addtional button
			certainAction(){
				var reg = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}14[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}16[0-9]{9}$)|(^0{0,1}17[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)/;
				
				if(this.isBlank(this.member.memName)){
					alert("姓名不能为空")
					return
				}
				if(this.isBlank(this.member.phone)){
					alert("手机号不能为空")
					return
				}else if(reg.test(this.member.phone)==false){
					alert("不是完整的11位手机号或者正确的座机号！");
					return
				} 
				
				if(!this.isBlank(this.member.birthday)){
					this.member.birthday=this.moment(this.member.birthday,'YYYY-MM-DD 00:00:00.000')
				}
				var url
				switch(this.title){
					case "新增":
						url = this.url + '/memberAction/addMember'
						break;
					case "修改":
						url = this.url + '/memberAction/updateMember'
						break;
				}
				
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:this.member,
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
					console.log('会员相关操作失败')
				});
			},
			closeCurrentPage(){
				$("#memberContent").modal("hide")
				console.log('close the flowWater rule')
			},
			//the list , which is detail infomation of reCharge,was checked.
			conditionCheck: function() {
				console.log('querying based on multiple conditions')
				
				var url = this.url + '/accountRecordAction/queryAccountRecord'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:{
						memNum:this.member.memNum,
						
						accountId: this.accountId(),
						modelGrade:'2',
						modelType:'',
						operateType:'',
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					// console.log(res)
					if (res.retCode == '0000') {
						if(res.retData.length>0){
							this.isShow=true
						}else{
							this.isShow=false
						}
					}
				}).catch((error) => {
					console.log('充值查询请求失败')
				});
			},
		}
	}
</script>

<style>
	label.bui-radios-label{
		 position:relative;
		 margin-right:10px;
	}
	label.bui-radios-label input {
		position: absolute;
		opacity: 0;
		visibility: hidden; 
	}
	label.bui-radios-label .bui-radios {
		display: inline-block;
		position: relative;
		width: 13px;
		height: 13px;
		background: #FFFFFF;
		border: 1px solid #979797;
		border-radius: 50%;
		vertical-align: -2px; 
		box-sizing:content-box;
	}
	label.bui-radios-label input:checked + .bui-radios:after {
		position: absolute;
		content: "";
		width: 7px;
		height: 7px;
		background-color: #fff;
		border-radius: 50%;
		top: 3px;
		left: 3px; 
	}
	label.bui-radios-label input:checked + .bui-radios {
		background: #00B066;
		border: 1px solid #00B066; 
	}
	label.bui-radios-label input:disabled + .bui-radios {
		background-color: #e8e8e8;
		border: solid 1px #979797; 
	}
	label.bui-radios-label input:disabled:checked + .bui-radios:after {
		background-color: #c1c1c1; 
	}
	.tips{ display:block; text-align:left; color:red; font-size:12px;}
	
</style>