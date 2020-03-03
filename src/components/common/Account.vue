<template>
  <select class="form-control" v-model="accountId" v-on:change="accountChange()">
    <option value="0">--未选择--</option>
    <option v-for="(item,index) in accountList" :key="index" v-bind:value="item.accountId">
      {{item.accountNum}}
    </option>
  </select>
</template>

<script>
 
  export default {
    name: 'account',
    data() {
      return {
        accountName: '',
        accountId: '0',
        accountList: [],
				accountObj:{
					accountId:'0',
					accountName: '',
				},
      };
    },
    methods: {
      //提交岗位名称和ID
      accountChange: function () {
				// console.log('岗位1：'+this.AccountObj.AccountId)
        this.accountObj = this.exchangeAccountName(this.accountId)
				// console.log('岗位2：'+this.AccountObj.AccountId)
        this.$emit('accountChange', this.accountObj)
      },
      setAccount: function (accountId) {
        this.accountId = accountId
				// console.log('设置岗位'+this.accountId)
      },
      //添加前缀的部门名字兑换原来的名字
      exchangeAccountName: function (param) {
        var account = {}
        for (var i = 0; i < this.accountList.length; i++) {
          account = this.accountList[i];
          if (account.accountId == param) {
            return account
          }
        }
      },
     
      async getAccount() {
        var url = this.url + '/accountAction/queryAccount'
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
        			this.accountList = res.retData
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
      // this.getAccount()
    },
  }
</script>

<style>

</style>
