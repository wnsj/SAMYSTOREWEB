<!-- the page of department management -->
<template>
	<div class="clearfix" style="height:100%">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss" style="margin-top:-80px;">提成规则管理</h1>
		</div>
		<div>
			<div class="col-md-5 col-lg-5 part pb0">
				<div class="col-md-12 col-lg-12 main-title" ref="tit" style="height:60px; overflow:hidden;">
					<div class="col-md-8 col-lg-8 text-left">
						<h3 style="line-height:72px;">流水提成规则</h3>
					</div>
					<div class="col-md-4 col-lg-4 pull-right">
						<button type="button" class="btn btn-warning pos1" v-on:click="selectRule('Royalty','1','')">添加</button>
					</div>
				</div>
				<div class="col-md-12 col-lg-12">
					<div class="table-responsive pre-scrollable" ref="tab1">
						<table class="table table-bordered table-hover mb0" id="datatable">

							<thead class="datathead">
								<tr>
									<th class="text-center col-md-2">岗位</th>
									<th class="text-center col-md-4">额度级别(大于)</th>
									<th class="text-center col-md-3">提点</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in royaltyList" :key="index" v-if="item.consumeType=='0'" v-on:dblclick="selectRule('Royalty','3',item)">
									<td class="text-center">{{item.posName}}</td>
									<td class="text-center">{{item.flowSmall}} 万</td>
									<td class="text-center">{{item.turRoy}}%</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="col-md-12 col-lg-12">	
					<p class="tips">* 双击单行，可对当前数据进行修改</p>
				</div>
			</div>
			<div class="col-md-5 col-lg-5 part pb0">
				<div class="col-md-12 col-lg-12 main-title" style="height:60px; overflow:hidden;">
					<div class="col-md-8 col-lg-8 text-left">
						<h3  style="line-height:72px;">会员卡提成规则</h3>
					</div>
					<div class="col-md-4 col-lg-4 pull-right">
						<button type="button" class="btn btn-warning pos1" v-on:click="selectRule('SubVip','1','')">添加</button>
					</div>
				</div>
				<div class="col-md-12 col-lg-12">
					<div class="table-responsive pre-scrollable" ref="tab2">
						<table class="table table-bordered table-hover mb0" id="datatable">
			
							<thead class="datathead">
								<tr>
									<th class="text-center  col-md-2">岗位</th>
									<th class="text-center  col-md-2">充值类型</th>
									<th class="text-center  col-md-2">提点</th>
									<th class="text-center  col-md-2">消费额度</th>
									<th class="text-center  col-md-2">提成比例</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in royaltyList" :key="index" v-if="item.consumeType=='1' || item.consumeType=='2'" v-on:dblclick="selectRule('SubVip','3',item)">
									<td class="text-center">{{item.posName}}</td>
									<td class="text-center">{{item.consumeType=='1' ? "初办" : "再续"}}</td>
									<td class="text-center">{{item.memRoy}}%</td>
									<td class="text-center"v-if="item.royProcess=='0'">0%</td>
									<td class="text-center"v-else-if="item.royProcess=='1'">70%</td>
									<td class="text-center"v-else-if="item.royProcess=='2'">100%</td>
									<td class="text-center">{{item.memProportion}}%</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="col-md-12 col-lg-12">	
					<p class="tips">* 双击单行，可对当前数据进行修改</p>
				</div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div>
			<div class="col-md-5 col-lg-5 part pb0">
				<div class="col-md-12 col-lg-12 main-title" style="height:60px; overflow:hidden;">
					
					<div class="col-md-8 col-lg-8 text-left">
						<h3  style="line-height:72px;">会员卡退费扣提成规则</h3>
					</div>
					<div class="col-md-4 col-lg-4 pull-right">
						<button type="button" class="btn btn-warning pos1" v-on:click="selectRule('SubVipRefund','1','')">添加</button>
					</div>
				</div>
				<div class="col-md-12 col-lg-12">
					<div class="table-responsive pre-scrollable" ref="tab3">
						<table class="table table-bordered table-hover mb0" id="datatable">
							<thead class="datathead">
								<tr>
									<th class="text-center col-md-2">岗位</th>
									<th class="text-center col-md-4">额度级别(大于)</th>
									<th class="text-center col-md-3">扣款比例</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in royaltyList" :key="index" v-if="item.consumeType=='3'" v-on:dblclick="selectRule('SubVipRefund','3',item)">
									<td class="text-center">{{item.posName}}</td>
									<td class="text-center">{{item.flowSmall}} 万</td>
									<td class="text-center">{{item.refundProportion}}%</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="col-md-12 col-lg-12">	
					<p class="tips">* 双击单行，可对当前数据进行修改</p>
				</div>
			</div>

			<!-- 
			<div class="col-md-5 col-lg-5 part pb0">
				<div class="col-md-12 col-lg-12 main-title" style="height:60px; overflow:hidden;">
					<div class="col-md-8 col-lg-8 text-left">
						<h3  style="line-height:72px;">退号扣提成规则</h3>
					</div>
					<div class="col-md-4 col-lg-4 pull-right">
						<button type="button" class="btn btn-warning pos1" v-on:click="selectRule('SubCharg','1','')">添加</button>
					</div>
				</div>
				<div class="col-md-12 col-lg-12">
					<div class="table-responsive pre-scrollable" ref="tab4">
						<table class="table table-bordered table-hover mb0" id="datatable">
			
							<thead class="datathead">
								<tr>
									<th class="text-center col-md-2">岗位</th>
									<th class="text-center col-md-4">退号比例(大于)</th>
									<th class="text-center col-md-3">扣款金额</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in royaltyList" :key="index" v-if="item.consumeType=='4'" v-on:dblclick="selectRule('SubCharg','3',item)">
									<td class="text-center">{{item.posName}}</td>
									<td class="text-center">{{item.orderSmall}} %</td>
									<td class="text-center">{{item.visRoy}} ¥/人</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="col-md-12 col-lg-12">	
					<p class="tips">* 双击单行，可对当前数据进行修改</p>
				</div>
			</div> -->
			<!-- <div class="col-md-5 col-lg-5 part pb0">
				<div class="col-md-12 col-lg-12 main-title">
					<div class="col-md-8 col-lg-8 text-left">
						<h3>预约人数提成规则</h3>
					</div>
					<div class="col-md-4 col-lg-4 pull-right">
						<button type="button" class="btn btn-warning pos1" v-on:click="selectRule('SubVipOrder','1','')">添加</button>
					</div>
				</div>
				<div class="col-md-12 col-lg-12">
					<div class="table-responsive pre-scrollable" ref="tab4">
						<table class="table table-bordered table-hover mb0" id="datatable">		
							<thead class="datathead">
								<tr>
									<th class="text-center col-md-2">岗位</th>
									<th class="text-center col-md-3">预约人数(大于)</th>
									<th class="text-center col-md-3">访问类型</th>
									<th class="text-center col-md-5">提成金额(元/人)</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in royaltyList" :key="index" v-if="item.consumeType=='5' || item.consumeType=='6'" v-on:dblclick="selectRule('SubVipOrder','3',item)">
									<td class="text-center">{{item.posName}}</td>
									<td class="text-center">{{item.orderSmall}} 人</td>
									<td class="text-center">{{item.consumeType=='5' ? "初访" : "复访"}}</td>
									<td class="text-center">{{item.visRoy}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="col-md-12 col-lg-12">	
					<p class="tips">* 双击单行，可对当前数据进行修改</p>
				</div>
			</div> -->
			<div style="clear:both"></div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="SubFlowWater">
				<div class="modal-dialog">
					<SubFlowWater ref='flowWater' @certainAction='feedBack'></SubFlowWater>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="SubVip">
				<div class="modal-dialog">
					<SubVip ref='vip' @certainAction='feedBack'></SubVip>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="SubVipRefund">
				<div class="modal-dialog">
					<SubVipRefund ref='refund' @certainAction='feedBack'></SubVipRefund>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="SubVipOrder">
				<div class="modal-dialog">
					<SubVipOrder ref='order' @certainAction='feedBack'></SubVipOrder>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="SubCharg">
				<div class="modal-dialog">
					<SubCharg ref='charg' @certainAction='feedBack'></SubCharg>
				</div>
			</div>
		</div>
	</div>

</template>


<script>

	import SubFlowWater from '../MP/SubRule/SubFlowWater.vue'
	import SubVip from '../MP/SubRule/SubVip.vue'
	import SubVipRefund from '../MP/SubRule/SubVipRefund.vue'
	import SubVipOrder from '../MP/SubRule/SubVipOrder.vue'
	import SubCharg from '../MP/SubRule/SubCharg.vue'
	export default {
		components: {
			SubFlowWater,
			SubVip,
			SubVipRefund,
			SubVipOrder,
			SubCharg,
		},
		data() {
			return {
				royaltyList:[],
				isuse: '1',
				name: '',
				fixedHeader: false,
			};
		},
		methods: {
			
			//feedback from adding and modifying view
			feedBack() {
				this.checkRoyaltyList()
				$("#SubFlowWater").modal('hide')
				$("#SubVip").modal('hide')
				$("#SubVipRefund").modal('hide')
				$("#SubVipOrder").modal('hide')
				$("#SubCharg").modal('hide')
			},
			// check the adding and modifying rule of account
			selectRule(module,operateType,item){
				var url = this.url + '/ruleAction/queryRule'
				
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						posId: this.accountPosId(),
						moduleGrade:'2',
						urlName:'/MP/Royalty',
						operateType:'4',
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if(res.retData=='0010'){
							var operateName=''
							if(operateType=="1"){
								operateName='add'
							}else if(operateType=="3"){
								operateName='modify'
							}
							console.log('operateName:'+operateName)
							switch(module){
								case 'Royalty':
									this.$refs.flowWater.initData(operateName,item);
									$("#SubFlowWater").modal('show');
									break;
								case 'SubVip':
									this.$refs.vip.initData(operateName,item);
									$("#SubVip").modal('show');
									break;
								case 'SubVipRefund':
									this.$refs.refund.initData(operateName,item);
									$("#SubVipRefund").modal('show');
									break;
								case 'SubVipOrder':
									this.$refs.order.initData(operateName,item);
									$("#SubVipOrder").modal('show')
									break;
								case 'SubCharg':
									this.$refs.charg.initData(operateName,item);
									$("#SubCharg").modal('show')
									break;
							}
						}else{
							alert('您没有此权限，请联系管理员！！')
						}
					} else {
						alert(res.retMsg)
					}
				
				}).catch((error) => {
					console.log('提成规则查询请求失败')
				});
			},
			//check the list of department
			checkRoyaltyList() {
				console.log('checkRoyaltyList')
				var url = this.url + '/royaltyAction/queryRoyalty'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
// 						posId: this.accountPosId(),
// 						moduleGrade:'2',
// 						urlName:'/MP/Royalty',
// 						operateType:'4',
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res)
					if (res.retCode == '0000') {
						this.royaltyList = res.retData
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('提成规则数据请求失败')
				});
			},
			handleScroll(e) {
				var self = this
				var etop = e.target.scrollTop
				var fHeaderwidth = $("#fHeader").width($(".datathead").width())
				var fHeaderheight = $("#fHeader").height($(".datathead").height())
				var theadheight = $(".datathead").height()
				var thlength = $(".datathead tr th").length
				for (var i = 0; i < thlength; i++) {
					$("#fHeader div").eq(i).width(
						$(".datathead tr th").eq(i).width()
					)
					$("#fHeader div").eq(i).height(
						$(".datathead tr th").eq(i).height()
					)
				}
				if (etop > 0) {
					self.fixedHeader = true
					$("#fHeader").css("top", etop)
				} else {
					self.fixedHeader = false
				}
			}
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll, true);
			let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;  
			let divH = (h-240)/2;
			let titH = this.$refs.tit.offsetHeight;
			let maxH = divH-titH-30;
			this.$refs.tab1.style="height:"+maxH+"px";
			this.$refs.tab2.style="height:"+maxH+"px";
			this.$refs.tab3.style="height:"+maxH+"px";
			// this.$refs.tab4.style="height:"+maxH+"px";
		},
		created() {
			// this.checkRoyaltyList()
		}
	}
</script>

<style>
	#datatable {
		position: relative;
	}

	#fHeader {
		position: absolute;
		top: 0;
		left: 0;
		background: #eeeeee;
		overflow: hidden;
	}

	#fHeader div.text-center {
		float: left;
		display: inline-block;
		padding: 8px;
		border: 1px solid #ddd;
		font-weight: bold;
	}
	@media print {
		#fHeader {
			display: none
		}
	}
	.pos1{
		margin-top:15px;
		margin-left:70px;
	}
	.part{
		box-shadow: -5px 0 5px #ccc, 5px 0 5px #ccc , 0 -5px 5px #ccc, 0 5px 5px #ccc;
		margin:20px 0 0 5%;
		background:#fff;
		padding:0 0 10px 0;
		box-sizing:border-box;
	}
	.clearfix:after{
		content:"";
		display:block;
		width:100%;
		height:0;
		clear:both;
	}
	th{
		background:#eee;
	}
	.tips{ 
		display:block; 
		text-align:left; 
		color:red; 
		font-size:12px; 
		margin-top:15px;
	}
	.mb0{ 
		margin-bottom:0;
	}
	.pb0{ 
		padding-bottom:0;
	}
</style>
