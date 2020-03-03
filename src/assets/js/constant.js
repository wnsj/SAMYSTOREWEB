import Cookies from 'js-cookie'
import axios from 'axios'

const constant = {
	ruleResult: '',
};



/*获取IP*/
constant.ipAddress = function(){
	return returnCitySN.cip;
}

/*判断值是否为空，是空返回true*/
constant.isBlank = function(value) {
	if (value == '' || value == null || value == undefined || (value.length >
			0 && value.trim().length == 0)) return true;
	return false;
}

/*判断手机号，是空返回true*/
constant.phone = function(phoneNum) {
	if(this.isBlank(phoneNum))return false;
	var reg = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}14[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}16[0-9]{9}$)|(^0{0,1}17[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)/;
	if(reg.test(phoneNum)==false) return false
	return true;
}

//权限判断方法（包含返回true，反之false）
constant.has = function(param) {
	//未传值
	if (this.isBlank(param)) return false;
	var jsonString = Cookies.get("itemList");
	//未登录
	if (this.isBlank(jsonString)){
		alert("您还没有任何权限，请联系管理员添加权限")
		return false;
	} 
	var itemRuleList = [];
	 itemRuleList=JSON.parse(jsonString);
	for (var i=0; i < itemRuleList.length;i++){
		var item = itemRuleList[i];
		if(item.urlName == param){
			return true;
		}
	}
	return false;
}
//账户的姓名
constant.accountName = function() {
	//未传值
	var jsonString = Cookies.get("accountData");
	//未登录
	if (this.isBlank(jsonString)) return false;
	var accountData = JSON.parse(jsonString);
	var accountName = accountData.accountName;
	return accountName
}
//账户的姓名
constant.accountId = function() {
	//未传值
	var jsonString = Cookies.get("accountData");
	//未登录
	if (this.isBlank(jsonString)) return false;
	var accountData = JSON.parse(jsonString);
	var accountId = accountData.accountId;
	// console.log('accountId:'+accountId)
	return accountId
}

//账户的岗位
constant.accountPosId = function() {
	//未传值
	var jsonString = Cookies.get("empData");
	//未登录
	if (this.isBlank(jsonString)) return false;
	var empData = JSON.parse(jsonString);
	// console.log('empData:'+jsonString)
	var accountPosId = empData.posId;
	// console.log('accountId:'+accountId)
	return accountPosId
}

//账户的类型
constant.accountType = function() {
	//未传值
	var jsonString = Cookies.get("accountData");
	//未登录
	if (this.isBlank(jsonString)) return false;
	var accountData = JSON.parse(jsonString);
	var accountType = accountData.accountType;
	// console.log('accountType:'+accountType)
	return accountType
}
//账户的姓名
constant.storeId = function() {
	//未传值
	var jsonString = Cookies.get("accountData");
	//未登录
	// console.log('基础信息'+jsonString)
	if (this.isBlank(jsonString)) return false;
	var accountData = JSON.parse(jsonString);
	var storeId = accountData.storeId;
	// console.log('基础信息' + storeId)
	return storeId
}


	export default constant;
