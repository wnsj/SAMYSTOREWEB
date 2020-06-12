<!-- the page of department management -->
<template>

	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">沙龙管理</h1>
		</div>
		<div class="row newRow" style="padding-bottom:15px;">
			<!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-show="accountType==true">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">门店</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<store ref='store' @storeChange='storeChange'></store>
				</div>
			</div> -->
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">标题</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
					<input class="form-control" type="text" v-model="title">
				</div>
			</div>
			<div class="col-md-3">
				<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">活动时间</label><span class="sign-left">:</span>
				<div class="col-md-8">
					<dPicker v-model="dateArr" type="date" value-type="format" format="YYYY-MM-DD" range>
						<template v-slot:header="{ emit }">
							<div style="text-align: left">
							</div>
						</template>
					</dPicker>
				</div>
			</div>
			<!-- <div class="col-md-6 form-group clearfix">
				<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">活动时间</label><span
				 class="sign-left">:</span>
				<div class="col-md-8">
					<dPicker v-model="object.acDate" type="date" value-type="format" format="YYYY-MM-DD"></dPicker>
				</div>
			</div> -->
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">是否在用</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
					<select class="form-control" v-model="isUse">
						<option value="">全部</option>
						<option value="1">在用</option>
						<option value="0">停用</option>
					</select>
				</div>
			</div>
			<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
			 v-on:click="selectRule('1')">添加</button>
			<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
			 v-on:click="checkEvaluation(1)">查询</button>
		</div>
		<div class="">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable table-bg">
					<table class="table table-bordered table-hover" id="datatable">

						<thead class="datathead">
							<tr>
								<th class="text-center">标题</th>
								<th class="text-center">副标题</th>
								<th class="text-center">咨询师姓名</th>
								<th class="text-center">门店</th>
								<th class="text-center">标签</th>
								<th class="text-center">参加人数</th>
								<th class="text-center">价格(¥)</th>
								<th class="text-center">购买人数</th>
								<th class="text-center">是否在用</th>
								<th class="text-center">是否置顶</th>
								<th class="text-center">活动时间</th>
								<th class="text-center">查询预购列表</th>
								<th class="text-center">修改</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in objectList" :key="index" v-on:dblclick="selectRule('3',item)">
								<td class="text-center" style="line-height:33px;">{{item.title}}</td>
								<td class="text-center" style="line-height:33px;">{{item.subTitle}}</td>
								<td class="text-center" style="line-height:33px;">{{item.colName}}</td>
								<td class="text-center" style="line-height:33px;">{{item.storeName}}</td>
								<td class="text-center" style="line-height:33px;">{{item.labelTitle}}</td>
								<td class="text-center" style="line-height:33px;">{{item.limitNum}}</td>
								<td class="text-center" style="line-height:33px;">{{item.price}}</td>
								<td class="text-center" style="line-height:33px;">{{item.preNum}}</td>
								<td class="text-center" style="line-height:33px;">{{item.isUse=='1'? "是" : "否"}}</td>
								<td class="text-center" style="line-height:33px;">{{item.isTop=='1'? "是" : "否"}}</td>
								<td class="text-center" style="line-height:33px;">{{item.acDate | dateFormatFilter('YYYY-MM-DD')}}</td>
								<td class="text-center" style="line-height:33px;"><button type="button" class="btn btn-warning" v-on:click="queryPrePurchaseList(item)">查询预购列表</button></td>
								<td class="text-center" style="line-height:33px;"><button type="button" class="btn btn-warning" v-on:click="selectRule('3',item)">修改</button></td>
							</tr>
						</tbody>
					</table>
				</div>
				<!--分页插件-->
				<div class="page">
					<p class="tips">* 双击单行，可对当前数据进行修改</p>
					<!--这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值-->
					<paging ref="paging" @change="pageChange"></paging>
				</div>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="saContent">
				<div class="modal-dialog">
					<sa ref='sa' @certainAction='feedBack'></sa>
				</div>
			</div>
		</div>
		<div class="modal fade" id="prePurchase">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" aria-hidden="true" class="close" v-on:click="closeQueryPrePurchaseList()">×</button>
						<h4 id="myModalLabel" class="modal-title">预购列表</h4>
					</div>
					<div class="modal-body  pos_r">
						<div class="tab-pane fade in active martop" id="basic">
							
							<div class="table-responsive pre-scrollable table-bg">
								<table class="table table-bordered table-hover" id="datatable">
							
									<thead class="datathead">
										<tr>
											<th class="text-center">ID</th>
											<th class="text-center">姓名</th>
											<th class="text-center">付款状态</th>
											<th class="text-center">查询手机号</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item,index) in preObjectList" :key="index">
											<td class="text-center" style="line-height:33px;">{{item.paId}}</td>
											<td class="text-center" style="line-height:33px;">{{item.name}}</td>
											<td class="text-center" v-show="item.state=='0'" style="line-height:33px;">{{"未付款"}}</td>
											<td class="text-center" v-show="item.state=='1'" style="line-height:33px;">{{"已付款"}}</td>
											<td class="text-center" v-show="item.state=='2'" style="line-height:33px;">{{"退款中"}}</td>
											<td class="text-center" v-show="item.state=='3'" tyle="line-height:33px;">{{"已退款"}}</td>
											<td class="text-center" style="line-height:33px;"><button type="button" class="btn btn-warning" v-on:click="bindPhone(item)">查询手机号</button></td>
										</tr>
									</tbody>
								</table>
							</div>
						
							<div class="col-md-12  clearfix" style="padding-top: 15px;">
								<div class="col-md-12 form-group clearfix">
									<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">电话号</label><span
									 class="sign-left">:</span>
									<div class="col-md-8">
										<label class="form-control">{{phoneNoX}}</label>
									</div>
								</div>
								<div class="col-md-12 form-group clearfix">
									<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">分机号</label><span
									 class="sign-left">:</span>
									<div class="col-md-8">
										<label class="form-control">{{extension}}</label>
									</div>
								</div>
								<div class="col-md-12 form-group clearfix">
									<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">失效时间</label><span
									 class="sign-left">:</span>
									<div class="col-md-8">
										<label class="form-control">{{cancelDate}}</label>
									</div>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-left">
									<p style="margin-left:1.5%; color:red ;">注：拨打手机号，听到提示后输入分机号，按#号结束。</p>
									<p style="margin-left:1.5%; color:red ;"> 过了失效时间，通过这个手机号将无法联系到客户。</p>
								</div>
									
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>


