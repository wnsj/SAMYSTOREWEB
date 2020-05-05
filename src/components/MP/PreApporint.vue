<!-- the page of department management -->
<template>

	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">预约成功管理</h1>
		</div>
		<div class="row newRow" style="padding-bottom:15px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">咨询师</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
					<cou v-model="colId" @atChange="feedbadk"></cou>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">预约人</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
					<input class="form-control" type="text" v-model="name">
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">协调时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
					<select class="form-control" v-model="coordinate">
						<option value="">全部</option>
						<option value="1">需要</option>
						<option value="0">不需要</option>
					</select>
				</div>
			</div>
			<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
			 v-on:click="checkEvaluationType()">查询</button>
		</div>
		<div class="">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable">
					<table class="table table-bordered table-hover" id="datatable">

						<thead class="datathead">
							<tr>
								<th class="text-center">ID</th>
								<th class="text-center">姓名</th>
								<th class="text-center">手机号</th>
								<th class="text-center">性别</th>
								<th class="text-center">咨询师姓名</th>
								<th class="text-center">订单号</th>
								<th class="text-center">时间</th>
								<th class="text-center">接受调换</th>
								<th class="text-center">咨询方式</th>
								<th class="text-center">协调时间</th>
								<th class="text-center">备注</th>
								<th class="text-center">查询电话</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in etList" :key="index" v-on:dblclick="selectRule('3',item)">
								<td class="text-center" style="line-height:33px;">{{item.paId}}</td>
								<td class="text-center" style="line-height:33px;">{{item.name}}</td>
								<td class="text-center" style="line-height:33px;">{{item.phone}}</td>
								<td class="text-center" style="line-height:33px;">{{item.sex=='1' ? '男' : '女'}}</td>
								<td class="text-center" style="line-height:33px;">{{item.colName}}</td>
								<td class="text-center" style="line-height:33px;">{{item.tradeNum}}</td>
								<td class="text-center" style="line-height:33px;">{{item.createDate | dateFormatFilter('YYYY-MM-DD HH:mm:ss')}}</td>
								<td class="text-center" style="line-height:33px;">{{item.isReceive=='1' ? '是' : '否'}}</td>
								<td class="text-center" style="line-height:33px;">{{item.askType=='1' ? '电话' :'面对面'}}</td>
								<td class="text-center" style="line-height:33px;">{{item.coordinate=='1' ? '需要' :'不需要'}}</td>
								<td class="text-center" style="line-height:33px;">{{item.remark}}</td>
								<td class="text-center" style="line-height:33px;"><button type="button" class="btn btn-warning" v-on:click="bindPhone(item)">查看手机号</button></td>
							</tr>
						</tbody>
					</table>
				</div>
				<!--分页插件-->
				<!-- <div class="page"> -->
				<!--这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值-->
				<!-- <paging ref="paging" @change="pageChange"></paging>
				</div> -->
			</div>
			<!-- <div class="col-md-12 col-lg-12 posAb">
				<p class="tips">* 双击单行，可对当前数据进行修改</p>
			</div> -->

		</div>
		<!-- <div class="row row_edit"> -->
			<div class="modal fade" id="phoneContent">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h4 id="myModalLabel" class="modal-title">联系电话</h4>
						</div>
						<div class="modal-body  pos_r">
							<div class="tab-pane fade in active martop" id="basic">
								<form action="" class="clearfix">
									<div class="col-md-12 form-group clearfix">
										<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">电话号</label><span class="sign-left">:</span>
										<div class="col-md-8">
											<label class="form-control">{{phoneNoX}}</label>
										</div>
									</div>
									<div class="col-md-12 form-group clearfix">
										<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">分机号</label><span class="sign-left">:</span>
										<div class="col-md-8">
											<label class="form-control">{{extension}}</label>
										</div>
									</div>
									<div class="col-md-12 form-group clearfix">
										<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">失效时间</label><span class="sign-left">:</span>
										<div class="col-md-8">
											<label class="form-control">{{endDate}}</label>
										</div>
									</div>
									<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-left">
										<p style="margin-left:1.5%; color:red ;">注：拨打手机号，听到提示后输入分机号，按#号结束。</p>
										<p style="margin-left:1.5%; color:red ;">	过了失效时间，通过这个手机号将无法联系到客户。</p>
									</div>

								</form>
							</div>
						</div>
					</div>
				</div>
			<!-- </div> -->
		</div>
	</div>

</template>


<script>
	import {
		init
	} from '@/../static/js/common.js'
	import cou from '../common/Counselor.vue'
	// import Paging from '../common/paging'
	export default {
		components: {
			cou,
		},
		data() {
			return {
				etList: [],
				title: '',
				name: '',
				colId: '',
				coordinate: '1',
				phoneNoX:'',
				extension:'',
				endDate:'',
				//分页需要的数据
				// 				pages: '', //总页数
				// 				current: 1, //当前页码
				// 				pageSize: 10, //一页显示的数量
				// 				total: '', //数据的数量
			};
		},
		methods: {
			//子级传值到父级上来的动态拿去
			// 			pageChange: function(page) {
			// 				this.current = page
			// 				this.checkEvaluation(page);
			// 			},
			feedbadk(param) {
				if (this.isBlank(param)) {
					this.colId = ""
				} else {
					this.colId = param.colId
				}
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
						this.endDate = res.retData.endDate
						$("#phoneContent").modal('show')
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('测评类型请求失败处理')
				});
			},

			// check the adding and modifying rule of account
			selectRule(param, item) {
				if (param == "1") {
					this.$refs.et.initData('add')
					$("#etContent").modal('show')
				} else if (param == "3") {
					this.$refs.et.initData('modify', item)
					$("#etContent").modal('show')
				}

			},
			//check the list of position
			checkEvaluationType() {
				var url = this.url + '/preApporint/queryPreApporintList'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						colId: this.colId,
						name: this.ttName,
						coordinate: this.coordinate,

						// 						page: page.toString(),
						// 						pageSize: this.pageSize.toString(),
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						// 						this.pages = res.retData.pages //总页数
						// 						this.current = res.retData.current //当前页码
						// 						this.pageSize = res.retData.size //一页显示的数量  必须是奇数
						// 						this.total = res.retData.total //数据的数量
						// 						this.$refs.paging.setParam(this.pages, this.current, this.total)
						this.etList = res.retData
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('测评类型请求失败处理')
				});
			},
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll, true);
			init();
		},
		created() {
			// this.checkEvaluationType()
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
</style>
