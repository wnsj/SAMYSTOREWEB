<template>
    <div class="root">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 aside-logo">
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 con-cen" style="height:100%;">
                <h2 class="pull-left" style="padding:10px 0; height:100%;">
                    <img style="width: 50px; height: 50px;" src="../assets/img/logo1.png" /> <strong style=" display:inline-block;font-size: 35px; line-height:40px;">
                        圣安米悦</strong><br />
                    <font style=" disply:block; font-size:26px;line-height:30px;">商 城 管 理 系 统</font>
                </h2>
            </div>
            <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 text-right">
                <p style="color: #1b4fa3;">欢迎<span style="color: #d58512;"> {{accountName}} </span>来到，商城管理系统</p>
                <button class="btn btn-default m_r_10" style="margin-top: 40px;margin-right: 20px" v-on:click="modifyPassWord()">修改密码</button>
                <button class="btn btn-default m_r_10" style="margin-top: 40px;" v-on:click="loginOut()">退出</button>
            </div>
        </div>
        <div class="container-fluid clear-mp" id="Odiv">
            <div class="row clear-mp">
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 my-aside clear-mp" id="Adiv" style="padding-top: 10px;">
                    <p style=" display:block; width:190px; height:50px;margin:0 auto; line-height:50px; font-size: 30px;font-weight: bold;color: #795548;text-align: left; margin-bottom:10px;">功能列表</p>
                    <div id="aside-menu">
                        <!-- <dl v-bind:class="{h15:bool1}">
                            <dt @click="onShow(0)" v-bind:class="{'li-active':bool1}">
                                <i class="fa" v-bind:class="{'fa-folder-open':bool1,'fa-folder':!bool1}" aria-hidden="true">
                                    咨客管理模块
                                </i>
                            </dt>
                            <dd @click="addCheck('MemberSummary')" v-bind:class="{'li-active':onString=='MemberSummary'}">
                                <router-link to="/MP/MemberSummary"><i class="fa" aria-hidden="true">会员汇总</i></router-link>
                            </dd>
                            <dd @click="addCheck('Member')" v-bind:class="{'li-active':onString=='Member'}">
                                <router-link to="/MP/Member"><i class="fa" aria-hidden="true">会员管理</i></router-link>
                            </dd>
                            <dd @click="addCheck('Visitor')" v-bind:class="{'li-active':onString=='Visitor'}">
                                <router-link to="/MP/Visitor"><i class="fa" aria-hidden="true">咨客管理</i></router-link>
                            </dd>
                        </dl> -->
                        <!-- <dl v-bind:class="{h25:bool2}">
                            <dt @click="onShow(1)" v-bind:class="{'li-active':bool2}">
                                <i class="fa" v-bind:class="{'fa-folder-open':bool2,'fa-folder':!bool2}" aria-hidden="true">
                                    消费管理模块
                                </i>
                            </dt>
                            <dd @click="addCheck('SettleSummary')" v-bind:class="{'li-active':onString=='SettleSummary'}">
                                <router-link to="/MP/SettleSummary"><i class="fa" aria-hidden="true">消费汇总</i></router-link>
                            </dd>
                            <dd @click="addCheck('Charge')" v-bind:class="{'li-active':onString=='Charge'}">
                                <router-link to="/MP/Charge"><i class="fa" aria-hidden="true">已购课程管理</i></router-link>
                            </dd>
                            <dd @click="addCheck('Order')" v-bind:class="{'li-active':onString=='Order'}">
                                <router-link to="/MP/Order"><i class="fa" aria-hidden="true">预约管理</i></router-link>
                            </dd>
                            <dd @click="addCheck('CashDeposit')" v-bind:class="{'li-active':onString=='CashDeposit'}">
                                <router-link to="/MP/CashDeposit"><i class="fa" aria-hidden="true">定金管理</i></router-link>
                            </dd>
                            <dd @click="addCheck('ZxsSummary')" v-bind:class="{'li-active':onString=='ZxsSummary'}">
                                <router-link to="/MP/ZxsSummary"><i class="fa" aria-hidden="true">咨询师汇总</i></router-link>
                            </dd>
                        </dl> -->
                        <!-- <dl v-bind:class="{h10:bool4}"> -->
                        <!-- <dl v-bind:class="{h40:bool3}">
                            <dt @click="onShow(2)" v-bind:class="{'li-active':bool3}">
                                <i class="fa" v-bind:class="{'fa-folder-open':bool3,'fa-folder':!bool3}" aria-hidden="true">
                                    基础设置
                                </i>
                            </dt>
                            <dd @click="addCheck('Employee')" v-bind:class="{'li-active':onString=='Employee'}">
                                <router-link to="/MP/Employee"><i class="fa" aria-hidden="true">员工管理</i></router-link>
                            </dd>
                            <dd @click="addCheck('ScheduleEmp')" v-bind:class="{'li-active':onString=='ScheduleEmp'}">
                                <router-link to="/MP/ScheduleEmp"><i class="fa" aria-hidden="true">排班管理</i></router-link>
                            </dd>
                            <dd @click="addCheck('Position')" v-bind:class="{'li-active':onString=='Position'}">
                                <router-link to="/MP/Position"><i class="fa" aria-hidden="true">岗位管理</i></router-link>
                            </dd>
                            <dd @click="addCheck('Store')" v-bind:class="{'li-active':onString=='Store'}">
                                <router-link to="/MP/Store"><i class="fa" aria-hidden="true">门店管理</i></router-link>
                            </dd>
                            <dd @click="addCheck('RuleManager')" v-bind:class="{'li-active':onString=='RuleManager'}">
                                <router-link to="/MP/RuleManager"><i class="fa" aria-hidden="true">权限管理</i></router-link>
                            </dd>
                            <dd @click="addCheck('Royalty')" v-bind:class="{'li-active':onString=='Royalty'}">
                                <router-link to="/MP/Royalty"><i class="fa" aria-hidden="true">提成规则管理</i></router-link>
                            </dd>
                            <dd @click="addCheck('Project')" v-bind:class="{'li-active':onString=='Project'}">
                                <router-link to="/MP/Project"><i class="fa" aria-hidden="true">课程管理</i></router-link>
                            </dd>
                        </dl> -->
