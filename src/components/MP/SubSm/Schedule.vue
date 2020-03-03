<!-- add and modify order -->
<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 id="myModalLabel" class="modal-title">{{title}}排班</h4>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">
                <form action="" class="clearfix">
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询师</label><span
                        class="sign-left">:</span>
                        <div class="col-md-8">
                            <emp ref="counlorEmp" @employeeChange="counlorEmpChange" :disabled="isSelete"></emp>
                        </div>
                    </div>

                    <div class="col-md-12 form-group clearfix" style="padding-right:0;">
                        <div class="col-md-6" style="padding:0;">
                            <h4 id="myModalLabel" class="modal-title pull-left">排班时间</h4>
                        </div>
                        <div class="col-md-6" style="padding:0;">
                            <div class="case" style="float:right;">
                                <input type="checkbox" id="allCheckbox" @change="allAdd" v-model="allAddValueState"/>
                                <label for="allCheckbox">全选</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 form-group clearfix">
                        <div class="row schDate"><b v-for="value in allDate">{{value}}</b></div>
                        <div class="row schDate" style="margin-bottom:10px;"><span  v-for="value in allWeek">{{value}}</span></div>
                        <div id="allCheckboxState" class="row schDate" style="margin-bottom:4px;">
                            <div class="case" v-for="(item,index) in dateList">
                                <input type="checkbox" :id="'checkbox'+(index+1)" @change="changeSchedule(item.morning)" v-model="item.morning" v-bind:true-value="'1'.toString()" v-bind:false-value="'0'.toString()"/>
                                <label :for="'checkbox'+(index+1)">上午</label>
                            </div>
                        </div>
                        <div class="row schDate">
                            <div class="case" v-for="(item,index) in dateList">
                                <input type="checkbox" :id="'checkbox'+(index+8)" @change="changeSchedule(item.afternoon)" v-model="item.afternoon" v-bind:true-value="'1'.toString()" v-bind:false-value="'0'.toString()"/>
                                <label :for="'checkbox'+(index+8)">下午</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group clearfix">
                        <div class="col-md-12" style="padding-right:0;">
                            <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:.7%;" data-toggle="modal" v-on:click="closeCurrentPage()">返回</button>
                            <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal" v-on:click="addOrder(title)">确认</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>

    </div>
</template>

