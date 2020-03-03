<!-- add and modify position -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">修改密码</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">新密码</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="password" class="form-control" v-model="accountPwd" placeholder="新密码">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">重新输入</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="password" class="form-control" v-model="accountPwdCopy" placeholder="重新输入">
						</div>
					</div>
					<div class="form-group clearfix">
						<div class="col-md-12">
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
							 v-on:click="certainAction()">确认</button>							
						</div>
					</div>
				</form>
			</div>

		</div>

	</div>
</template>

<script>
	export default {
		
		data() {
			return {
				accountPwd: '',
				accountPwdCopy:'',
				accountData:{}
			};
		},
		methods: {
			// Initialization projcet’s content
			initData(accountData) {
				this.accountData=accountData
				this.accountPwd=''
				this.accountPwdCopy=''
			},
			
			//the event of addtional button
			certainAction() {
				
				if (this.isBlank(this.accountPwd)&&this.accountPwd == '123456') {
					alert("密码不能为空,且不能与原密码相同")
					return
				}
				if (!this.isBlank(this.accountPwdCopy) && this.accountPwdCopy==this.accountPwd) {
					
				}else{
					alert("两次密码不一致")
					return
				}
				console.log(JSON.stringify(this.accountData))
				this.accountData.accountPwd=this.accountPwd
				var url = this.url+'/accountAction/updateAccount'
				
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:this.accountData,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit("certainAction")
						$(".modal-backdrop").hide();
					}
				}).catch((error) => {
					console.log('课程信息请提交失败')
				});
			},
			closeCurrentPage() {
				$("#modifyPwd").modal("hide")
				console.log('关闭修改密码界面')
			},
		}

	}
</script>

<style>

</style>