<!--                        <dl v-bind:class="{h4:bool4}">-->
<!--                            <dt @click="onShow(3)" v-bind:class="{'li-active':bool4}">-->
<!--                                <i class="fa" v-bind:class="{'fa-folder-open':bool4,'fa-folder':!bool4}" aria-hidden="true">-->
<!--                                    编辑管理-->
<!--                                </i>-->
<!--                            </dt>-->
<!--                            &lt;!&ndash;  <dd @click="addCheck('Audio')" v-bind:class="{'li-active':onString=='Audio'}">-->
<!--                                <router-link to="/MP/Audio"><i class="fa" aria-hidden="true">音频管理</i></router-link>-->
<!--                            </dd> &ndash;&gt;-->
<!--                            <dd @click="addCheck('CourceManage')" v-bind:class="{'li-active':onString=='CourceManage'}">-->
<!--                                <router-link to="/MP/CourceManage"><i class="fa" aria-hidden="true">课程管理</i></router-link>-->
<!--                            </dd>-->
<!--                            &lt;!&ndash;  <dd @click="addCheck('Video')" v-bind:class="{'li-active':onString=='Video'}">-->
<!--                                <router-link to="/MP/Video"><i class="fa" aria-hidden="true">视频管理</i></router-link>-->
<!--                            </dd> &ndash;&gt;-->

