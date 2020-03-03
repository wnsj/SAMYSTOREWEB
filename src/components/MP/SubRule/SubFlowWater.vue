<!-- add and modify patient -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">流水提成规则</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">岗位</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<pos ref='pos' @positionChange='posChange'></pos>
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">提点</label><span class="sign-left">:</span>
						<div class="col-md-8 pos-re">
							<input type="text" class="form-control" v-model="FWRoyalty.turRoy" placeholder="">
							<span class="pos-ab pos-tr">%</span>
						</div>
					</div>
					<div class="col-md-9 form-group clearfix" style="text-align:left;">
						<label for="cyname" class="col-md-2 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">额度级别</label><span class="sign-left">:</span>
						<div class="col-md-4 pos-re">
							<input type="text" class="form-control" v-model="FWRoyalty.flowSmall" placeholder="">
							<span class="pos-ab pos-tr">万</span>
						</div> 
						<div style="line-height:34px; float:left;">~</div>
						<div class="col-md-4 pos-re">
							<input type="text" class="form-control" v-model="FWRoyalty.flowBig" placeholder="">
							<span class="pos-ab pos-tr">万</span>
						</div>
					</div>
					
					<div class="form-group clearfix">
						<div class="col-md-12">
							<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal" v-on:click="closeCurrentPage()">返回</button>
							<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal" v-on:click="certainAction(title)">确认</button>
						</div>
					</div>
				</form>
			</div>
	
		</div>
		
	</div>
</template>

<script>
	import pos from '../../common/Position.vue'
	export default {
		components:{
			pos,
		},
		data() {
			return {
				FWRoyalty:{
					posId:'0',
					flowBig:'0',
					turRoy:'0',
					flowSmall:'0',
					consumeType:'0',
				},
				title:'新增',
				
			};
		},
		methods:{
			// Initialization patient’s content
			initData(param,FWRoyalty) {
				if(param=='add'){
					console.log('Initialization patient’s content, which adds patient')
					
					this.title='新增'
					this.FWRoyalty={
						posId:'0',
						flowBig:'0',
						turRoy:'0',
						flowSmall:'0',
						consumeType:'0',
					}
					this.$refs.pos.setPosId('0')
				}else if(param=='modify'){
					
					this.title='修改';
					Object.assign(this.FWRoyalty,FWRoyalty)
					// console.log('posId:'+FWRoyalty.posId)
					this.$refs.pos.setPosId(FWRoyalty.posId)	
				}
			},
			
			//feedback position information
			posChange:function(param){
				// console.log('岗位3：'+JSON.stringify(param))
				if(this.isBlank(param)){
					this.FWRoyalty.posId=""
				}else{
					this.FWRoyalty.posId=param.posId
				}
				// console.log('岗位4：'+this.FWRoyalty.posId)
			},
			
			//the event of addtional button
			certainAction(param){				
				if(this.isBlank(this.FWRoyalty.posId) || this.FWRoyalty.posId=='0'){
					alert("岗位类型不能为空")
					return
				}
				if(this.isBlank(this.FWRoyalty.flowBig)){
					alert("大额度不能为空")
					return
				}
				if(this.isBlank(this.FWRoyalty.turRoy)){
					alert("提成点数不能为空")
					return
				}
				switch(param){
					case '新增':
						var url = this.url + '/royaltyAction/addRoyalty';
						break;
					case '修改':
						var url = this.url + '/royaltyAction/updateRoyalty'
						break;	
				}
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:this.FWRoyalty,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.$emit('certainAction')
					}
				}).catch((error) => {
					console.log('添加流水规则失败')
				});
			},
			closeCurrentPage(){
				$("#SubFlowWater").modal("hide")
			},
		}
		
	}
</script>

<style>
	.pos-tr{ 
		top:0;
		right:20px; 
		line-height:34px;
		-webkit-user-select:none;
    	-moz-user-select:none;
    	-ms-user-select:none;
    	user-select:none;
	}
</style>
