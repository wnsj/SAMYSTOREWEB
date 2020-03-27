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
                        <dl v-bind:class="{h10:bool4}">
                            <dt @click="onShow(3)" v-bind:class="{'li-active':bool4}">
                                <i class="fa" v-bind:class="{'fa-folder-open':bool4,'fa-folder':!bool4}" aria-hidden="true">
                                    编辑管理
                                </i>
                            </dt>
                            <!--  <dd @click="addCheck('Audio')" v-bind:class="{'li-active':onString=='Audio'}">
                                <router-link to="/MP/Audio"><i class="fa" aria-hidden="true">音频管理</i></router-link>
                            </dd> -->
                            <dd @click="addCheck('CourceManage')" v-bind:class="{'li-active':onString=='CourceManage'}">
                                <router-link to="/MP/CourceManage"><i class="fa" aria-hidden="true">课程管理</i></router-link>
                            </dd>
                            <!--  <dd @click="addCheck('Video')" v-bind:class="{'li-active':onString=='Video'}">
                                <router-link to="/MP/Video"><i class="fa" aria-hidden="true">视频管理</i></router-link>
                            </dd> -->

                            <dd @click="addCheck('Evaluation')" v-bind:class="{'li-active':onString=='Evaluation'}">
                                <router-link to="/MP/Evaluation"><i class="fa" aria-hidden="true">测评管理</i></router-link>
                            </dd>
                            <dd @click="addCheck('Article')" v-bind:class="{'li-active':onString=='Article'}">
                                <router-link to="/MP/Article"><i class="fa" aria-hidden="true">文章管理</i></router-link>
                            </dd>
                            <!-- <dd @click="addCheck('PlayAV')" v-bind:class="{'li-active':onString=='PlayAV'}">
                                <router-link to="/PlayAV"><i class="fa" aria-hidden="true">音视频播放</i></router-link>
                            </dd> -->
                            <dd @click="addCheck('SignInImgManage')" v-bind:class="{'li-active':onString=='SignInImgManage'}">
                                <router-link to="/MP/SignInImgManage"><i class="fa" aria-hidden="true">签到图片管理</i></router-link>
                            </dd>
                            <!-- <dd @click="addCheck('SummerNote')" v-bind:class="{'li-active':onString=='SummerNote'}">
                                <router-link to="/SummerNote"><i class="fa" aria-hidden="true">排版</i></router-link>
                            </dd> -->
                        </dl>
						<dl v-bind:class="{h5:bool3}">
						    <dt @click="onShow(2)" v-bind:class="{'li-active':bool3}">
						        <i class="fa" v-bind:class="{'fa-folder-open':bool3,'fa-folder':!bool3}" aria-hidden="true">
						            基础设置
						        </i>
						    </dt>
						    <dd @click="addCheck('EvaluationType')" v-bind:class="{'li-active':onString=='EvaluationType'}">
						        <router-link to="/MP/EvaluationType"><i class="fa" aria-hidden="true">测评类型管理</i></router-link>
						    </dd>
						    <!-- <dd @click="addCheck('ScheduleEmp')" v-bind:class="{'li-active':onString=='ScheduleEmp'}">
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
						    </dd> -->
						</dl>
                        <!-- <dl v-bind:class="{h5:bool5}">
                            <dt @click="onShow(4)" v-bind:class="{'li-active':bool5}">
                                <i class="fa" v-bind:class="{'fa-folder-open':bool5,'fa-folder':!bool5}" aria-hidden="true">
                                    测试
                                </i>
                            </dt>
                            <dd @click="addCheck('test')" v-bind:class="{'li-active':onString=='test'}">
                                <router-link to="/MP/test"><i class="fa" aria-hidden="true">测试文本编辑</i></router-link>
                            </dd>
                        </dl> -->

                        <!-- <dl>
                            <dt v-on:click="selectRule('newtree')" v-bind:class="{'li-active':onString == 'newtree'}">
                                <i class="fa fa-folder-open" aria-hidden="true">
                                    new权限
                                </i>
                            </dt>
                        </dl> -->
                        <!-- <router-link to="/MP/PatientStype"><i class="fa fa-table" aria-hidden="false" v-on:click="titleChange('患者类型')">　患者类型</i></router-link> -->
                    </div>
                </div>
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 embed-responsive embed-responsive-16by9" style="overflow: inherit; background-color:">
                    <router-view />
                </div>
            </div>
        </div>
    </div>

</template>

<script type="module">
    import axios from 'axios'
    import Cookies from 'js-cookie'
    import {
        init
    } from '@/../static/js/common.js'
    export default {
        components: {
        },
        data() {
            return {
                accountName:this.accountName(),
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
                    this.$parent.setRouter("/login");
                    this.accountId = '';
                }
            },
        },
        mounted() {
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

    #aside-menu dl.h10 {
        height: 250px;
    }

    #aside-menu dl.h15 {
        height: 200px;
    }

    #aside-menu dl.h25 {
        height: 300px;
    }

    #aside-menu dl.h40 {
        height: 400px;
    }
	
	#aside-menu dl.h5 {
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
