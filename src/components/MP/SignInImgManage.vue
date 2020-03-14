<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">签到图片管理</h1>
        </div>
        <div class="row" style="margin-top: 40px;">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">开始时间</p><span
                        class="sign-left">:</span>
                </div>

                <div class="col-md-7 col-lg-7">
                    <datePicker type="date" value-type="format" format="YYYY-MM-DD" v-model="begDate"></datePicker>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">结束时间</p><span
                        class="sign-left">:</span>
                </div>

                <div class="col-md-7 col-lg-7">
                    <datePicker type="date" value-type="format" format="YYYY-MM-DD" v-model="endDate" @retBack="feedBack()"></datePicker>
                </div>
            </div>

        </div>
        <div class="row" style="margin-top: 15px;padding-bottom:1.5%;">
            <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
                v-on:click="selectRule('1')">添加</button>
            <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
                v-on:click="checkDate()">检查</button>
            <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
                v-on:click="checkProject(1)">查询</button>
        </div>
        <div class="">
            <div class="col-md-12 col-lg-12">
                <div class="table-responsive pre-scrollable">
                    <table class="table table-bordered table-hover" id="datatable">
                        <thead class="datathead">
                            <tr>
                                <th class="text-center">时间</th>
                                <th class="text-center">图片</th>
                                <th class="text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in projectList" :key="index" v-on:dblclick="selectRule('3',item)">
                                <td class="text-center" style="line-height:33px;">{{item.imgDate | dateFormatFilter('YYYY-MM-DD')}}</td>
                                <td class="text-center" style="line-height:33px;">{{item.imgPath}}</td>
                                <td class="text-center" style="line-height:33px;">
                                    <button type="button" class="btn btn-warning" v-on:click="selectRule('3',item)">修改</button>
                                    <button type="button" class="btn btn-warning" v-on:click="deleteProject(item)">删除</button>
                                </td>
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
            <div class="modal fade" id="operSignInContent">
                <div class="modal-dialog">
                    <operSignInImg ref="operSignInImgRef" @retBack="feedBack()"></operSignInImg>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
    import datePicker from 'vue2-datepicker'
    import moment from 'moment'
    import operSignInImg from '../MP/SubProject/operSignInImg.vue'
    import {
        init
    } from '@/../static/js/common.js'
    import Paging from '../common/paging'
    export default {
        components: {
            datePicker,
            Paging,
            operSignInImg
        },
        data() {
            return {
                projectList: [],
                begDate: this.moment('', 'YYYY-MM-DD'),
                endDate: this.moment('', 'YYYY-MM-DD'),
                errorDateList: [],
                //分页需要的数据
                pages: '', //总页数
                current: 1, //当前页码
                pageSize: 10, //一页显示的数量
                total: '', //数据的数量
            };
        },
        methods: {
            //子级传值到父级上来的动态拿去
            pageChange: function(page) {
                this.current = page
                this.checkProject(page);
            },
            initData() {

            },
            //feedback from adding and modifying view
            feedBack() {
                this.checkProject(1)
                $("#operSignInContent").modal('hide')
            },
            // check the adding and modifying rule of account
            selectRule(param, item) {
                if (param == "1") {
                    this.$refs.operSignInImgRef.initData('add')
                    $("#operSignInContent").modal('show')
                } else if (param == "3") {
                    this.$refs.operSignInImgRef.initData('modify', item)
                    $("#operSignInContent").modal('show')
                }
            },
            //check the list of position
            checkProject(page) {
                //console.log('checkPosition')
                if (this.isBlank(this.begDate)) {
                    alert("开始时间不能为空!")
                    return;
                }
                if (this.isBlank(this.endDate)) {
                    alert("结束时间不能为空!")
                    return;
                }
                var fd = new FormData();
                var nextDay = moment(this.endDate).add(1, 'day').format("YYYY-MM-DD");
                fd.append("begDate", this.begDate);
                fd.append("endDate", nextDay);
                fd.append("imgType", 1);
                var url = this.url + '/sysImgAction/querySysImg'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Token': this.accessToken
                    },
                    data: fd,
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        this.projectList = res.retData
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('请求失败处理')
                });
            },
            deleteProject(item) {
                if (!confirm("确定删除?")) return;
                var fd = new FormData();
                fd.append("imgId", item.imgId);
                var url = this.url + '/sysImgAction/deleteSysImg'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded ',
                        'Access-Token': this.accessToken
                    },
                    data: fd,
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        alert(res.retMsg)
                        this.checkProject(1)
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('请求失败处理')
                });
            },
            checkDate() {
                //this.checkProject(1);
                if (this.isBlank(this.begDate)) {
                    alert("开始时间不能为空!")
                    return;
                }
                if (this.isBlank(this.endDate)) {
                    alert("结束时间不能为空!")
                    return;
                }
                var fd = new FormData();
                var nextDay = moment(this.endDate).add(1, 'day').format("YYYY-MM-DD");
                fd.append("begDate", this.begDate);
                fd.append("endDate", nextDay);
                fd.append("imgType", 1);
                var url = this.url + '/sysImgAction/querySysImg'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Token': this.accessToken
                    },
                    data: fd,
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        this.projectList = res.retData;
                        console.log( this.projectList)
                        var begTime = moment(this.begDate);
                        var endTime = moment(this.endDate);
                        var diffDay = endTime.diff(begTime, 'days');
                        this.errorDateList = [];
                        if (diffDay < 0) {
                            alert("结束时间小于开始时间!")
                            return;
                        }

                        for (var i = 0; i <= diffDay; i++) {
                            var nextDate = moment(this.begDate).add(i, 'day').format("YYYY-MM-DD");
                            //console.log(nextDate);
                            var dateFlag = false;
                            for (var d = 0; d < this.projectList; d++) {
                                var imgDate = this.projectList[d].imgDate;
                                if (!this.isBlank(imgDate)) {
                                    var imgTime = this.moment(imgDate, 'YYYY-MM-DD')
                                    console.log("imgTime:" + imgTime)
                                    if (imgTime == nextDate) {
                                        dateFlag = true;
                                        break;
                                    }
                                }
                            }
                            if (!dateFlag) {
                                console.log("nextDate:" + nextDate)
                                this.errorDateList.push(nextDate)
                            }
                        }
                        console.log("errorDateList:" + this.errorDateList)
                    } else {
                        alert(res.retMsg)
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
            }
        },
        mounted() {
            //this.initData()
            window.addEventListener('scroll', this.handleScroll, true);
            init();
        },
        created() {
            // this.checkProject(1)
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

    @media print {
        #fHeader {
            display: none
        }
    }
</style>
