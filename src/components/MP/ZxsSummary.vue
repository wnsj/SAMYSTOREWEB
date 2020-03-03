<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">咨询师汇总</h1>
        </div>
        <div class="row" style="margin-top: 15px;">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-show="accountType==true">
                <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">门店</p><span class="sign-left">:</span>
                </div>
                <div class="col-md-7 col-lg-7">
                    <store ref='store' @storeChange='storeChange'></store>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding-left:10px;">
                <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:25px;">开始月份</p><span class="sign-left">:</span>
                </div>
                <div class="col-md-7 col-lg-7">
                    <dPicker style="width:100%" format="YYYY-MM" v-model="beginDate"></dPicker>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">咨询师</p><span class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <emp ref="counlorEmp" @employeeChange="counlorEmpChange"></emp>
                </div>
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding-right:30px; padding-bottom:1.5%;">
                <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
                        v-on:click="queryZxsSummary(1)">查询</button>
            </div>
        </div>

        <div>
            <div class="col-md-12 col-lg-12">
                <nobr class="widthmax">
                    <div class="table-responsive pre-scrollable">
                        <table class="table table-bordered table-hover user-table" id="datatable">
                            <thead class="datathead">
                            <tr>
                                <th class="text-center">咨询师姓名</th>
                                <th class="text-center">课程名</th>
                                <th class="text-center">会员卡号</th>
                                <th class="text-center">消费者姓名</th>
                                <th class="text-center">单价</th>
                                <th class="text-center">课时折扣(%)</th>
                                <th class="text-center">购买课时</th>
                                <th class="text-center">本月消费课时</th>
                                <th class="text-center">退费课时</th>
                                <th class="text-center">剩余课时</th>
                                <th class="text-center">本月消费金额</th>
                                <th class="text-center">退费金额</th>
                                <th class="text-center">剩余金额</th>
                                <th class="text-center">时间</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item2,index2) in queryList" :key="index2">
                                <td>{{item2.EMP_NAME}}</td>
                                <td>{{item2.PRO_NAME}}</td>
                                <td>{{item2.MEM_NUM}}</td>
                                <td>{{item2.MEM_NAME}}</td>
                                <td>{{item2.PRICE}}</td>
                                <td>{{item2.DISCOUNT}}</td>
                                <td>{{item2.ACTUAL_COUNT}}</td>
                                <td>{{item2.CONSUM_COUNT}}</td>
                                <td>{{item2.REF_COUNT}}</td>
                                <td>{{item2.CHARGE_BALANCE}}</td>
                                <td>{{item2.CONSUM_MONEY}}</td>
                                <td>{{item2.REAL_REFUND}}</td>
                                <td>{{item2.BALANCE_MONEY}}</td>
                                <td>{{item2.CREATE_DATE | dateFormatFilter("YYYY-MM-DD HH:mm:ss")}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row" v-show="isShowSummary">
                        <div class="col-md-2 col-lg-2">
                            <p class="tips" style="font-size: 17px">本月消费课时：{{summaryMap.MONTH_CONSUM_COUNT}} 小时</p>
                        </div>
                        <div class="col-md-2 col-lg-2">
                            <p class="tips" style="font-size: 17px">退费课时：{{summaryMap.MONTH_REF_COUNT}} 小时</p>
                        </div>
                        <div class="col-md-2 col-lg-2">
                            <p class="tips" style="font-size: 17px">剩余课时：{{summaryMap.MONTH_CHARGE_BALANCE}} 小时</p>
                        </div>
                        <div class="col-md-2 col-lg-2">
                            <p class="tips" style="font-size: 17px">本月消费：{{summaryMap.MONTH_CONSUM_MONEY}} 元</p>
                        </div>
                        <div class="col-md-2 col-lg-2">
                            <p class="tips" style="font-size: 17px">本月退费：{{summaryMap.MONTH_REAL_REFUND}} 元</p>
                        </div>
                        <div class="col-md-2 col-lg-2">
                            <p class="tips" style="font-size: 17px">剩余金额：{{summaryMap.MONTH_BALANCE_MONEY}} 元</p>
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
        name: "ZxsSummary",
        components: {
            dPicker,
            SubConsume,
            Paging,
            store,
            emp
        },
        data(){
            return {
                summaryMap:{},
                queryList:[],
                isShowSummary:false,//是否显示汇总信息
                beginDate:'',
                empId:'',
                accountType: this.accountType(),
                storeId: this.storeId(),

                //分页需要的数据
                pages: '', //总页数
                current: 1, //当前页码
                pageSize: 10, //一页显示的数量
                total: '', //数据的数量
            }
        },
        methods: {
            //子级传值到父级上来的动态拿去
            pageChange: function(page) {
                this.current = page
                this.queryZxsSummary(page);
            },
            storeChange(param) {
                if (this.isBlank(param)) {
                    this.storeId = ""
                } else {
                    this.storeId = param.storeId
                }
            },
            //咨询师
            counlorEmpChange: function(param) {
                console.log(param)
                if(typeof param == 'undefined'||this.isBlank(param.empId)){
                    this.empId=''
                    this.isShowSummary=false
                    return
                }
                this.empId=param.empId
                var beginDate='';
                if(!this.isBlank(this.beginDate)){
                    beginDate=this.moment(this.beginDate, 'YYYY-MM-01 00:00:00.000')
                }
                console.log("beginDate:"+beginDate)
                var url = this.url + '/accountRecordAction/queryZxsSummary'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        empId:this.empId,
                        beginDate:beginDate,
                        storeId:this.storeId
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    console.log(res)
                    if (res.retCode == '0000') {
                        if (res.retData.summaryMap == null) {
                            this.isShowSummary=false
                        }else {
                            this.summaryMap=res.retData.summaryMap
                            this.isShowSummary=true
                        }
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('请求失败处理')
                });

            },
            queryZxsSummary: function(page) {
                var beginDate='';
                if(!this.isBlank(this.beginDate)){
                    beginDate=this.moment(this.beginDate, 'YYYY-MM-01 00:00:00.000')
                }
                console.log("beginDate:"+beginDate)
                var url = this.url + '/accountRecordAction/queryZxsSummary'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        empId:this.empId,
                        beginDate:beginDate,
                        page:page+"",
                        pageSize:'10',
                        storeId:this.storeId
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    console.log(res)
                    if (res.retCode == '0000') {
                        //console.log(res.retData.queryList)
                        this.pages = res.retData.queryList.pages //总页数
                        this.current = res.retData.queryList.current //当前页码
                        this.pageSize = res.retData.queryList.size //一页显示的数量  必须是奇数
                        this.total = res.retData.queryList.total //数据的数量
                        this.$refs.paging.setParam(this.pages, this.current, this.total)

                        this.queryList=res.retData.queryList.records
                        if (res.retData.summaryMap == null) {
                            this.isShowSummary=false
                        }else {
                            this.summaryMap=res.retData.summaryMap
                            this.isShowSummary=true
                        }
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
            window.addEventListener('scroll', this.handleScroll, true)
            init();

        },
        created(){
            // this.queryZxsSummary(1)
        }
    }
</script>

<style scoped>
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
