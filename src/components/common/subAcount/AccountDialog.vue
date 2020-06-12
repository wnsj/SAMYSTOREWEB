<template>
    <div class="modal-content">
        <div class="modal-header">
            <h4 id="myModalLabel" class="modal-title">{{title}}用户</h4>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">
                <div class="dialogInutBox clearfix">
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">角色</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <SubRole @accChange="fatherRole" ref="subRole"></SubRole>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">用户名</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="param.account"/>
                        </div>
                    </div>
                </div>
                <div class="dialogBtnBox form-group clearfix">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;"
                                data-toggle="modal"
                                v-on:click="closeCurrentPage()">返回
                        </button>
                        <button type="button" :disabled="this.isDisable" class="btn btn-primary pull-right m_r_10"
                                style="margin-right:1.5%;"
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


    import SubRole from '../../common/subAcount/SubRole.vue'
    export default {
        components: {
            SubRole
        },
        data() {
            return {
                param: {
                    // 用户名
                    account: '',
                    // 角色id集合
                    roleIdList: '',
                },
                title: '',
                isDisable: false,
            };
        },
        methods: {
            // Initialization projcet’s content
            initData(param, addCou) {
                $('#accountDialog').modal({backdrop: 'static', keyboard: false});
                this.$refs.subRole.setRoleId([])
                if (param === 'add') {
                    this.title = '新增'
                    this.param = {
                        // 菜单名
                        account: '',
                        // 菜单唯一标识
                        roleIdList: '',
                    }
                } else if (param === 'modify') {
                    console.log('Initialization evaluation’s content, which modifies evaluation')
                    this.$refs.subRole.setRoleId(addCou.roleIdList)
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
                        var url = this.url + '/SysAccountController/addAccount'
                        break;
                    case '修改':
                        var url = this.url + '/SysAccountController/patchAccount'
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
                $("#accountDialog").modal("hide")
            },
            fatherRole(data) {
                this.param.roleIdList = data
            }
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
