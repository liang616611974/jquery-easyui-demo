;
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
            message: '清输入合适的日期格式'
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
        }
    });
	
})(jQuery);
