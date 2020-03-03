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
                            <textarea style="height: 300px;width: 400px;" v-model="project.content"></textarea>
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

                switch (this.title) {
                    case '新增文章':
                        var url = this.url + '/article/addArticle'
                        break;
                    case '修改文章':
                        var url = this.url + '/article/updateArticle'
                        break;
                }

                this.$ajax({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': this.contentType,
                        'Access-Token': this.accessToken
                    },
                    data: this.project,
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    console.log(res)
                    if (res.retCode == '0000') {
                        alert(res.retMsg)
                        this.$emit('checkProject')
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
            }
        }

    }
</script>

<style>

</style>
