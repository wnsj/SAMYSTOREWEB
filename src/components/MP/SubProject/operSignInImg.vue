<!-- add and modify position -->
<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 id="myModalLabel" class="modal-title">{{title}}图片</h4>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">

                <div class="col-md-6 form-group clearfix">
                    <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">日期</label><span
                        class="sign-left">:</span>
                    <div class="col-md-8">
                        <dPicker type="date" value-type="format" format="YYYY-MM-DD" v-model="project.imgDate"
                            :disabled="flag"></dPicker>
                    </div>
                </div>

                <div class="col-md-6 form-group clearfix">
                    <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">上传文件</label>
                    <span class="sign-left">:</span>
                    <div class="col-md-8">
                        <input type="file" id="file" @change="imgChange" />
                        <div id='signInImgOutDiv'></div>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;"
                            data-toggle="modal" v-on:click="closeCurrentPage()">返回</button>
                        <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;"
                            data-toggle="modal" v-on:click="certainAction()">确认</button>
                    </div>
                </div>
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
                    imgDate: this.moment("", 'YYYY-MM-DD'),
                    imgType: 1
                },
                title: '',
                flag: true
            };
        },
        methods: {
            // Initialization projcet’s content
            initData(param, project) {
                $("#file").val('');
                $("#signInImgInnDiv").remove();
                if (param == 'add') {
                    this.title = '新增'
                    if (this.isBlank(project)) {
                        this.project = {
                            imgDate: this.moment("", 'YYYY-MM-DD'),
                            imgType: 1
                        }
                        this.flag = false;
                    } else {
                        this.project = {
                            imgDate: project,
                            imgType: 1
                        }
                        this.flag = true;
                    }

                    //this.project.couId = project
                } else if (param == 'modify') {
                    this.title = '修改';
                    this.flag = true;
                    Object.assign(this.project, project)
                    if (!this.isBlank(project.imgPath)) {
                        var dataUrl = this.addTimesParam(this.url + project.imgPath);
                        if ($("#signInImgInnDiv").length <= 0) $("#signInImgOutDiv").html(
                            "<div id='signInImgInnDiv' ><img id='signInImg' src='#' style='width:100%' /></div>"
                        );
                        $("#signInImg").attr("src", dataUrl);
                    }
                }
            },
            //the event of addtional button
            certainAction() {
                //console.log('the event of addtional button')
                if (this.isBlank(this.project.imgDate)) {
                    alert("时间不能为空!")
                    return
                }

                var fd = new FormData();
                var file = $("#file")[0].files[0];
                fd.append("imgType", this.project.imgType);
                fd.append("imgDate", this.project.imgDate);

                switch (this.title) {
                    case '新增':
                        var url = this.url + '/sysImgAction/addSysImg'
                        if (this.isBlank(file)) {
                            alert("请选择文件!");
                            return;
                        } else {
                            fd.append("file", file);
                        }
                        break;
                    case '修改':
                        var url = this.url + '/sysImgAction/updateSysImg'
                        if (!this.isBlank(file)) {
                            fd.append("file", file);
                        }
                        fd.append("imgId", this.project.imgId);
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
                $("#operSignInContent").modal("hide")
                //$("#addImgContent").modal("hide")
                //console.log('关闭添加课程界面')
            },
            //预览图
            imgChange() {
                var file = $("#file")[0].files[0]; //获取file对象
                if (file == null || file == undefined) {
                    $("#signInImgInnDiv").remove();
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
                        if ($("#signInImgInnDiv").length <= 0) $("#signInImgOutDiv").html(
                            "<div id='signInImgInnDiv' ><img id='signInImg' src='#' style='width:100%' /></div>"
                        );
                        $("#signInImg").attr("src", dataUrl);
                    }
                }
            }
        }
    }
</script>

<style>

</style>
