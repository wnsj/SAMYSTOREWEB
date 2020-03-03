<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h2 id="myModalLabel" class="modal-title">转会员</h2>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">
                <div class="col-md-6 form-group clearfix">
                    <label for="cyname" class="col-md-4 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">会员号</label><span
                    class="sign-left">:</span>
                    <div class="col-md-7">
                        <input type="text" class="form-control" v-model="memNum" v-on:change="checkMemNum(memNum)">
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

                <div class="col-md-12 col-lg-12">
                    <p class="tips">注意：如果该会员号绑定的姓名与手机号和定金的姓名和手机号不对应，需要人工确认</p>
                </div>
            </div>

            <div class="form-group clearfix">
                <div class="col-md-12">
                    <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
                            v-on:click="closeCurrentPage()">返回</button>
                    <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
                            v-on:click="transferMember()">确认</button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                cashId:'',
                cashName:'',
                phone:'',
                memNum:'',
                item:{}
            }
        },
        methods:{
            initData(item){
                this.memNum=''
                this.cashId=''
                this.cashName=''
                this.phone=''
                this.item=item
            },
            // 关闭模态框
            closeCurrentPage(){
                this.$emit('closeToMember');
            },
            checkMemNum(param) {
                console.log('checkMemNum')
                if (this.isBlank(param)) {
                    return
                }
                var url = this.url + '/memberAction/queryMember'
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
                        if (res.retData.length > 0) {
                            this.cashName = res.retData[0].memName
                            this.phone=res.retData[0].phone
                            this.memNum=res.retData[0].memNum
                        }
                    }else{
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    console.log('会员查询请求失败')
                });
            },
            //提交表单
            transferMember(){
                if(this.item.cashName!=this.cashName||this.item.phone!=this.phone){
                    if(confirm("注意：该会员姓名,手机号与交定金人员姓名，手机号不相符，确定转为会员？")){
                        this.submitForm()
                    }else {
                        return
                    }
                }else{
					this.submitForm()
				}
            },
            submitForm(){
                var url = this.url + '/cashAction/toMember'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        cashId:this.item.cashId,
                        cashName:this.cashName,
                        phone:this.phone,
                        memNum:this.memNum
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        alert("转会员成功");
                        this.closeCurrentPage()
                    }else {
                        alert(res.retMsg)
                    }

                }).catch((error) => {
                    console.log('转会员请求失败')
                });
            }
        }
    }
</script>

<style scoped>

</style>
