<!-- add and modify position -->
<template>
    <div class="modal-content" id="projectContent">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 id="myModalLabel" class="modal-title">{{title}}</h4>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">
                <form action="" class="clearfix">
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">标题</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="project.title" placeholder="">
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">分类</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <ArticleTheme ref="atRef" @atChange="setAtData"></ArticleTheme>
                        </div>
                    </div>

                    <div class="col-md-6 form-group clearfix">
                        <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">内容</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <textarea v-model="project.content"></textarea>
                        </div>
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">图片</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="file" id="artImgFile" @change="imgChange" />
                            <div id="artImgOutDiv"></div>
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
    import moment from 'moment'
    import ArticleTheme from '@/components/common/ArticleTheme.vue'
    export default {
        components: {
            ArticleTheme
        },
        data() {
            return {
                project: {
                    artId: '',
                    atId: '',
                    title: '',
                    content: '',
                    author: '',
                },
                title: '',
            };
        },
        methods: {
            // Initialization projcet’s content
            initData(param, project) {
                this.project = {
                    artId: '',
                    atId: '',
                    title: '',
                    content: '',
                    author: ''
                }
                $("#artImgInnDiv").remove();
                $("#artImgFile").val("");
                if (param == 'add') {
                    //console.log('Initialization project’s content, which adds project')
                    this.$refs.atRef.setAtId(0);
                    this.title = '新增文章'
                    this.project = {
                        artId: '',
                        atId: '',
                        title: '',
                        content: '',
                        author: ''
                    }
                } else if (param == 'modify') {
                    //console.log('Initialization project’s content, which modifies project')
                    this.title = '修改文章'
                    Object.assign(this.project, project)
                    this.$refs.atRef.setAtId(project.atId);
                    if (!this.isBlank(project.artImg)) {
                        var dataUrl = this.addTimesParam(this.url + project.artImg);
                        console.log("dataUrl:" + dataUrl)
                        if ($("#artImgInnDiv").length <= 0) $("#artImgOutDiv").html(
                            "<div id='artImgInnDiv' ><img id='artImg' src='#' style='width:100%' /></div>"
                        );
                        $("#artImg").attr("src", dataUrl);
                    }
                }
            },
            //the event of addtional button
            certainAction() {
                //console.log('the event of addtional button')

                if (this.isBlank(this.project.title)) {
                    alert("标题不能为空!")
                    return
                }
                if (this.isBlank(this.project.atId)) {
                    alert("分类不能为空")
                    return
                }
                var fd = new FormData();
                var file = $("#artImgFile")[0].files[0];
                fd.append("title", this.project.title);
                fd.append("atId", this.project.atId);
                fd.append("content", this.project.content);
                if (!this.isBlank(file)) {
                    fd.append("file", file);
                }

                switch (this.title) {
                    case '新增文章':
                        var url = this.url + '/article/addArticle'
                        break;
                    case '修改文章':
                        var url = this.url + '/article/updateArticle'
                        if (this.isBlank(this.project.artId) || this.project.artId == 0) {
                            alert("请重新打开本页面!")
                            return
                        }
                        fd.append("artId", this.project.artId);
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
                        this.$emit('certainAction')
                    }
                }).catch((error) => {
                    console.log('提交失败')
                });
            },
            closeCurrentPage() {
                $("#articleContent").modal("hide")
                //console.log('关闭界面')
            },
            //接收文章分类子组件数据
            setAtData(atObj) {
                //console.log("at" + atObj)
                if (atObj == null) {
                    this.project.atId = '';
                } else {
                    //var id = atObj.atId;
                    //console.log("at" + atObj.atId)
                    this.project.atId = atObj.atId
                }
            },
            //预览图
            imgChange() {
                var file = $("#artImgFile")[0].files[0]; //获取file对象
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
                        if ($("#artImgInnDiv").length <= 0) $("#artImgOutDiv").html(
                            "<div id='artImgInnDiv' ><img id='artImg' src='#' style='width:100%' /></div>"
                        );
                        $("#artImg").attr("src", dataUrl);
                    }
                }
            }
        }
    }
</script>

<style>

</style>
