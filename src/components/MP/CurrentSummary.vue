<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">月入汇总</h1>
        </div>
        <div class="row" style="margin-top: 40px;">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-show="accountType==true">
                <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">门店</p><span class="sign-left">:</span>
                </div>
                <div class="col-md-7 col-lg-7">
                    <Store ref="store" @storeChange="storeChange"></Store>
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
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5  text-right" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">类型</p><span class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <select class="form-control" v-model="type">
                        <option value="">--未选择--</option>
                        <option value="1">定金收入</option>
                        <option value="2">定金退费</option>
                        <option value="3">充值</option>
                        <option value="4">流水消费</option>
                        <option value="5">项目退费</option>
                    </select>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="padding-right:30px; padding-bottom:1.5%;">
                <button type="button" class="btn btn-primary pull-right m_r_10"  data-toggle="modal"
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
                                <th class="text-center">时间</th>
                                <th class="text-center">类型</th>
                                <th class="text-center">金额</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,index) in earningList" :key="index">
                                <td>{{item.memNum}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.phone}}</td>
                                <td>{{item.createDate | dateFormatFilter("YYYY-MM-DD")}}</td>
                                <td v-show="item.type==1">定金收入</td>
                                <td v-show="item.type==2">定金退费</td>
                                <td v-show="item.type==3">充值</td>
                                <td v-show="item.type==4">流水消费</td>
                                <td v-show="item.type==5">项目退费</td>
                                <td v-show="item.type==1">+{{item.money}}</td>
                                <td v-show="item.type==2">-{{item.money}}</td>
                                <td v-show="item.type==3">+{{item.money}}</td>
                                <td v-show="item.type==4">+{{item.money}}</td>
                                <td v-show="item.type==5">-{{item.money}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row">
                        <div class="col-md-3 col-lg-3">
                            <p class="tips" style="font-size: 20px">月总收入：{{symbols}}{{allMoney}} 元</p>
                        </div>
                    </div>
                    <!--分页插件-->
                    <div class="page">
                        <!--这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值-->
                        <paging ref="paging" @change="pageChange"></paging>
                    </div>
                </nobr>
            </div>
        </div>
        <div class="row row_edit">
            <div class="modal fade" id="detailMember">
                <div class="modal-dialog">
                    <memSum ref="member" @addmember='feedback'></memSum>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'
    import dPicker from 'vue2-datepicker'
    import memSum from '../MP/SubMemSum/SubMemSum'
    import Store from '../common/Store.vue'
    import Paging from '../common/paging'
    import {
        init
    } from '@/../static/js/common.js'
    export default {
        name: 'employee',
        components: {
            dPicker,
            memSum,
            Store,
            Paging
        },
        data() {
            return {
                earningList: [],
                storeId: this.storeId(),
                accountType:this.accountType(),
                earningTotle:{
                    BALANCE:'',
                },
                createDate:'',
                allMoney:'',

                type:'',//类型
                symbols:'',//用来判断总额是“+”还是“-”

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
                this.conditionCheck(page);
            },
            detailAction(param){
                this.$refs.member.conditionCheck(param)
                $("#detailMember").modal('show')
            },

            feedback() {
                this.conditionCheck(1)
                $("#detailMember").modal('hide')
            },
            //feedback store information
            storeChange: function(param) {
                if (this.isBlank(param)) {
                    this.storeId = ""
                } else {
                    this.storeId = param.storeId
                }

            },
            //the list , which is detail infomation of member,was checked.
            conditionCheck: function(page) {

                if(!this.isBlank(this.createDate)){
                    this.createDate = this.moment(this.createDate,'YYYY-MM-DD 00:00:00.000')
                }else {
                    this.createDate=this.moment(new Date(),'YYYY-MM-DD 00:00:00.000')
                }
                var url = this.url + '/accountRecordAction/queryGrossMomey'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        storeId: this.storeId,
                        createDate:this.createDate,

                        type:this.type,
                        page:page,
                        pageSize: this.pageSize
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    console.log(res)
                    if (res.retCode == '0000') {
                        if(res.retData.grossInfo != null){
                            this.pages = res.retData.grossInfo.pages //总页数
                            this.current = res.retData.grossInfo.current //当前页码
                            //this.pageSize = res.retData.grossInfo.size //一页显示的数量  必须是奇数
                            this.total = res.retData.grossInfo.total //数据的数量
                            this.$refs.paging.setParam(this.pages, this.current, this.total)
                            this.earningList = res.retData.grossInfo.records;
                        }else{
                            this.earningList = [];
                        }

                        if(res.retData.gross != null){
                            this.allMoney = res.retData.gross.allMoney
                            if(this.allMoney>0){
                                this.symbols=this.type=='2'||this.type=='5'?"-":"+"
                            }else {
                                this.symbols=''
                            }

                        }else{
                            this.allMoney='0'
                        }
                    }
                }).catch((error) => {
                    console.log('月入账目查询失败')
                });
            },
        },
        mounted () {
            init();
        },
        created() {
            // this.conditionCheck(1)
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
