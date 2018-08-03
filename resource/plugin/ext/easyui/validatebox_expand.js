;
var floating='PROPORTION';
(function($){
	/** validatebox 拓展 */
	$.extend($.fn.validatebox.defaults.rules, {
		minLength: {
            validator: function (value, param) {
                return value.length >= param[0];
            },
            message: '请输入至少{0}个字符'
        },
        maxLength:{
        	validator: function (value, param) {
                return value.length <= param[0];
            },
            message: '最多输入{0}个字符'
        },
        length: { validator: function (value, param) {
            var len = $.trim(value).length;
            return len >= param[0] && len <= param[1];
        },
            message: "输入内容长度必须介于{0}和{1}之间"
        },
        idcard: {// 验证身份证
            validator: function (value) {
                return validator.isIdCard(value);
            },
            message: '身份证号码格式不正确'
        },
        telephone: {// 验证电话号码
            validator: function (value) {
                return validator.isTelephone(value);
            },
            message: '格式不正确,请使用下面格式:020-88888888'
        },
        mobile: {// 验证手机号码
            validator: function (value) {
                return validator.isMobile(value);
            },
            message: '手机号码格式不正确'
        },
        telephoneOrMobile:{
            validator: function (value) {
                return (validator.isTelephone(value)||/^\d{11}$/.test(value));
            },
            message: '请输入正确的固话或者手机号码'
        },
        qq: {// 验证QQ,从10000开始
            validator: function (value) {
                return validator.isQQ(value);
            },
            message: 'QQ号码格式不正确'
        },
        int: {// 验证整数
            validator: function (value) {
                return validator.isInt(value);
            },
            message: '请输入整数'
        },
        float: {// 验证数字
        	validator: function (value) {
        		return validator.isFloat(value);
        	},
        	message: '请输入数字，并确保格式正确'
        },
        chinese: {// 验证中文
            validator: function (value) {
                return validator.isChinese(value);
            },
            message: '请输入中文'
        },
        english: {// 验证英语
            validator: function (value) {
                return validator.isEnglish(value);
            },
            message: '请输入英文'
        },
        username: {// 验证用户名
            validator: function (value) {
                return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
            },
            message: '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
        },
        post: {// 验证邮政编码
            validator: function (value) {
                return validator.isPost(value);
            },
            message: '邮政编码格式不正确'
        },
        ip: {// 验证IP地址
            validator: function (value) {
                return validator.isIP(value);
            },
            message: 'IP地址格式不正确'
        },
        date: {// 验证姓名，可以是中文或英文
            validator: function (value) {
                //格式yyyy-MM-dd或yyyy-M-d
                return validator.isDate(value);
            },
            message: '请按YYYY-MM-DD格式录入'
        },
        email: {//电子邮箱
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: '请输入有效的电子邮箱帐号'
        },
        same: {
            validator: function (value, param) {
                if ($("#" + param[0]).val() != "" && value != "") {
                    return $("#" + param[0]).val() == value;
                } else {
                    return true;
                }
            },
            message: '两次输入的密码不一致！'
        },
        rate: {
            validator: function (value, param) {
                var decimals_ok=true;
                var arr=value.split('.');
                if (!arr[0]) {
                    decimals_ok=false;
                }
                if(!param[2]){
                    param[2] = 2;
                }
                if(arr.length==2&&arr[1].length>param[2]){
                    decimals_ok=false;
                }
                return value >= param[0] && value <= param[1] && decimals_ok;
            },
            message: '请输入[{0}%,{1}%]范围内的数值，并且最多{2}位小数'
        },
        rate_int: {
            validator: function (value, param) {
                // return value >= param[0] && value <= param[1] && validator.isInt(value);
                return validator.isInRange(value,param[0],param[1]);
            },
            message: '请输入[{0},{1}]范围内的整数'
        },
        floatingRate: {
            validator: function (value) {
                if(floating=='PROPORTION'){
                    var param=[-500,500,4];
                }
                if(floating=='POINT'){
                    var param=[0,1000,0];
                }
                var decimals_ok=true;
                var arr=value.split('.');
                if (!arr[0]) {
                    decimals_ok=false;
                }
                if(!param[2]){
                    param[2] = 2;
                }
                if(arr.length==2&&arr[1].length>param[2]){
                    decimals_ok=false;
                }
                if(floating=='POINT'&&value.indexOf('.')!=-1){
                    decimals_ok=false;
                }
                return value >= param[0] && value <= param[1] && decimals_ok;
            },
            //message: '请输入[{0}%,{1}%]范围内的数值，并且最多{2}位小数'
            message: '如果浮动方式为按比例，请输入[-500%,500%]范围内的数值，并且最多4位小数;如果浮动方式为按点数，请输入[0,1000BP]范围内的整数'
        },
        check_amount: {
            validator: function (value, param) {
               /* if( /^(([1-9][0-9]{0,19})|(([0]\.\d{1,2}|[1-9][0-9]{0,19}\.\d{1,2})))$/.test(value)){
                    return true;
                }
                return false;*/
            	value = value.replace(/,/g, "");
                return validator.check_amount(value);
            },
            message: '请输入最多15位正整数，2位小数'
        },
        check_deadline: {
            validator: function (value, param) {
                if( /^(([1-9][0-9]{0,5})|(([0]\.\d{1,6}|[1-9][0-9]{0,5}\.\d{1,6})))$/.test(value)){
                    return true;
                }
                return false;
            },
            message: '请输入最多6位正整数，6位小数'
        },
        moreThan : {
            validator: function (value, param) {
                var oVal;
                if(param[1]=='date'){
                    oVal = $("#" + param[0]).datebox("getValue");
                }else {
                    oVal = $("#" + param[0]).textbox("getValue");
                }
                //console.log("oVal=" + oVal + ",value=" + value);
                if(oVal==null || oVal==""){
                    return true;
                }
                if(value == null || value==""){
                    return false;
                }
                oVal = parseFloat(oVal.replace(/-/g, ""));
                value = parseFloat(value.replace(/-/g, ""));
                if(value>oVal){
                    return true;
                }
            },
            message: '{2}'
        },
        moreOrEqual : {
            validator: function (value, param) {
                var oVal;
                if(param[1]=='date'){
                    oVal = $("#" + param[0]).datebox("getValue");
                }else {
                    oVal = $("#" + param[0]).textbox("getValue");
                }
                //console.log("oVal=" + oVal + ",value=" + value);
                if(oVal==null || oVal==""){
                    return true;
                }
                if(value == null || value==""){
                    return false;
                }
                oVal = parseFloat(oVal.replace(/-/g, ""));
                value = parseFloat(value.replace(/-/g, ""));
                if(value>=oVal){
                    return true;
                }
            },
            message: '{2}'
        },
        lessOrEqual : {
            validator: function (value, param) {
                var oVal;
                if(param[1]=='date'){
                    oVal = $("#" + param[0]).datebox("getValue");
                }else {
                    oVal = $("#" + param[0]).textbox("getValue");
                }
                //console.log("oVal=" + oVal + ",value=" + value);
                if(oVal==null || oVal==""){
                    return true;
                }
                if(value == null || value==""){
                    return false;
                }
                oVal = parseFloat(oVal.replace(/-/g, ""));
                value = parseFloat(value.replace(/-/g, ""));
                if(value<=oVal){
                    return true;
                }
            },
            message: '{2}'
        },
        //现金流特定校验日期
        cashFlowPayDate : {
            validator: function (value, param) {
                oVal = parseFloat(page.valueDate.replace(/-/g, ""));
                value = parseFloat(value.replace(/-/g, ""));
                if(value>=oVal){
                    return true;
                }
            },
            message: '{0}'
        },
        between : {
            validator: function (value, param) {
                var oVal_0;
                var oVal_1;
                if(param[2]=='date'){
                    oVal_0 = $("#" + param[0]).datebox("getValue");
                    oVal_1 = $("#" + param[1]).datebox("getValue");
                }else {
                    oVal_0 = $("#" + param[0]).textbox("getValue");
                    oVal_1 = $("#" + param[1]).datebox("getValue");
                }
                //console.log("oVal=" + oVal + ",value=" + value);
                if(oVal_0==null || oVal_0==""){
                    return true;
                }
                if(oVal_1==null || oVal_1==""){
                    return true;
                }
                if(value == null || value==""){
                    return false;
                }
                oVal_0 = parseFloat(oVal_0.replace(/-/g, ""));
                oVal_1 = parseFloat(oVal_1.replace(/-/g, ""));
                value = parseFloat(value.replace(/-/g, ""));
                if(value>=oVal_0&&value<oVal_1){
                    return true;
                }
            },
            message: '{3}'
        },
        notZero:{
        	validator: function (value, param) {
            	if(/^([0]*)$/.test(value)){
                    return false;
                }
                return true;
            },
            message: '该输入项不能为0'
        },
        valInt:{
        	validator: function (value,param) {
        	    if( !(/^[1-9][0-9]*$/.test(value))){
        	        return false;
                }
        	    value = parseInt(value);
                var max = 1;
                for(var i=0; i<param[0];i++){
                    max = max + "0";
                }
        		if(validator.isInt(value)){
        		    if(param[0] && value>0 && value<parseInt(max)){
                        return true;
        		    }

        		}
        		
                return false;
            },
            message: '请输入{0}位以内的正整数'
        },
        amountZero: {
            validator: function (value, param) {
            	if( /^(([0])|([1-9][0-9]{0,19})|(([0]\.\d{1,2}|[1-9][0-9]{0,19}\.\d{1,2})))$/.test(value)){
                    return true;
                }
                return false;
            },
            message: '请输入最多20位非负整数，2位小数'
        },
        amountDigitalFour: {
            validator: function (value, param) {
            	if( /^(([0])|([1-9][0-9]{0,19})|(([0]\.\d{1,4}|[1-9][0-9]{0,19}\.\d{1,4}))|((\-)[1-9][0-9]{0,19})|((\-)([0]\.\d{1,4}|[1-9][0-9]{0,19}\.\d{1,4})))$/.test(value)){
                    return true;
                }
                return false;
            },
            message: '请输入最多20位整数，4位小数'
        },
        negativeZero: {
            validator: function (value, param) {
            	if( /^(([0])|((\-)[1-9][0-9]{0,19})|((\-)([0]\.\d{1,2}|[1-9][0-9]{0,19}\.\d{1,2})))$/.test(value)){
                    return true;
                }
                return false;
            },
            message: '请输入0或者最多20位负整数，2位小数'
        },
        reportDate : {
            validator: function (value, param) {
                oVal = parseFloat(getCurrDate().replace(/-/g, "")); // 当前日期
                value = parseFloat(value.replace(/-/g, ""));
                if(value<=oVal){
                    return true;
                }
            },
            message: '不能大于当前日期'
        },
        afterCurrDate : {
            validator: function (value, param) {
                oVal = parseFloat(getCurrDate().replace(/-/g, "")); // 当前日期
                value = parseFloat(value.replace(/-/g, ""));
                if(value>oVal){
                    return true;
                }
            },
            message: '{0}'
        },
        comboOnly: {
            validator:function(value, param){
                var $ctrl = $(this).parent().prev()
                var length = $("."+param[0]).length;
                var k = 0 ;
                for(var i = 0; i < length; i++ ){
                    var comValue = $("."+param[0]+":eq("+i+")").find("td :input[name='"+param[1]+"']").val();
                    if($ctrl.combobox('getValue')==comValue){
                        k++;
                    }
                }
                if(k>1){
                    return false ;
                }
                return true;
            },
            message:'不能选择相同的{2}'
        },
        betweenPosInt:{
            validator:function(value, param){
                if(!validator.isInt(value) || value < param[0] || value > param[1]) {
                    return false;
                }
                return true;
            },
            message:"请输入[{0},{1}]范围内的整数"
        },
        pointNum:{
            validator:function(value, param){
                if(!(/^[1-9][0-9]*\/[1-9][0-9]*$/.test(value))){
                    return false;
                }
                var valArr = value.split("/");
                return parseBigNumber(valArr[0]).isLessThan(parseBigNumber(valArr[1]));
            },
            message:"请输入分数,且分子小于分母"
        },
        numOrEng:{
            validator:function(value, param){
                return /^[a-zA-Z0-9]*$/.test(value);
            },
            message:"请输入数字或者英文"
        },
        idCard:{
            validator:function(value, param){
                return validator.isIdCard(value);
            },
            message:"请输入正确的身份证号码"
        },
        tyshxydm:{
            validator:function(value, param){
                var reg=new RegExp(/[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/);
                return reg.test(value);
            },
            message:"请输入正确的统一社会信用代码"
        }

    });
})(jQuery);