<!--                            <dd @click="addCheck('Evaluation')" v-bind:class="{'li-active':onString=='Evaluation'}">-->
<!--                                <router-link to="/MP/Evaluation"><i class="fa" aria-hidden="true">测评管理</i></router-link>-->
<!--                            </dd>-->
<!--                            <dd @click="addCheck('Article')" v-bind:class="{'li-active':onString=='Article'}">-->
<!--                                <router-link to="/MP/Article"><i class="fa" aria-hidden="true">文章管理</i></router-link>-->
<!--                            </dd>-->
<!--							<dd @click="addCheck('Counselor')" v-bind:class="{'li-active':onString=='Counselor'}">-->
<!--							    <router-link to="/MP/Counselor"><i class="fa" aria-hidden="true">咨询师管理</i></router-link>-->
<!--							</dd>-->
<!--							<dd @click="addCheck('Activity')" v-bind:class="{'li-active':onString=='Activity'}">-->
<!--							    <router-link to="/MP/Activity"><i class="fa" aria-hidden="true">热门沙龙</i></router-link>-->
<!--							</dd>-->
<!--							-->
<!--							-->
<!--                            &lt;!&ndash; <dd @click="addCheck('PlayAV')" v-bind:class="{'li-active':onString=='PlayAV'}">-->
<!--                                <router-link to="/PlayAV"><i class="fa" aria-hidden="true">音视频播放</i></router-link>-->
<!--                            </dd> &ndash;&gt;-->
<!--                            <dd @click="addCheck('SignInImgManage')" v-bind:class="{'li-active':onString=='SignInImgManage'}">-->
<!--                                <router-link to="/MP/SignInImgManage"><i class="fa" aria-hidden="true">签到图片管理</i></router-link>-->
<!--                            </dd>-->
<!--                            &lt;!&ndash; <dd @click="addCheck('SummerNote')" v-bind:class="{'li-active':onString=='SummerNote'}">-->
<!--                                <router-link to="/SummerNote"><i class="fa" aria-hidden="true">排版</i></router-link>-->
<!--                            </dd> &ndash;&gt;-->
<!--                        </dl>-->
<!--						<dl v-bind:class="{h3:bool3}">-->
<!--						    <dt @click="onShow(2)" v-bind:class="{'li-active':bool3}">-->
<!--						        <i class="fa" v-bind:class="{'fa-folder-open':bool3,'fa-folder':!bool3}" aria-hidden="true">-->
<!--						            基础设置-->
<!--						        </i>-->
<!--						    </dt>-->
<!--						    <dd @click="addCheck('EvaluationType')" v-bind:class="{'li-active':onString=='EvaluationType'}">-->
<!--						        <router-link to="/MP/EvaluationType"><i class="fa" aria-hidden="true">测评类型管理</i></router-link>-->
<!--						    </dd>-->
<!--							<dd @click="addCheck('ArticleTheme')" v-bind:class="{'li-active':onString=='ArticleTheme'}">-->
<!--							    <router-link to="/ArticleTheme"><i class="fa" aria-hidden="true">主题分类管理</i></router-link>-->
<!--							</dd>-->
<!--							<dd @click="addCheck('CounselorType')" v-bind:class="{'li-active':onString=='CounselorType'}">-->
<!--							    <router-link to="/MP/CounselorType"><i class="fa" aria-hidden="true">咨询师分类管理</i></router-link>-->
<!--							</dd>-->
<!--						</dl>-->
<!--                        <dl v-bind:class="{h2:bool5}">-->
<!--                            <dt @click="onShow(4)" v-bind:class="{'li-active':bool5}">-->
<!--                                <i class="fa" v-bind:class="{'fa-folder-open':bool5,'fa-folder':!bool5}" aria-hidden="true">-->
<!--                                    消费查询-->
<!--                                </i>-->
<!--                            </dt>-->
<!--                            <dd @click="addCheck('PreApporint')" v-bind:class="{'li-active':onString=='PreApporint'}">-->
<!--                                <router-link to="/MP/PreApporint"><i class="fa" aria-hidden="true">咨询师预约付费</i></router-link>-->
<!--                            </dd>-->
<!--							<dd @click="addCheck('PreActivity')" v-bind:class="{'li-active':onString=='PreActivity'}">-->
<!--							    <router-link to="/MP/PreActivity"><i class="fa" aria-hidden="true">沙龙活动付费</i></router-link>-->
<!--							</dd>-->
<!--                        </dl>-->

                        <!-- <dl>
                            <dt v-on:click="selectRule('newtree')" v-bind:class="{'li-active':onString == 'newtree'}">
                                <i class="fa fa-folder-open" aria-hidden="true">
                                    new权限
                                </i>
                            </dt>
                        </dl> -->
                        <!-- <router-link to="/MP/PatientStype"><i class="fa fa-table" aria-hidden="false" v-on:click="titleChange('患者类型')">　患者类型</i></router-link> -->
