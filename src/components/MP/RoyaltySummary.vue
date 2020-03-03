<template>
	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">提成汇总</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-show="accountType==true">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">门店</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<store ref='store' @storeChange='storeChange'></store>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">姓名</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="empName"></div>
			</div>

			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">岗位</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<pos ref='pos' @positionChange='positionChange'></pos>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">月份</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<dPicker style="width:100%" format="YYYY-MM" v-model="createDate"></dPicker>
				</div>
			</div>
		</div>
		<div class="row" style="margin-top: 15px;padding-bottom:1.5%;">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding-right:30px; padding-bottom:1.5%;">
				<button type="button" class="btn btn-primary pull-right m_r_10" data-toggle="modal"
				 v-on:click="conditionCheck()">查询</button>
			</div>
		</div>

		<div>
			<div class="col-md-12 col-lg-12">
				<nobr class="widthmax">
					<div class="table-responsive pre-scrollable">
						<table class="table table-bordered table-hover user-table" id="datatable">
							<thead class="datathead">
								<tr>
									<th class="text-center">姓名</th>
									<th class="text-center">岗位</th>
									<th class="text-center">在职</th>
									<th class="text-center">提成总额</th>
									<th class="text-center">扣费总额</th>
									<th class="text-center">合计总额</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in royaltyList" :key="index" v-on:dblclick="checkDetail(item)">
									<td>{{item.empName}}</td>
									<td>{{item.posName}}</td>
									<td>{{item.isuse == 1 ? "在职" : "离职"}}</td>
									<td>{{item.royalty > 0 ? item.royalty : ""}}</td>
									<td>{{item.refund > 0 ? item.refund : ""}}</td>
									<td>{{item.balance != 0 ? item.balance : ""}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</nobr>
			</div>
			<div class="col-md-12 col-lg-12 posAb">
				<p class="tips">* 双击单行，可查看详情提成情况和扣款情况</p>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="subRoy">
				<div class="modal-dialog">
					<SubRoy ref="subRoy"></SubRoy>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import axios from 'axios'
	import dPicker from 'vue2-datepicker'
	import SubRoy from '../MP/SubRoySum/SubRoyList'
	import store from '../common/Store.vue'
	import pos from '../common/Position.vue'
	import {
		init
	} from '@/../static/js/common.js'
	export default {
		name: 'employee',
		components: {
			dPicker,
			SubRoy,
			store,
			pos,
		},
		data() {
			return {
				royaltyList: [],
				storeId: this.storeId(),
				empName: '',
				posId: '',
				createDate: '',
				accountType:this.accountType(),
			}
		},

		methods: {
			//feedback store information
			storeChange: function(param) {
				if (this.isBlank(param)) {
					this.storeId = ""
				} else {
					this.storeId = param.storeId
				}
				console.log('store' + this.storeId)
			},
			//feedback MedicalInsuranceStype information
			positionChange: function(param) {
				if (this.isBlank(param)) {
					this.posId = ""
				} else {
					this.posId = param.posId
				}
				console.log('store' + this.posId)
			},
			
			feedback() {
				this.conditionCheck()
				$("#addPatient").modal('hide')
			},
			
			//modify the cotent of patient
			checkDetail(item) {
				this.$refs.subRoy.initData(item)
				$("#subRoy").modal('show')
			},
			//the list , which is detail infomation of patient,was checked.
			conditionCheck: function() {
				console.log('querying based on multiple conditions')
				this.createDate = this.moment(this.createDate,'YYYY-MM-DD 00:00:00.000')
				var url = this.url + '/employeeAction/queryEmpRoyalty'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						
						storeId:this.storeId,
						posId:this.posId,
						empName:this.empName,
						createDate:this.createDate,
						
						
// 						accountId: this.accountId(),
// 						moduleGrade:'2',
// 						urlName:'/MP/RoyaltySummary',
// 						operateType:'4',
						
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data

					this.royaltyList = res.retData
				}).catch((error) => {
					console.log('提成信息查询失败')
				});
			},
			
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll, true)
			if (window.performance.navigation.type == 1) {
				console.log("页面被刷新")
			} else {
				console.log("首次被加载")
			}
			init();
		},
		created() {
			// this.conditionCheck()
		},

	}
</script>


<style scoped="scoped">
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
