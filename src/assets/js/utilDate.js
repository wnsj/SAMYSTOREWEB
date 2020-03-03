
export function calculateEndDate(begin,index){
	if (begin != null && begin != undefined && begin != '') {
		var date = new Date(begin);
		var year = date.getFullYear();
		var month = date.getMonth() + 1+index;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = year + seperator1 + month + seperator1 + strDate;
		return currentdate;
	}
}