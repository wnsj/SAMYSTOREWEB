<!-- add and modify position -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}测评</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">测评标题</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="evaluation.title" placeholder="">
						</div>
					</div>
					<!-- <div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询师</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<emp ref='emp' @employeeChange='empChange'></emp>
						</div>
					</div> -->
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">单价</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="evaluation.price" placeholder="">
							<span class="pos-ab pos-tr">¥</span>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">题数</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="evaluation.problemNum">
							<span class="pos-ab pos-tr">个</span>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">问题链接</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="evaluation.problemUrl">
						</div>
					</div>
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
	import emp from '../../common/Employee.vue'
	export default {
		components: {
			dPicker,
			emp,
		},
		data() {
			return {
				evaluation: {
					tpbId:'',
					title: '',
					price: '',
					problemNum:'',
					problemUrl:'',
				},
				title: '',
			};
		},
		methods: {
			// Initialization projcet’s content
			initData(param, evaluation) {
				if (param == 'add') {
					console.log('Initialization evaluation’s content, which adds evaluation')
					this.title = '新增'
					this.evaluation = {
						tpbId:'',
						title: '',
						price: '',
						problemNum:'',
						problemUrl:'',
					}
				} else if (param == 'modify') {
					console.log('Initialization evaluation’s content, which modifies evaluation')
					this.title = '修改'
					Object.assign(this.evaluation,evaluation)
				}
			},
// 			
// 			empChange(param){
// 				if(this.isBlank(param)){
// 					this.evaluation.empId=""
// 				}else{
// 					this.evaluation.empId=param.empId
// 				}
// 			},
			//the event of addtional button
			certainAction() {
				console.log('the event of addtional button')
				
				if (this.isBlank(this.evaluation.title)) {
					alert("标题不能为空")
					return
				}
				if (this.isBlank(this.evaluation.price)) {
					alert("价格不能为空")
					return
				}
				if (this.isBlank(this.evaluation.problemNum)) {
					alert("问题个数不能为空")
					return
				}
				if (this.isBlank(this.evaluation.problemUrl)) {
					alert("问题链接不能为空")
					return
				}
				switch(this.title){
					case '新增':
						var url = this.url+'/testProblemBase/addTestProblemBase'
						break;
					case '修改':
						var url = this.url+'/testProblemBase/updateTestProblemBase'
						break;
				}
				
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: this.evaluation,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('certainAction')
					}
				}).catch((error) => {
					console.log('课程信息请提交失败')
				});
			},
			closeCurrentPage() {
				$("#evaluationContent").modal("hide")
				console.log('关闭添加课程界面')
			},
		}

	}
</script>

<style>

</style>
