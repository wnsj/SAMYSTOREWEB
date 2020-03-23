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
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">副标题</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="evaluation.subtitle" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">测评类型</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<et ref='et' @etChange='etChange'></et>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">原价</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="evaluation.price" placeholder="">
							<span class="pos-ab pos-tr">¥</span>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">现价</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="evaluation.newPrice" placeholder="">
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
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">序号</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="evaluation.serialNumber">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">简介</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="evaluation.simpleIntroduce">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">时长</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="evaluation.timeLength" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">已测试人数</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="evaluation.testNum" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">是否停用</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="evaluation.isUse">
								<option value="1">在用</option>
								<option value="0">停用</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
					    <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">上传文件</label><span
					        class="sign-left">:</span>
					    <div class="col-md-8">
					        <input type="file" id="imgFile" />
					    </div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<p class="tips">* 提示：图片尺寸640*400</p>
					</div>
					<div class="col-md-6 form-group clearfix">
					    <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">内容</label><span
					        class="sign-left">:</span>
					    <div class="col-md-8">
					        <textarea style="height: 300px;width: 400px;" v-model="evaluation.introduce"></textarea>
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
	import et from '../../common/EvaluationType.vue'
	import dPicker from 'vue2-datepicker'
	import axios from 'axios'
	export default {
		components: {
			dPicker,
			et,
		},
		data() {
			return {
				evaluation: {
					tpbId:'',
					title: '',
					price: '',
					newPrice:'',
					problemNum:'',
					timeLength:'',
					introduce:'',
					testNum:'',
					serialNumber:'',
					simpleIntroduce:'',
					isUse:'1',
				},
				title: '',
// 				files: [],
// 				tFiles:[],
// 				uploadSuccess: 0,
// 				fixedHeader: false,
			};
		},
		methods: {
			// Initialization projcet’s content
			initData(param, evaluation) {
				$('#evaluationContent').modal({backdrop: 'static', keyboard: false});
				if (param == 'add') {
					console.log('Initialization evaluation’s content, which adds evaluation')
					this.title = '新增'
					this.evaluation = {
						tpbId:'',
						title: '',
						price: '',
						newPrice:'',
						problemNum:'',
						problemUrl:'',
						timeLength:'',
						testType:'',
						introduce:'',
						testNum:'',
						serialNumber:'',
						isUse:'1',
						simpleIntroduce:'',
					}
				} else if (param == 'modify') {
					console.log('Initialization evaluation’s content, which modifies evaluation')
					this.title = '修改'
					Object.assign(this.evaluation,evaluation)
				}
			},
			
			etChange(param){
				if(this.isBlank(param)){
					this.evaluation.testType=""
				}else{
					this.evaluation.testType=param.ttId
				}
			},
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
				
				var fd = new FormData();
				var file = $("#imgFile")[0].files[0];
				fd.append("file", file);
				fd.append("evaluationData", JSON.stringify(this.evaluation));
				
				
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
					data: fd,
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
			handlerUpload1: function(e, paramUrl) {
				//获取选定的文件
				this.tFiles = e.target.files;
			},
			handlerUpload: function(e, paramUrl) {
				//获取选定的文件
				// let tFiles = e.target.files;
				let len = this.tFiles.length;
				for (var i = 0; i < len; i++) {
					//开始上传每一个文件
					var item = {
						name: this.tFiles[i].name,
						uploadPercentage: 1,
						size: this.formatFileSize(this.tFiles[i].size, 0),
						uploadStatus: 0
					}
					console.log(item)
					// this.files.push(item);
					//开始上传文件 新建一个formData
					let param = new FormData();
					param.append("name", this.tFiles[i].name);
					//登录客户端账户ID
					param.append("evaluationData", JSON.stringify(this.evaluation));
					//通过append向form对象添加数据
					param.append("file", this.tFiles[i]);
					//FormData私有类对象，访问不到，可以通过get判断值是否传进去
					console.log('数据：'+JSON.stringify(this.evaluation))
					console.log(param.get("file"));
// 					//判断大小
// 					if (!this.checkFileSize(tFiles[i].size)) {
// 						item.uploadStatus = -3;
// 						alert("文件大于2M!");
// 						return false;
// 					}
// 					if (!this.checkFileType(tFiles[i].name.split('.')[1])) {
// 						item.uploadStatus = -2;
// 						alert("文件类型错误!")
// 						return false;
// 					}
					//通过axios上传文件
					//配置
					let config = {
						//添加请求头
						headers: {
							"Content-Type": "multipart/form-data"
						},
						//添加上传进度监听事件
						onUploadProgress: e => {
							var completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
							//console.log(this.files)
							item.uploadPercentage = completeProgress;
						}
					};
			
					var url = this.url + paramUrl;
					axios.post(url, param, config).then(function(response) {
						console.log(response);
						item.uploadStatus = 2;
						if (response.data.retCode == '0000') {
							if (response.data.retData.length > 0) {
								vm.patientList = response.data.retData
							} else {
								alert("上传成功!")
							}
						} else {
							alert(response.data.retMsg)
						}
					}).catch(function(error) {
						console.log(error);
						item.uploadStatus = -1;
					});
				}
			},
			formatFileSize: function(fileSize, idx) {
				var units = ["B", "KB", "MB", "GB"];
				idx = idx || 0;
				if (fileSize < 1024 || idx === units.length - 1) {
					return fileSize.toFixed(1) + units[idx];
				}
				return this.formatFileSize(fileSize / 1024, ++idx);
			},
			checkFileType: function(fileType) {
				const acceptTypes = ['png', 'jpg', 'jpeg'];
				for (var i = 0; i < acceptTypes.length; i++) {
					if (fileType === acceptTypes[i]) {
						return true;
					}
				}
				return false;
			},
			checkFileSize: function(fileSize) {
				//2M
				const MAX_SIZE = 2 * 1024 * 1024;
				if (fileSize > MAX_SIZE) {
					return false;
				}
				return true;
			},
			myFile: function(param) {
				$("#imgFile").click();
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
