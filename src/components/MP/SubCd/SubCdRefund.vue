<template>
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
      <h2 id="myModalLabel" class="modal-title">定金退费</h2>
    </div>
    <div class="modal-body  pos_r">
      <div class="tab-pane fade in active martop" id="basic">

        <div class="col-md-6 form-group clearfix" v-if="memNumState">
          <label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">会员号</label><span
          class="sign-left">:</span>
          <div class="col-md-7">
            <input type="text" class="form-control" v-model="memNum" disabled="disabled">
          </div>
        </div>

        <div class="col-md-6 form-group clearfix">
          <label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">姓名</label><span
          class="sign-left">:</span>
          <div class="col-md-7">
            <input type="text" class="form-control" v-model="cashName" disabled="disabled">
          </div>
        </div>

        <div class="col-md-6 form-group clearfix">
          <label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">手机号</label><span
          class="sign-left">:</span>
          <div class="col-md-7">
            <input type="text" class="form-control" v-model="phone" disabled="disabled">
          </div>
        </div>

        <div class="col-md-6 form-group clearfix">
          <label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">定金余额</label><span
          class="sign-left">:</span>
          <div class="col-md-7">
            <input type="text" class="form-control" v-model="balance" disabled="disabled">
          </div>
        </div>

        <div class="col-md-6 form-group clearfix">
          <label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;"><font color="red">退款金额</font></label><span
          class="sign-left">:</span>
          <div class="col-md-7">
            <input type="text" v-model="refundMoney" class="form-control">
          </div>
        </div>
      </div>

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
  import emp from '../../common/Employee.vue'
  import project from '../../common/Project.vue'
  export default {
    components: {
      emp,
      project,
    },
    data() {
      return {
        cashId:"",//定金ID
        memNum:"",//会员号
        cashName:"",//姓名
        phone:"",//手机号
        refundMoney:"",//退费的金额
        balance:"",//现在定金的余额
        memNumState:true,//控制会员号显示隐藏状态
        balance2:""//初始化传过来的余额，长久保存
      };
    },
    methods: {
      // Initialization consume’s content
      initData(param) {
        //初始化变量
        this.paramInit();
        this.cashId=param.cashId;
        this.cashName=param.cashName;
        this.phone=param.phone;
        this.memNum=param.memNum;
        this.balance=param.balance;
        this.balance2=param.balance;
        if (this.isBlank(this.memNum)) {
          this.memNumState=false;
        }
      },
      paramInit(){
        this.cashId="",//定金ID
          this.memNum="",//会员号
          this.cashName="",//姓名
          this.phone="",//手机号
          this.refundMoney="",//退费的金额
          this.balance="",//现在定金的余额
          this.memNumState=true,//控制会员号显示隐藏状态
          this.balance2=""//初始化传过来的余额，长久保存
      },
      //the event of addtional button
      purchaseHistory() {
        console.log('the event of addtional button')
        if (this.isBlank(this.refundMoney)) {
          alert("退费金额不能为空")
          return
        }
        var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (!reg.test(this.refundMoney)) {
          alert("退费金额格式有误，请重新填写正确的格式");
          this.refundMoney="";
          this.balance=this.balance2;
          return;
        }
        console.log("this.balance2"+this.balance2);
        console.log("this.refundMoney"+this.refundMoney);
        if(parseFloat(this.balance2)<parseFloat(this.refundMoney)){
          alert("超出定金余额范围")
          this.refundMoney="";
          this.balance=this.balance2;
          return;
        }

        var url = this.url + '/cashAction/cashRefund'
        this.$ajax({
          method: 'POST',
          url: url,
          headers: {
            'Content-Type': this.contentType,
            'Access-Token': this.accessToken
          },
          data: {
            cashId:this.cashId,//定金ID
            memNum:this.memNum,//会员号
            cashName:this.cashName,//姓名
            phone:this.phone,//手机号
            refundMoney:this.refundMoney,//退费的金额
            //balance:this.balance,//现在定金的余额
            operatorId:this.accountId()
          },
          dataType: 'json',
        }).then((response) => {
          var res = response.data
          console.log(res)
          if (res.retCode == '0000') {
            alert(res.retMsg)
            this.$emit('refundAction')
          } else {
            alert(res.retMsg)
          }
        }).catch((error) => {
          console.log('请求失败处理')
        });
      },
      closeCurrentPage() {
        this.$emit('refundAction')
        console.log('定金退款界面')
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

<style scoped>

</style>
