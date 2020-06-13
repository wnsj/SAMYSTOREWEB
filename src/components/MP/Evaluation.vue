<!-- the page of department management -->
<template>

	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">测评管理</h1>
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
				<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">测评类型</label><span class="sign-left">:</span>
				<div class="col-md-8">
					<et ref='et' @etChange='etChange'></et>
				</div>
			</div>
			<!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">是否在用</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
					<select class="form-control" v-model="isuse">
						<option value="">全部</option>
						<option value="1">在用</option>
						<option value="0">停用</option>
					</select>
				</div>
			</div> -->
			<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
			 v-has="'Evaluation:add'" v-on:click="selectRule('1')">添加</button>
			<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
			 v-on:click="checkEvaluation(1)">查询</button>
		</div>
		<div class="">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable table-bg">
					<table class="table table-bordered table-hover" id="datatable">

						<thead class="datathead">
							<tr>
								<th class="text-center">序号</th>
								<th class="text-center">标题</th>
								<th class="text-center">测试人数(人)</th>
								<th class="text-center">价格(元)</th>
								<th class="text-center">题目数(个)</th>
								<th class="text-center">测试题类型</th>
								<th class="text-center">头图链接</th>
								<th class="text-center">修改</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in evaluationList" :key="index" v-on:dblclick="selectRule('3',item)">
								<td class="text-center" style="line-height:33px;">{{item.serialNumber}}</td>
								<td class="text-center" style="line-height:33px;">{{item.title}}</td>
								<td class="text-center" style="line-height:33px;">{{item.testNum}}</td>
								<td class="text-center" style="line-height:33px;">{{item.price}}</td>
								<td class="text-center" style="line-height:33px;">{{item.problemNum}}</td>
								<td class="text-center" style="line-height:33px;">{{item.ttName}}</td>
								<td class="text-center" style="line-height:33px;">{{item.imgUrl}}</td>
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
			<div class="modal fade" id="evaluationContent">
				<div class="modal-dialog">
					<SubEvaluation ref='subEvaluation' @certainAction='feedBack'></SubEvaluation>
				</div>
			</div>
		</div>
	</div>

</template>


<script>
	import store from '../common/Store.vue'
	import et from '../common/EvaluationType.vue'
	import emp from '../common/Employee.vue'
	import SubEvaluation from '../MP/SubProject/SubEvaluation.vue'
	import {
		init
	} from '@/../static/js/common.js'
	import Paging from '../common/paging'
	export default {
		components: {
			store,
			emp,
			SubEvaluation,
			Paging,
			et,
		},
		data() {
			return {
				evaluationList: [],
				title:'',
				testType:'',
				
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
				$("#evaluationContent").modal('hide')
			},

			// check the adding and modifying rule of account
			selectRule(param, item) {
				if (param == "1") {
					this.$refs.subEvaluation.initData('add')
					$("#evaluationContent").modal('show')
				} else if (param == "3") {
					if(!this.has('Evaluation:modify')){
						alert('您还没有权限，请联系管理员')
						return 
					}
					this.$refs.subEvaluation.initData('modify', item)
					$("#evaluationContent").modal('show')
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
				var url = this.url + '/testProblemBase/queryTestProblemBaseList'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						tpbId: "",
						title:this.title,
						testType:this.testType,
						
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
						this.evaluationList = res.retData.records
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
