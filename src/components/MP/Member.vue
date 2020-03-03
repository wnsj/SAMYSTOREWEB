<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">会员管理</h1>
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
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-top: 15px;padding-bottom:1.5%;">
            <button type="button" class="btn btn-warning pull-right m_r_10"  data-toggle="modal"
                    v-on:click="selectRule('1')">添加会员</button>
            <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
                    v-on:click="checkMember(1)">查询</button>
        </div>
        <div class="">
            <div class="col-md-12 col-lg-12">
                <div class="table-responsive pre-scrollable">
                    <table class="table table-bordered table-hover" id="datatable" >
                        <thead class="datathead">
                        <tr>
                            <th class="text-center">会员卡号</th>
                            <th class="text-center">姓名</th>
                            <th class="text-center">门店名</th>
                            <th class="text-center">是否实卡用户</th>
                            <th class="text-center">手机号</th>
                            <th class="text-center">性别</th>
                            <th class="text-center">生日</th>
                            <th class="text-center">是否停用</th>
                            <!-- <th class="text-center">推荐人</th> -->
                            <th class="text-center">余额</th>
                            <th class="text-center">修改</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in memberList" :key="index" v-on:dblclick="selectRule('3',item)">
                            <td class="text-center">{{item.memNum}}</td>
                            <td class="text-center">{{item.memName}}</td>
                            <td class="text-center">{{item.storeName}}</td>
                            <td class="text-center">{{item.memType == 1 ? "是" : "否"}}</td>
                            <td class="text-center">{{item.phone}}</td>
                            <td class="text-center">{{item.sex == 1 ? "男" : "女"}}</td>
                            <td class="text-center">{{item.birthday}}</td>
                            <td class="text-center">{{item.isuse==true ? "在用" : "停用"}}</td>
                            <!-- <td class="text-center">{{item.empName}}</td> -->
                            <td class="text-center">{{item.balance}}</td>
                            <td class="text-center"><button type="button" class="btn btn-warning" v-on:click="selectRule('3',item)">修改</button></td>
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
            <div class="modal fade" id="memberContent">
                <div class="modal-dialog">
                    <SubMem ref='subMemR' @certainAction='feedBack'></SubMem>
                </div>
            </div>
        </div>
    </div>

</template>


<script>

    import SubMem from '../MP/SubMem/SubMem.vue'
    import Store from '../common/Store.vue'
    import Paging from '../common/paging'
    import {
        init
    } from '@/../static/js/common.js'
    export default {
        components: {
            SubMem,
            Store,
            Paging,
        },
        data() {
            return {
                memberList: [],
                isuse: '1',
                storeId:this.storeId(),
                memNum:'',
                memName: '',
                phone:'',
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
			            urlName:'/MP/ScheduleEmp',
			            operateType:param,
			        },
			        dataType: 'json',
			    }).then((response) => {
			        var res = response.data
			        if (res.retCode == '0000') {
			            if(res.retData=='0010'){
			                console.log('param:'+param)
			                if(param==1){
			                    this.$refs.subMemR.initData('add','')
			                    $("#memberContent").modal('show')
			                }else if(param==3){
			                    this.$refs.subMemR.initData('modify', item)
			                    $("#memberContent").modal('show')
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
            
            storeChange(param){
                if(this.isBlank(param)){
                    this.storeId=""
                }else{
                    this.storeId=param.storeId
                }
            },
            feedBack(){
                this.checkMember(1)
                $("#memberContent").modal('hide')
            },
            //check the list of member
            checkMember(page) {
                console.log('checkMember')
                var url = this.url + '/memberAction/queryVagueMember'

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
                        memName: this.memName,
                        isuse: this.isuse,
                        phone:this.phone,
						
						
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
                        this.memberList = res.retData.records
                    } else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    console.log('请求失败处理')
                });
            },
            //check the list of department
            checkDepartment() {
                console.log('checkDepartment')
                var url = this.url + '/memberAction/queryDepartment'
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
                        memName: this.memName,
                        isuse: this.isuse,
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    console.log(res)
                    if (res.retCode == '0000') {
                        this.departmentList = res.retData
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
            // this.checkMember(1);
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