<script>
    import dPicker from 'vue2-datepicker'
    import emp from '../../common/Employee.vue'
    export default {
        components:{
            dPicker,
            emp,
        },
        data() {
            return {
                title:'新增',
                allDate:[],
                allWeek:['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
                allAddValueState:'',
                empId:'',
				isSelete:false,
                dateList:[
                    {
                        empId:"",
                        morning:"0",
                        afternoon:"0",
                        operatorId:this.accountId(),
                        createDate:this.moment(new Date(),'YYYY-MM-DD HH:mm:ss.000'),
                        schedulingDate:""
                    },{
                        empId:"",
                        morning:"0",
                        afternoon:"0",
                        operatorId:this.accountId(),
                        createDate:this.moment(new Date(),'YYYY-MM-DD HH:mm:ss.000'),
                        schedulingDate:""
                    },{
                        empId:"",
                        morning:"0",
                        afternoon:"0",
                        operatorId:this.accountId(),
                        createDate:this.moment(new Date(),'YYYY-MM-DD HH:mm:ss.000'),
                        schedulingDate:""
                    },{
                        empId:"",
                        morning:"0",
                        afternoon:"0",
                        operatorId:this.accountId(),
                        createDate:this.moment(new Date(),'YYYY-MM-DD HH:mm:ss.000'),
                        schedulingDate:""
                    },{
                        empId:"",
                        morning:"0",
                        afternoon:"0",
                        operatorId:this.accountId(),
                        createDate:this.moment(new Date(),'YYYY-MM-DD HH:mm:ss.000'),
                        schedulingDate:""
                    },{
                        empId:"",
                        morning:"0",
                        afternoon:"0",
                        operatorId:this.accountId(),
                        createDate:this.moment(new Date(),'YYYY-MM-DD HH:mm:ss.000'),
                        schedulingDate:""
                    },{
                        empId:"",
                        morning:"0",
                        afternoon:"0",
                        operatorId:this.accountId(),
                        createDate:this.moment(new Date(),'YYYY-MM-DD HH:mm:ss.000'),
                        schedulingDate:""
                    }
                ],
            };
        },
        methods:{
            initData(param,schedule) {


                if(param=='add'){
                    //初始化数据
                    this.clearData();
					this.isSelete=false
                    $("#allCheckbox").attr("disabled",false);
                    this.title='新增'
                    this.$refs.counlorEmp.setPosName('咨询师')
                    this.$refs.counlorEmp.setEmp('')
                    // this.$refs.clerkEmp.setEmp(this.order.clerkEmpId)
                    //this.$refs.counlorEmp.setEmp('')
                    this.allDate=this.getWeekDay(this.moment(this.addDate(new Date(),7),'YYYY-MM-DD'));
                    for(var i=0;i<this.allDate.length;i++){
                        this.dateList[i].schedulingDate=this.allDate[i]
                    }

                }else if(param=='modify'){
                    this.title='修改'
					this.isSelete=true
                    //为参数赋值
                    this.dateList[0].morning=schedule.morning1;
                    this.dateList[1].morning=schedule.morning2;
                    this.dateList[2].morning=schedule.morning3;
                    this.dateList[3].morning=schedule.morning4;
                    this.dateList[4].morning=schedule.morning5;
                    this.dateList[5].morning=schedule.morning6;
                    this.dateList[6].morning=schedule.morning7;
                    this.dateList[0].afternoon=schedule.afternoon1;
                    this.dateList[1].afternoon=schedule.afternoon2;
                    this.dateList[2].afternoon=schedule.afternoon3;
                    this.dateList[3].afternoon=schedule.afternoon4;
                    this.dateList[4].afternoon=schedule.afternoon5;
                    this.dateList[5].afternoon=schedule.afternoon6;
                    this.dateList[6].afternoon=schedule.afternoon7;

                    this.allDate=[]
                    this.allDate.push(schedule.schedulingDate1)
                    this.allDate.push(schedule.schedulingDate2)
                    this.allDate.push(schedule.schedulingDate3)
                    this.allDate.push(schedule.schedulingDate4)
                    this.allDate.push(schedule.schedulingDate5)
                    this.allDate.push(schedule.schedulingDate6)
                    this.allDate.push(schedule.schedulingDate7)
                    for(var i=0;i<this.allDate.length;i++){
                        this.dateList[i].schedulingDate=this.allDate[i]
                    }
                    //this.operatorId = this.accountId()
                    this.$refs.counlorEmp.setPosName('咨询师')
                    this.$refs.counlorEmp.setEmp(schedule.empId)
                    $("input[type=checkbox]").each(function(){
                        $(this).attr("disabled",false);
                    });


                    var today=this.moment(new Date(),'YYYY-MM-DD')
                    console.log("今天是："+today)
                    for(var i1=0;i1<this.allDate.length;i1++){
                        if(Date.parse(today)>=Date.parse(this.allDate[i1])){
                            console.log("Date.parse(today):"+Date.parse(today))
                            console.log("Date.parse(this.allDate[i1]):"+Date.parse(this.allDate[i1]))
                            console.log("当前时间大于"+this.allDate[i1])
                            console.log("#checkbox"+i1+1)
                            $("#checkbox"+(i1+1)).attr("disabled",true);
                            $("#checkbox"+(i1+8)).attr("disabled",true);
                            $("#allCheckbox").attr("disabled",true);
                        }
                    }
                    for(var i=0;i<this.dateList.length;i++){
                        if(!this.dateList[i].morning=="1"||!this.dateList[i].afternoon=="1"){
                            return
                        }
                    }
                    this.allAddValueState=true;



                }
            },
            clearData(){
                this.allAddValueState=''
                this.empId=''
                for(var i=0;i<this.dateList.length;i++){
                    this.dateList[i].morning="0"
                    this.dateList[i].afternoon="0"
                    this.dateList[i].empId=""
                }
            },
            //全选
            allAdd(){
                if(this.allAddValueState){
                    for(var i=0;i<this.dateList.length;i++){
                        this.dateList[i].morning="1";
                        this.dateList[i].afternoon="1";
                    }
                }else {
                    for(var i=0;i<this.dateList.length;i++){
                        this.dateList[i].morning="0";
                        this.dateList[i].afternoon="0";
                    }
                }

            },
            changeSchedule(item){
                console.log("item的值为"+item)
                if(item=="0"){
                    this.allAddValueState=false;
                }
                var index=0
                if(item=="1"){
                    for(var i=0;i<this.dateList.length;i++){
                        if (this.dateList[i].morning == "1" && this.dateList[i].afternoon == "1") {
                            index++
                        }
                    }
                    if(index==7){
                        this.allAddValueState=true;
                    }
                }
            },

            //feedback employee information
            counlorEmpChange: function(param) {

                if (this.isBlank(param)) {
                    this.empId="";
                } else {
                    this.empId=param.empId;
                    for(var i=0;i<this.dateList.length;i++){
                        this.dateList[i].empId=param.empId;
                    }
                }
                console.log('员工：' + this.empId)
            },

            //the event of addtional button
            addOrder(param){
                for(var i=0;i<this.dateList.length;i++){
                    if (this.isBlank(this.dateList[i].empId)) {
                        alert("咨询师不能为空");
                        return
                    }
                }

                switch(param){
                    case '新增':
                        var url = this.url + '/schedulingAction/addScheduling';
                        break;
                    case '修改':
                        var url = this.url + '/schedulingAction/updateScheduling'
                        break;
                }
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data:{
                        list:this.dateList
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        alert(res.retMsg)
                        this.$emit('addSchedule')
                        //$("#orderContent").modal("hide");
                    }else {
                        alert(res.retMsg);
                    }
                }).catch((error) => {
                    console.log('预约提交请求失败')
                });
            },
            closeCurrentPage(){
                this.$emit('addSchedule')
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
                this.allDate = alldate;
                for(var i=0;i<alldate.length;i++){
                    this.dateList[i].schedulingDate=alldate[i];
                }
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
            addDate() {
                //let nowDate = new Date();
                //let nowDate = new Date('2019-12-21'.replace(/-/,"/")) ;
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
            let today = this.addDate();
            this.getWeekStartAndEnd(today);
        }
    }
</script>

<style>
    .schDate{
        display:flex;
        justify-content: space-between
    }
    .schDate b{
        width:80px;
        line-height:34px;
    }
    .schDate span{
        width:80px;
        font-size:12px;
        color:#A9A9AC;
    }
    .case{
        position:relative;
        width:76px;
        height:34px;
        font-size:14px;
        line-height:34px;
        background:#F7F7F8;
        color:#999;
        overflow:hidden;
    }
    .case label{
        position:relative;
        display:block;
        width:100%;
        height:100%;
        margin-bottom: 0px;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently */
    }
    .case input{
        position:absolute;
        left:0;
        top:0;
        display:block;
        width:100%;
        height:100%;
        opacity:0;
        margin-top:0;
    }
    .case input:checked + label{
        box-sizing:border-box;
        border:#F2AD4E solid 1px;
        background:#FFF5EA;
        color:#d47b00;
    }
    .case input:checked + label:after{
        position:absolute;
        right:-15px;
        top:-15px;;
        display:block;
        width:30px;
        height:30px;
        background:#F2AD4E;
        border-radius:50%;
        font-size:12px;
        color:#fff;
        text-align:left;
        text-indent:5px;
        line-height:42px;
        overflow:hidden;
        content: '√';
        font-family:Verdana, Geneva, sans-serif;
        font-weight:normal;
    }

</style>

