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
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">是否可试看</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <select class="form-control" v-model="project.isTry">
                                <option value="1">是</option>
                                <option value="0">否</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">序号</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="project.ccSort" placeholder="">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">上传文件</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="file" id="medFile" />
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
                },
                title: '',
            };
        },
        methods: {
            // Initialization projcet’s content
            initData(param, project) {
                $("#medFile").val('');
                if (param == 'add') {
                    this.title = '新增'
                    this.project = {
                        title: '',
                        isTry: 0,
                        ccSort: '',
                        couId: project
                    }
                    //this.project.couId = project
                } else if (param == 'modify') {
                    this.title = '修改'
                    Object.assign(this.project, project)
                }
            },
            //the event of addtional button
            certainAction() {
                //console.log('the event of addtional button')
                if (this.isBlank(this.project.title)) {
                    alert("章节名不能为空")
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
        }
    }
</script>

<style>

</style>
