<!-- the page of department management -->
<template>

	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">咨询师管理</h1>
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
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">姓名</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
					<input class="form-control" type="text" v-model="title">
				</div>
			</div>
			<!-- <div class="col-md-3">
				<label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">测评类型</label><span class="sign-left">:</span>
				<div class="col-md-8">
					<et ref='et' @etChange='etChange'></et>
				</div>
			</div> -->
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
								<th class="text-center">ID</th>
								<th class="text-center">姓名</th>
								<th class="text-center">单价</th>
								<th class="text-center">首次单价</th>
								<th class="text-center">预约定金</th>
								<th class="text-center">咨询经验</th>
								<th class="text-center">咨询方式</th>
								<th class="text-center">咨询分类</th>
								<th class="text-center">擅长方向</th>
								<th class="text-center">受训经历</th>
								<th class="text-center">受训经历</th>
								<th class="text-center">职业履历</th>
								<th class="text-center">履历通过</th>
								<th class="text-center">简单介绍</th>
								<th class="text-center">标签1</th>
								<th class="text-center">标签2</th>
								<th class="text-center">标签3</th>
								<th class="text-center">简介</th>
								<!-- <th class="text-center">关联咨询师</th> -->
								<th class="text-center">修改</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in counselorList" :key="index" v-on:dblclick="selectRule('3',item)">
								<td class="text-center" style="line-height:33px;">{{item.colId}}</td>
								<td class="text-center" style="line-height:33px;">{{item.colName}}</td>
								<td class="text-center" style="line-height:33px;">{{item.price}}</td>
								<td class="text-center" style="line-height:33px;">{{item.firstPrice}}</td>
								<td class="text-center" style="line-height:33px;">{{item.prePrice}}</td>
								<td class="text-center" style="line-height:33px;">{{item.practiseTimeNum}}</td>
								<td class="text-center" style="line-height:33px;" v-show="item.askType==1">面对面</td>
								<td class="text-center" style="line-height:33px;" v-show="item.askType==2">电话</td>
								<td class="text-center" style="line-height:33px;" v-show="item.askType==3">面对面/电话</td>
								<td class="text-center" style="line-height:33px;">{{item.ccName}}</td>
								<td class="text-center" style="line-height:33px;">{{item.professional}}</td>
								<td class="text-center" style="line-height:33px;">{{item.receiveTraining}}</td>
								<td class="text-center" style="line-height:33px;">{{item.isRt}}</td>
								<td class="text-center" style="line-height:33px;">{{item.curriculumVitae}}</td>
								<td class="text-center" style="line-height:33px;">{{item.isCv}}</td>
								<td class="text-center" style="line-height:33px;">{{item.sinplyIntroduce}}</td>
								<td class="text-center" style="line-height:33px;">{{item.label1}}</td>
								<td class="text-center" style="line-height:33px;">{{item.label2}}</td>
								<td class="text-center" style="line-height:33px;">{{item.label3}}</td>
								<td class="text-center" style="line-height:33px;">{{item.introduceContent}}</td>
								<td class="text-center" style="line-height:33px;"><button type="button" class="btn btn-warning" v-on:click="selectRule('3',item)">修改</button></td>
							</tr>
						</tbody>
					</table>
				</div>
				<!--分页插件-->
				<!-- <div class="page">
					<p class="tips">* 双击单行，可对当前数据进行修改</p>
					这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值
					<paging ref="paging" @change="pageChange"></paging>
				</div> -->
			</div>
		</div>
		<div class="row row_edit">
			<div class="modal fade" id="scContent">
				<div class="modal-dialog">
					<SubCounselor ref='subCou' @certainAction='feedBack'></SubCounselor>
				</div>
			</div>
		</div>
	</div>

</template>


<script>
	import store from '../common/Store.vue'
	import et from '../common/EvaluationType.vue'
	import emp from '../common/Employee.vue'
	import SubCounselor from '../MP/SubCounselor/SubCounselor.vue'
	import {
		init
	} from '@/../static/js/common.js'
	import Paging from '../common/paging'
	export default {
		components: {
			store,
			emp,
			SubCounselor,
			// Paging,
			et,
		},
		data() {
			return {
				counselorList: [],
				title:'',
				testType:'',
				
				//分页需要的数据
// 				pages: '', //总页数
// 				current: 1, //当前页码
// 				pageSize: 10, //一页显示的数量
// 				total: '', //数据的数量
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
				$("#scContent").modal('hide')
			},

			// check the adding and modifying rule of account
			selectRule(param, item) {
				if (param == "1") {
					this.$refs.subCou.initData('add')
					$("#scContent").modal('show')
				} else if (param == "3") {
					this.$refs.subCou.initData('modify', item)
					$("#scContent").modal('show')
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
				var url = this.url + '/counselor/queryCounselorList'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						othersTypeList:[],
						dateArr:[],
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						this.counselorList = res.retData
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
