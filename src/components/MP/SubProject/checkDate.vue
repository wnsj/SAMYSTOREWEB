<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
             <h4 id="myModalLabel" class="modal-title">签到缺失图片</h4>
        </div>
        <div class="modal-body  pos_r">
            <table class="table table-bordered table-hover" id="datatable">
                <thead class="datathead">
                    <tr>
                        <th class="text-center">时间</th>
                        <th class="text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="errorDateList.length <= 0">
                         <td class="text-center" colspan="2" style="color: green;">该时间段内没有图片缺失</td>
                    </tr>
                    <tr v-for="(item,index) in errorDateList" :key="index" v-if="errorDateList.length > 0" style="color: red;">
                        <td class="text-center">{{item}}</td>
                        <td><button class="btn btn-warning" @click="addImgBtn(index,item)">点击添加</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="row row_edit">
            <div class="modal fade" id="addImgContent">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" aria-hidden="true" class="close" v-on:click="closeAddImgContent()">×</button>
                        <h4 id="myModalLabel" class="modal-title">添加图片</h4>
                    </div>
                    <div class="modal-body  pos_r">
                        <div class="tab-pane fade in active martop" id="basic">

                            <div class="col-md-6 form-group clearfix">
                                <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">
                                    日期</label><span class="sign-left">:</span>
                                <div class="col-md-8">
                                    <dPicker type="date" value-type="format" format="YYYY-MM-DD" v-model="imgDate"
                                        :disabled="true"></dPicker>
                                </div>
                            </div>

                            <div class="col-md-6 form-group clearfix">
                                <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">
                                    上传文件</label>
                                <span class="sign-left">:</span>
                                <div class="col-md-8">
                                    <input type="file" id="imgContentfile" @change="imgChange"/>
                                    <div id='imgContentOutDiv'></div>
                                </div>
                            </div>

                            <div class="form-group clearfix">
                                <div class="col-md-12">
                                    <button type="button" class="btn btn-warning pull-right m_r_10" style="margin-right:1.5%;"
                                        data-toggle="modal" v-on:click="closeAddImgContent()">返回</button>
                                    <button type="button" class="btn btn-primary pull-right m_r_10" style="margin-right:1.5%;"
                                        data-toggle="modal" v-on:click="certainAction()">确认</button>
                                </div>
                            </div>

                        </div>
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
                errorDateList: [],
                imgDate:'',
                index:0,
            }
        },
        methods: {
            setData(dataList) {
                this.errorDateList = dataList;
            },
            addImgBtn(index,item) {
                this.imgDate = item;
                this.index = index;
                $("#imgContentfile").val("")
                $("#imgContentInnDiv").remove();
                $("#addImgContent").modal('show')
            },
            closeCurrentPage() {
                $("#checkDateContent").modal("hide")
            },
             //预览图
            imgChange() {
                var file = $("#imgContentfile")[0].files[0]; //获取file对象
                if (file == null || file == undefined) {
                    $("#imgContentInnDiv").remove();
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
                        if ($("#imgContentInnDiv").length <= 0) $("#imgContentOutDiv").html(
                            "<div id='imgContentInnDiv' ><img id='imgContent' src='#' style='width:100%' /></div>"
                        );
                        $("#imgContent").attr("src", dataUrl);
                    }
                }
            },
            closeAddImgContent(){
                 $("#addImgContent").modal('hide')
            },
             certainAction() {
                //console.log('the event of addtional button')
                if (this.isBlank(this.imgDate)) {
                    alert("时间不能为空!")
                    return
                }

                var fd = new FormData();
                var file = $("#imgContentfile")[0].files[0];
                fd.append("imgType", 1);
                fd.append("imgDate", this.imgDate);

                if (this.isBlank(file)) {
                    alert("请选择文件!");
                    return;
                } else {
                    fd.append("file", file);
                }

                var url = this.url + '/sysImgAction/addSysImg'
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
                        this.errorDateList.splice(this.index, 1)
                        $("#addImgContent").modal('hide')
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('信息请提交失败'+error)
                });
            }
        }
    }
</script>

<style>
</style>
