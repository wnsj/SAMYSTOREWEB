<template>
  <select class="form-control" v-model="moduleId" v-on:change="moduleChange()">
    <option value="0">--未选择--</option>
    <option v-for="(item,index) in moduleList" :key="index" v-bind:value="item.moduleId">
      {{item.moduleName}}
    </option>
  </select>
</template>

<script>
 
  export default {
    data() {
      return {
        moduleName: '',
        moduleId: '0',
        moduleList: [],
				moduleObj:{
					moduleId:'0',
					moduleName: '',
				},
      };
    },
    methods: {
      //提交岗位名称和ID
      moduleChange: function () {
				// console.log('岗位1：'+this.moduleObj.moduleId)
        this.moduleObj = this.exchangeModuleName(this.moduleId)
				// console.log('岗位2：'+this.moduleObj.moduleId)
        this.$emit('moduleChange', this.moduleObj)
      },
      setModule: function (moduleId) {
        this.moduleId = moduleId
				// console.log('设置岗位'+this.ModuleId)
      },
      //添加前缀的部门名字兑换原来的名字
      exchangeModuleName: function (param) {
        var mObj = {}
        for (var i = 0; i < this.moduleList.length; i++) {
          mObj = this.moduleList[i];
          if (mObj.moduleId == param) {
            return mObj
          }
        }
      },
     
      async getModule() {
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
        		}
        	} else {
        		alert(res.retMsg)
        	}
        
        }).catch((error) => {
        	console.log('岗位数据请求失败处理')
        });
      },

    },
    created() {
      // this.getModule()
    },
  }
</script>

<style>

</style>
