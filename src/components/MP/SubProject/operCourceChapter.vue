<!-- add and modify position -->
<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 id="myModalLabel" class="modal-title">{{title}}章节</h4>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">
                <form action="" class="clearfix">
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">章节名称</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="project.title" placeholder="">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">是否免费</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <select class="form-control" v-model="project.isFree">
                                <option value="2">付费</option>
                                <option value="0">免费</option>
                                <!-- <option value="1">限时免费</option> -->
                            </select>
                        </div>
                    </div>
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
                    <!-- <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">是否可试看</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <select class="form-control" v-model="project.isTry">
                                <option value="1">是</option>
                                <option value="0">否</option>
                            </select>
                        </div>
                    </div> -->
                    <div class="col-md-6 form-group clearfix" style="margin-right:50%;">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">序号</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="project.ccSort" placeholder="">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix" style="margin-bottom:0;">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">简介</label><span
                            class="sign-left">:</span>
                    </div>
                    <div class="col-md-12 form-group clearfix new-style-box">
                        <textarea class="form-control new-style" maxlength="60" @input="descInput" v-model="project.ccExplain" />
                        <h6><i>{{project.remnant}}</i>/60</h6>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">上传文件</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="file" id="medFile" />
                        </div>
                    </div>
                    <!-- <div class="col-md-12 form-group clearfix">
						<p class="tips">* 提示：图片尺寸572*314</p>
					</div> -->
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
    export default {
        components: {
            dPicker,
        },
        data() {
            return {
                project: {
                    title: '',
                    isTry: 0,
                    ccSort: '',
                    couId: '',
                    ccExplain:'',
                    price:'',
                    realPrice:'',
                    isFree:2,
                    remnant:60
                },
                title: ''
            };
        },
        methods: {
            // Initialization projcet’s content
            initData(param, project) {
				$('#operCourceChapterContent').modal({backdrop: 'static', keyboard: false});
                $("#medFile").val('');
                if (param == 'add') {
                    this.title = '新增'
                    this.project = {
                        title: '',
                        isTry: 0,
                        ccSort: '',
                        couId: project,
                        ccExplain:'',
                        price:'',
                        realPrice:'',
                        isFree:2
                    }
                    //this.project.couId = project
                } else if (param == 'modify') {
                    this.title = '修改'
                    Object.assign(this.project, project)
                    this.descInput();
                }
            },
            descInput(){
                console.log('键盘：111')
                var txtVal = this.project.ccExplain.length;
                this.project.remnant = txtVal;
            },
            //the event of addtional button
            certainAction() {
                //console.log('the event of addtional button')
                if (this.isBlank(this.project.title)) {
                    alert("章节名不能为空!")
                    return
                }
//                 if (this.isBlank(this.project.price) || this.project.price < 0) {
//                     alert("原价不能为空!")
//                     return
//                 }
                if (this.isBlank(this.project.realPrice) || this.project.realPrice < 0) {
                     alert("现价不能为空!")
                     return
                }
                if (this.isBlank(this.project.couId)) {
                    alert("请重新打开本页面!");
                    return
                }

                var fd = new FormData();
                var file = $("#medFile")[0].files[0];
                fd.append("title", this.project.title);
                fd.append("isTry", this.project.isTry);
                fd.append("ccSort", this.project.ccSort);
                fd.append("couId", this.project.couId);
                fd.append("price", this.project.price);
                fd.append("realPrice", this.project.realPrice);
                fd.append("ccExplain", this.project.ccExplain);
                fd.append("isFree", this.project.isFree);

                switch (this.title) {
                    case '新增':
                        var url = this.url + '/courceChapterAction/addCourceChapter'
                        if (this.isBlank(file)) {
                            alert("请选择文件!");
                            return;
                        } else {
                            fd.append("file", file);
                        }
                        break;
                    case '修改':
                        var url = this.url + '/courceChapterAction/updateCourceChapter'
                        if (!this.isBlank(file)) {
                            fd.append("file", file);
                        }
                        fd.append("ccId", this.project.ccId);
                        break;
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
                        this.$emit("retBack")
                        
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('信息请提交失败')
                });
            },
            closeCurrentPage() {
                $("#operCourceChapterContent").modal("hide")
                //console.log('关闭添加课程界面')
            },
            
        },
        created() {
          
        },
       

    }
</script>

<style>
    .new-style-box{
        position:relative;
        height:80px;
    }
    .new-style-box .new-style{
        height:100%;
        resize: none;
		outline:none;
    }
    .new-style-box h6{
        position: absolute;
		right: 20px;
		bottom: 5px;
		font-weight: normal;
		color: #666;
    }
</style>
