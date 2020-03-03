<!-- add and modify consume -->
<template>
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
      <h2 id="myModalLabel" class="modal-title">定金消费</h2>
    </div>
    <div class="modal-body  pos_r">
      <div class="tab-pane fade in active martop" id="basic">

        <div class="col-md-6 form-group clearfix">
          <label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">姓名</label><span
          class="sign-left">:</span>
          <div class="col-md-7">
            <input type="text" class="form-control" v-model="member.cashName" disabled="disabled">
          </div>
        </div>

        <div class="col-md-6 form-group clearfix">
          <label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">手机号</label><span
          class="sign-left">:</span>
          <div class="col-md-7">
            <input type="text" class="form-control" v-model="member.phone" disabled="disabled">
          </div>
        </div>
        <div class="col-md-12 form-group clearfix text-left">
          <h4 id="myModalLabel" class="modal-title">课程：</h4>
        </div>

        <div class="col-md-6 form-group clearfix">
          <label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询师</label><span
          class="sign-left">:</span>
          <div class="col-md-7">
            <emp ref="counselorEmp" @employeeChange="counselorEmpChange"></emp>
          </div>
        </div>

        <div class="col-md-6 form-group clearfix">
          <label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">课程</label><span
          class="sign-left">:</span>
          <div class="col-md-7">
            <project ref="project" @projectChange="projectChange"></project>
          </div>
        </div>
        <div class="col-md-6 form-group clearfix">
          <label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">单价</label><span
          class="sign-left">:</span>
          <div class="col-md-7">
            <input type="text" class="form-control" v-model="consume.price" disabled="disabled">
          </div>
        </div>
        <div class="col-md-6 form-group clearfix">
          <label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">课时(小时)</label><span
          class="sign-left">:</span>
          <div class="col-md-7">
            <input type="text" class="form-control" v-model="consume.actualCount" disabled="disabled">
          </div>
        </div>
        <div class="col-md-6 form-group clearfix">
          <label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">折扣比例</label><span
          class="sign-left">:</span>
          <div class="col-md-7">
            <input type="text" class="form-control" v-model="consume.discount" disabled="disabled">
          </div>
        </div>
        <div class="col-md-6 form-group clearfix">
          <label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">折前总额</label><span
          class="sign-left">:</span>
          <div class="col-md-7">
            <input type="text" class="form-control" v-model="consume.receivable" disabled="disabled">
          </div>
        </div>
        <div class="col-md-6 form-group clearfix">
          <label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">折后总额</label><span
          class="sign-left">:</span>
          <div class="col-md-7">
            <input type="text" class="form-control" v-model="consume.realCross" disabled="disabled">
          </div>
        </div>
        <div class="col-md-6 form-group clearfix">
          <label class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">维护人</label><span
          class="sign-left">:</span>
          <div class="col-md-7">
            <emp ref="emp" @employeeChange="empChange"></emp>
          </div>
        </div>

        <div class="col-md-6 form-group clearfix">
          <label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">定金剩余</label><span
          class="sign-left">:</span>
          <div class="col-md-7">
            <input type="text" class="form-control" v-model="consume.balance" disabled="disabled">
          </div>
        </div>
        <div class="col-md-6 form-group clearfix" v-if="amountToBePaidState">
          <label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;"><font color="red">补交金额</font></label><span
          class="sign-left">:</span>
          <div class="col-md-7">
            <input type="text" class="form-control" v-model="consume.makeUpMoney">
          </div>
        </div>
      </div>
      <div class="tab-pane fade in active martop" id="basic" v-show="isShow==true">
        <!--<div class="col-md-12 form-group clearfix text-left">-->
          <!--<h4 id="myModalLabel" class="modal-title">合计：</h4>-->
        <!--</div>-->
        <!--<div class="col-md-6 form-group clearfix">-->
          <!--<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">补交金额</label><span-->
          <!--class="sign-left">:</span>-->
          <!--<div class="col-md-7">-->
            <!--<input type="text" class="form-control" v-model="">-->
          <!--</div>-->
        <!--</div>-->

        <!--<div class="col-md-6 form-group clearfix">-->
          <!--<label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">赠送总额</label><span-->
          <!--class="sign-left">:</span>-->
          <!--<div class="col-md-7">-->
            <!--<input type="text" class="form-control" v-model="consume.giveMoney">-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <!--<div class="tab-pane fade in active martop" id="basic" v-show="isShow==false">-->
        <!--<div class="col-md-12 form-group clearfix text-left">-->
          <!--<h4 id="myModalLabel" class="modal-title">第{{consume.consumCount}}次消费</h4>-->
        <!--</div>-->
      <!--</div>-->
      <div class="form-group clearfix">
        <div class="col-md-12">
          <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
                  v-on:click="closeCurrentPage()">返回</button>
          <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
                  v-on:click="purchaseHistory()">确认</button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import dPicker from 'vue2-datepicker'
  import emp from '../../common/Employee.vue'
  import project from '../../common/Project.vue'
  export default {
    components: {
      dPicker,
      emp,
      project,
    },
    data() {
      return {
        member:{
          memNum: '',//会员号
          cashName: '',//会员名
          phone: '',//手机
          balance:'',
          counselorEmpId:'',
        },
        counselorList:[],
        consume: {
          memName: '',//手机
          phone: '',//预约号
          receivable: '',//应交(折前)
          realCross: '',//实缴（折后）
          proId: '',//项目id
          discount: '',//折扣
          price: '',//折前单价
          disPrice: '',//折后单价
          actualCount: '',//实际次数
          counselor: '',//咨询师id
          empId: '',//咨询师助理id
          storeId: '',//店铺
          operatorId: '', //操作人
          balance:'0',
          piId:'',
          cashId:'',
        },
        title: '',
        isShow:true,
        consumeReceivable:'',
        isSelect:true,
        amountToBePaidState:false,//补交金额显示状态
        initDataParam:{},
      };
    },
    methods: {
      // Initialization consume’s content
      initData(param) {
        //变量初始化
        this.paramInit();
        this.initDataParam=param;
        this.member={
          memNum: '',//会员号
          memName: '',//会员名
          cashName:param.cashName,
          phone: param.phone,//手机
          balance:param.balance,
          counselorEmpId:'',
        },
          this.consume = {
            phone: '',//手机号
            receivable: '0.0',//应交
            realCross: '0.0',//实缴
            proId: '',//项目id
            discount: '0',//折扣
            price: '0.0',//折前单价
            disPrice: '',//折后单价
            actualCount: '0',//实际次数
            counselor: '',//咨询师id
            empId: '',//咨询师助理id
            storeId: param.storeId,//店铺
            operatorId:this.accountId(),//操作人
            piId:'',
            balance:param.balance,//定金剩余金额
            makeUpMoney:"0",//定金不够，需要补交的金额
            cashId:param.cashId,
            cashName:param.cashName,

          }
        this.consumeReceivable='0.0'
        this.$refs.counselorEmp.setPosName("咨询师")
        this.$refs.counselorEmp.setEmp("")
        this.$refs.emp.setPosName("咨询顾问")
        this.$refs.project.setEmpId("0")

      },
      //参数初始化
      paramInit(){
        this.$refs.project.setProject("0")
        this.$refs.emp.setEmp("")
        this.member={
          memNum: '',//会员号
            cashName: '',//会员名
            phone: '',//手机
            balance:'',
            counselorEmpId:'',
        },
          this.consume= {
          memName: '',//手机
            phone: '',//预约号
            receivable: '',//应交(折前)
            realCross: '',//实缴（折后）
            proId: '',//项目id
            discount: '',//折扣
            price: '',//折前单价
            disPrice: '',//折后单价
            actualCount: '',//实际次数
            counselor: '',//咨询师id
            empId: '',//咨询师助理id
            storeId: '',//店铺
            operatorId: '', //操作人
            balance:'0',
            piId:'',
            cashId:'',
        },
          this.isShow=true,
          this.consumeReceivable='',
          this.isSelect=true,
          this.amountToBePaidState=false//补交金额显示状态
      },
      //咨询师
      counselorEmpChange: function(param) {
        if (this.isBlank(param)) {
          this.consume.counselor = ""
        } else {
          this.consume.counselor = param.empId
          this.$refs.project.setEmpId(this.consume.counselor)
          this.$refs.project.setProject("")
          this.consume.price = '0'
          this.consume.actualCount = '0'
          this.consume.discount= '0'
          this.consume.receivable='0'
          this.consume.realCross='0'
          this.consumeReceivable=''
        }
      },
      //课程
      projectChange: function(param) {
        if (this.isBlank(param)) {
          this.consume.proId = ""
        } else {
          this.consume.proId = param.proId
          this.consume.price = param.price
          this.consume.actualCount = param.frequency
          this.consume.discount= param.discount
          this.consume.receivable=param.price*param.frequency
          this.consume.realCross=param.price*param.frequency*param.discount/100

          if(this.counselorList != null && this.counselorList.length > 0){
            var isSame=0
            console.log("counselorList:"+JSON.stringify(this.counselorList))
            for(var i=0;i < this.counselorList[0].proList.length;i++ ){
              var project = this.counselorList[0].proList[i]
              if(this.consume.proId==project.proId){
                this.isShow=false
                this.consume.piId=project.piId
                this.consume.consumCount=project.consumCount+1
                this.$refs.emp.setEmp(project.empId)
                isSame=1
                break;
              }

            }
            if(isSame==0){
              this.isShow=true
              this.consume.consumCount=this.consume.consumCount+1
              this.consume.piId=''
            }
          }
          //实际交的钱大于定金剩余的钱
          if(parseFloat(this.consume.realCross)>parseFloat(this.initDataParam.balance)){
            alert("实际交的钱大于定金剩余的钱,需要补交金额");
            this.consume.balance="0";
            this.consume.makeUpMoney=this.consume.realCross-this.initDataParam.balance;
            console.log("实际交的钱："+this.consume.realCross)
            console.log("定金剩余的钱："+this.initDataParam.balance)
            console.log("补交的钱："+this.consume.makeUpMoney)
            this.amountToBePaidState=true;
          }else {
            this.amountToBePaidState=false;
            this.consume.balance=this.initDataParam.balance-this.consume.realCross;
            this.consume.makeUpMoney="0";
          }
        }
      },
      //feedback employee information
      empChange: function(param) {
        if (this.isBlank(param)) {
          this.consume.empId = ""
        } else {
          this.consume.empId = param.empId
        }
      },

      //the event of addtional button
      purchaseHistory() {
        console.log('the event of addtional button')

        this.consume.phone=this.member.phone
        this.consume.cashName=this.member.cashName
        this.consume.disPrice=this.consume.price*this.consume.discount/100

        if (this.isBlank(this.consume.cashName)) {
          alert("姓名不能为空")
          return
        }
        if (this.isBlank(this.consume.phone)) {
          alert("手机号不能为空")
          return
        }

        if (this.isBlank(this.consume.proId)) {
          alert("购买课程不能为空")
          return
        }
        if (this.isBlank(this.consume.price)) {
          alert("单价不能为空")
          return
        }
        if (this.isBlank(this.consume.actualCount)) {
          alert("课时（小时）不能为空")
          return
        }
        if (this.isBlank(this.consume.discount)) {
          alert("折扣比例不能为空")
          return
        }
        if (this.isBlank(this.consume.receivable)) {
          alert("折前总额不能为空")
          return
        }
        if (this.isBlank(this.consume.realCross)) {
          alert("折后总额不能为空")
          return
        }
        console.log(this.consume.balance)
        if (this.consume.balance<0) {
          alert("剩余定金不能为空")
          return
        }
        if(this.consume.realCross>this.initDataParam.balance){
          if (this.isBlank(this.consume.makeUpMoney)) {
            alert("补交金额不能为空")
            return
          }
        }
        var url = this.url + '/cashAction/consumptionEarnestMoney'
        this.$ajax({
          method: 'POST',
          url: url,
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: this.consume,
          dataType: 'json',
        }).then((response) => {
          var res = response.data
          console.log(res)
          if (res.retCode == '0000') {
            // this.$router.push({
            //   name: 'SettleSummary',
            // });
            alert(res.retMsg);
            this.$emit('queryAction')
            //$("#addCustom").modal("hide")
          } else {
            alert(res.retMsg)
          }
        }).catch((error) => {
          console.log('请求失败处理')
        });
      },
      closeCurrentPage() {
        this.$emit('queryAction')
        console.log('关闭定金消费界面')
      },
      jumpLeft(index){
        $("#aside-menu li").removeClass("li-active");
        $("#aside-menu li").find("i.fa-table").removeClass("fa-circle");
        $("#aside-menu li").eq(index).addClass("li-active");
        $("#aside-menu li").eq(index).find("i.fa-table").addClass("fa-circle")
      },

      //Query member's information based on the memNum
      checkMemNum(param) {
        console.log('checkMemNum')
        if (this.isBlank(param)) {
          return
        }
        console.log('费用类型3：' + this.consume.costType)
        var url = this.url + '/purchasedItemsAction/queryMemUnfinished'
        this.$ajax({
          method: 'POST',
          url: url,
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            memNum: param,
          },
          dataType: 'json',
        }).then((response) => {
          var res = response.data
          if (res.retCode == '0000') {
            this.member = res.retData.mem
            this.counselorList = res.retData.counselorList
            if(this.member != null){
              this.consume.memNum=this.member.memNum
              this.consume.memName=this.member.memName
              this.consume.phone=this.member.phone
            }
            if(this.counselorList.length>0){
              console.log("有未完成的项目")
              var counselorEmpId = this.counselorList[0].counselor
              this.$refs.counselorEmp.setEmp(counselorEmpId)

            }
          }

        }).catch((error) => {
          console.log('会员查询请求失败')
        });
      },

    }

  }
</script>

<style>

</style>

