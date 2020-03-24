<!-- add and modify position -->
<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 id="myModalLabel" class="modal-title">{{title}}课程章节管理</h4>
        </div>

        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">
                <button type="button" class="btn btn-warning" @click="selectRule(1)">添加</button>
                <!-- <button type="button" class="btn btn-warning" @click="selectRule(1)">批量上传</button> -->
                <table class="table table-bordered table-hover" id="datatable">
                    <thead class="datathead">
                        <tr>
                            <th class="text-center">章节名</th>
                            <th class="text-center">原价</th>
                            <th class="text-center">现价</th>
                            <th class="text-center">是否免费</th>
                            <!-- <th class="text-center">文件</th> -->
                            <!-- <th class="text-center">是否可试看</th> -->
                            <th class="text-center">排序</th>
                            <th class="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in chapterList" :key="item.ccId">
                            <th class="text-center"><span>{{item.title}}</span></th>
                            <!--  <th class="text-center">{{item.path}}</th> -->
                            <!-- <th class="text-center">{{item.isTry == 1 ? '是' : '否'}}</th> -->
                            <th class="text-center"><span>{{item.price}}</span></th>
                            <th class="text-center"><span>{{item.realPrice}}</span></th>
                            <th class="text-center">{{item.isFree == 0 ? '免费' : '付费'}}</th>
                            <th class="text-center">{{item.ccSort}}</th>

                            <th class="text-center">
                                <button type="button" class="btn btn-warning" @click="playAV(item)">播放</button>
                                <button type="button" class="btn btn-warning" @click="selectRule(3,item)">修改</button>
                                <button type="button" class="btn btn-warning" @click="deleteCourceChapter(item)">删除</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <div class="row row_edit">
                    <div class="modal fade" id="operCourceChapterContent">
                        <div class="modal-dialog">
                            <operCourceChapter ref="operCourceChapterRef" @retBack='feedBack'></operCourceChapter>
                        </div>
                    </div>
                </div>
                <div class="row row_edit">
                    <div class="modal fade" id="playAVContent">
                        <div class="modal-dialog">
                            <PlayAV ref="PlayAVRef"></PlayAV>
                        </div>
                    </div>
                </div>

                <!-- <div class="form-group clearfix">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;"
                            data-toggle="modal" v-on:click="closeCurrentPage()">返回</button>
                        <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;"
                            data-toggle="modal" v-on:click="certainAction()">确认</button>
                    </div>
                </div> -->

            </div>
        </div>
    </div>
</template>

<script>
    import dPicker from 'vue2-datepicker'
    import operCourceChapter from './operCourceChapter.vue'
    import PlayAV from '@/components/common/PlayAV.vue'

    export default {
        components: {
            dPicker,
            operCourceChapter,
            PlayAV
        },
        data() {
            return {
                project: {

                },
                title: '',
                couId: '',
                chapterList: []
            };
        },
        methods: {
            // Initialization projcet’s content
            initData(project) {
                //console.log("subc:"+project)
                this.title = project.couName;
                this.couId = project.couId;
                this.queryCourceChapter();
            },
            queryCourceChapter() {
                var fd = new FormData();
                fd.append("couId", this.couId);
                fd.append("path", '1')
                this.$ajax({
                    method: 'POST',
                    url: this.url + '/courceChapterAction/queryCourceChapter',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Access-Token': this.accessToken
                    },
                    data: fd,
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        //console.log("chenggong"+res.retData)
                        this.chapterList = res.retData;
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('课程信息请提交失败')
                });
            },

            closeCurrentPage() {
                $("#courceChapter").modal("hide")
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
            //选择文件
            fileChange(item, e) {
                //调用方法fileChange(item,$event)
                var file = e.target.files[0];
                console.log(e.target.value)
                console.log(e.target.files[0])
                if (file == null || file == undefined) {

                } else {
                    item.file = file;
                }
            },
            selectRule(param, item) {
                if (param == "1") {
                    this.$refs.operCourceChapterRef.initData('add', this.couId)
                    $("#operCourceChapterContent").modal('show')
                } else if (param == "3") {
                    this.$refs.operCourceChapterRef.initData('modify', item)
                    $("#operCourceChapterContent").modal('show')
                }
            },
            feedBack() {
                $("#operCourceChapterContent").modal("hide")
                this.queryCourceChapter();
            },
            deleteCourceChapter(item) {
                if (!confirm("确定删除吗?")) return;
                var fd = new FormData();
                fd.append("ccId", item.ccId);
                this.$ajax({
                    method: 'POST',
                    url: this.url + '/courceChapterAction/deleteCourceChapter',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Access-Token': this.accessToken
                    },
                    data: fd,
                    dataType: 'json',
                }).then((response) => {
                    var res = response.data
                    if (res.retCode == '0000') {
                        alert(res.retMsg)
                        this.queryCourceChapter();
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('课程信息请提交失败')
                });
            },
            //播放音视频
            playAV(item) {
                $("#playAVContent").modal('show')
                var url = this.url + item.path + '&power=1'
                this.$refs.PlayAVRef.initData(url)
            }
        }
    }
</script>

<style>
    .modal-content{
        width:600px;
        min-height:680px;
    }
    #playAVContent{
        width:560px;
        height:400px;
        margin: 0 auto;
    }
    #playAVContent .modal-dialog{
        width:100%;
        height:80%;
    }
    #playAVContent .modal-dialog .modal-content{
        width:100%;
        height:100%;
        min-height:100%;
    }
    #operCourceChapterContent{
        width:560px;
        height:640px;
        margin:0 auto;
    }
    #operCourceChapterContent .modal-dialog{
        width:100%;
        height:90%;
    }
    #operCourceChapterContent .modal-dialog .modal-content{
        width:100%;
        height:100%;
        min-height:100%;
    }
</style>
