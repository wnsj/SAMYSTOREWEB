<!-- the page of department management -->
<template>
	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">定金管理</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">姓名</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="cashName"></div>
			</div>

			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">手机号</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<input class="form-control" type="text" value="" v-model="phone">
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">开始时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<dPicker style="width:100%" v-model="beginDate"></dPicker>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">结束时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<dPicker style="width:100%" v-model="endDate"></dPicker>
				</div>
			</div>
		</div>
		<div class="row" style="margin-top: 15px;padding-bottom:1.5%;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-show="accountType==true">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">门店</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<Store ref='store' @storeChange='storeChange'></Store>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">状态</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
					<select class="form-control" v-model="balanceState">
						<option value="1">全部</option>
						<option value="2">未用完</option>
						<option value="3">已用完</option>
					</select>
				</div>
			</div>
			<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:2.5%;" data-toggle="modal"
			 v-on:click="selectRule('1')">添加定金</button>
			<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
			 v-on:click="checkMember(1)">查询</button>
		</div>
		<div class="">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable">
					<table class="table table-bordered table-hover" id="datatable">
						<thead class="datathead">
							<tr>
								<th class="text-center">门店</th>
								<th class="text-center">会员号</th>
								<th class="text-center">姓名</th>
								<th class="text-center">手机号</th>
								<th class="text-center">定金金额</th>
								<th class="text-center">交定金时间</th>
								<th class="text-center">定金余额</th>
								<th class="text-center">操作人</th>
								<th class="text-center">修改</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in cashList" :key="index" v-on:dblclick="modifyMember(item)">
								<td class="text-center" style="line-height:33px">{{item.storeName}}</td>
								<td class="text-center" style="line-height:33px">{{item.memNum}}</td>
								<td class="text-center" style="line-height:33px">{{item.cashName}}</td>
								<td class="text-center" style="line-height:33px">{{item.phone}}</td>
								<td class="text-center" style="line-height:33px">{{item.money}}</td>
								<td class="text-center" style="line-height:33px">{{item.createDate | dateFormatFilter("YYYY-MM-DD")}}</td>
								<td class="text-center" style="line-height:33px">{{item.balance}}</td>
								<td class="text-center" style="line-height:33px">{{item.operatorName}}</td>
								<td class="text-center">
									<button type="button" class="btn btn-warning" v-on:click="modifyMember(item)">修改</button>
									<button type="button" class="btn btn-success" v-on:click="consumptionModel(item)">消费</button>
									<button type="button" class="btn btn-danger" v-on:click="refundModel(item)">退费</button>
									<button v-if="item.memNum==null||item.memNum==''" type="button" class="btn btn-primary" v-on:click="transferMember(item)">转会员</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!--分页插件-->
				<div class="page">
					<!--这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值-->
					<paging ref="paging" @change="pageChange"></paging>
				</div>
			</div>
			<div class="col-md-12 col-lg-12 posAb">
				<p class="tips">* 双击单行，可对当前数据进行修改</p>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="cdContent">
				<div class="modal-dialog">
					<SubCd ref='subCd' @certainAction='feedBack'></SubCd>
				</div>
			</div>
		</div>

		<div class="row row_edit">
			<div class="modal fade" id="xfContent">
				<div class="modal-dialog">
					<SubCdConsumption ref='subCdConsumption' @queryAction='consumptionFeedBack'></SubCdConsumption>
				</div>
			</div>
		</div>

		<div class="row row_edit">
			<div class="modal fade" id="tfContent">
				<div class="modal-dialog">
					<SubCdRefund ref='subCdRefund' @refundAction='refundFeedBack'></SubCdRefund>
				</div>
			</div>
		</div>
		<!--转会员-->
		<div class="row row_edit">
			<div class="modal fade" id="toMember">
				<div class="modal-dialog">
					<SubTransferMember ref='toMember' @closeToMember='closeToMemberFeedBack'></SubTransferMember>
				</div>
			</div>
		</div>
	</div>

</template>