<!--                        孙云龙修改-->
                        <el-row class="tac">
                            <el-col :span="24">
                                <el-menu :unique-opened="true"
                                         :router="true"
                                         text-color="#795548"
                                         background-color="#E6E6E6"
                                         active-text-color="#F2AD4E"
                                         default-active="/MP/BuildingControl/BuildingControl"
                                         class="el-menu-vertical-demo">
                                    <template v-for="item in menuList">
                                        <el-submenu :index="item.menuPath" :key="item.menuPath">
                                            <template slot="title">
                                                <i class="fa fa-folder"></i>
                                                <span style="font-size: 20px;font-weight: normal">{{item.menuName}}</span>
                                            </template>
                                            <template v-for="itemChild in item.menuBeanList">
                                                <!--三级菜单-->
                                                <el-submenu
                                                    v-if="itemChild.menuBeanList && itemChild.menuBeanList.length"
                                                    :index="itemChild.menuPath" :key="itemChild.menuPath">
                                                    <template slot="title"><span style="font-size: 20px;font-weight: normal">{{itemChild.menuName}}</span>
                                                    </template>
                                                    <el-menu-item v-for="itemChildChild in itemChild.menuBeanList"
                                                                  :index="itemChildChild.menuPath"
                                                                  :key="itemChildChild.menuPath">
                                                        <span slot="title" style="font-size: 20px;font-weight: normal">{{itemChildChild.menuName}}</span>
                                                    </el-menu-item>
                                                </el-submenu>
                                                <!--二级菜单-->
                                                <el-menu-item v-else :index="itemChild.menuPath" :key="itemChild.menuPath">
                                                    <span slot="title" style="font-size: 20px;font-weight: normal">{{itemChild.menuName}}</span></el-menu-item>
                                            </template>
                                        </el-submenu>
                                    </template>
                                </el-menu>
                            </el-col>
                        </el-row>
<!--                        end-->
                    </div>
                </div>
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 embed-responsive embed-responsive-16by9" style="overflow: inherit; background-color:">
                    <router-view />
                </div>
            </div>
        </div>
        <el-dialog
            :visible.sync="modifyPwbDialogVisible"
            width="35%"
            top="25vh"
            center
            class="updatePwd">
            <template slot="title">
                <el-row style="border-bottom: 1px solid #f2f2f2;padding-bottom: 10px;">修改密码</el-row>
            </template>
            <el-row style="padding-left: 80px;padding-right: 80px;">
                <el-form label-position="right" label-width="80px" size="small" class="formClass">
                    <el-form-item label="用户名">
                        <el-input v-model="accountName" disabled style="width: 90%"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input v-model="pwd" show-password auto-complete="new-password" placeholder="请输入新设置密码" style="width: 90%"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input v-model="confirmPwb" show-password auto-complete="new-password" placeholder="请输入确认密码" style="width: 90%"></el-input>
                    </el-form-item>
                </el-form>
            </el-row>
            <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="modifyPwb" size="small" style="border-radius: 5px;width: 100px;">保存</el-button>
                    </span>
        </el-dialog>
    </div>

</template>

