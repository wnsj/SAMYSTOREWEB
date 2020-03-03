<template>
  <select class="form-control" v-model="posId" v-on:change="positionChange()">
    <option value="0">--未选择--</option>
    <option v-for="(item,index) in positionList" :key="index" v-bind:value="item.posId">
      {{item.posName}}
    </option>
  </select>
</template>

<script>
 
  export default {
    name: 'department',
    data() {
      return {
        posName: '',
        posId: '0',
        positionList: [],
				posObj:{
					posId:'',
					posName: '',
				},
      };
    },
    methods: {
      //提交岗位名称和ID
      positionChange: function () {
				// console.log('岗位1：'+this.posObj.posId)
        this.posObj = this.exchangePosName(this.posId)
				// console.log('岗位2：'+this.posObj.posId)
        this.$emit('positionChange', this.posObj)
      },
      setPosId: function (posId) {
				console.log('设置岗位'+posId)
        this.posId = posId
				console.log('设置岗位'+this.posId)
      },
      //添加前缀的部门名字兑换原来的名字
      exchangePosName: function (param) {
        var pos = {}
        for (var i = 0; i < this.positionList.length; i++) {
          pos = this.positionList[i];
          if (pos.posId == param) {
            return pos
          }
        }
      },
     
      async getPosition() {
        var url = this.url + '/positionAction/queryPosition'
        this.$ajax({
        	method: 'POST',
        	url: url,
        	headers: {
        		'Content-Type': this.contentType,
        		'Access-Token': this.accessToken
        	},
        	data: {
						isuse:'1'
        	},
        	dataType: 'json',
        }).then((response) => {
        	var res = response.data
        	if (res.retCode == '0000') {
        		if (res.retData.length > 0) {
        			this.positionList = res.retData
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
      // this.getPosition()
    },
  }
</script>

<style>

</style>
