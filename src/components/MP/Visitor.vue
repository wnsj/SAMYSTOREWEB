<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">咨客管理</h1>
        </div>
        <div class="row" style="margin-top: 40px;">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">门店</p><span class="sign-left">:</span>
                </div>
                <div class="col-md-7 col-lg-7">
                    <Store ref='store' @storeChange='storeChange'></Store>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">会员卡号</p><span class="sign-left">:</span>
                </div>
                <div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="memNum" ></div>
            </div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
			    <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
			        <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">姓名</p><span class="sign-left">:</span>
			    </div>
			    <div class="col-md-7 col-lg-7"><input class="form-control" type="text" value="" v-model="vistorName"></div>
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
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
			    <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
			        <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">访问类型</p><span class="sign-left">:</span>
			    </div>
			    <div class="col-md-7 col-lg-7">
					<select class="form-control" v-model="visType">
						<option value="">--未选择--</option>
						<option value="1">初访</option>
						<option value="2">复访</option>
					</select>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
			    <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
			        <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">接待人</p><span class="sign-left">:</span>
			    </div>
			    <div class="col-md-7 col-lg-7">
					<emp ref="emp" @employeeChange="employeeChange"></emp>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
			    <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
			        <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">渠道</p><span class="sign-left">:</span>
			    </div>
			    <div class="col-md-7 col-lg-7">
					<cha ref="cha" @channelChange="chaChange"></cha>
				</div>
			</div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">转会员</p><span class="sign-left">:</span>
                </div>
                <div class="col-md-7 col-lg-7">
            		<select class="form-control" v-model="isMem">
						<option value="">--未选择--</option>
            			<option value="1">已转会员</option>
            			<option value="2">未转会员</option>
            		</select>
            	</div>
            </div>
        </div>

        <div class="row" style="margin-top: 15px;padding-bottom:1.5%;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
			    <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
			        <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">开始时间</p><span class="sign-left">:</span>
			    </div>
			    <div class="col-md-7 col-lg-7">
			        <dPicker style="width:100%" value-type="format" format="YYYY-MM-DD" v-model="begDate"></dPicker>
			    </div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
			    <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
			        <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">结束时间</p><span class="sign-left">:</span>
			    </div>
			    <div class="col-md-7 col-lg-7">
			        <dPicker style="width:100%" value-type="format" format="YYYY-MM-DD" v-model="endDate"></dPicker>
			    </div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
			    <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
			        <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">生日</p><span class="sign-left">:</span>
			    </div>
			    <div class="col-md-7 col-lg-7">
			        <dPicker style="width:100%" value-type="format" format="DD" v-model="birthday"></dPicker>
			    </div>
			</div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-md-12 col-lg-12">
                <button type="button" class="btn btn-warning pull-right m_r_10"  data-toggle="modal"
                        v-on:click="selectRule('1')">添加咨客</button>
                <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
                        v-on:click="checkVisitor(1)">查询</button>
                </div>
            </div>
        </div>
        <div class="">
            <div class="col-md-12 col-lg-12">
                <div class="table-responsive pre-scrollable">
                    <table class="table table-bordered table-hover" id="datatable" style="width: 2400px;" >
                        <thead class="datathead">
                        <tr>
                            <th class="text-center">姓名</th>
                            <th class="text-center">手机号</th>
                            <th class="text-center">性别</th>
                            <th class="text-center">生日</th>
							<th class="text-center">会员卡号</th>
							<th class="text-center">店铺</th>
							<th class="text-center">渠道</th>
							<th class="text-center">咨询方向</th>
							<th class="text-center">接待人</th>
							<th class="text-center">访问类型</th>
							<th class="text-center">行业</th>
							<th class="text-center">紧急联系人</th>
							<th class="text-center">联系人电话</th>
							<th class="text-center">微信号</th>
							<th class="text-center">邮箱</th>
							<th class="text-center">地址</th>
							<th class="text-center">添加时间</th>
							<th class="text-center">描述</th>
							<th class="text-center">是否转会员</th>
                            <th class="text-center">修改</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in visitorList" :key="index" v-on:dblclick="selectRule('3',item)">
                            <td class="text-center">{{item.visitorName}}</td>
                            <td class="text-center">{{item.phone}}</td>
                            <td class="text-center">{{item.sex==1? "男":"女"}}</td>
                            <td class="text-center">{{item.birthday | dateFormatFilter("YYYY-MM-DD")}}</td>
                            <td class="text-center">{{item.memNum}}</td>
                            <td class="text-center">{{item.storeName}}</td>
                            <td class="text-center">{{item.channelName}}</td>
                            <td class="text-center">{{item.consDirection}}</td>
                            <td class="text-center">{{item.empName}}</td>
							<td class="text-center">{{item.visType==1?"初访":"复访"}}</td>
							<td class="text-center">{{item.indName}}</td>
							<td class="text-center">{{item.urgentName}}</td>
							<td class="text-center">{{item.urgentPhone}}</td>
							<td class="text-center">{{item.vnum}}</td>
							<td class="text-center">{{item.email}}</td>
							<td class="text-center">{{item.address}}</td>
							<td class="text-center">{{item.createTime | dateFormatFilter("YYYY-MM-DD")}}</td>
							<td class="text-center">{{item.marker}}</td>
							<td class="text-center"><button type="button" class="btn btn-warning" v-on:click="tranferMember(item)">{{item.isMem==1?"已转会员":"未转会员"}}</button></td>
                            <td class="text-center"><button type="button" class="btn btn-warning" v-on:click="selectRule('3',item)">修改</button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--分页插件-->
                <div class="page">
                    <!-- 这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值 -->
                    <paging ref="paging" @change="pageChange"></paging>
                </div>
            </div>
            <div class="col-md-12 col-lg-12 posAb">
                <p class="tips">* 双击单行，可对当前数据进行修改</p>
            </div>
        </div>
        <div class="row row_edit">
            <div class="modal fade" id="visContent">
                <div class="modal-dialog">
                    <subVis ref='subVis' @certainAction='feedBack'></subVis>
                </div>
            </div>
        </div>
		<div class="row row_edit">
		    <div class="modal fade" id="memContent">
		        <div class="modal-dialog">
		            <tm ref='tm' @closeCurrentPage='feedBack'></tm>
		        </div>
		    </div>
		</div>
    </div>

