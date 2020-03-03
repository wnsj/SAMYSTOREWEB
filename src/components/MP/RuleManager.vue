<template>
	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">权限管理</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">账户名</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="accountNum"></div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">员工姓名</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="empName"></div>
			</div> -->

			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">岗位类型</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<pos ref="pos" @positionChange='positionChange'></pos>
				</div>
			</div>

			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">账户类型</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<select class="form-control" v-model="employeeType">
						<option value="0">--未选择--</option>
						<option value="1">超级管理员</option>
						<option value="2">店铺管理员</option>
						<option value="3">财务</option>
					</select>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">模块</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<mod ref="mod" @moduleChange="moduleChange"></mod>
				</div>
			</div>
			
		</div>
		<div class="row" style="margin-top: 15px;padding-bottom:1.5%;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">模块级别</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<select class="form-control" v-model="moduleGrade">
						<option value="0">--未选择--</option>
						<option value="0">一级</option>
						<option value="1">二级</option>
					</select>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">操作类型</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<select class="form-control" v-model="operateType">
						<option value="0">--未选择--</option>
						<option value="1">增</option>
						<option value="2">删</option>
						<option value="3">改</option>
						<option value="4">查</option>
					</select>
				</div>
			</div>
			<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:2.5%;" data-toggle="modal"
			 v-on:click="addRule()">添加</button>
			<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
			 v-on:click="conditionCheck()">查询</button>
		</div>
		<div>
			<div class="col-md-12 col-lg-12">
				<nobr class="widthmax">
					<div class="table-responsive pre-scrollable">
						<table class="table table-bordered table-hover user-table" id="datatable">

							<thead class="datathead">
								<tr>
									<!-- <th class="text-center">账户</th>
									<th class="text-center">员工姓名</th>
									<th class="text-center">账户类型</th> -->
									<th class="text-center">岗位类型</th>
									<th class="text-center">模块级别</th>
									<th class="text-center">模块</th>
									<th class="text-center">操作类型</th>
									<th class="text-center">权限删除</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in ruleList" :key="index">
									<!-- <td>{{item.accountNum}}</td>
									<td>{{item.empName}}</td>
									<td v-show="item.employeeType=='1'">超级管理员</td>
									<td v-show="item.employeeType=='2'">店铺管理员</td>
									<td v-show="item.employeeType=='3'">财务</td> -->
									<td>{{item.posName}}</td>
									<td>{{item.moduleGrade=='1' ? "第一层级" : "第二层级"}}</td>
									<td>{{item.moduleId > 0 ? item.moduleName : "所有"}}</td>
									<td v-show="item.operateType=='1'">添加功能</td>
									<td v-show="item.operateType=='2'">删除功能</td>
									<td v-show="item.operateType=='3'">修改功能</td>
									<td v-show="item.operateType=='4'">查询功能</td>
									<td v-show="item.operateType !='1' && item.operateType !='2' && item.operateType !='3' && item.operateType !='4'">所有</td>
									<td><button type="button" class="btn btn-warning" v-on:click="deleteRule(item)">取消</button></td>
								</tr>
							</tbody>
						</table>
					</div>
				</nobr>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="rm">
				<div class="modal-dialog">
					<SubRm ref="rm" @addRule='feedback'></SubRm>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import axios from 'axios'
	import dPicker from 'vue2-datepicker'
	import SubRm from '../MP/SubRm/SubRm'
	import mod from '../common/Model.vue'
	import pos from '../common/Position.vue'
	import {
		init
	} from '@/../static/js/common.js'
	export default {
		name: 'employee',
		components: {
			dPicker,
			SubRm,
			mod,
			pos,
		},
		data() {
			return {
				ruleList: [],
				accountNum: '',
				employeeType: '0',
				empName: '',
				posId:'0',
				moduleId: '0',
				moduleGrade: '0',
				operateType: '0',
			}
		},

		methods: {
			addRule() {
				$("#rm").modal('show');
			},
			
			positionChange: function(param) {
			    if (this.isBlank(param)) {
			        this.posId = ""
			    } else {
			        this.posId = param.posId
			    }
			},
			//feedback department information
			moduleChange: function(param) {
				if (this.isBlank(param)) {
					this.moduleId = ""
				} else {
					this.moduleId = param.moduleId
				}
			},
			deleteRule(item) {
				console.log("权限ID："+item.ruleId)
				var url = this.url + '/ruleAction/deleteRule'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						ruleId:item.ruleId
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						alert(res.retMsg)
						this.conditionCheck()
					} else {
						alert(res.retMsg)
					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},


			feedback() {
				this.conditionCheck()
				$("#rm").modal('hide')
			},


			//the list , which is detail infomation of patient,was checked.
			conditionCheck: function() {
				console.log('querying based on multiple conditions')
				var url = this.url + '/ruleAction/queryRuleList'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
// 						accountNum: this.accountNum,
// 						empName:this.empName,
// 						employeeType: this.employeeType,
						posId:this.posId,
						moduleId: this.moduleId,
						moduleGrade: this.moduleGrade,
						operateType: this.operateType,
						
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					// console.log(JSON.stringify(res))
					if (res.retCode == '0000') {
						this.ruleList = res.retData;
					}
				}).catch((error) => {
					console.log('请求失败处理')
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
