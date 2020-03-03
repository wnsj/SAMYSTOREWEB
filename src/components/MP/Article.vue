<!-- the page of department management -->
<template>

	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">课程管理</h1>
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
				<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">课程名称</p><span class="sign-left">:</span>
				</div>
				<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
					<input class="form-control" type="text" v-model="proName">
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">咨询师</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<emp ref='emp' @employeeChange='empChange'></emp>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
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
			</div>
		</div>
		<div class="row" style="margin-top: 15px;padding-bottom:1.5%;">	
			<button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
			 v-on:click="selectRule('1')" >添加</button>
			<button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
			 v-on:click="checkProject(1)">查询</button>
		</div>
		<div class="">
			<div class="col-md-12 col-lg-12">
				<div class="table-responsive pre-scrollable">
					<table class="table table-bordered table-hover" id="datatable" >
						
						<thead class="datathead">
							<tr>
								<th class="text-center">ID</th>
								<th class="text-center">店铺</th>
								<th class="text-center">咨询师</th>
								<th class="text-center">课程名称</th>
								<th class="text-center">单价</th>
								<th class="text-center">课时(小时)</th>
								<th class="text-center">优惠比例(%)</th>
								<th class="text-center">修改</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in projectList" :key="index" v-on:dblclick="selectRule('3',item)">
								<td class="text-center" style="line-height:33px;">{{item.proId}}</td>
								<td class="text-center" style="line-height:33px;">{{item.storeName}}</td>
								<td class="text-center" style="line-height:33px;">{{item.empName}}</td>
								<td class="text-center" style="line-height:33px;">{{item.proName}}</td>
								<td class="text-center" style="line-height:33px;">{{item.price}}</td>
								<td class="text-center" style="line-height:33px;">{{item.frequency}}</td>
								<td class="text-center" style="line-height:33px;">{{item.discount}}</td>
								<td class="text-center" style="line-height:33px;"><button type="button" class="btn btn-warning" v-on:click="selectRule('3',item)">修改</button></td>
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
			<div class="modal fade" id="projectContent">
				<div class="modal-dialog">
					<SubProject ref='subProject' @certainAction='feedBack'></SubProject>
				</div>
			</div>
		</div>
	</div>

</template>


<script>
	import store from '../common/Store.vue'
	import emp from '../common/Employee.vue'
	import SubProject from '../MP/SubProject/SubProject.vue'
	import {
		init
	} from '@/../static/js/common.js'
    import Paging from '../common/paging'
	export default {
		components: {
			store,
			emp,
			SubProject,
            Paging
		},
		data() {
			return {
				projectList: [],
				isuse: '1',
				proName: '',
				storeId:this.storeId(),
				accountType:this.accountType(),
				empId:'',
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
                this.checkProject(page);
            },
			initData(){
				this.$refs.emp.setPosName("咨询师")
				this.$refs.emp.setEmp("")
			},
			//feedback from adding and modifying view
			feedBack() {
				this.checkProject(1)
				$("#projectContent").modal('hide')
			},
			
			storeChange(param){
				if(this.isBlank(param)){
					this.storeId=""
				}else{
					this.storeId=param.storeId
				}
			},
			empChange(param){
				if(this.isBlank(param)){
					this.empId=""
				}else{
					this.empId=param.empId
				}
			},
			// check the adding and modifying rule of account
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
						urlName:'/MP/Project',
						operateType:param,
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if(res.retData=='0010'){
							if(param=="1"){
								this.$refs.subProject.initData('add')
								$("#projectContent").modal('show')
							}else if(param=="3"){
								this.$refs.subProject.initData('modify',item)
								$("#projectContent").modal('show')
							}
						}else{
							alert('您没有此权限，请联系管理员！！')
						}
					} else {
						alert(res.retMsg)
					}
				
				}).catch((error) => {
					console.log('课程添加修改失败')
				});
			},
			//check the list of position
			checkProject(page) {
				console.log('checkPosition')
				var url = this.url + '/projects/queryAllByParams'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						proName: this.proName,
						state: this.isuse,
						empId:this.empId,
						storeId:this.storeId,
						
                        page:page.toString(),
                        pageSize:this.pageSize
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
                        this.pages=res.retData.pages //总页数
                        this.current=res.retData.current //当前页码
                        this.pageSize=res.retData.size//一页显示的数量
                        this.total=res.retData.total //数据的数量
                        this.$refs.paging.setParam(this.pages,this.current,this.total)
						this.projectList = res.retData.records
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('请求失败处理')
				});
			},
			handleScroll(e){
				var self=this
				var etop = e.target.scrollTop
				var fHeaderwidth = $("#fHeader").width($(".datathead").width())
				var fHeaderheight = $("#fHeader").height($(".datathead").height())
				var theadheight = $(".datathead").height()
				var thlength = $(".datathead tr th").length
				for (var i=0;i<thlength;i++)
				{
					$("#fHeader div").eq(i).width(
					$(".datathead tr th").eq(i).width()
					)
					$("#fHeader div").eq(i).height(
					$(".datathead tr th").eq(i).height()
					)
				}
				if(etop > 0){
					self.fixedHeader=true
					$("#fHeader").css("top",etop)
				}else{
					self.fixedHeader=false
				}
			}
		},
		mounted () {
			this.initData()
			window.addEventListener('scroll',this.handleScroll,true);
			init();
		},
		created() {
		  // this.checkProject(1)
		}
	}
</script>

<style>
  #datatable{position:relative;}
  #fHeader {
    position: absolute;
    top: 0;
    left: 0;
    background: #eeeeee;
    overflow: hidden;
  }
  #fHeader div.text-center{
    float: left;
    display: inline-block;
    padding:8px;
    border: 1px solid #ddd;
    font-weight: bold;
  }
  @media print {
    #fHeader{display:none}
  }
</style>
