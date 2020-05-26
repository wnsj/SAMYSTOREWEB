<!-- add and modify position -->
<template>
	<div class="modal-content" id="projectContent">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}活动沙龙</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">标题</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="object.title" placeholder="必填">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">副标题</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="object.subTitle" placeholder="必填">
						</div>
					</div>
					<!-- <div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">店铺</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="object.store" placeholder="必填">
						</div>
					</div> -->
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询师</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<cou ref="cou" @atChange="couChange"></cou>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">标签</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="object.labelTitle" placeholder="必填">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">活动时间</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<dPicker v-model="object.acDate" type="date" value-type="format" format="YYYY-MM-DD"></dPicker>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">参加人数</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="object.limitNum" placeholder="例:30">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">价格</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="object.price" placeholder="例:30">
							<span class="pos-ab pos-tr">¥</span>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">是否使用</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="object.isUse">
								<option value="0">否</option>
								<option value="1">是</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">头图</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<label class="a-upload">
								<input type="file" id="headerImgFile" @change="headerChange" accept="image/*" />选择文件
							</label>
							<div id="headerFile"></div>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">详情图</label><span
						 class="sign-left">:</span>
						<div class="col-md-8">
							<label class="a-upload">
								<input type="file" id="detailImgFile" @change="detailChange" accept="image/*" />选择文件
							</label>
							<div id="detailFile"></div>
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">内容</label><span
						 class="sign-left">:</span>
						<div class="col-md-12">
							<textarea style="height: 300px;width: 500px;" v-model="object.detailContent" placeholder="内容简介"></textarea>
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
	import cou from '../../common/Counselor.vue'
	import dPicker from 'vue2-datepicker'
	export default {
		components: {
			dPicker,
			cou,

		},
		data() {
			return {
				editorOption: {
					theme: 'snow'
				},
				object: {
					title: '',
					subTitle: '',
					labelTitle: '',
					acDate: '',
					limitNum: '',
					colId: '0',
					isUse: '1',
					detailContent: '',
					price: '',

				},
				title: '',
			};
		},
		methods: {
			initData(param, obj) {
				$('#saContent').modal({
					backdrop: 'static',
					keyboard: false
				});
				this.object = {
					title: '',
					subTitle: '',
					labelTitle: '',
					acDate: '',
					limitNum: '',
					colId: '0',
					isUse: '1',
					detailContent: '',
					price: '',
				}
				if (param == 'add') {
					this.title = '新增'
					this.$refs.cou.setAtId(this.object.colId)
					$("#headerFile").remove();
					$("#headerImgFile").val("");
					$("#detailFile").remove();
					$("#detailImgFile").val("");
				} else if (param == 'modify') {
					//console.log('Initialization project’s content, which modifies project')
					this.title = '修改'
					this.$refs.cou.setAtId(obj.colId)
					Object.assign(this.object, obj)


					if (!this.isBlank(this.object.headImg)) {
						var dataUrl = this.addTimesParam(this.storeUrl+this.object.headImg);
						if ($("#headerFileOutImg").length <= 0) $("#headerFile").html(
							"<div id='headerFileOutImg' ><img id='header-img' src='#' style='width:100%' /></div>"
						);
						$("#header-img").attr("src", dataUrl);
					}
					if (!this.isBlank(this.object.detailImg)) {
						var dataUrl = this.addTimesParam(this.storeUrl+this.object.detailImg);
						if ($("#detailFileOutImg").length <= 0) $("#detailFile").html(
							"<div id='detailFileOutImg' ><img id='detail-img' src='#' style='width:100%' /></div>"
						);
						$("#detail-img").attr("src", dataUrl);
					}
				}
			},

			couChange(atObj) {
				// console.log(JSON.stringify(atObj))
				if (atObj == null) {
					this.object.colId = '';
				} else {
					this.object.colId = atObj.colId;
				}
			},
			//the event of addtional button
			certainAction() {
				//console.log('the event of addtional button')
				if (this.isBlank(this.object.title)) {
					alert("标题不能为空!")
					return
				}
				if (this.isBlank(this.object.subTitle)) {
					alert("副标题不能为空")
					return
				}
				if (this.isBlank(this.object.limitNum)) {
					alert("参加人数不能为空")
					return
				}
				if (this.isBlank(this.object.colId)) {
					alert("咨询师不能为空")
					return
				}
				if (this.isBlank(this.object.price)) {
					alert("价格不能为空")
					return
				}
				if (this.isBlank(this.object.acDate)) {
					alert("活动时间不能为空")
					return
				} else {
					this.object.acDate = this.moment(this.object.acDate, 'YYYY-MM-DD 00:00:00.000')
				}

				var fd = new FormData();
				var headerImgFile = $("#headerImgFile")[0].files[0];
				var detailImgFile = $("#detailImgFile")[0].files[0];
				fd.append("params", JSON.stringify(this.object));
				if (!this.isBlank(headerImgFile)) {
					fd.append("headFile", headerImgFile);
				}
				if (!this.isBlank(headerImgFile)) {
					fd.append("detialFile", detailImgFile);
				}

				switch (this.title) {
					case '新增':
						var url = this.url + '/activity/addActivity'
						break;
					case '修改':
						var url = this.url + '/activity/updateActivity'
						break;
				}

				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': 'multipart/form-data',
						'Access-Token': this.accessToken
					},
					data: fd,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					//console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('certainAction')
					}else{
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('提交失败')
				});
			},
			closeCurrentPage() {
				$("#saContent").modal("hide")
				//console.log('关闭界面')
			},
			//预览图
			headerChange() {
				var file = $("#headerImgFile")[0].files[0]; //获取file对象
				if (file == null || file == undefined) {
					$("#headerFile").remove();
				} else {
					//console.log("file:"+file)
					//检查文件类型
					var type = file.type.split("/");
					if (type[0] != "image") {
						alert("请选择图片");
						return false;
					}
					//新建fileReader对象
					var reader = new FileReader();
					reader.readAsDataURL(file);
					//图片加载事件style='width:350px;height:350px;overflow:hidden'
					reader.onloadend = function() {
						var dataUrl = reader.result;
						if ($("#headerFileInImg").length <= 0) $("#headerFile").html(
							"<div id='headerFileInImg' ><img id='header-img' src='#' style='width:100%' /></div>"
						);
						$("#header-img").attr("src", dataUrl);
					}
				}
			},
			//预览图
			detailChange() {
				var file = $("#detailImgFile")[0].files[0]; //获取file对象
				if (file == null || file == undefined) {
					$("#detailFileInImg").remove();
				} else {
					//console.log("file:"+file)
					//检查文件类型
					var type = file.type.split("/");
					if (type[0] != "image") {
						alert("请选择图片");
						return false;
					}
					//新建fileReader对象
					var reader = new FileReader();
					reader.readAsDataURL(file);
					//图片加载事件style='width:350px;height:350px;overflow:hidden'
					reader.onloadend = function() {
						var dataUrl = reader.result;
						if ($("#detailFileInImg").length <= 0) $("#detailFile").html(
							"<div id='detailFileInImg' ><img id='detail-img' src='#' style='width:100%' /></div>"
						);
						$("#detail-img").attr("src", dataUrl);
					}
				}
			}
		},
		mounted() {
// 			if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
// 				window.applicationCache.update();
// 			}
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
