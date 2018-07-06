;
var validator = (function(){
	return {
			/**身份证号验证*/
		    isIdCard: function (IdCard) {
		        var reg = /^\d{15}(\d{2}[0-9X])?$/i;
		        if (!reg.test(IdCard)) {
		            return false;
		        }
		        if (IdCard.length == 15) {
		            var n = new Date();
		            var y = n.getFullYear();
		            if (parseInt("19" + IdCard.substr(6, 2)) < 1900 || parseInt("19" + IdCard.substr(6, 2)) > y) {
		                return false;
		            }

		            var birth = "19" + IdCard.substr(6, 2) + "-" + IdCard.substr(8, 2) + "-" + IdCard.substr(10, 2);
		            if (!Common.IsDate(birth)) {
		                return false;
		            }
		        }
		        if (IdCard.length == 18) {
		            var n = new Date();
		            var y = n.getFullYear();
		            if (parseInt(IdCard.substr(6, 4)) < 1900 || parseInt(IdCard.substr(6, 4)) > y) {
		                return false;
		            }

		            var birth = IdCard.substr(6, 4) + "-" + IdCard.substr(10, 2) + "-" + IdCard.substr(12, 2);
		            if (!Common.IsDate(birth)) {
		                return false;
		            }

		            iW = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);

		            iSum = 0;
		            for (var i = 0; i < 17; i++) {
		                iC = IdCard.charAt(i);
		                iVal = parseInt(iC);
		                iSum += iVal * iW[i];
		            }

		            iJYM = iSum % 11;
		            if (iJYM == 0) sJYM = "1";
		            else if (iJYM == 1) sJYM = "0";
		            else if (iJYM == 2) sJYM = "x";
		            else if (iJYM == 3) sJYM = "9";
		            else if (iJYM == 4) sJYM = "8";
		            else if (iJYM == 5) sJYM = "7";
		            else if (iJYM == 6) sJYM = "6";
		            else if (iJYM == 7) sJYM = "5";
		            else if (iJYM == 8) sJYM = "4";
		            else if (iJYM == 9) sJYM = "3";
		            else if (iJYM == 10) sJYM = "2";

		            var cCheck = IdCard.charAt(17).toLowerCase();
		            if (cCheck != sJYM) {
		                return false;
		            }
		        }
		        return true;
		    },
		    /**日期验证*/
		    isDate: function (strDate) {
		        var strSeparator = "-"; //日期分隔符
		        var strDateArray;
		        var intYear;
		        var intMonth;
		        var intDay;
		        var boolLeapYear;
		        strDateArray = strDate.split(strSeparator);
		        if (strDateArray.length != 3) return false;
		        intYear = parseInt(strDateArray[0], 10);
		        intMonth = parseInt(strDateArray[1], 10);
		        intDay = parseInt(strDateArray[2], 10);
		        if (isNaN(intYear) || isNaN(intMonth) || isNaN(intDay)) return false;
		        if (intMonth > 12 || intMonth < 1) return false;
		        if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intDay > 31 || intDay < 1)) return false;
		        if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intDay > 30 || intDay < 1)) return false;
		        if (intMonth == 2) {
		            if (intDay < 1) return false;
		            boolLeapYear = false;
		            if ((intYear % 100) == 0) {
		                if ((intYear % 400) == 0) boolLeapYear = true;
		            }
		            else {
		                if ((intYear % 4) == 0) boolLeapYear = true;
		            }
		            if (boolLeapYear) {
		                if (intDay > 29) return false;
		            }
		            else {
		                if (intDay > 28) return false;
		            }
		        }
		        return true;
		    },
		    /**验证手机号码*/
		    isMobile : function(str){
		    	return (/^(?:13\d|15[012356789]|18[0256789]|147)-?\d{5}(\d{3}|\*{3})$/.test(str));
		    },
		    /**验证电子邮箱*/
		    isEmail : function(str) {
				return (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str));
		    },
		    /**验证qq号码*/
		    isQQ : function (str) {
		        var reg = /^\s*\d{4,12}\s*$/g;
		        return reg.test(str);
		    },
		    /**验证IP*/
		    isIP : function(str){    
		        var reg = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;    
		        return reg.test(str);
		    },
		    /**验证固话*/
		    isTelephone : function(str){
		    	//"兼容格式: 国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(1-4位)" 
	            return (/^(([0\+]\d{2,3}-)?(0\d{2,3}\-)?([2-9]\d{6,7})+(\-\d{1,4})?$/.test(str));
		    },
		    /**验证邮编*/
		    isPost : function(str){    
		    	return /^\d{1,6}$/.test(str);    
		    },
		    /**验证中文*/
		    isChinese : function(str){
		    	str = str.replace(/(^\s*)|(\s*$)/g,'');    
			    if (!(/^[\u4E00-\uFA29]*$/.test(str) && (!/^[\uE7C7-\uE7F3]*$/.test(str)))){    
			    	return false;    
			    }    
			    return true; 
		    },
		    /**验证英文*/
		    isEnglish : function(str){
		    	return /^[A-Za-z]+$/i.test(value);
		    },
		    /**验证整数*/
		    isInt : function(str){    
		        return /^-?\d+$/.test(str);   
		    },
		    /**验证小数*/
		    isFloat : function(str){
		    	return /^(-?\d+)(\.\d+)?$/.test(str);
		    },
		    /**验证相等*/
		    equals : function(str1, str2){    
		        return str1==str2;   
		    },
		    /**验证不区分大小写相等*/
		    equalsIgnoreCase : function(str1, str2){    
		      return str1.toUpperCase() == str2.toUpperCase();    
		    }    
	};
})();