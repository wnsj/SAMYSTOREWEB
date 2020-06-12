<template>
    <div class="modal-content">
        <div class="modal-header">
            <h4 id="myModalLabel" class="modal-title">查看权限</h4>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">
                <div class="dialogInutBox clearfix">
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">角色名</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <label class="form-control" disabled="false">{{param.roleName}}</label>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label class="col-md-3 control-label text-right nopad end-aline"
                               style="padding:0;line-height:34px;">状态</label><span class="sign-left">:</span>
                        <div class="col-md-8">
                            <label class="form-control" disabled="false">{{param.stateLabel}}</label>
                        </div>
                    </div>
                </div>
                <el-tree
                    :data="param.menuData"
                    @check-change="handleCheckChange"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    :default-expanded-keys="param.firstIdList"
                    :default-checked-keys="param.idList"
                    :props="defaultProps">
                </el-tree>
                <div class="dialogBtnBox form-group clearfix">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;"
                                data-toggle="modal"
                                v-on:click="closeCurrentPage()">返回
                        </button>
                        <button type="button" :disabled="this.isDisable" class="btn btn-primary pull-right m_r_10"
                                style="margin-right:1.5%;"
                                data-toggle="modal"
                                v-on:click="certainAction()">保存
                        </button>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>

    export default {
        components: {},
        data() {
            return {
                param: {
                    // 角色id
                    roleId: '',
                    // 角色名
                    roleName: '',
                    // 状态（2：禁用；1启用）
                    state: '',
                    // 状态描述
                    stateLabel: '',

                    // 选中id集合
                    idList:[],
                    // 菜单数据
                    menuData:[],
                    //一级菜单id
                    firstIdList: []
                },
                // 菜单id集合
                menuIdList:[],
                title: '',
                isDisable: false,
                defaultProps: {
                    children: 'menuBeanList',
                    label: 'menuName'
                }
            };
        },
        methods: {
            // Initialization projcet’s content
            initData(param,item) {
                $('#menuDialog').modal({backdrop: 'static', keyboard: false});

                Object.assign(this.param, param)

                this.param.menuData = item.menuBeanList
                this.param.idList = item.checkedIdList
                this.param.firstIdList = item.firstIdList
                this.param.roleId = param.id
            },


            certainAction() {
                this.isDisable = true
                setTimeout(() => {
                    this.isDisable = false
                }, 1000)


                this.$ajax({
                    method: 'POST',
                    url: this.url + '/roleMenuRefBean/patchRMRef',
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        roleId:this.param.roleId,
                        menuIdList:this.menuIdList
                    },
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
                $("#menuDialog").modal("hide")
            },
            handleCheckChange() {
                let res = this.$refs.tree.getCheckedNodes()
                let arr = []
                res.forEach((item) => {
                    arr.push(item.id)
                })
                this.menuIdList = arr
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            },
        },
        created() {
        }
    }
</script>

<style scoped>

</style>
