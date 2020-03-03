<template>
  <select class="form-control" v-model="storeId" v-on:change="storeChange()">
    <option value="0">--未选择--</option>
    <option v-for="(item,index) in storeList" :key="index" v-bind:value="item.storeId">
      {{item.storeName}}
    </option>
  </select>
</template>

<script>
 
  export default {
    name: 'department',
    data() {
      return {
        storeName: '',
        storeId: this.storeId(),
        storeList: [],
				storeObj:{
					storeId:this.storeId(),
					storeName: '',
				},
      };
    },
    methods: {
      //提交岗位名称和ID
      storeChange: function () {
				// console.log('岗位1：'+this.storeObj.storeId)
        this.storeObj = this.exchangeStoreName(this.storeId)
				// console.log('岗位2：'+this.storeObj.storeId)
        this.$emit('storeChange', this.storeObj)
      },
      setStore: function (storeId) {
        this.storeId = storeId
				// console.log('设置岗位'+this.storeId)
      },
      //添加前缀的部门名字兑换原来的名字
      exchangeStoreName: function (param) {
        var store = {}
        for (var i = 0; i < this.storeList.length; i++) {
          store = this.storeList[i];
          if (store.storeId == param) {
            return store
          }
        }
      },
     
      async getStore() {
        var url = this.url + '/storeAction/queryStore'
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
        			this.storeList = res.retData
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
      // this.getStore()
    },
  }
</script>

<style>

</style>
