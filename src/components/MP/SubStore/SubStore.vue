<!-- add and modify store -->
<template>
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
			<h4 id="myModalLabel" class="modal-title">{{title}}门店</h4>
		</div>
		<div class="modal-body  pos_r">
			<div class="tab-pane fade in active martop" id="basic">
				<form action="" class="clearfix">
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">门店名称</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="store.storeName" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">联系人</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="store.connecter" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">联系电话</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<input type="text" class="form-control" v-model="store.phone" placeholder="">
						</div>
					</div>
					<div class="col-md-6 form-group clearfix">
						<label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">是否停用</label><span class="sign-left">:</span>
						<div class="col-md-8">
							<select class="form-control" v-model="store.isuse">
								<option value="1">在用</option>
								<option value="0">停用</option>
							</select>
						</div>
					</div>
					<div class="col-md-12 form-group clearfix">
						<label for="cyname" class="col-md-2 control-label text-right nopad end-aline" style="width:12%;padding:0;line-height:34px;">联系地址</label><span class="sign-left">:</span>
						<div class="col-md-10" style="width:84%;">
							<input type="text" class="form-control" v-model="store.address" placeholder="">
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
	import dPicker from 'vue2-datepicker'
	export default {
		components:{
			dPicker,
		},
		data() {
			return {
				store:{
					storeName:'',
					connecter:'',
					phone:'',
					address:'',
					isuse:'1',
				},
				title:'',
			};
		},
		methods:{
			// Initialization store’s content
			initData(param,storeContent) {
				if(param=='add'){
					console.log('Initialization store’s content, which adds store')
					
					this.title='新增'
					
					this.store={
						storeName:'',
						connecter:'',
						phone:'',
						address:'',
						isuse:'1',
					}
					
				}else if(param=='modify'){
					console.log('Initialization store’s content, which modifies store')
					
					this.title='修改'
					console.log(JSON.stringify(storeContent))
					Object.assign(this.store,storeContent)
				}
			},
			closeCurrentPage(){
				$("#storeContent").modal("hide")
				console.log('关闭添加患者界面')
			},
			//the event of addtional button
			certainAction(){
				console.log('the event of addtional button')
				var reg = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}14[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}16[0-9]{9}$)|(^0{0,1}17[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)/;
			
				if(this.isBlank(this.store.storeName)){
					alert("店名不能为空")
					return
				}
				if(this.isBlank(this.store.connecter)){
					alert("联系人不能为空")
					return
				}
				if(this.isBlank(this.store.phone)){
					alert("联系人电话不能为空")
					return
				}else if(reg.test(this.store.phone)==false){
					alert("不是完整的11位手机号或者正确的座机号！");
					return
				}
				switch(this.title){
					case '新增':
						var url = this.url + '/storeAction/addStore';
						break;
					case '修改':
						var url = this.url + '/storeAction/updateStore'
						break;	
				}
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data:this.store,
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
					console.log('添加商铺失败')
				});
			},
			
		}
		
	}
</script>

<style>
	
</style>