<script>
	import dPicker from 'vue2-datepicker'
	import SubCd from '../MP/SubCd/SubCd.vue'
	import Store from '../common/Store.vue'
	import SubCdConsumption from '../MP/SubCd/SubCdConsumption'
	import SubCdRefund from '../MP/SubCd/SubCdRefund'
	import Paging from '../common/paging'
	import SubTransferMember from '../MP/SubCd/SubTransferMember'
	import {
		init
	} from '@/../static/js/common.js'
	export default {
		components: {
			dPicker,
			SubCd,
			Store,

			SubCdConsumption,
			SubCdRefund,
			Paging,
			SubTransferMember
		},
		data() {
			return {
				cashList: [],
				cashName: '',
				phone: '',
				beginDate: '',
				endDate: '',
				storeId: this.storeId(),
				state: '',
				balanceState: "2",
				accountType: this.accountType(),


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
				this.checkMember(page);
			},
			selectRule(param,item){
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
			            urlName:'/MP/CashDeposit',
			            operateType:param,
			        },
			        dataType: 'json',
			    }).then((response) => {
			        var res = response.data
			        if (res.retCode == '0000') {
			            if(res.retData=='0010'){
			                console.log('param:'+param)
			                if(param==1){
			                    this.$refs.subCd.initData('add','')
			                    $("#cdContent").modal('show')
			                }else if(param==3){
			                    this.$refs.subCd.initData('modify', item)
			                    $("#cdContent").modal('show')
			                }
			            }else{
			                alert('您没有此权限，请联系管理员！！')
			            }
			        } else {
			            alert(res.retMsg)
			        }
			
			    }).catch((error) => {
			        console.log('员工权限查询请求失败')
			    });
			},
			
			transferMember(item) {
				console.log(item)
				this.$refs.toMember.initData(item)
				$("#toMember").modal('show')
			},
			closeToMemberFeedBack() {
				this.checkMember(1)
				$("#toMember").modal('hide')
			},
			//消费模态框
			consumptionModel(item) {
				if (item.state == '1') {
					alert("已经撤销，不能进行消费")
					return
				}
				if (!this.isBlank(item.memNum)) {
					alert("会员不可直接消费");
					return
				}
				if (parseFloat(item.balance) <= parseFloat('0')) {
					alert("余额为0,不可消费");
					return
				}


				this.$refs.subCdConsumption.initData(item);
				$("#xfContent").modal('show');
			},
			//退费模态框
			refundModel(item) {
				if (item.state == '1') {
					alert("已经撤销，不能进行消费");
					return
				}
				if (parseFloat(item.balance) <= parseFloat('0')) {
					alert("余额为0,没有可退费用");
					return
				}
				this.$refs.subCdRefund.initData(item);
				$("#tfContent").modal('show');
			},
			//modify the cotent of member
			modifyMember(item) {
				if (item.state == '1') {
					alert("已经撤销，不能进行修改")
					return
				}
				if (item.isConsume == '1') {
					alert("已经消费过，不能进行修改")
					return
				}
				this.selectRule('3',item)
			},
			storeChange(param) {
				if (this.isBlank(param)) {
					this.storeId = ""
				} else {
					this.storeId = param.storeId
				}
			},

			feedBack() {
				this.checkMember(1)
				$("#cdContent").modal('hide')
			},
			consumptionFeedBack() {
				this.checkMember(1)
				$("#xfContent").modal('hide')
			},
			refundFeedBack() {
				this.checkMember(1)
				$("#tfContent").modal('hide')
			},
			//check the list of member
			checkMember(page) {
				console.log('checkMember')
				var url = this.url + '/cashAction/queryCash'
				if (!this.isBlank(this.beginDate)) {
					this.beginDate = this.moment(this.beginDate, 'YYYY-MM-DD 00:00:00.000')
				}
				if (!this.isBlank(this.endDate)) {
					this.endDate = this.moment(this.endDate, 'YYYY-MM-DD 23:59:00.000')
				}
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						cashName: this.cashName,
						phone: this.phone,
						beginDate: this.beginDate,
						endDate: this.endDate,
						storeId: this.storeId,
					
						balanceState: this.balanceState,
						page: page.toString(),
						pageSize: this.pageSize
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					// console.log(res)
					if (res.retCode == '0000') {
						this.pages = res.retData.pages //总页数
						this.current = res.retData.current //当前页码
						this.pageSize = res.retData.size //一页显示的数量  必须是奇数
						this.total = res.retData.total //数据的数量
						this.$refs.paging.setParam(this.pages, this.current, this.total)
						this.cashList = res.retData.records
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('定金查询失败')
				});
			},
			cancelCush(item) {
				var url = this.url + '/cashAction/updateCash'
				if (item.state == '1') {
					alert("已经撤销，不能进行修改")
					return
				}

				item.updateDate = this.moment('', 'YYYY-MM-DD 00:00:00.000')

				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						state: '1',
						cashId: item.cashId,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					// console.log(res)
					if (res.retCode == '0000') {
						item.state = '1'
					}

				}).catch((error) => {
					console.log('定金查询失败')
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
			init();
		},
		created() {
			// this.checkMember(1)
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
