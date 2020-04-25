<!-- add and modify position -->
<template>
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" aria-hidden="true" class="close" v-on:click="closeCurrentPage()">×</button>
            <h4 id="myModalLabel" class="modal-title">{{title}}咨询师详情</h4>
        </div>
        <div class="modal-body  pos_r">
            <div class="tab-pane fade in active martop" id="basic">
                <form action="" class="clearfix">
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">姓名</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="counselor.colName" placeholder="">
                        </div>
                    </div>
					<div class="col-md-6 form-group clearfix">
					    <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">语录</label><span
					        class="sign-left">:</span>
					    <div class="col-md-8">
					        <input type="text" class="form-control" v-model="counselor.quotation" placeholder="">
					    </div>
					</div>
					<div class="col-md-6 form-group clearfix">
					    <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询单价</label><span
					        class="sign-left">:</span>
					    <div class="col-md-8">
					        <input type="text" class="form-control" v-model="counselor.price" placeholder="">
							<span class="pos-ab pos-tr">¥</span>
					    </div>
					</div>
					<div class="col-md-6 form-group clearfix">
					    <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">首次单价</label><span
					        class="sign-left">:</span>
					    <div class="col-md-8">
					        <input type="text" class="form-control" v-model="counselor.firstPrice" placeholder="">
							<span class="pos-ab pos-tr">¥</span>
					    </div>
					</div>
					<div class="col-md-6 form-group clearfix">
					    <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">预约定金</label><span
					        class="sign-left">:</span>
					    <div class="col-md-8">
					        <input type="text" class="form-control" v-model="counselor.prePrice" placeholder="">
							<span class="pos-ab pos-tr">¥</span>
					    </div>
					</div>
					<div class="col-md-6 form-group clearfix">
					    <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询经验</label><span
					        class="sign-left">:</span>
					    <div class="col-md-8">
					        <input type="text" class="form-control" v-model="counselor.practiseTimeNum" placeholder="">
					        <span class="pos-ab pos-tr">小时</span>
					    </div>
					</div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询方式</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <select class="form-control" v-model="counselor.askType">
                                <option value="1">面对面</option>
                                <option value="2">语音</option>
								<option value="3">面对面/语音</option>
                            </select>
                        </div>
                    </div>
					<div class="col-md-6 form-group clearfix">
					    <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">咨询分类</label><span
					        class="sign-left">:</span>
					    <div class="col-md-8">
					        <ct></ct>
					    </div>
					</div>
					<div class="col-md-6 form-group clearfix">
					    <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">擅长方向</label><span
					        class="sign-left">:</span>
					    <div class="col-md-8">
					        <textarea v-model="counselor.professional"></textarea>
					    </div>
					</div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">受训经历</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <textarea v-model="counselor.receiveTraining"></textarea>
                        </div>
                    </div>
					<div class="col-md-6 form-group clearfix">
					    <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">受训通过</label><span
					        class="sign-left">:</span>
					    <div class="col-md-8">
					        <select class="form-control" v-model="counselor.isRt">
					            <option value="1">通过</option>
					            <option value="0">未通过</option>
					        </select>
					    </div>
					</div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">职业履历</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <textarea v-model="counselor.curriculumVitae"></textarea>
                        </div>
                    </div>
					<div class="col-md-6 form-group clearfix">
					    <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">其他分类</label><span
					        class="sign-left">:</span>
					    <div class="col-md-8">
					        <select class="form-control" v-model="counselor.othersType">
								<option value="1">团体咨询</option>
								<option value="2">心里讲座</option>
								<option value="3">主题沙龙</option>
								<option value="4">沙盘游戏</option>
								<option value="5">催眠治疗</option>
								<option value="6">绘画治疗</option>
								<option value="7">意象对话</option>
								<option value="8">OH卡牌</option>
								<option value="9">心里测评</option>
					        </select>
					    </div>
					</div>
					<div class="col-md-6 form-group clearfix">
					    <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">履历通过</label><span
					        class="sign-left">:</span>
					    <div class="col-md-8">
					        <select class="form-control" v-model="counselor.isCv">
					            <option value="1">通过</option>
					            <option value="0">未通过</option>
					        </select>
					    </div>
					</div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">简单介绍</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="counselor.sinplyIntroduce" placeholder="">
                        </div>
                    </div>
					<div class="col-md-6 form-group clearfix">
					    <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">标签1</label><span
					        class="sign-left">:</span>
					    <div class="col-md-8">
					        <input type="text" class="form-control" v-model="counselor.label1" placeholder="">
					    </div>
					</div>
					<div class="col-md-6 form-group clearfix">
					    <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">标签2</label><span
					        class="sign-left">:</span>
					    <div class="col-md-8">
					        <input type="text" class="form-control" v-model="counselor.label2" placeholder="">
					    </div>
					</div>
					<div class="col-md-6 form-group clearfix">
					    <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">标签3</label><span
					        class="sign-left">:</span>
					    <div class="col-md-8">
					        <input type="text" class="form-control" v-model="counselor.label3" placeholder="">
					    </div>
					</div>
                    <div class="col-md-12 form-group clearfix" style="margin-bottom:0;">
                        <label for="cyname" class="col-md-1 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">简介</label><span
                            class="sign-left">:</span>
                    </div>
                    <div class="col-md-12 form-group clearfix new-style-box">
                        <textarea class="form-control new-style"  v-model="counselor.introduceContent" />
                    </div>
                    <div class="col-md-6 form-group clearfix">
                        <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">头图上传</label><span
                            class="sign-left">:</span>
                        <div class="col-md-8">
                            <input type="file" id="imgFile" />
                        </div>
                    </div>
					<div class="col-md-6 form-group clearfix">
					    <label for="erpzh" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">详情上传</label><span
					        class="sign-left">:</span>
					    <div class="col-md-8">
					        <input type="file" id="detailFile" multiple="multiple" />
					    </div>
					</div>
					<div class="col-md-6 form-group clearfix">
					    <label for="cyname" class="col-md-3 control-label text-right nopad end-aline" style="padding:0;line-height:34px;">关联咨询师</label><span
					        class="sign-left">:</span>
					    <div class="col-md-8">
					        <input type="text" class="form-control" v-model="counselor.empId" placeholder="">
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
	import ct from '../../common/CounselorType.vue'
    export default {
        components: {
            dPicker,
			ct,
        },
        data() {
            return {
                counselor: {
                    colName: '撒大放送',
					ccId:'1',
					ccName:'',
                    professional: "阿斯顿发",
                    quotation:"阿斯顿发",
					price:"10",
					firstPrice:'10',
                    practiseTimeNum: '12',
                    introduceContent:'阿斯蒂芬的',
                    sinplyIntroduce:'阿斯顿发',
                    receiveTraining:'sadf',
                    curriculumVitae:'士大夫撒地方',
					isCv:'1',
					isRt:'1',
                    prePrice:'12',
					askType:'1',
					othersType:'0',
					files:[],
					label1:'',
					label2:'',
					label3:'',
                },
                title: ''
            };
        },
        methods: {
            // Initialization projcet’s content
            initData(param, counselor) {
				$('#operCourceChapterContent').modal({backdrop: 'static', keyboard: false});
                $("#medFile").val('');
                if (param == 'add') {
                    this.title = '新增'
                    this.counselor = {
                        colName: '撒大放送',
						ccId:'1',
                        professional: "阿斯顿发",
                        quotation:"阿斯顿发",
                        price:"10",
						empId:"10",
                        firstPrice:'10',
                        practiseTimeNum: '12',
                        introduceContent:'阿斯蒂芬的',
                        sinplyIntroduce:'阿斯顿发',
                        receiveTraining:'sadf',
                        curriculumVitae:'士大夫撒地方',
                        prePrice:'12',
						askType:'1',
						othersType:'1',
						isCv:'1',
						isRt:'1',
						label1:'',
						label2:'',
						label3:'',
                    }
                    
                } else if (param == 'modify') {
                    this.title = '修改'
                    Object.assign(this.counselor, counselor)
                    
                }
            },
            
            //the event of addtional button
            certainAction() {
                //console.log('the event of addtional button')
                var fd = new FormData();
                var file = $("#imgFile")[0].files[0];
				var file1 = $("#detailFile")[0].files[0];
				var file2 = $("#detailFile")[0].files[1];
				var file3 = $("#detailFile")[0].files[2];
				fd.append("files", file1);
				fd.append("files", file2);
				fd.append("files", file3);
				
                fd.append("counselor", JSON.stringify(this.counselor));

                switch (this.title) {
                    case '新增':
                        var url = this.url + '/counselor/addCounselor'
                        if (this.isBlank(file)) {
                            alert("请选择头图文件!");
                            return;
                        } else {
                            fd.append("file", file);
                        }
                        break;
                    case '修改':
                        var url = this.url + '/counselor/updateCounselor'
                        if (!this.isBlank(file)) {
                            fd.append("file", file);
                        }
                        fd.append("ccId", this.counselor.ccId);
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
                        this.$emit("certainAction")
                        
                    } else {
                        alert(res.retMsg)
                    }
                }).catch((error) => {
                    console.log('信息请提交失败')
                });
            },
            closeCurrentPage() {
                $("#scContent").modal("hide")
            },
            
        },
        created() {
          
        },
       

    }
</script>

<style>
    
</style>
