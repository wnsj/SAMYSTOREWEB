<!-- the page of department management -->
<template>

    <div class="wraper">
        <div class="col-md-12 col-lg-12 main-title">
            <h1 class="titleCss">课程管理</h1>
        </div>
        <div class="row" style="margin-top: 40px;">
            <!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" v-show="accountType==true">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">门店</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<store ref='store' @storeChange='storeChange'></store>
				</div>
			</div> -->
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">课程名称</p><span
                        class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <input class="form-control" type="text" v-model="couName">
                </div>
            </div>
           <!-- <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">咨询师</p><span
                        class="sign-left">:</span>
                </div>
                <div class="col-md-7 col-lg-7">
                    <Counselor ref="counselorRef" @atChange="setAtData"></Counselor>
                </div>
            </div> -->
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">是否在用</p><span
                        class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <select class="form-control" v-model="isUse">
                        <option value="">全部</option>
                        <option value="1">在用</option>
                        <option value="0">停用</option>
                    </select>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">精品课</p><span
                        class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <select class="form-control" v-model="boutique">
                        <option value="">全部</option>
                        <option value="1">是</option>
                        <option value="0">否</option>
                    </select>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">是否免费</p><span
                        class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <select class="form-control" v-model="isFree">
                        <option value="">全部</option>
                        <option value="0">免费</option>
                        <option value="1">限时免费</option>
                        <option value="2">付费</option>
                    </select>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">课程类型</p><span
                        class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <select class="form-control" v-model="couType">
                        <option value="">全部</option>
                        <option value="1">音频</option>
                        <option value="2">视频</option>
                    </select>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">签到赠送</p><span
                        class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <select class="form-control" v-model="isGive">
                        <option value="">全部</option>
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </div>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5" style="padding: 0; line-height: 34px;">
                    <p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">课程分类</p><span
                        class="sign-left">:</span>
                </div>
                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                    <EvaluationType ref="EvaluationTypeRef" @etChange="etChange"></EvaluationType>
                </div>
            </div>

        </div>
        <div class="row" style="margin-top: 15px;padding-bottom:1.5%;">
            <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
                v-on:click="selectRule('1')">添加</button>
            <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;" data-toggle="modal"
                v-on:click="checkProject(1)">查询</button>
        </div>
        <div class="">
            <div class="col-md-12 col-lg-12">
                <div class="table-responsive pre-scrollable">
                    <table class="table table-bordered table-hover" id="datatable">
                        <thead class="datathead">
                            <tr>
                                <th class="text-center">ID</th>
                                <th class="text-center">课程名称</th>
                                <th class="text-center">原价</th>
                                <th class="text-center">现价</th>
                                <th class="text-center">课程类型</th>
                                <th class="text-center">课时</th>
                                <th class="text-center">精品课</th>
                                <th class="text-center">是否免费</th>
                                <th class="text-center">签到赠送</th>
                                <th class="text-center">修改</th>
                                <th class="text-center">章节</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in projectList" :key="index" v-on:dblclick="selectRule('3',item)">
                                <td class="text-center" style="line-height:33px;">{{item.couId}}</td>
                                <td class="text-center" style="line-height:33px;">{{item.couName}}</td>
                                <td class="text-center" style="line-height:33px;">{{item.price}}</td>
                                <td class="text-center" style="line-height:33px;">{{item.realPrice}}</td>
                                <td class="text-center" style="line-height:33px;">{{item.couType == '1' ? '音频':'视频'}}</td>
                                <td class="text-center" style="line-height:33px;">{{item.couLength}}</td>
                                <td class="text-center" style="line-height:33px;">{{item.boutique == '1' ? '是' : '否'}}</td>
                                <td class="text-center" style="line-height:33px;">{{item.isFree == '0' ? '免费' : item.isFree == '1' ? '限时免费' : '付费'}}</td>
                                <td class="text-center" style="line-height:33px;">{{item.isGive == '1' ? '是' : '否'}}</td>
                                <td class="text-center" style="line-height:33px;"><button type="button" class="btn btn-warning"
                                        v-on:click="selectRule('3',item)">修改</button></td>
                                <td class="text-center" style="line-height:33px;"><button type="button" class="btn btn-warning"
                                        v-on:click="openCourceChapter(item)">查看章节</button></td>
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
            <div class="modal fade" id="videoContent">
                <div class="modal-dialog">
                    <SubVideo ref='subVideo' @certainAction='feedBack'></SubVideo>
                </div>
            </div>
            <div class="modal fade" id="courceChapter">
                <div class="modal-dialog">
                    <SubCourceChapter ref="SubCourceChapterRef"></SubCourceChapter>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
    import Counselor from '../common/Counselor.vue'
    import SubVideo from '../MP/SubProject/SubVideo.vue'
    import SubCourceChapter from '../MP/SubProject/SubCourceChapter.vue'
    import EvaluationType from '@/components/common/EvaluationType.vue'
    import {
        init
    } from '@/../static/js/common.js'
    import Paging from '../common/paging'
    export default {
        components: {
            Counselor,
            SubVideo,
            Paging,
            SubCourceChapter,
            EvaluationType
        },
        data() {
            return {
                projectList: [],
                couName: '',
                colId: '',
                boutique: '',
                isUse: '1',
                isFree: '',
                couType: '',
                isGive: '',
                ttId: '',
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
                //this.$refs.counselorRef.getProject();
            },
            //feedback from adding and modifying view
            feedBack() {
                this.checkProject(1)
                $("#videoContent").modal('hide')
            },
            // check the adding and modifying rule of account
            selectRule(param, item) {
                if (param == "1") {
                    this.$refs.subVideo.initData('add')
                    $("#videoContent").modal('show')
                } else if (param == "3") {
                    this.$refs.subVideo.initData('modify', item)
                    $("#videoContent").modal('show')
                }
            },
            //check the list of position
            checkProject(page) {
                //console.log('checkPosition')
                var url = this.url + '/cource/queryCourceList'
                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: {
                        couName: this.couName,
                        colId: this.colId,
                        boutique: this.boutique,
                        isUse: this.isUse,
                        isFree: this.isFree,
                        couType: this.couType,
                        isGive: this.isGive,
                        ttId: this.ttId,
                        page: page.toString(),
                        pageSize: this.pageSize
                    },
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        // this.pages = res.retData.pages //总页数
                        // this.current = res.retData.current //当前页码
                        // this.pageSize = res.retData.size //一页显示的数量
                        // this.total = res.retData.total //数据的数量
                        // this.$refs.paging.setParam(this.pages, this.current, this.total)
                        this.projectList = res.retData
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
            },
            setAtData(atObj) {
                //console.log("at" + atObj)
                if (atObj == null) {
                    this.colId = '';
                } else {
                    //var id = atObj.atId;
                    //console.log("at" + atObj.atId)
                    this.colId = atObj.colId
                }
            },
            openCourceChapter(item) {
                //console.log("openCourceChapter" + item)
				$('#courceChapter').modal({backdrop: 'static', keyboard: false});
                $("#courceChapter").modal('show')
                this.$refs.SubCourceChapterRef.initData(item)
            },
            etChange(retObj) {
                if (retObj == null) this.ttId = '';
                else this.ttId = retObj.ttId;
            }
        },
        mounted() {
            this.initData()
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
