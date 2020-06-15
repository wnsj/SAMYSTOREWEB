<template>
    <div>

        <div class="row newRow" style="margin-top: 1%">

            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">状态</p><span
                    class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <select class="form-control" v-model="state">
                        <option value=0></option>
                        <option value=1>启用</option>
                        <option value=2>禁用</option>
                    </select>
                </div>
            </div>
            <button type="button"
                    class="btn btn-warning pull-right m_r_10"
                    style="margin-right:1.5%;" data-toggle="modal"
                    v-has="'Menu:add'"
                    v-on:click="selectRule('1')">添加</button>
            <button type="button"
                    class="btn btn-primary pull-right m_r_10"
                    style="margin-right:1.5%;"
                    data-toggle="modal"
                    v-has="'Menu:get'"
                    v-on:click="queryData(1)">查询
            </button>
        </div>

        <div class="" style="padding-top: 30px;">
            <div class="col-md-12 col-lg-12">
                <div class="table-responsive  table-bg">
                    <table class="table table-bordered table-hover" id="datatable">
                        <thead class="datathead">
                        <tr>
                            <th class="text-center">菜单名</th>
                            <th class="text-center">父菜单名</th>
                            <th class="text-center">唯一标识</th>
                            <th class="text-center">状态</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in tableData" :key="index" v-on:dblclick="selectRule('3',item)">
                            <td class="text-center" style="line-height:33px;">{{item.menuName}}</td>
                            <td class="text-center" style="line-height:33px;">{{item.parentName}}</td>
                            <td class="text-center" style="line-height:33px;">{{item.menuCode}}</td>
                            <td class="text-center" style="line-height:33px;">{{item.stateLabel}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row row_edit">
                    <div class="modal fade" id="auditMenu">
                        <div class="modal-dialog">
                            <auditMenu ref='auditMenuRef' @certainAction='feedBack'></auditMenu>
                        </div>
                    </div>
                </div>
                <!--分页插件-->
                <div class="page">
                    <!--这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值-->
                    <paging ref="paging" @change="pageChange"></paging>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import paging from "../../common/paging";
    import auditMenu from '../../common/subMenu/auditMenu.vue'
    export default {
        components: {
            paging,
            auditMenu
        },
        data() {
            return {
                tableData: [],
                state: 0,
                menuData:{},
                //分页需要的数据
                pages: '', //总页数
                current: 1, //当前页码
                pageSize: 10, //一页显示的数量
                total: '', //数据的数量
            };
        },
        name: "Menu",
        methods: {

            //子级传值到父级上来的动态拿去
            pageChange: function(page) {
                this.current = page
                this.queryData(page)
            },
            async queryData(page) {
                var url = this.url + '/menuBean/getMenuByPage'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        state: this.state,
                        current: page,
                        pageSize: this.pageSize
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode === '0000') {
                        this.pages = res.retData.pages //总页数
                        this.current = res.retData.current //当前页码
                        this.pageSize = res.retData.size //一页显示的数量  必须是奇数
                        this.total = res.retData.total //数据的数量
                        this.$refs.paging.setParam(this.pages, this.current, this.total)
                        this.tableData = res.retData.records
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('数据请求失败处理')
                });
            },
            selectRule(param, item) {
                if (param === "1") {
                    this.$refs.auditMenuRef.initData('add')
                    $("#auditMenu").modal('show')
                } else if (param === "3") {
                    if (!this.has('Menu:modify')) {
                        alert("您没有该访问权限！")
                        return
                    }
                    this.$refs.auditMenuRef.initData('modify', item)
                    $("#auditMenu").modal('show')
                }
            },


            feedBack() {
                this.queryData(1)
                $("#auditMenu").modal('hide')
            },
        },
        created: function () {
            this.queryData()
        }
    }
</script>

<style scoped>

</style>