<script>

	import dPicker from 'vue2-datepicker'
	import sa from '../MP/SubActivity/SubActivity.vue'
	import {
		init
	} from '@/../static/js/common.js'
	import Paging from '../common/paging'
	import emp from '../common/Employee.vue'
	export default {
		components: {
			sa,
			Paging,
			dPicker,
			emp,
		},
		data() {
			return {
				objectList: [],
				preObjectList:[],
				title:'',
				isUse:'1',
				testType:'',
				phoneNoX:'',
				extension:'',
				cancelDate:'',
				dateArr:'',
				begDate:'',
				endDate:'',
				
				
				//分页需要的数据
				pages: '', //总页数
				current: 1, //当前页码
				pageSize: 10, //一页显示的数量
				total: '', //数据的数量
			};
		},
		methods: {
			//子级传值到父级上来的动态拿去
			pageChange: function(page) {
				this.current = page
				this.checkEvaluation(page);
			},
			
			//feedback from adding and modifying view
			feedBack() {
				this.checkEvaluation(1)
				$("#saContent").modal('hide')
			},

			
			// check the adding and modifying rule of account
			selectRule(param, item) {
				if (param == "1") {
					this.$refs.sa.initData('add')
					$("#saContent").modal('show')
				} else if (param == "3") {
					this.$refs.sa.initData('modify', item)
					$("#saContent").modal('show')
				}

			},
			etChange(param){
				if(this.isBlank(param)){
					this.testType=""
				}else{
					this.testType=param.ttId
				}
			},
			//check the list of position
			checkEvaluation(page) {
				if(this.dateArr.length>0 && !this.isBlank(this.dateArr[0]) && !this.isBlank(this.dateArr[1])){
					this.begDate = this.moment(this.dateArr[0],'YYYY-MM-DD 00:00:00.000')
					this.endDate = this.moment(this.dateArr[1],'YYYY-MM-DD 59:59:59.000')
				}else{
					this.begDate = ''
					this.endDate = ''
				}
				var url = this.url + '/activity/queryActivityList'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						title:this.title,
						begDate:this.begDate,
						endDate:this.endDate,
						isUse:this.isUse,
						
						page: page.toString(),
						pageSize: this.pageSize.toString(),
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.pages = res.retData.pages //总页数
						this.current = res.retData.current //当前页码
						this.pageSize = res.retData.size //一页显示的数量  必须是奇数
						this.total = res.retData.total //数据的数量
						this.$refs.paging.setParam(this.pages, this.current, this.total)
						this.objectList = res.retData.records
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			queryPrePurchaseList(item) {
				var url = this.url + '/preActivity/queryPreActivitytList'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						acId:item.acId,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.preObjectList = res.retData
						if(this.preObjectList.length>0){
							$("#prePurchase").modal('show')
						}else{
							alert("没有预购记录")
						}
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('活动购买支付列表请求失败处理')
				});
			},
			bindPhone: function(item) {
				var url = this.urlSamy+'/bindPhoneAction/bindPhone'
				console.log(this.accountId())
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						accId:'1',
						projectType:'1',
						phonea: item.phone,
						storeId: item.storeId,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.phoneNoX = res.retData.phoneNoX
						this.extension = res.retData.extension
						this.cancelDate = res.retData.endDate
						$("#phoneContent").modal('show')
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('测评类型请求失败处理')
				});
			},
			closeBindPhone(){
				$("#phoneContent").modal('hide')
			},
			closeQueryPrePurchaseList(){
				$("#prePurchase").modal('hide')
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
			init();
		},
		created() {
			this.checkEvaluation(1)
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
	.newRow{
        margin-top:15px;
        margin-left:0;
        margin-right:0;
    }
    .table-bg{
        background:#f9f9f9;
    }
    .page{
		position:relative;
		width:100%;
        margin-top:15px;
    }
    .page .tips{
		position:absolute;
		left:0;
		top:0;
		display:inline;
        height:36px;
        line-height:36px;
		margin-top:0;
    }
	 #app .page .ul{
        min-width:auto;
    }
</style>
