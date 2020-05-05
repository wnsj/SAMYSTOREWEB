<!-- add and modify position -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<!-- <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button> -->
			<h4 id="myModalLabel" class="modal-title">{{title}}测评类型</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">测评类型</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="evaluationType.ttName" placeholder="">
						</div>
					</div>
					<!-- <div class="col-md-6 form-group clearfix">
						<label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">是否停用</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="evaluation.isUse">
								<option value="1">在用</option>
								<option value="0">停用</option>
							</select>
						</div>
					</div>
					 -->
					<div class="form-group clearfix">
						<div class="col-md-12">
							<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
							v-on:click="closeCurrentPage()">返回</button>
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
	import dPicker from 'vue2-datepicker'
	import axios from 'axios'
	export default {
		components: {
			dPicker,
		},
		data() {
			return {
				evaluationType: {
					ttId:'',
					ttName: '',
					isUse:'1',
				},
				title: '',
			};
		},
		methods: {
			// Initialization projcet’s content
			initData(param, evaluationType) {
				$('#etContent').modal({backdrop: 'static', keyboard: false});
				if (param == 'add') {
					this.title = '新增'
					this.evaluationType= {
						ttId:'',
						ttName: '',
						isUse:'1'
					}
				} else if (param == 'modify') {
					this.title = '修改'
					Object.assign(this.evaluationType,evaluationType)
				}
			},
			certainAction() {
				console.log('the event of addtional button')
				
				if (this.isBlank(this.evaluationType.ttName)) {
					alert("测评类型名字为空")
					return
				}
				
				switch(this.title){
					case '新增':
						var url = this.url+'/testType/addTestProblemType'
						break;
					case '修改':
						var url = this.url+'/testType/updateTestProblemType'
						break;
				}
				
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: this.evaluationType,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('certainAction')
					}else{
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('测评类型信息请提交失败')
				});
			},
			closeCurrentPage() {
				$("#etContent").modal("hide")
				console.log('关闭添加测评类型界面')
			},
			
		},
		computed: {
		  editor () {
		    return this.$refs.myQuillEditor.quill
		  }
		},

	}
</script>

<style>

</style>
