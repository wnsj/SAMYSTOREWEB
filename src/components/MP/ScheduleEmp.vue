<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">排班管理</h1>
        </div>
        <div class="row" style="margin-top: 40px;padding-bottom:1.5%;">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">时间</p><span class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <dPicker style="width:100%" format="YYYY-MM-DD" v-model="thisDate"></dPicker>
                    <!--<store ref="store" @storeChange='storeChange'></store>-->
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">咨询师</p><span class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <emp ref="counselorChange" @employeeChange="counselorEmpChange"></emp>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-show="accountType==true">
                <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">门店</p><span class="sign-left">:</span>
                </div>
                <div class="col-md-7 col-lg-7">
                    <store ref='store' @storeChange='storeChange'></store>
                </div>
            </div>
            <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:2.5%;" data-toggle="modal"
                    v-on:click="selectRule('1')">添加排班</button>
            <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
                    v-on:click="checkEmp(1)">查询</button>
        </div>
        <div class="">
            <div class="col-md-12 col-lg-12">
                <div class="table-responsive pre-scrollable">
                    <table class="table table-bordered table-hover" id="datatable" style="width:100%; position:relative;">
                        <thead>
                        <tr>
                            <th class="text-center" rowspan="2" style="line-height:52px;">姓名</th>
                            <template v-for="(value,index) in schedulingListTitle">
                                <th class="text-center" colspan="2">{{value}}</th>
                            </template>
                        </tr>
                        <tr>
                            <template v-for='(val,index) in morningOrAfternoon'>
                                <th class="text-center">{{val}}</th>
                            </template>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in schedulingList" :key="index" v-on:dblclick="selectRule('3',item)">
                            <td class="text-center">{{item.name}}</td>
                            <td class="text-center" v-bind:class="{'restBg':!item.morning1}">{{item.morning1=='0'?'歇班':'上班'}}</td>
                            <td class="text-center" v-bind:class="{'restBg':!item.afternoon1}">{{item.afternoon1=='0'?'歇班':'上班'}}</td>
                            <td class="text-center" v-bind:class="{'restBg':!item.morning2}">{{item.morning2=='0'?'歇班':'上班'}}</td>
                            <td class="text-center" v-bind:class="{'restBg':!item.afternoon2}">{{item.afternoon2=='0'?'歇班':'上班'}}</td>
                            <td class="text-center" v-bind:class="{'restBg':!item.morning3}">{{item.morning3=='0'?'歇班':'上班'}}</td>
                            <td class="text-center" v-bind:class="{'restBg':!item.afternoon3}">{{item.afternoon3=='0'?'歇班':'上班'}}</td>
                            <td class="text-center" v-bind:class="{'restBg':!item.morning4}">{{item.morning4=='0'?'歇班':'上班'}}</td>
                            <td class="text-center" v-bind:class="{'restBg':!item.afternoon4}">{{item.afternoon4=='0'?'歇班':'上班'}}</td>
                            <td class="text-center" v-bind:class="{'restBg':!item.morning5}">{{item.morning5=='0'?'歇班':'上班'}}</td>
                            <td class="text-center" v-bind:class="{'restBg':!item.afternoon5}">{{item.afternoon5=='0'?'歇班':'上班'}}</td>
                            <td class="text-center" v-bind:class="{'restBg':!item.morning6}">{{item.morning6=='0'?'歇班':'上班'}}</td>
                            <td class="text-center" v-bind:class="{'restBg':!item.afternoon6}">{{item.afternoon6=='0'?'歇班':'上班'}}</td>
                            <td class="text-center" v-bind:class="{'restBg':!item.morning7}">{{item.morning7=='0'?'歇班':'上班'}}</td>
                            <td class="text-center" v-bind:class="{'restBg':!item.afternoon7}">{{item.afternoon7=='0'?'歇班':'上班'}}</td>
                            <!--<td class="text-center" v-if="has(2)"><button type="button" class="btn btn-warning" v-on:click="selectRule('3',item)">修改</button></td>-->
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
            <div class="modal fade" id="scheduleContent">
                <div class="modal-dialog">
                    <schedule ref='schedule' @addSchedule='feedBack'></schedule>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
    import schedule from '../MP/SubSm/Schedule.vue'
    import store from '../common/Store.vue'
    import pos from '../common/Position.vue'
    import dPicker from 'vue2-datepicker'
    import emp from '../common/Employee.vue'
    import Paging from '../common/paging'
    import {
        init
    } from '@/../static/js/common.js'
    export default {
        components: {
            schedule,
            pos,
            store,
            dPicker,
            emp,
            Paging
        },
        data() {
            return {
                schedulingList: [],
                isuse: '1',
                empName: '',
                fixedHeader: false,
                posId:'',
                storeId: this.storeId(),
                accountType:this.accountType(),
                schedulingListTitle:[],
                morningOrAfternoon:['上午','下午','上午','下午','上午','下午','上午','下午','上午','下午','上午','下午','上午','下午'],
                thisDate:'',
                empId:'',


                //分页需要的数据
                pages: '', //总页数
                current: 1, //当前页码
                pageSize: 10*7, //一页显示的数量
                total: '', //数据的数量
            };
        },
        methods: {
            //子级传值到父级上来的动态拿去
            pageChange: function(page) {
                this.current = page
                this.checkEmp(page);
            },
            //咨询师
            counselorEmpChange: function(param) {
                if (this.isBlank(param)) {
                    this.empId = ""
                } else {
                    this.$refs.counselorChange.setPosName('咨询师')
                    // this.$refs.counselorChange.setEmp('咨询师')
                    this.empId = param.empId

                }
            },
            storeChange:function(param){
                if (this.isBlank(param)) {
                    this.storeId = ""
                } else {
                    this.storeId = param.storeId
                }
            },
            //feedback department information
            positionChange: function(param) {
                if (this.isBlank(param)) {
                    this.posId = ""
                } else {
                    this.posId = param.posId
                }
            },
            //feedback from adding and modifying view
            feedBack() {
                this.checkEmp(1)
                $("#scheduleContent").modal('hide');
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
			            urlName:'/MP/CashDeposit',
			            operateType:param,
			        },
			        dataType: 'json',
			    }).then((response) => {
			        var res = response.data
			        if (res.retCode == '0000') {
			            if(res.retData=='0010'){
			                console.log('param:'+param)
			                if(param==1){
			                    this.$refs.schedule.initData('add','')
			                    $("#scheduleContent").modal('show')
			                }else if(param==3){
			                    this.$refs.schedule.initData('modify', item)
			                    $("#scheduleContent").modal('show')
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
            
            //check the list of department
            checkEmp(page) {
                console.log("时间为"+this.moment(this.thisDate,'YYYY-MM-DD'));
                if(!this.isBlank(this.thisDate)){
                    this.schedulingListTitle=this.getWeekDay(this.moment(this.thisDate,'YYYY-MM-DD'));
                    console.log("这个时间为"+this.getWeekDay(this.moment(this.thisDate,'YYYY-MM-DD')));
                    this.thisDate=this.moment(this.thisDate,'YYYY-MM-DD');
                }
                var url = this.url + '/schedulingAction/queryScheduling'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        thisDate:this.thisDate,
                        empId:this.empId,
                        storeId:this.storeId,
						
                        page: page.toString(),
                        pageSize: this.pageSize
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        //this.getWeekStartAndEnd(this.addDate(res.retData[0].schedulingDate1));
                        //this.schedulingListTitle = res.retData[0];
                        this.pages = res.retData.pages //总页数
                        this.current = res.retData.current //当前页码
                        this.pageSize = res.retData.size*7 //一页显示的数量  必须是奇数
                        this.total = res.retData.total //数据的数量
                        this.$refs.paging.setParam(this.pages, this.current, this.total)
                        this.schedulingList=res.retData.records;
                    } else {
                        alert(res.retMsg);
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
            },
            formatDate(date) {
                var myyear = date.getFullYear();
                var mymonth = date.getMonth() + 1;
                var myweekday = date.getDate();
                if (mymonth < 10) {
                    mymonth = "0" + mymonth;
                }
                if (myweekday < 10) {
                    myweekday = "0" + myweekday;
                }
                return mymonth + "." + myweekday
            },
            // 获取指定日期的那一周的开始、结束日期
            getWeekStartAndEnd(val) {
                let now = '';
                if(val) {
                    now = new Date(val); // 日期
                } else {
                    now = new Date(); // 日期
                }
                let nowDayOfWeek = now.getDay(); // 本周的第几天
                let nowDay = now.getDate(); // 当前日
                let nowMonth = now.getMonth(); // 当前月
                let nowYear = now.getYear(); // 当前年
                let date = new Date()
                let fullYear = date.getFullYear();
                let weekStart = fullYear + '.' + this.getWeekStartDate(nowYear, nowMonth, nowDay, nowDayOfWeek)
                let weekEnd = fullYear + '.' + this.getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek)
                let alldate = this.getAll(weekStart,weekEnd);
                //let result = this.chinaDate(alldate);
                this.schedulingListTitle = alldate;
                //console.log('12:'+this.getAll('2019.12.30','2019.01.05'));

            },
            //日期转换
            chinaDate(array){
                var newArr = [];
                for(var i=0;i<array.length;i++){
                    newArr[i] = array[i].replace('/','月')+'日';
                }
                return newArr;
            },
            // 获得某一周的开始日期
            getWeekStartDate(nowYear, nowMonth, nowDay, nowDayOfWeek) {
                let weekStartDate = new Date(nowYear, nowMonth, nowDay - (nowDayOfWeek-1))
                return this.formatDate(weekStartDate)
            },
            // 获得某一周的结束日期
            getWeekEndDate(nowYear, nowMonth, nowDay, nowDayOfWeek) {
                let weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek))
                return this.formatDate(weekEndDate)
            },
            // 计算续住的总日期列表
            getAll(begin, end) {
                let arr1= begin.split(".");
                let arr2= end.split(".");
                let arr1_= new Date();
                let arrTime = [];
                arr1_.setUTCFullYear(arr1[0], arr1[1] - 1, arr1[2]);
                let arr2_= new Date();
                arr2_.setUTCFullYear(arr2[0], arr2[1] - 1, arr2[2]);
                let unixDb = arr1_.getTime();
                let unixDe = arr2_.getTime();
                for (let k = unixDb; k <= unixDe;) {
                    arrTime.push(this.datetimeparse(k, 'YYYY-MM-DD'));
                    k = k + 24 * 60 * 60 * 1000;               
                }
                return arrTime;
            },

            // 时间格式处理
            datetimeparse (timestamp, format, prefix) {
                if (typeof timestamp =='string'){
                    timestamp=Number(timestamp)
                };
                //转换时区
                let currentZoneTime = new Date (timestamp);
                let currentTimestamp = currentZoneTime.getTime ();
                let offsetZone = currentZoneTime.getTimezoneOffset () / 60;//如果offsetZone>0是西区，西区晚
                let offset = null;
                //客户端时间与服务器时间保持一致，固定北京时间东八区。
                offset = offsetZone + 8;
                currentTimestamp = currentTimestamp + offset * 3600 * 1000

                let newtimestamp = null;
                if (currentTimestamp) {
                    if (currentTimestamp.toString ().length === 13) {
                        newtimestamp = currentTimestamp.toString ()
                    } else if (currentTimestamp.toString ().length === 10) {
                        newtimestamp = currentTimestamp + '000'
                    } else {
                        newtimestamp = null
                    }
                } else {
                    newtimestamp = null
                }
                ;
                let dateobj = newtimestamp ? new Date (parseInt (newtimestamp)) : new Date ()
                let YYYY = dateobj.getFullYear ()
                let MM = dateobj.getMonth () > 8 ? dateobj.getMonth () + 1 : '0' + (dateobj.getMonth () + 1)
                let DD = dateobj.getDate () > 9 ? dateobj.getDate () : '0' + dateobj.getDate ()
                let HH = dateobj.getHours () > 9 ? dateobj.getHours () : '0' + dateobj.getHours ()
                let mm = dateobj.getMinutes () > 9 ? dateobj.getMinutes () : '0' + dateobj.getMinutes ()
                let ss = dateobj.getSeconds () > 9 ? dateobj.getSeconds () : '0' + dateobj.getSeconds ()
                let output = '';
                let separator = '/'
                if (format) {
                    separator = format.match (/-/) ? '-' : '/'
                    output += format.match (/yy/i) ? YYYY : ''
                    output += format.match (/MM/) ? (output.length ? separator : '') + MM : ''
                    output += format.match (/dd/i) ? (output.length ? separator : '') + DD : ''
                    output += format.match (/hh/i) ? (output.length ? ' ' : '') + HH : ''
                    output += format.match (/mm/) ? (output.length ? ':' : '') + mm : ''
                    output += format.match (/ss/i) ? (output.length ? ':' : '') + ss : ''
                } else {
                    output += YYYY + separator + MM + separator + DD
                }
                output = prefix ? (prefix + output) : output

                return newtimestamp ? output : ''
            },
            addDate(param) {
                //let nowDate = new Date();
                //let nowDate = new Date(param.replace(/-/,"/")) ;
                let nowDate = new Date() ;
                let date2 = new Date(nowDate);
                //date2.setDate(nowDate.getDate()+1)
                let date = {
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate(),
                    weekday:date2.getDay()
                }
                let systemDate ="";
                if(date.weekday === 0){
                    systemDate = date.year + '-'  + date.month + '-' + date.date;
                }else{
                    date2.setDate(nowDate.getDate()+7);
                    systemDate = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
                }
                return systemDate;

            },
            getWeekDay(dateString) {
                let dateStringReg = /^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/;

                if (dateString.match(dateStringReg)) {
                    let presentDate = new Date(dateString),
                        today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7;

                    return Array.from(new Array(7), function(val, index) {
                        return formatDate(new Date(presentDate.getTime() - (today - index-1) * 24 * 60 * 60 * 1000));
                    });

                } else {
                    throw new Error('dateString should be like "yyyy-mm-dd" or "yyyy/mm/dd"');
                }

                function formatDate(date) {
                    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                }
            },
             addDate(date, days) {
                var d = new Date(date);
                d.setDate(d.getDate() + days);
                var month = d.getMonth() + 1;
                var day = d.getDate();
                if (month < 10) {
                    month = "0" + month;
                }
                if (day < 10) {
                    day = "0" + day;
                }
                var val = d.getFullYear() + "-" + month + "-" + day;
                return val;
            }
        },

        mounted() {
            this.$refs.counselorChange.setPosName("咨询师")
            this.$refs.counselorChange.setEmp("")
            //let today = this.addDate();
            //this.getWeekStartAndEnd(today);
            this.schedulingListTitle=this.getWeekDay(this.moment(this.addDate(new Date(),7),'YYYY-MM-DD'));
            window.addEventListener('scroll', this.handleScroll, true)
            init();
        },
        created() {
            // this.checkEmp(1);
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
    th{
        background:#efefef;
    }
    .restBg{
        background:#ccc;
        color:#000;
    }
    @media print {
        #fHeader {
            display: none
        }
    }
</style>