</template>


<script>

    import subVis from '../MP/SubVis/SubVisitor.vue'
	import tm from '../MP/SubVis/TransferMember.vue'
    import Store from '../common/Store.vue'
	import emp from '../common/Employee.vue'
	import cha from '../common/Channel.vue'


	import dPicker from 'vue2-datepicker'
    import Paging from '../common/paging'
    import {
        init
    } from '@/../static/js/common.js'
    export default {
        components: {
            subVis,
            Store,
            Paging,
			tm,
			dPicker,
			emp,
			cha,
        },
        data() {
            return {
                visitorList: [],
                isuse: '1',
                storeId:this.storeId(),
                memNum:'',
                vistorName: '',
                phone:'',
				visType:'',
				empId:'',
				chaId:'',
				isMem:'',
				begDate:'',
				endDate:'',
				birthday:'',
                fixedHeader: false,
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
                this.checkVisitor(page);
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
			            urlName:'/MP/Visitor',
			            operateType:param,
			        },
			        dataType: 'json',
			    }).then((response) => {
			        var res = response.data
			        if (res.retCode == '0000') {
			            if(res.retData=='0010'){
			                console.log('param:'+param)
			                if(param==1){
			                    this.$refs.subVis.initData('add','')
			                    $("#visContent").modal('show')
			                }else if(param==3){
			                    this.$refs.subVis.initData('modify', item)
			                    $("#visContent").modal('show')
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

			//转会员
			tranferMember(item){
				if(item.isMem==1){
					alert("已转会员")
					return
				}else{
					this.$refs.tm.initData(item)
					$("#memContent").modal('show')
				}
			},

			employeeChange(param){
			    if(this.isBlank(param)){
			        this.empId=""
			    }else{
			        this.empId=param.empId
			    }
			},
			chaChange(param){
			    if(this.isBlank(param)){
			        this.chaId=""
			    }else{
			        this.chaId=param.chaId
			    }
			},
            storeChange(param){
                if(this.isBlank(param)){
                    this.storeId=""
                }else{
                    this.storeId=param.storeId
                }
            },
            feedBack(){
                this.checkVisitor(1)
                $("#visContent").modal('hide')
				$("#memContent").modal('hide')
            },
            //check the list of member
            checkVisitor(page) {
                console.log('checkMember')
                var url = this.url + '/visitorAction/queryVisitor'
				if(this.isBlank(this.begDate)){
					this.begDate=this.moment(this.begDate,"YYYY-MM-DD 00:00:00")
				}
				if(this.isBlank(this.endDate)){
					this.endDate=this.moment(this.endDate,"YYYY-MM-DD 23:59:59")
				}

                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        storeId:this.storeId,
                        memNum:this.memNum,
                        vistorName: this.vistorName,
                        phone:this.phone,
						visType:this.visType,
						chaId:this.chaId,
						empId:this.empId,
						isMem:this.isMem,
						begDate:this.begDate,
						endDate:this.endDate,
						birthday:this.birthday,


                        page:page.toString(),
                        pageSize:this.pageSize
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    console.log(res)
                    if (res.retCode == '0000') {
                        this.pages=res.retData.pages //总页数
                        this.current=res.retData.current //当前页码
                        this.pageSize=res.retData.size//一页显示的数量  必须是奇数
                        this.total=res.retData.total //数据的数量
                        this.$refs.paging.setParam(this.pages,this.current,this.total)
                        this.visitorList = res.retData.records
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
            window.addEventListener('scroll',this.handleScroll,true);
            init();
        },
        created() {
            // this.checkVisitor(1);
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
