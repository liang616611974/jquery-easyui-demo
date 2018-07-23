
/*
 * 日期增加，其中月份的计算用于到期计算
 * M 规则如下：
 * 1-28号，则默认到指定月份的1-28号
 * 29-31号，如果指定月份没有对应的日期，则取指定月份的月末
 */

function dateCalc(interval, number, date) {
    switch (interval) {
    case "Y": {
        date.setFullYear(date.getFullYear() + number);
        return date;
        break;
    }
    case "Q": {
    	var dayO = date.getDate();
        date.setMonth(date.getMonth() + number * 3);
        var dayN = date.getDate();
        if(dayO!=dayN){
        	date.setDate(1);
        	date.setDate(date.getDate() -1);
        }
        return date;
        break;
    }
    case "M": {
    	var dayO = date.getDate();
        date.setMonth(date.getMonth() + number);
        var dayN = date.getDate();
        if(dayO!=dayN){
        	date.setDate(1);
        	date.setDate(date.getDate() -1);
        }
        return date;
        break;
    }
    case "W": {
        date.setDate(date.getDate() + number * 7);
        return date;
        break;
    }
    case "D": {
        date.setDate(date.getDate() + number);
        return date;
        break;
    }
    case "H": {
        date.setHours(date.getHours() + number);
        return date;
        break;
    }
    case "MI": {
        date.setMinutes(date.getMinutes() + number);
        return date;
        break;
    }
    case "S": {
        date.setSeconds(date.getSeconds() + number);
        return date;
        break;
    }
    default: {
        date.setDate(date.getDate() + number);
        return date;
        break;
    }
    }
}

function dateStrCalc(interval, number, dateStr){
	var date = new Date(dateStr.replace(/-/g,"/"));
	dateCalc(interval, number, date)
	return date;
	
}


function dateStrCompare(dateStr1,dateStr2){
	var date1 = new Date(dateStr1.replace(/-/g,"/"));
	var date2 = new Date(dateStr2.replace(/-/g,"/"));
	if(date1>date2){
		return 1 ;
	}else if(date1<date2){
		return -1;
	}else{
		return 0;
	}
}


//date类型格式化
function formatDate2Str(date, format) {
	var d = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S+": date.getMilliseconds()
     };
     if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
     }
     for (var k in d) {
            if (new RegExp("(" + k + ")").test(format)) {
                   format = format.replace(RegExp.$1, RegExp.$1.length == 1
                          ? d[k] : ("00" + d[k]).substr(("" + d[k]).length));
            }
     }
     return format;
	
  }

/**
 * 获取当前日期
 * @returns {string}
 */
function getCurrDate() {

    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentDate = year + seperator1 + month + seperator1 + strDate;
    return currentDate;

    /*  var date = $("#startDate").textbox('getValue');
      if (date <= currentDate) {
          $.messager.alert("错误", "生效日期应该大于当前日期！", "error");
          return false;
      }
      return true;*/
}