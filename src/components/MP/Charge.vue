<!-- 充值管理页 -->
<template>
	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">购买课程管理</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">会员卡号</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<input class="form-control" type="text" value="" v-model="memNum">
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">会员姓名</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<input class="form-control" type="text" value="" v-model="memName">
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">咨询师</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<emp ref="emp" @employeeChange='empChange'></emp>
				</div>
			</div>
		</div>
		<div class="row" style="margin-top: 15px;">
			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding-left:0.8%;">
				<div class="col-md-3 col-lg-3 text-right" style="padding: 0; line-height: 34px;width:20.5%">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:25px;">购买时间</p><span class="sign-left">:</span>
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
			</div>
			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding-right:30px;padding-bottom:1.5%;">
				<button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal" v-on:click="conditionCheck(1)">查询</button>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<nobr class="widthmax">
				<div class="table-responsive pre-scrollable">
					<table class="table table-bordered table-hover user-table" id="datatable">
						<thead class="datathead">
							<tr class="datatr_1">
								<th class="text-center" rowspan='2'>会员卡号</th>
								<th class="text-center" rowspan='2'>姓名</th>
								<th class="text-center" rowspan='2'>已购课程名称</th>
								<th class="text-center" rowspan='2'>咨询师</th>
								<th class="text-center" rowspan='2'>购买单价(¥/次)</th>
								<th class="text-center" rowspan='2'>购买课时(次)</th>
								<th class="text-center" rowspan='2'>购买折扣(%)</th>
								<th class="text-center" rowspan='2'>购买时间</th>
								<th class="text-center" rowspan='2'>实交金额</th>
								<th class="text-center" rowspan='2'>操作人</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index1) in chargeLsit" :key="index1">
								<td>{{item.memNum}}</td>
								<td>{{item.memName}}</td>
								<td>{{item.proName}}</td>
								<td>{{item.counselorName}}</td>
								<td>{{item.price}}</td>
								<td>{{item.actualCount}}</td>
								<td>{{item.discount}}</td>
								<td>{{item.createDate | dateFormatFilter("YYYY-MM-DD")}}</td>
								<td>{{item.realCross}}</td>
								<td>{{item.operatorName}}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!--分页插件-->
				<div class="page">
					<!--这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值-->
					<paging ref="paging" @change="pageChange"></paging>
				</div>
			</nobr>
		</div>
	</div>
</template>

<script>
	import dPicker from 'vue2-datepicker'
	import emp from '../common/Employee.vue'
	import Paging from '../common/paging'
	import {
		init
	} from '@/../static/js/common.js'
	export default {
		components: {
			dPicker,
			emp,
			Paging,
		},
		data() {
			return {
				chargeLsit: [],
				costType: '1', //费用类型（1.充值，  2.消费，3.退款）
				memNum: '',
				memName: '',
				empId: '',
				begCreateDate: '',
				endCreateDate: '',
				storeId: this.storeId(),


				//分页需要的数据
				pages: '', //总页数
				current: 1, //当前页码
				size: 10, //一页显示的数量
				total: '', //数据的数量
			};
		},
		methods: {
			//子级传值到父级上来的动态拿去
			pageChange: function(page) {
				this.current = page
				this.conditionCheck(page);
			},
			empChange(param) {
				console.log('员工信息：' + JSON.stringify(param))
				if (this.isBlank(param)) {
					this.empId = ""
				} else {
					this.empId = param.empId
				}
			},

			//feedback from adding and modifying view
			feedBack() {
				this.conditionCheck()
				$("#addFee").modal("hide")
			},


			//the list , which is detail infomation of patient,was checked.
			conditionCheck: function(page) {
				console.log('querying based on multiple conditions')
				if (!this.isBlank(this.begCreateDate)) {
					this.begCreateDate = this.moment(this.begCreateDate, 'YYYY-MM-DD 00:00:00.000')
				}
				if (!this.isBlank(this.endCreateDate)) {
					this.endCreateDate = this.moment(this.endCreateDate, 'YYYY-MM-DD 23:59:59.000')
				}
				var url = this.url + '/purchasedItemsAction/queryPurchasedItems'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						memNum: this.memNum,
						memName: this.memName,
						empId: this.empId,
						begCreateDate: this.begCreateDate,
						endCreateDate: this.endCreateDate,
						storeId: this.storeId,

						page: page.toString(),
						pageSize: this.size
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.pages = res.retData.pages //总页数
						this.current = res.retData.current //当前页码
						this.size = res.retData.size //一页显示的数量  必须是奇数
						this.total = res.retData.total //数据的数量
						this.$refs.paging.setParam(this.pages, this.current, this.total)
						this.chargeLsit = res.retData.records
					}
				}).catch((error) => {
					console.log('充值查询请求失败')
				});
			},

		},
		mounted() {
// 			this.$refs.emp.setPosName("咨询师")
// 			this.$refs.emp.setEmp("")
			init();
		},
		created() {
			// this.conditionCheck(1)
		}
	}
</script>

<style>
	/*分页需要的样式*/
	.page {
		width: 100%;
		min-width: 1068px;
		height: 36px;
		margin: 40px auto;
	}

	.widthmax {
		width: auto;
		overflow-x: scroll;
	}

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

	#fHeader div.fth_1 {}

	#fHeader div.fth_2 {
		display: block;
		position: absolute;
		margin-top: -39px;
		right: 110px;
	}

	#fHeader div.text-center {
		float: left;
		display: table;
		padding: 8px;
		border: 1px solid #ddd;
		font-weight: bold;
		vertical-align: bottom;
		position: relative;
	}

	#fHeader div.text-center p {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	@media print {
		#fHeader {
			display: none
		}
	}
</style>
