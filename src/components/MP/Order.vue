<!-- the page of department management -->
<template>
	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">预约管理</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">姓名</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="appName"></div>
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
				<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5  text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">是否到店</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
					<select class="form-control" v-model="arrival">
						<option value="">--未选择--</option>
						<option value="0">未到店</option>
						<option value="1">已到店</option>
					</select>
				</div>
			</div>
			<!--<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">-->
				<!--<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5  text-right" style="padding: 0; line-height: 34px;">-->
					<!--<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">是否取消</p><span class="sign-left">:</span>-->
				<!--</div>-->
				<!--<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">-->
					<!--<select class="form-control" v-model="state">-->
						<!--<option value="">&#45;&#45;未选择&#45;&#45;</option>-->
						<!--<option value="1">未取消</option>-->
						<!--<option value="0">已取消</option>-->
					<!--</select>-->
				<!--</div>-->
			<!--</div>-->
		</div>
		<div class="row" style="margin-top: 15px;">
			<!-- <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding-left:0.8%;">
				<div class="col-md-2 col-lg-2 text-right" style="padding: 0; line-height: 34px; width:20.5%">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:25px;">来电时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-4 col-lg-4" style="text-align:left;width:27.3%;">
					<dPicker style="width:100%" v-model="begCreateDate"></dPicker>
				</div>
				<div style="padding: 0; line-height: 34px; float:left">
					~
				</div>
				<div class="col-md-4 col-lg-4" style="text-align:left;width:27.3%;">
					<dPicker style="width:100%" v-model="endCreateDate"></dPicker>
				</div>
			</div> -->
			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding-left:0.8%;">
				<div class="col-md-2 col-lg-2 text-right" style="padding: 0; line-height: 34px;width:20.5%">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:25px;">预约时间</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-4 col-lg-4" style="text-align:left;width:27.3%;">
					<dPicker style="width:100%" v-model="begAppDate"></dPicker>
				</div>
				<div style="padding: 0; line-height: 34px; float:left">
					~
				</div>
				<div class="col-md-4 col-lg-4" style="text-align:left;width:27.3%;">
					<dPicker style="width:100%" v-model="endAppDate"></dPicker>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-show="accountType==true" style=" margin-top: 15px;">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">门店</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<store ref='store' @storeChange='storeChange'></store>
				</div>
			</div>
		</div>
		<div class="row" style="margin-top: 15px;padding-bottom:1.5%;">
			
			<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:2.5%;" data-toggle="modal"
			 v-on:click="selectRule('1')">添加预约</button>
			<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
			 v-on:click="checkOrderList(1)">查询</button>
		</div>
		<div class="">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable">
					<table class="table table-bordered table-hover" id="datatable" style="width:2000px;">
						<thead class="datathead">
							<tr>
								<th class="text-center" style="line-height:40px;">预约号</th>
								<th class="text-center" style="line-height:40px;">姓名</th>
								<th class="text-center" style="line-height:40px;">手机号</th>
								<!-- <th class="text-center">访问类型</th> -->
								<th class="text-center" style="line-height:40px;">来电时间</th>
								<th class="text-center" style="line-height:40px;">预约时间</th>
								<th class="text-center">8:30<br />9:00</th>
								<th class="text-center">9:00<br />9:30</th>
								<th class="text-center">9:30<br />10:00</th>
								<th class="text-center">10:00<br />10:30</th>
								<th class="text-center">10:30<br />11:00</th>
								<th class="text-center">11:00<br />11:30</th>
								<th class="text-center">11:30<br />12:00</th>
								<!-- <th class="text-center">12:00<br />12:30</th>
								<th class="text-center">12:30<br />13:00</th> -->
								<th class="text-center">13:00<br />13:30</th>
								<th class="text-center">13:30<br />14:00</th>
								<th class="text-center">14:00<br />14:30</th>
								<th class="text-center">14:30<br />15:00</th>
								<th class="text-center">15:00<br />15:30</th>
								<th class="text-center">15:30<br />16:00</th>
								<th class="text-center">16:00<br />16:30</th>
								<th class="text-center">16:30<br />17:00</th>
								<th class="text-center">17:00<br />17:30</th>
								<th class="text-center">17:30<br />18:00</th>
								<th class="text-center">18:00<br />18:30</th>
								<th class="text-center">18:30<br />19:00</th>
								<th class="text-center">19:00<br />19:30</th>
								<th class="text-center">19:30<br />20:00</th>
								<th class="text-center">20:00<br />20:30</th>
								<th class="text-center">20:30<br />21:00</th>
								<th class="text-center" style="line-height:40px;">取消</th>
								<th class="text-center" style="line-height:40px;">到店</th>
								<th class="text-center" style="line-height:40px;">操作人</th>
								<th class="text-center" style="line-height:40px;">修改</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in orderList" :key="index" v-on:dblclick="updateOrder(item)">
								<td class="text-center" style="line-height:33px;">{{item.memNum}}</td>
								<td class="text-center" style="line-height:33px;">{{item.appName}}</td>
								<td class="text-center" style="line-height:33px;">{{item.phone}}</td>
								<!-- <td class="text-center">{{item.visitType=='0' ? "初访" : "复访"}}</td> -->
								<td class="text-center" style="line-height:33px;">{{item.createDate | dateFormatFilter("YYYY-MM-DD")}}</td>
								<td class="text-center" style="line-height:33px;">{{item.appDate | dateFormatFilter("YYYY-MM-DD")}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time1}" style="line-height:33px;">{{item.time1==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time2}" style="line-height:33px;">{{item.time2==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time3}" style="line-height:33px;">{{item.time3==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time4}" style="line-height:33px;">{{item.time4==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time5}" style="line-height:33px;">{{item.time5==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time6}" style="line-height:33px;">{{item.time6==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time7}" style="line-height:33px;">{{item.time7==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time8}" style="line-height:33px;">{{item.time8==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time9}" style="line-height:33px;">{{item.time9==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time10}" style="line-height:33px;">{{item.time10==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time11}" style="line-height:33px;">{{item.time11==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time12}" style="line-height:33px;">{{item.time12==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time13}" style="line-height:33px;">{{item.time13==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time14}" style="line-height:33px;">{{item.time14==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time15}" style="line-height:33px;">{{item.time15==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time16}" style="line-height:33px;">{{item.time16==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time17}" style="line-height:33px;">{{item.time16==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time18}" style="line-height:33px;">{{item.time16==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time19}" style="line-height:33px;">{{item.time16==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time20}" style="line-height:33px;">{{item.time16==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time21}" style="line-height:33px;">{{item.time16==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time22}" style="line-height:33px;">{{item.time16==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ trueDate:item.time23}" style="line-height:33px;">{{item.time16==true ? "√" : "×"}}</td>
								<td class="text-center" v-bind:class="{ onOffState:!item.state}" style="line-height:33px;">{{item.state=='0' ? '已取消' : '未取消'}}</td>
								<td class="text-center" v-bind:class="{ onOffArrival:!item.arrival}" style="line-height:33px;">{{item.arrival=='0' ? '未到店' : '已到店'}}</td>
								<td class="text-center" style="line-height:33px;">{{item.operatorName}}</td>
								<td class="text-center">
									<button type="button" class="btn btn-warning" v-on:click="updateOrder(item)">修改</button>
									<button type="button" class="btn btn-primary" v-on:click="caAction(item,'cancel')">{{item.state=='0' ? '已取消' : '点击取消'}}</button>
									<button type="button" class="btn btn-primary" v-on:click="caAction(item,'arrival')">{{item.arrival=='0' ? '点击到店' : '已到店'}}</button>
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
			<div class="modal fade" id="orderContent">
				<div class="modal-dialog">
					<SubOrder ref='order' @addOrder='feedBack'></SubOrder>
				</div>
			</div>
		</div>
	</div>

</template>


<script>
	import store from '../common/Store.vue'
	import SubOrder from '../MP/SubOrder/SubOrder.vue'
	import dPicker from 'vue2-datepicker'
	import Paging from '../common/paging'
	import {
		init
	} from '@/../static/js/common.js'
	export default {
		components: {
			SubOrder,
			dPicker,
			Paging,
			store,
			
		},
		data() {
			return {
				memNum: "",
				appName: "",
				phone: "",
				visitType: "",
				begCreateDate: "",
				endCreateDate: "",
				begAppDate: "",
				endAppDate: "",
				orderList: [],
				arrival: '0',
				state: '1',
				storeId:this.storeId(),
				accountType:this.accountType(),

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
				this.checkOrderList(page);
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
			            urlName:'/MP/Order',
			            operateType:param,
			        },
			        dataType: 'json',
			    }).then((response) => {
			        var res = response.data
			        if (res.retCode == '0000') {
			            if(res.retData=='0010'){
			                console.log('param:'+param)
			                if(param==1){
			                    this.$refs.order.initData('add','')
			                    $("#orderContent").modal('show')
			                }else if(param==3){
			                    this.$refs.order.initData('modify', item)
			                    $("#orderContent").modal('show')
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
			
			updateOrder(item) {
				if (item.arrival == '1') {
					alert("已到店，不能进行修改")
				} else {
					this.selectRule('3',item)
				}
			},
			storeChange(param){
				if(this.isBlank(param)){
					this.storeId=""
				}else{
					this.storeId=param.storeId
				}
			},
			//feedback from adding and modifying view
			feedBack() {
				this.checkOrderList(1)
				$("#orderContent").modal('hide')
			},
			caAction(item, param) {
				var url = ''

				if (param == 'cancel') {
					if (item.arrival == '1') {
						alert("已到店，不能修改")
						return
					} else {
							if (confirm('是否确认取消')) {
                                url=this.url + '/appointmentAction/deleteAppointment'
							} else {
								return
							}
					}
				} else if (param == 'arrival') {
						if (item.arrival != '1') {
							if (confirm('请确认到店后，点确定')) {
								item.arrival = '1'
                                url=this.url + '/appointmentAction/updateArrival'
							} else {
								return
							}
						} else {
							alert("已到店，不能修改")
							return
						}
				}
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: item,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					alert(res.retMsg)
                    this.checkOrderList(1)
				}).catch((error) => {
					console.log('预约相关提交请求失败')
				});
			},
			//check the list of orderContent
			checkOrderList(page) {
				var url = this.url + '/appointmentAction/queryAppointment'
				if (!this.isBlank(this.begCreateDate)) {
					this.begCreateDate = this.moment(this.begCreateDate, 'YYYY-MM-DD 00:00:00.000')
				}
				if (!this.isBlank(this.endCreateDate)) {
					this.endCreateDate = this.moment(this.endCreateDate, 'YYYY-MM-DD 00:00:00.000')
				}
				if (!this.isBlank(this.begAppDate)) {
					this.begAppDate = this.moment(this.begAppDate, 'YYYY-MM-DD 00:00:00.000')
				}
				if (!this.isBlank(this.endAppDate)) {
					this.endAppDate = this.moment(this.endAppDate, 'YYYY-MM-DD 00:00:00.000')
				}
				
// 				if(this.accountType!=1){
// 					this.storeId = this.storeId()
// 				}else{
// 					this.storeId = ""
// 				}

				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						memNum: this.memNum,
						appName: this.appName,
						phone: this.phone,
						visitType: this.visitType,
						arrival: this.arrival,
						state: this.state,
						begCreateDate: this.begCreateDate,
						endCreateDate: this.endCreateDate,
						begAppDate: this.begAppDate,
						endAppDate: this.endAppDate,
						storeId: this.storeId,
						
                        page:page.toString(),
                        pageSize:this.pageSize
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					//console.log(JSON.stringify(res))
					if (res.retCode == '0000') {
						this.pages = res.retData.pages //总页数
						this.current = res.retData.current //当前页码
						this.pageSize = res.retData.size //一页显示的数量  必须是奇数
						this.total = res.retData.total //数据的数量
						this.$refs.paging.setParam(this.pages, this.current, this.total)
						this.orderList = res.retData.records
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('请求失败处理')
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
			// this.checkOrderList(1)
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

	.trueDate {
		background: #6CA1BF;
		color: #fff;
	}

	.onOffState {
		background: #D9524E;
		color: #fff;
	}

	.onOffArrival {
		background: #5CB95C;
		color: #fff;
	}
</style>
