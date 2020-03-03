<!-- add and modify position -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}岗位</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">岗位名称</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="position.posName" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">上级</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<position ref="position" @positionChange='posChange'></position>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">是否停用</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="position.isuse">
								<option value="1">在用</option>
								<option value="0">停用</option>
							</select>
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
	import position from '../../common/Position.vue'
	export default {
		components: {
			dPicker,
			position,
		},
		data() {
			return {
				position: {
					posName: '',
					parentId: '',
					isuse: '1',
				},
				title: '',
			};
		},
		methods: {
			// Initialization position’s content
			initData(param, posContent) {
				if (param == 'add') {
					console.log('Initialization position’s content, which adds position')
					this.title = '新增'
					this.position = {
						posName: '',
						parentId: '',
						isuse: '1',
					}
				} else if (param == 'modify') {
					console.log('Initialization position’s content, which modifies position')
					this.title = '修改'
					Object.assign(this.position,posContent)
					console.log(JSON.stringify(this.position))
					if(this.position.parentId>0){
						this.$refs.position.setPosId(this.position.parentId)
					}
				}
			},
			
			posChange(param){
				if(this.isBlank(param)){
					this.position.parentId=""
				}else{
					this.position.parentId=param.posId
				}
			},
			//the event of addtional button
			certainAction() {
				console.log('the event of addtional button')
				
				if (this.isBlank(this.position.posName)) {
					alert("岗位名称不能为空")
					return
				}
				switch(this.title){
					case '新增':
						var url = this.url+'/positionAction/addPosition'
						break;
					case '修改':
						var url = this.url+'/positionAction/updatePosition'
						break;
				}
				
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: this.position,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('certainAction')
					}
				}).catch((error) => {
					console.log('岗位信息请提交失败')
				});
			},
			closeCurrentPage() {
				$("#positionContent").modal("hide")
				console.log('关闭添加患者界面')
			},
		}

	}
</script>

<style>

</style>
