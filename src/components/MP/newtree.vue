<!-- the page of department management -->
<template>

	<div class="wraper">
		<div class="col-md-12 col-lg-12 main-title">
			<h1 class="titleCss">new权限管理</h1>
		</div>
		<div class="row" style="margin-top: 40px;">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="col-md-5 col-lg-5 text-right" style="padding: 0; line-height: 34px;">
					<p class="end-aline col-md-11 col-lg-11" style="padding-right:5px; padding-left:20px;">姓名</p><span class="sign-left">:</span>
				</div>
				<div class="col-md-7 col-lg-7">
					<emp ref="emp" @employeeChange="empChange"></emp>
				</div>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<v-tree :data="ruleData" checkable multiple @select="selectFn(ruleData)" @check="checkFn(ruleData)" show-line></v-tree>
			</div>
		</div>
	</div>

</template>


<script>

	import emp from '../common/Employee.vue'
	import Vue from 'vue'
	import {
		init
	} from '@/../static/js/common.js'
	export default {
		components: {
			emp,
		},
		data() {
			return {
				moduleList: [],
				ruleData: [],
			};
		},
		methods: {
			selectFn(item) {
				// console.log(JSON.stringify(item))
			},
			checkFn(item) {
				console.log(JSON.stringify(item))
			},
			//feedback employee information
			empChange: function(param) {
				if (this.isBlank(param)) {
					// this.member.empId=""
				} else {
					// this.member.empId=param.empId
				}
			},
			ruleAction() {
				var url = this.url + '/ruleAction/newAddRule'

				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: this.ruleData,
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					alert(res.retMsg)
				}).catch((error) => {
					console.log('权限添加请求')
				});
			},
			getModule() {
				var url = this.url + '/moduleAction/queryModule'
				this.$ajax({
					method: 'POST',
					url: url,
					headers: {
						'Content-Type': this.contentType,
						'Access-Token': this.accessToken
					},
					data: {
						// isuse:'1'
					},
					dataType: 'json',
				}).then((response) => {
					var res = response.data
					if (res.retCode == '0000') {
						if (res.retData.length > 0) {
							this.moduleList = res.retData
							this.structrueRule()
						}
					} else {
						alert(res.retMsg)
					}

				}).catch((error) => {
					console.log('岗位数据请求失败处理')
				});
			},
			//构造权限数据
			structrueRule() {
				for (var i = 0; i < this.moduleList.length; i++) {
					var element = {
						title: '目录1',
						expanded: true,
						selected: true,
						moduleId: '',
						moduleGrade: '1',
						children: [{
								title: '添加',
								moduleGrade: '2',
								operateType: '1',
								checked: false,
							},
							{
								title: '修改',
								moduleGrade: '2',
								operateType: '3',
								checked: true,
							},
							{
								title: '删除',
								moduleGrade: '2',
								operateType: '2',
								checked: false,
							},
							{
								title: '查询',
								moduleGrade: '2',
								operateType: '4',
								disableCheckbox: true
							}
						]
					}
					var moduleElement = this.moduleList[i]
					element.moduleId = moduleElement.moduleId
					element.title = moduleElement.moduleName
					element.children[0].title = moduleElement.moduleName + "-" + "添加"
					element.children[0].title = moduleElement.moduleName + "-" + "修改"
					element.children[0].title = moduleElement.moduleName + "-" + "删除"
					element.children[0].title = moduleElement.moduleName + "-" + "查询"
					this.ruleData.push(element)
				}

			},

		},

		mounted () {
			window.addEventListener('scroll',this.handleScroll,true);
			init();
		},
		created() {
			this.getModule()
		}
	}
</script>

<style>
	@import 'vue-beauty/package/style/vue-beauty.min.css';

	.ant-tree {
		text-align: left;
	}
</style>
