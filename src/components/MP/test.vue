<template>
    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">会员汇总统计</h1>
        </div>
        <div class="row" style="margin-top: 40px;">
            
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
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px;padding-left:20px;">开始时间</p><span class="sign-left">:</span>
                </div>
                <div class="col-md-7 col-lg-7">
                    <dPicker style="width:100%" v-model="begCreateDate"></dPicker>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">结束时间</p><span class="sign-left">:</span>
                </div>
                <div class="col-md-7 col-lg-7">
                    <dPicker style="width:100%" v-model="endCreateDate"></dPicker>
                </div>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="padding-right:30px; padding-bottom:1.5%;">
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
                                <th class="text-center">编码</th>
                                <th class="text-center">姓名</th>
																<th class="text-center">会员号</th>
                                <th class="text-center">访问状态</th>
                                <th class="text-center">访问时间</th>
                                <th class="text-center">诊断状态</th>
                                <th class="text-center">诊断时间</th>
                                <th class="text-center">到诊渠道</th>
                                <th class="text-center">续流状态</th>
                                <th class="text-center">咨询方向</th>
								<th class="text-center">咨询师</th>
								<th class="text-center">咨询助理</th>
								<th class="text-center">代理咨询师</th>
								<th class="text-center">代理咨询助理</th>
								<th class="text-center">签约次数</th>
								<th class="text-center">剩余次数</th>
								<th class="text-center">咨费状态</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,index) in memCostList" :key="index" v-on:dblclick="detailAction(item)">
                                <td>00000001</td>
                                <td>李三</td>
																<td>202003242074130306</td>
                                <td>初访/复访</td>
                                <td>2020-03-24 00:00:00</td>
                                <td>初诊/复诊/反诊</td>
                                <td>2020-03-24 00:00:00</td>
                                <td>抖音/竞价等</td>
                                <td>单脱/流失/复访</td>
                                <td>个人成长/婚姻恋爱</td>
								<td>B咨询师</td>
								<td>B咨询助理</td>
								<td>A咨询师</td>
								<td>A咨询助理</td>
								<td>2次</td>
								<td>6次</td>
								<td>单次、首次、首签、续签、复访、零收、测评、定金</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--分页插件-->
                    <div class="page">
                        <!--这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值-->
                        <paging ref="paging" @change="pageChange"></paging>
                    </div>
                </nobr>
				 <div class="row">
					 <div class="col-md-3 col-lg-3">
					     <p class="tips" style="font-size: 20px">初复比：n/m</p>
					 </div>
				    <div class="col-md-3 col-lg-3">
				        <p class="tips" style="font-size: 20px">单脱率：n %</p>
				    </div>
				    <div class="col-md-3 col-lg-3">
				        <p class="tips" style="font-size: 20px">流失率：n %</p>
				    </div>
				    <div class="col-md-3 col-lg-3">
				        <p class="tips" style="font-size: 20px">收入合计：n 元</p>
				    </div>
				    <div class="col-md-3 col-lg-3">
				        <p class="tips" style="font-size: 20px">消费合计（咨询时间）：n 小时</p>
				    </div>
				</div>
            </div>
            <div class="col-md-12 col-lg-12 posAb">
                <p class="tips ">* 双击单行，可查看会员的充值、消费、退费详情</p>
            </div>
        </div>
	
    </div>
</template>

</script>
<script>
    import axios from 'axios'
    import dPicker from 'vue2-datepicker'
    import Paging from '../common/paging'
    import {
        init
    } from '@/../static/js/common.js'
    export default {
        name: 'employee',
        components: {
            dPicker,
            Paging
        },
        data() {
            return {
                memCostList: [],
                storeId: this.storeId(),
                memNum: '',
                memName:'',
                phone:'',
                begCreateDate:'',
                endCreateDate:'',

                accountType:this.accountType(),


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
                console.log('store' + this.storeId)
            },
            //the list , which is detail infomation of member,was checked.
            conditionCheck: function(page) {
                console.log('querying based on multiple conditions')
				console.log('accountPosId:'+this.accountPosId())
				
                if(!this.isBlank(this.begCreateDate)){
                    this.begCreateDate = this.moment(this.begCreateDate,'YYYY-MM-DD 00:00:00.000')
                }
                if(!this.isBlank(this.endCreateDate)){
                    this.endCreateDate = this.moment(this.endCreateDate,'YYYY-MM-DD 23:59:00.000')
                }

                var url = this.url + '/accountRecordAction/queryAccountRecordTotal'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        storeId: this.storeId,
                        memNum: this.memNum,
                        memName:this.memName,
                        memNumNotNull:'1',//用来判断数据库的非空会员
                        phone:this.phone,
                        begCreateDate:this.begCreateDate,
                        endCreateDate:this.endCreateDate,

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
                        this.pageSize=res.retData.size//一页显示的数量
                        this.total=res.retData.total //数据的数量
                        this.$refs.paging.setParam(this.pages,this.current,this.total)
                        this.memCostList = res.retData.records;
                    }
                }).catch((error) => {
                    console.log('会员账目查询失败')
                });
            },
			conditionCheck1: function() {
			    
			
			    var url = 'http://api.map.baidu.com/place/v2/search?query=学校&location=39.1439299,117.21081309&radius=2000&output=json&ak=w0PqRZaf0812BvdqcDKHZWpT''
			    this.$ajax({
			        method: 'GET',
			        url: url,
			        headers: {
			            'Content-Type': this.contentType,
			            'Access-Token': this.accessToken
			        },
			        data: {},
			        dataType: 'json',
			    }).then((response) => {
			        var res = response.data
			        console.log(res)
			        
			    }).catch((error) => {
			        console.log('CESHI')
			    });
			},
        },
        mounted() {
            init();
        },
        created() {
            this.conditionCheck(1);
			this.conditionCheck1();

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