<script type="module">
    import axios from 'axios'
    import Cookies from 'js-cookie'
    import { Message } from 'element-ui'
    import {
        init
    } from '@/../static/js/common.js'
    export default {
        components: {
        },
        data() {
            return {
                accountName:this.accountName(),
                // 孙云龙添加
                menuList: [],
                accountData:{},
                pwd: '',
                confirmPwb: '',
                modifyPwbDialogVisible:false,
                // end
                itemList:[],
                bool1:true,
                bool2:false,
                bool3:false,
                bool4:false,
                bool5:false,
                onString:'MemberSummary'
            }
        },
        methods:{
            titleChange(param){
                console.log('param:'+param)
                this.title=param
            },
            newShow(index){
                alert(index);
            },
            onShow(index){
                switch(index){
                    case 0:
                        this.bool1 = !this.bool1;
                        this.bool2 = false;
                        this.bool3 = false;
                        this.bool4 = false;
                        this.bool5 = false;
                        break;
                    case 1:
                        this.bool1 = false;
                        this.bool2 = !this.bool2;
                        this.bool3 = false;
                        this.bool4 = false;
                        this.bool5 = false;
                        break;
                    case 2:
                        this.bool1 = false;
                        this.bool2 = false;
                        this.bool3 = !this.bool3;
                        this.bool4 = false;
                        this.bool5 = false;
                        break;
                    case 3:
                        this.bool1 = false;
                        this.bool2 = false;
                        this.bool3 = false;
                        this.bool4 = !this.bool4;
                        this.bool5 = false;
                        break;
                    case 4:
                        this.bool1 = false;
                        this.bool2 = false;
                        this.bool3 = false;
                        this.bool4 = false;
                        this.bool5 = !this.bool5;
                        break;
                }

            },
            addCheck(string){
                this.onString = string;
                console.log(string)
            },
            gainFun(data){
                this.onString = data;
                this.bool2 = true;
            },
            gainFun2(data){
                this.onString = data;
                this.bool2 = true;
            },
            //用户退出
            loginOut() {
                if (confirm("确定退出?") == false) {
                    return;
                } else {
                    //删除cookie
                    Cookies.remove("accountData");
                    Cookies.remove("accessToken");
                    sessionStorage.clear()
                    this.$parent.setRouter("/login");
                    this.accountId = '';
                }
            },
            modifyPwb() {
                if (this.isBlank(this.pwd)) {
                    Message.warning('请输入新密码')
                    return
                }
                if (this.isBlank(this.confirmPwb)) {
                    Message.warning('请输入确认密码')
                    return;
                }
                if (this.pwd != this.confirmPwb) {
                    Message.error('新密码与确认密码不一致')
                    return;
                }
                var url = this.url + "/SysAccountController/patchAccount";
                axios({
                    method: "post",
                    url: url,
                    headers: {
                        "Content-Type": this.contentType,
                        "Access-Token": this.accessToken
                    },
                    data: {
                        "account": this.accountName,
                        "saId": this.accountData.saId,
                        "pwd": this.pwd,
                    },
                    dataType: "json"
                }).then((response) => {
                    if (response.data.retCode == '0000') {
                        Message.success('修改成功,请重新登录')
                        setTimeout(() => {
                            //删除cookie
                            Cookies.remove("accountData");
                            Cookies.remove("accessToken");
                            this.$parent.setRouter("/login");
                            this.accountId = '';
                        }, 2000)

                    } else {
                        Message.warning('修改密码失败')
                    }

                }).catch((error) => {
                        console.log("请求失败处理");
                    }
                );
            },
            modifyPassWord() {
                this.pwd = ''
                this.confirmPwb = ''
                this.modifyPwbDialogVisible = true
            }
        },
        mounted() {
            // 孙云龙添加
            var menu = JSON.parse(sessionStorage.getItem("menuList"));
            this.menuList = menu.menuBeanList
            this.accountData = JSON.parse(sessionStorage.getItem("account"));
            this.accountName = this.accountData.account
            // end
            init();

        },
        created() {
            this.$parent.setRouter("/MainPage");
        }
    }
</script>

<style>
    #aside-menu {
        border-top: 1px solid #ccc;
        height: 640px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    #aside-menu::-webkit-scrollbar {
        display: none;
    }

    #aside-menu dl {
        margin-bottom: 0;
        height: 50px;
        overflow: hidden;
        color: #795548;
        font-size: 20px;
        background: #f1f1f1;
        transition: height .5s
    }

    #aside-menu dl.noShow {
        color: #f2ad4e
    }

    #aside-menu dl.h4 {
		margin-top: 0px;
        height: 300px;
    }

    #aside-menu dl.h2 {
		margin-top: 0px;
        height: 150px;
    }
	#aside-menu dl.h3 {
		margin-top: 0px;
	    height: 200px;
	}

	#aside-menu dl.h1 {
		margin-top: 0px;
	    height: 100px;
	}

    #aside-menu dl dt {
        height: 50px;
        text-align: center;
        background: #e6e6e6;
        border-bottom: 1px solid #ccc;
    }

    #aside-menu dl dd {
        height: 50px;
        text-align: center;
        border-bottom: 1px solid #ccc;
    }

    #aside-menu dl dd:hover {
        background: #f5f5f5;
        color: #603b2c;
    }

    #aside-menu dl i {
        position: relative;
        display: inline-block;
        width: 200px;
        height: 50px;
        text-align: left;
        line-height: 50px;
        text-indent: 25px;
    }

    #aside-menu dl i:before {
        position: absolute;
        left: -25px;
        display: block;
    }

    #aside-menu dl dd.li-active {
        background: #fff
    }

    .li-active i {
        color: #f2ad4e;
    }

    .root {
        width: 100%;
        overflow-x: hidden;
    }

    a {
        color: #795548 !important;
    }

    a:hover {
        color: #795548 !important;
    }
</style>
<host>

</host>
