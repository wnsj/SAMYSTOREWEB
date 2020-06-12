<template>
    <div class="modal-content">
        <div class="modal-header">
            <h4 id="myModalLabel" class="modal-title">{{title}}角色</h4>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">
                <div class="dialogInutBox clearfix">
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">角色名</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="param.roleName"/>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">状态</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <select class="form-control" v-model="param.state">
                                <option value=1>启用</option>
                                <option value=2>禁用</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-md-12 form-group clearfix">
                        <div class="col-md-6  clearfix" style="padding: 0;">
                            <label class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">备注</label><span class="sign-left">:</span>
                        </div>
                        <div class="col-md-12">
                            <textarea class="form-control wdType03" v-model="param.remarks"  placeholder="备注"></textarea>
                        </div>
                    </div>

                </div>
                <div class="dialogBtnBox form-group clearfix">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;"
                                data-toggle="modal"
                                v-on:click="closeCurrentPage()">返回
                        </button>
                        <button type="button" :disabled="this.isDisable" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;"
                                data-toggle="modal"
                                v-on:click="certainAction()">确认
                        </button>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>

    export default {
        components: {
        },
        data() {
            return {
                param: {
                    // 角色名
                    roleName:'',
                    // 状态（2：禁用；1启用）
                    state:'',
                    // 备注
                    remarks:''
                },
                title: '',
                isDisable:false,
            };
        },
        methods: {
            // Initialization projcet’s content
            initData(param, addCou) {

                $('#jurDialog').modal({backdrop: 'static', keyboard: false});
                if (param === 'add') {
                    this.title = '新增'
                    this.param = {
                        // 角色名
                        roleName:'',
                        // 状态（2：禁用；1启用）
                        state:'',
                        // 备注
                        remarks:''
                    }
                } else if (param === 'modify') {
                    console.log('Initialization evaluation’s content, which modifies evaluation')

                    this.title = '修改'

                    Object.assign(this.param, addCou)
                }
            },


            certainAction() {
                this.isDisable = true
                setTimeout(() => {
                    this.isDisable = false
                }, 1000)

                switch (this.title) {
                    case '新增':
                        var url = this.url + '/roleBean/addRole'
                        break;
                    case '修改':
                        var url = this.url + '/roleBean/patchRoleById'
                        break;
                }

                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: this.param,
                    dataType: 'json',
                }).then((response) => {
                    const res = response.data
                    if (res.retCode === '0000') {
                        alert(res.retMsg)
                        this.$emit('certainAction')
                    }
                }).catch((error) => {
                    console.log('信息提交失败')
                });
            },
            closeCurrentPage() {
                $("#jurDialog").modal("hide")
            },
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        }
    }
</script>

<style scoped>

</style>
