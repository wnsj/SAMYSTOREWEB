<!-- add and modify position -->
<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 id="myModalLabel" class="modal-title">{{title}}课程</h4>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">
                <form action="" class="clearfix">
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">课程名称</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="project.couName" placeholder="">
                        </div>
                    </div>
                    <!-- <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询师</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <Counselor ref="counselorRef" @atChange="setAtData"></Counselor>
                        </div>
                    </div> -->
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">原价</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="project.price" placeholder="">
                            <span class="pos-ab pos-tr">¥</span>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">现价</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="project.realPrice" placeholder="">
                            <span class="pos-ab pos-tr">¥</span>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">课时</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="project.couLength">
                            <span class="pos-ab pos-tr">H</span>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">课程类型</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <select class="form-control" v-model="project.couType">
                                <option value="1">音频</option>
                                <option value="2">视频</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">是否停用</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <select class="form-control" v-model="project.isUse">
                                <option value="1">在用</option>
                                <option value="0">停用</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">精品课</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <select class="form-control" v-model="project.boutique">
                                <option value="0">否</option>
                                <option value="1">是</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">是否免费</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <select class="form-control" v-model="project.isFree">
                                <option value="0">免费</option>
                                <option value="1">限时免费</option>
                                <option value="2">付费</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">到期时间</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <dPicker v-model="project.freeDate" type="datetime" value-type="format" format="YYYY-MM-DD HH:mm:ss"></dPicker>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">课程简介</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <textarea class="form-control" v-model="project.couExplain" />
                            </div>
                    </div>
                     <div class="col-md-6 form-group clearfix">
                        <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">签到赠送</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <select class="form-control" v-model="project.isGive">
                                <option value="0">否</option>
                                <option value="1">是</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">课程图</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="file" @change="imgChange" id="file" accept="image/*"/>
                            <div id='pingZheng'></div>
                        </div>
                    </div>

                     <div class="col-md-6 form-group clearfix">
                        <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">详情图</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="file" id="infoImgFile" @change="infoImgChange" accept="image/*"/>
                            <div id="infoImgOutDiv"></div>
                        </div>
                    </div>

                     <div class="col-md-6 form-group clearfix">
                        <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">参加人数</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                           <input type="text" class="form-control" v-model="project.joinCount" placeholder="">
                        </div>
                    </div>



					<div class="col-md-12 form-group clearfix">
						<p class="tips">* 提示：图片尺寸640*400</p>
					</div>

                    <div class="form-group clearfix">
                        <div class="col-md-12">
                            <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;"
                                data-toggle="modal" v-on:click="closeCurrentPage()">返回</button>
                            <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;"
                                data-toggle="modal" v-on:click="certainAction()">确认</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import dPicker from 'vue2-datepicker'
    import Counselor from '@/components/common/Counselor.vue'
    export default {
        components: {
            dPicker,
            Counselor,
        },
        data() {
            return {
                project: {
                    price: '',
                    realPrice:'',
                    couName: "",
                    colId: '',
                    boutique: 0,
                    isUse: 1,
                    isFree: 0,
                    couType: 1,
                    couLength: 0,
                    couExplain:'',
                    isGive:0,
                    freeDate:this.moment('','YYYY-MM-DD HH:mm:ss'),
                    joinCount:0
                },
                title: ''
            };
        },
        methods: {
            // Initialization projcet’s content
            initData(param, project) {
                $("#file").val("");
                $("#infoImgFile").val("");
                $("#pingZhengDiv").remove();
                $("#infoImgInnDiv").remove();
                if (param == 'add') {
                    //console.log('Initialization project’s content, which adds project')
                    this.title = '新增'
                    this.project = {
                        price: '',
                        realPrice:'',
                        couName: "",
                        colId: '',
                        boutique: 0,
                        isUse: 1,
                        isFree: 0,
                        couType: 1,
                        couLength: 0,
                        couExplain:'',
                        isGive:0,
                        freeDate:this.moment('','YYYY-MM-DD HH:mm:ss'),
                        joinCount:0
                    }
                    // this.$refs.counselorRef.setAtId(0);
                } else if (param == 'modify') {
                    //console.log('Initialization project’s content, which modifies project')
                    this.title = '修改'
                    Object.assign(this.project, project)
                    this.colId = project.colId;
                    // this.$refs.counselorRef.setAtId(project.colId);
                    if (!this.isBlank(project.couImg)) {
                        var dataUrl = this.addTimesParam(this.url + project.couImg);
                        if ($("#pingZhengDiv").length <= 0) $("#pingZheng").html(
                            "<div id='pingZhengDiv' ><img class='my-img' src='#' style='width:100%' /></div>"
                        );
                        $(".my-img").attr("src", dataUrl);
                    }
                    if(!this.isBlank(project.infoImg)){
                        var dataUrl = this.addTimesParam(this.url + project.infoImg);
                        if ($("#infoImgInnDiv").length <= 0) $("#infoImgOutDiv").html(
                            "<div id='infoImgInnDiv' ><img id='infoImg' src='#' style='width:100%' /></div>"
                        );
                        $("#infoImg").attr("src", dataUrl);
                    }
                }
            },
            //the event of addtional button
            certainAction() {
                //console.log('the event of addtional button')

                if (this.isBlank(this.project.couName)) {
                    alert("课程名称不能为空")
                    return
                }
//                 if (this.isBlank(this.colId)) {
//                     alert("咨询师不能为空")
//                     return
//                 }
                if (this.isBlank(this.project.price) || this.project.price < 0) {
                    alert("课时原价不能为空")
                    return
                }
                if (this.isBlank(this.project.realPrice) || this.project.realPrice < 0) {
                    alert("课时现价不能为空")
                    return
                }
                if (this.project.couLength <= 0) {
                    alert("课时不能为空")
                    return
                }
                var fd = new FormData();
                switch (this.title) {
                    case '新增':
                        var url = this.url + '/cource/addCource'
                        break;
                    case '修改':
                        fd.append("couId",this.project.couId);
                        var url = this.url + '/cource/updateCource'
                        break;
                }
                fd.append("couName", this.project.couName);
                fd.append("colId", this.colId);
                fd.append("price", this.project.price);
                fd.append("realPrice", this.project.realPrice);
                fd.append("couLength", this.project.couLength);
                fd.append("boutique", this.project.boutique);
                fd.append("isUse", this.project.isUse);
                fd.append("isFree", this.project.isFree);
                fd.append("couType", this.project.couType);
                fd.append("couExplain",this.project.couExplain);
                fd.append("isGive",this.project.isGive);
                if(!this.isBlank(this.project.freeDate)){
                    fd.append("freeDate", this.project.freeDate)
                }
                fd.append("joinCount", this.project.joinCount)
                var file = $("#file")[0].files[0];
                if (file != null) {
                    fd.append("file", file);
                }
                var infoFile = $("#infoImgFile")[0].files[0];
                if(!this.isBlank(infoFile)){
                    fd.append("infoFile",infoFile);
                }

                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Access-Token': this.accessToken
                    },
                    data: fd,
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    //console.log(res)
                    if (res.retCode == '0000') {
                        alert(res.retMsg)
                        this.$emit('certainAction')
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('课程信息请提交失败')
                });
            },
            closeCurrentPage() {
                $("#videoContent").modal("hide")
                $("#pingZhengDiv").remove();
               $("#infoImgInnDiv").remove();
                //console.log('关闭添加课程界面')
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
            //预览图
            imgChange() {
                var file = $("#file")[0].files[0]; //获取file对象
                if (file == null || file == undefined) {
                    $("#pingZhengDiv").remove();
                } else {
                    //console.log("file:"+file)
                    //检查文件类型
                    var type = file.type.split("/");
                    if (type[0] != "image") {
                        alert("请选择图片");
                        return false;
                    }
                    //新建fileReader对象
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    //图片加载事件style='width:350px;height:350px;overflow:hidden'
                    reader.onloadend = function() {
                        var dataUrl = reader.result;
                        if ($("#pingZhengDiv").length <= 0) $("#pingZheng").html(
                            "<div id='pingZhengDiv' ><img class='my-img' src='#' style='width:100%' /></div>"
                        );
                        $(".my-img").attr("src", dataUrl);
                    }
                }
            },
            //预览图
            infoImgChange() {
                var file = $("#infoImgFile")[0].files[0]; //获取file对象
                if (file == null || file == undefined) {
                    $("#infoImgInnDiv").remove();
                } else {
                    //console.log("file:"+file)
                    //检查文件类型
                    var type = file.type.split("/");
                    if (type[0] != "image") {
                        alert("请选择图片");
                        return false;
                    }
                    //新建fileReader对象
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    //图片加载事件style='width:350px;height:350px;overflow:hidden'
                    reader.onloadend = function() {
                        var dataUrl = reader.result;
                        if ($("#infoImgInnDiv").length <= 0) $("#infoImgOutDiv").html(
                            "<div id='infoImgInnDiv' ><img id='infoImg' src='#' style='width:100%' /></div>"
                        );
                        $("#infoImg").attr("src", dataUrl);
                    }
                }
            }
        }
    }
</script>

<style>
    .mx-datepicker{
        width:100%;
    }
</style>
