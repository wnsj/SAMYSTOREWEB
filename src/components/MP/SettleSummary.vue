<template>
	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">消费汇总</h1>
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
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">会员卡号</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="memNum"></div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">姓名</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="memName"></div>
			</div>

			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">手机号</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<input class="form-control" type="text" value="" v-model="phone">
				</div>
			</div>
		</div>
		<div class="row" style="margin-top: 15px;">
			<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding-left:10px;">
				<div class="col-md-3 col-lg-3 text-right" style="padding: 0; line-height: 34px; width:20.5%;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:25px;">消费时间</p><span class="sign-left">:</span>
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
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">咨询师</p><span class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <emp ref="counlorEmp" @employeeChange="counlorEmpChange" v-on:change="selectHours()"></emp>
                </div>
            </div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding-right:30px; padding-bottom:1.5%;">
				<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
				 v-on:click="conditionCheck(1)">查询</button>
			</div>
		</div>

		<div>
			<div class="col-md-12 col-lg-12">
				<nobr class="widthmax">
					<div class="table-responsive pre-scrollable">
						<table class="table table-bordered table-hover user-table" id="datatable">
							<thead class="datathead">
								<tr>
									<th class="text-center">会员卡号</th>
									<th class="text-center">姓名</th>
									<th class="text-center">手机号</th>
									<th class="text-center">项目</th>
									<th class="text-center">单价</th>
									<th class="text-center">课时(小时)</th>
									<th class="text-center">折扣(%)</th>
									<th class="text-center">消费金额</th>
									<th class="text-center">咨询师</th>
									<th class="text-center">消费时间</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item2,index2) in consumeList" :key="index2">
									<td>{{item2.memNum}}</td>
									<td>{{item2.memName}}</td>
									<td>{{item2.phone}}</td>
									<td>{{item2.proName}}</td>
									<td>{{item2.price}}</td>
									<td>{{item2.consumCount}}</td>
									<td>{{item2.discount}}</td>
									<td>{{item2.zsum}}</td>
									<td>{{item2.empName}}</td>
									<td>{{item2.creatDate | dateFormatFilter("YYYY-MM-DD")}}</td>
								</tr>
							</tbody>
						</table>
					</div>
                    <div class="row">
                        <div class="col-md-3 col-lg-3">
                            <p class="tips" style="font-size: 20px">总课时数：{{consumCountTotal}} 小时</p>
                        </div>
                        <div class="col-md-3 col-lg-3">
                            <p class="tips" style="font-size: 20px">总消费额：{{sumTotal}} 元</p>
                        </div>
                        <div class="col-md-3 col-lg-3" v-show="showHours">
                            <p class="tips" style="font-size: 20px">已消费课时：{{consumptionHours}} 小时</p>
                        </div>
                        <div class="col-md-3 col-lg-3" v-show="showHours">
                            <p class="tips" style="font-size: 20px">未消费课时：{{unusedHours}} 小时</p>
                        </div>
                    </div>
					<!--分页插件-->
					<div class="page">
						<!--这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值-->
						<paging ref="paging" @change="pageChange"></paging>
					</div>
				</nobr>
			</div>
			<div class="col-md-12 col-lg-12">
				<p class="tips">
					<!--* 双击单行，可查看会员详细的消费情况；非会员流水没有明细-->
				</p>
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="addConsume">
				<div class="modal-dialog">
					<SubConsume ref="consume"></SubConsume>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import dPicker from 'vue2-datepicker'
	import SubConsume from '../MP/SubConsume/SubConsumeList.vue'
	import store from '../common/Store.vue'
	import Paging from '../common/paging'
    import emp from '../common/Employee.vue'
	import {
		init
	} from '@/../static/js/common.js'
	export default {
		name: 'employee',
		components: {
			dPicker,
			SubConsume,
			Paging,
			store,
            emp
		},
		data() {
			return {
                empId:'',
				storeId: this.storeId(),
				memNum: '',
				memName: '',
				phone: '',
				consumeList: [],
				hospTime: '',
				outHosp: '',
				singleData: {},
				begCreateDate: '',
				endCreateDate: '',
				accountType:this.accountType(),
				//分页需要的数据
				pages: '', //总页数
				current: 1, //当前页码
                pageSize: 10, //一页显示的数量
				total: '', //数据的数量

                sumTotal:'0',//消费的总金额
                consumCountTotal:'0',//消费的总课时

                showHours:false,//控制显示咨询师已消费课时，未消费课时
                consumptionHours:'',//已消费课时
                unusedHours:'',//未消费课时
			}
		},

		methods: {
			//子级传值到父级上来的动态拿去
			pageChange: function(page) {
				this.current = page
				this.conditionCheck(page);
			},
            //咨询师
            counlorEmpChange: function(param) {
			    console.log(param)
                
                console.log("进入了这个方法")
                if (this.isBlank(param)) {
                    this.empId = ""
                    this.showHours=false
                } else {
                    this.empId = param.empId

                    //this.$refs.counlorEmp.setEmpId(this.empId)
                    var url = this.url + '/accountRecordAction/queryhours'
                    this.$ajax({
                        method: 'POST',
                        url: url,
                        headers: {
                            'Content-Type': this.contentType,
                            'Access-Token': this.accessToken
                        },
                        data: {
                            empId:this.empId,
                        },
                        dataType: 'json',
                    }).then((response) => {
                        var res = response.data
                        console.log(res)
                        if (res.retCode == '0000') {
                            //咨询师消费课时，未消费课时
                            if(res.retData==null){
                                this.showHours=false
                            }else {
                                if(res.retData.consumptionHours==null){
                                    this.consumptionHours='0'
                                }else {
                                    this.consumptionHours=res.retData.consumptionHours
                                }
                                if(res.retData.unusedHours==null){
                                    this.unusedHours='0'
                                }else {
                                    this.unusedHours=res.retData.unusedHours
                                }
                                this.showHours=true
                            }

                        } else {
                            alert(res.retMsg)
                        }
                    }).catch((error) => {
                        console.log('请求失败处理')
                    });
                }
            },
            selectHours(){
			  alert("hhhhhhhhhhh"+this.empId)
            },
			storeChange(param) {
				if (this.isBlank(param)) {
					this.storeId = ""
				} else {
					this.storeId = param.storeId
				}
			},
			conditionCheck: function(page) {
				
				if (!this.isBlank(this.begCreateDate)) {
					this.begCreateDate = this.moment(this.begCreateDate, 'YYYY-MM-DD 00:00:00.000')
				}
				if (!this.isBlank(this.endCreateDate)) {
					this.endCreateDate = this.moment(this.endCreateDate, 'YYYY-MM-DD 23:59:00.000')
				}
				if (this.isBlank(page)) {
					page = 1
				}
				var url = this.url + '/accountRecordAction/consumptionSummary'
				console.log("page=" + page)
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						storeId: this.storeId,
						memName: this.memName,
						memNum: this.memNum,
						phone: this.phone,
						begCreateDate: this.begCreateDate,
						endCreateDate: this.endCreateDate,

						page: page.toString(),
						pageSize: this.pageSize,
                        empId:this.empId
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					console.log(res);
					if (res.retCode == '0000') {

						this.pages = res.retData.pageRows.pages //总页数
						this.current = res.retData.pageRows.current //当前页码
						this.pageSize = res.retData.pageRows.size //一页显示的数量  必须是奇数
						this.total = res.retData.pageRows.total //数据的数量
						this.$refs.paging.setParam(this.pages, this.current, this.total)
						this.consumeList = res.retData.pageRows.records;
						if(res.retData.poolSum!=null){
                            this.consumCountTotal=res.retData.poolSum.consumCountTotal
                            this.sumTotal=res.retData.poolSum.sumTotal
                        }else {
                            this.consumCountTotal='0'
                            this.sumTotal='0'
                        }


					}
				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			viewDetails: function(item) {

				if (this.isBlank(item.MEM_NUM)) {
					alert('非会员没有消费详情')
					return
				}
				this.$refs.consume.conditionCheck(item)
				$("#addConsume").modal('show');
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
			window.addEventListener('scroll', this.handleScroll, true)
			
			init();
            this.$refs.counlorEmp.setPosName("咨询师")
            this.$refs.counlorEmp.setEmp("")
		},
		created() {
			// this.conditionCheck(1)
		},

	}
</script>


<style scoped="scoped">
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

	#fHeader div.text-center {
		float: left;
		display: inline-block;
		padding: 8px;
		border: 1px solid #ddd;
		font-weight: bold;
	}

	.pa-right {
		padding-right: 0;
	}

	.pa-left {
		padding-left: 0;
	}

	@media print {
		#fHeader {
			display: none
		}
	}
</style>
