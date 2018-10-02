$.yxFin = (function () {
    var dicts;   //  字典
    var branches;   // 机构列表
    var depts; // 部门列表
    var roles; // 角色集合
    function toJsonStr(property) {
        if(!property || property==""){
            return "";
        }
        property = property.replace(/:/g,"\":\"");
        property = property.replace(/,/g,"\",\"");
        property = "{\"" + property + "\"}";
        return property;
    }
    function initInputs(objs,type) {
        for (var i=0; i<objs.length; i++) {
            var obj = $(objs[i]);
            var property = toJsonStr(obj.attr("properties"));
            try{
                if(property==""){
                    property = {};
                }else {
                    property = JSON.parse(property);
                }
            }catch(e) {
                //console.log(e);
                property = {};
            }
            if(type=="text"){
                obj.textbox(property);
            }else if(type=="date"){
                property.editable = false;
                obj.datebox(property);
            }else if(type=="datetime"){
                property.editable = false;
                obj.datetimebox(property);
            }else if(type=="combo"){
                if(property.groupId==null){
                    continue
                }
                property.editable = false;
                property.comboId = obj.attr("id");
                $.yxFin.defineCombobox(property);
            }else if(type == "number"){
            	 property.min = 0;
            	 property.precision = 2;
            	 property.precision = 2;
            	 property.groupSeparator = ',';
            	 property.max = 999999999999999;
            	 obj.numberbox(property);
            	$("input",$(".easyui-numberbox").next("span")).css("text-align","right");
            	$("input",$(".easyui-numberbox").next("span")).focus(function(){ 
            		if(typeof(this.attributes.readonly) == "undefined"){
            			$("#" + this.id).parent().prev().textbox("setValue",$("#" + this.id).parent().prev().textbox("getValue").replace(/,/g, ""));	
            		}
            	});  
            }else {
           
                obj.textbox(property);
            }
        }
    }
    return{
        /**
         *  定义下拉框的项
         * @param groupId  组名
         * @param comboId  combobox的ID
         * @param label    combobox的左侧标签
         * @param prompt   combobox的提示语
         * @param selData  combobox选择的项
         * @param onSelect  combobox 选择的方法
         */
        defineCombobox:function (initObject) {
            if(!initObject.groupId || initObject.groupId == ''){
                return;
            }
            var comboObj = $("#" + initObject.comboId);
            var data = $.extend(true,[],this.dicts[initObject.groupId]);
            var onChange = initObject.onChange;
            //var loadFilter = initObject.loadFilter?initObject.loadFilter:
            if(onChange){
                if(typeof onChange == "string"){
                    //console.log("String==== " + onChange);
                    onChange = eval(onChange);
                }else{
                    onChange = onChange;
                }
            }
            if(initObject.include && initObject.include!=null){
                //console.log(initObject.include);
                var filterData = [];
                var includes = initObject.include.split("-");
                //console.log(includes);
                //console.log(data);
                for(var i=0; i < includes.length; i++){
                    for (var j = 0; j < data.length; j++) {
                        if(includes[i] == data[j].dictId){
                            filterData.push(data[j]);
                        }
                    }

                }
                data = filterData;
            }
            //console.log(data);
            comboObj.combobox({
                label: initObject.label,
                //prompt:prompt,
               // url: url,
                data: data,
                //method: 'get',
                editable : initObject.editable,
                valueField: 'dictId',
                textField: 'dictDesc',
                onChange: onChange,
                loadFilter: function (data) {
                   // console.log(data);
                    if(initObject.loadFilter){
                        return initObject.loadFilter(data);
                    }
                    if (!initObject.prompt || initObject.prompt == ""){
                        return data;
                    }
                    // 因为window进入时会刷新2次 先判断它是否已经新增了
                    var comboObjData = comboObj.combobox('getData');        // 数组 每个项是一个对象

                    if (comboObjData.length !=0) {
                        //console.log(comboObjData);
                        var comboObjKeys = Object.keys(comboObjData[0]);    // 拿到对象的keys
                        // 判断数组中第一项的第一个keys的value是否为空  因为不确定是dictId 第二项同理
                        if (comboObjData[0][comboObjKeys[0]] != "" && comboObjData[0][comboObjKeys[1]] != initObject.prompt) {
                            data.unshift({"dictId": "", "dictDesc": initObject.prompt});

                        }
                    }else{
                        data.unshift({"dictId": "", "dictDesc": initObject.prompt});
                    }
                    return data;
                },
                onLoadSuccess: function () {
                    if(initObject.onLoadSuccess){
                        return initObject.onLoadSuccess();
                    }
                    //alert("comboId:" + comboId + "-selData:" + selData);
                    if (initObject.selData != null) {
                        comboObj.combobox("setValue", initObject.selData);
                        return true;
                    } else {
                        var data = comboObj.combobox("getData");
                        (data!=null && data.length>0) ? comboObj.combobox("setValue", data[0].dictId) : "";
                    }
                }
            });
        },
        /**
         *  获取字典的中文
         * @param groupId
         * @param dictId
         * @returns {*} 字典的中文string
         */
        getDictsDesc:function (groupId,dictId) {
            var data = this.dicts[groupId];
            if(!data || data.length==0){
                return "";
            }
            /*if("TRUE_FALSE_SEL" == groupId){
                if(!dictId){
                    return "否";
                }
            }*/
            for(var i=0;i<data.length;i++){
                if (data[i].dictId == dictId){
                    return data[i].dictDesc;
                }
            }
        },
        //  设置字典
        setDicts:function () {
            // 查询字典 获取下拉框项等
            $.ajax({
                url: '/dict/dict/queryAll',
                method: 'get',
                async:false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    // 添加是和否字典
                    data.data.TRUE_FALSE_SEL=[
                        {
                            dictId:0,dictDesc:'否'
                        },
                        {
                            dictId:1,dictDesc:'是'
                        }
                    ];
                    // 添加评审会角色字典
                    /*data.data.MEETING_ROLE= [
                        {
                            dictId:'R7004',dictDesc:'评审会主任'
                        },
                        {
                            dictId:'R7002',dictDesc:'评审会委员'
                        }
                    ];*/
                    $.yxFin.dicts = data.data;
                    $.yxFin.setRoles();
                    $.yxFin.setBranches();
                    $.yxFin.setDepts();
                }
            });
        },
        setRoles : function () {
            // 查询角色
            var that = this;
            //console.log(this);
            $.ajax({
                url: '/sec/queryRole?systemCode=7',
                method: 'get',
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                    that.roles = $.extend(true,[],data.data);

                    // 把角色列表加到字典里去
                    that.dicts.MEETING_ROLE = data.data;
                    //    处理一下键值 branchCode变为dictId   branchName变为dictDesc
                    that.dicts.MEETING_ROLE.forEach(function (value) {
                        value.dictId = value.roleCode;
                        delete value.roleCode;
                        value.dictDesc = value.roleName;
                        delete value.roleName;
                    })
                }
            });
        },
        setBranches:function () {
            // 查询机构
            var that = this;
            //console.log(this);
            $.ajax({
                url: '/branch/selfAndSubBranches/GZS?branchId=' + $.currUserInfo.userBranch,
                method: 'get',
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                   // branches存放还没修改过的公司机构
                   that.branches = $.extend(true,[],data.data);

                   // 把机构列表加到字典里去
                   that.dicts.BRANCHES_ORGAN = data.data;
                //    处理一下键值 branchCode变为dictId   branchName变为dictDesc
                    that.dicts.BRANCHES_ORGAN.forEach(function (value) {
                        value.dictId = value.branchCode;
                        delete value.branchCode;
                        value.dictDesc = value.branchName;
                        delete value.branchName;
                    })
                }
            });
        },
        setDepts:function () {
            // 查询机构
            var that = this;
            $.ajax({
                url: "/branch/rskdept?bchCde=" + $.currUserInfo.userBranch,
                method: 'get',
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                   // data.data
                   // "depCde":"99999","depName"
                    // branches存放还没修改过的公司机构
                    that.depts = $.extend(true,[],data.data);

                    // 把机构列表加到字典里去
                    that.dicts.DEPARTMENT = data.data;
                    //    处理一下键值 branchCode变为dictId   branchName变为dictDesc
                    that.dicts.DEPARTMENT.forEach(function (value) {
                        value.dictId = value.depCde;
                        delete value.branchCode;
                        value.dictDesc = value.depName;
                        delete value.branchName;
                    })
                }
            });
        },
        /**
         * 初始化input输入框
         * @param formId 表单id
         */
        defineInput : function (formId) {
            var form = $("#" + formId);
            var objs = form.find('.easyui-textbox');
            initInputs(objs, "text");
            objs = form.find('.easyui-datebox');
            initInputs(objs,"date");
            objs = form.find('.easyui-datetimebox');
            initInputs(objs,"datetime");
            objs = form.find('.easyui-combobox');
            initInputs(objs,"combo");
            objs = form.find('.easyui-numberbox');
            initInputs(objs,"number");
        },

        /**
         * 操作权限控制
         * @param opt 操作动作 add、update 等等
         * @returns {*} hide 通用隐藏样式
         */
        hasPrie:function (opt) {
            var permissionsObj = permissions.actRoles;
            var permRoles = [];
            var userRoles = $.currUserInfo.userRoles.split(',');
            if (permissionsObj[opt] != null) {
                permRoles = permissionsObj[opt].split(",");
            }
            for(var i=0; i<userRoles.length; i++){
                if(permRoles.contains(userRoles[i]))
                    return "";
            }
            return "hide";
        },
        /**
         * 更新操作权限控制
         * @param opt 操作动作 add、update 等等
         * @returns {*} hide 通用隐藏样式
         */
        updatePermission:function (menuId,callback) {
        	 $.ajax({
                 url: "/sec/updatePermission?menuId="+menuId,
                 method: 'get',
                 contentType: "application/json; charset=utf-8",
                 success: function (data) {
                	 if (data.resultCode != "100") {
                         $.messager.alert("提示", data.msg);
                         return false;
                     }
                	 if(typeof callback=='function'){
                     	callback();
                     }
                 }
             });
        },
        loadPermissionPage:function(callback){
        	  $("#permissionDiv").load("/fragment/module/common/permission_fragment");
        	  if(typeof callback=='function'){
               	callback();
               }
        },
        /**
         * 创建项目编号：公司简称首字母（4个字母，例如YXJK）+日期（20180509）+随机数（位数你们定）；其他编号就日期（20180509）+随机数
         * @returns {string}
         */
        createNum : function (branchId) {
            var branchStr = "";
            if("111111111" == branchId){
                branchStr = "YXJK";
            }else if("YXP" == branchId) {
                branchStr = "YXCT";
            }else if("YXL" == branchId) {
                branchStr = "YXZL";
            }else if("GZG"==branchId){
                branchStr = "GZDB";
            }else if("YXM"==branchId){
                branchStr = "YXXD";
            }else if("GZAM"==branchId){
                branchStr = "GZZC";
            }
            return branchStr + getCurrDate().replace(/-/g,"") + new Date().getTime();
        },
        getRoleNames: function (value) {
            if(!value || value==""){
                return "";
            }
            var roleStr = "";
            var roles = value.split(",");
            for(var i=0; i<roles.length; i++){
                if(i==roles.length-1){
                    roleStr += this.getDictsDesc('MEETING_ROLE', roles[i]);
                    continue;
                }
                roleStr += this.getDictsDesc('MEETING_ROLE', roles[i]) + ",";
            }
            return roleStr;
        },
        getFucnName : function (objName,params) {
            //console.log(params);
            if(!params){
                return "";
            }
            var fucnName = objName + "." + params[0] + "(";
            if(params.length==1){
                fucnName += ")";
                return funcName;
            }
            for(var i=1; i<params.length; i++) {
                var param = params[i];
                if(isNaN(param)){
                    param = "\'" + param +"\'";
                }
                if(i==params.length - 1) {
                    fucnName += param + ")";
                    continue;
                }
                fucnName += param + ",";
            }
            //console.log(fucnName);
            return fucnName;
        },
        isJson : function (obj) {
            var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
            return isjson;
        }

    }
})
/* 对象的动态键
*  Object.defineProperty(object,keyText,{
                        value:''
                    });
*
*/






//IE下不支持console对象
(function () {
    var method;
    var noop = function () {};
    var methods = ['assert','clear','count','debug','dir','dirxml','error','exception','group',
        'groupCollapsed','groupEnd','info','log','markTimeline','profile','profileEnd','table',
        'time','timeEnd','timeStamp','trace','warn'];
    var length = methods.length;
    var console = (window.console = window.console || {});
    while(length--){
        method = methods[length];
        if (!console[method]){
            // 对于不支持的方法用noop函数代替
            console[method] = noop;
        }
    }
}());
/*
* ES5 数组去重
* */
Array.prototype.uniq = function () {
    var arr=[];
    var flag = true;
    this.forEach(function (item) {
        // 排除 NaN
        if (item != item ){
            flag && arr.indexOf(item) === -1 ? arr.push(item) : '';
            flag = false;
        }else{
            arr.indexOf(item) === -1 ? arr.push(item) : '';
        }
    });
    return arr;
}

Array.union = function () {
    var arr = new Array();
    var obj = {};
    for (var i = 0 ; i < arguments.length; i++){
        for (var j = 0 ; j < arguments[i].length;j++){
            var str = arguments[i][j];
            if (!obj[str]){
                obj[str] = 1;
                arr.push(str);
            }
        }
    }
    return arr;
}


// IE8 不支持forEach方法 重写
if (!Array.prototype.forEach){
    Array.prototype.forEach = function (callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError("this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw  new TypeError(callback + " is not a function");
        }
        if (arguments.length > 1) {
            T = thisArg;
        }
        k = 0;
        while (len > k) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}



$.lrisk = {
    initDgByUrl: function (remoteUrl) {
        $.ajax({
            url: remoteUrl,
            method: 'get',
            success: function (msg) {
                $("#dg").datagrid({data: msg.data})
            },
            error: function (msg) {
                alert("系统维护中， 请稍后访问");
            }
        });
    },
    tip4Selection: function (msg) {
        alert(msg);
    },
    SUCCESS_CODE: "100",
    menuId:"",
    loadPage: function (fragment,title,id) {
        $("#mainPage").html("");
        $("#mainPage").load(fragment);
        // 清除不必要的html累积元素
        // (function () {
        //     $("#mainPage").html("");
        //     $(".easyui-dialog.comDialog").dialog("clear");
        //     //$("#dlg").dialog("destroy");
        //     $("div#dlg-panel").html("");
        //     var windowLength = $("div.panel.window").length;
        //     for (var i = 2; i < windowLength; i++) {
        //         $("div.panel.window").eq(2).remove();
        //         $("div.window-mask").eq(2).remove();
        //         $("div.window-shadow").eq(2).remove();
        //     }
        //     $("div.tooltip").remove();
        // }());
            subTitle = title;
            this.menuId = id;
    },
    //是否集团本部
    isGroupBase: function(branchGrp){
    	var isGroup =  $.currUserInfo.userBranchGrp;
    	if(branchGrp){
    		isGroup = branchGrp;
        }
    	return isGroup;
    	/*if(isGroup=="1"){
    		return true;
    	}else{
    		return false;
    	}*/
        /*var branchId = $.currUserInfo.userBranch;
        if(id){
            branchId = id;
        }
    	if(branchId=="YXF"){
    		return true ;
    	}else{
    		return false ;
    	}*/
    },
    getCategory: function(branch){
    	if("000000000,111111111,YXL,YXF".indexOf(branch)>-1){
	    	 return "leasing";
	     }/*else if(branch=="YXF"){
	    	 return "groupBase";
	     }*/else{
	    	 return "other";
	     }
    },
    initBranchQuery: function(id){
        var bId = "branchIdQueryCombo";
        if(id){
            bId = id;
        }
    	if(this.isGroupBase()){
    		$("#" + bId).combobox("readonly",false);
    	}else{
            $("#" + bId).combobox("readonly",true);
    	}
        $("#" + bId).combobox("setValue",$.currUserInfo.userBranch);
    }
};

// 删除数组某个字符串元素 给Array对象添加了remove方法
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1){
        this.splice(index,1);
    }
}
// 清除数组中空的元素 给Array对象添加了clearTrim方法
Array.prototype.clearTrim = function (array) {
    for (var i = 0 ; i < array.length;i++){
        if (array[i] == "" || typeof (array[i]) == "undefined" || array[i] === null){
            array.splice(i,1);
            i = i -1;
        }
    }
    return array;
}

//初始化按钮
function initComButton(){
	$('button').each(function (index,domEle){
		if($.trim($(domEle).text()) == "新增"){
            //alert("新增");
			$(domEle).text("");
			//新增按钮
			/*$(domEle).attr("class","button button-tiny button-raised button-com");*/
			$(domEle).attr("class","button-tiny button-raised");
			$(domEle).attr("sec:authorize","hasAnyRole(#httpServletRequest.getAttribute('actRoles').get('add'))");
			$(domEle).append("<i class='fa fa-plus fa-padding'></i>新增</button>");

		}else if($.trim($(domEle).text()) == "修改"){
			$(domEle).text("");
			//修改
			/*$(domEle).attr("class","button button-tiny button-raised button-com");*/
			$(domEle).attr("class","button-tiny button-raised");
			$(domEle).attr("sec:authorize","hasAnyRole(#httpServletRequest.getAttribute('actRoles').get('update'))");
			$(domEle).append("<i class='fa fa-edit fa-padding'></i>修改</button>");

		}else if($.trim($(domEle).text()) == "删除"){
			$(domEle).text("");
			//删除
			/*$(domEle).attr("class","button button-tiny button-raised button-com");*/
			$(domEle).attr("class","button-tiny button-raised");
			$(domEle).attr("sec:authorize","hasAnyRole(#httpServletRequest.getAttribute('actRoles').get('remove'))");
			$(domEle).append("<i class='fa fa-remove fa-padding'></i>删除</button>");

		}else if($.trim($(domEle).text()) == "导入"){
			$(domEle).text("");
			//导入
			// $(domEle).attr("class","button button-tiny button-raised button-com");
            $(domEle).attr("class","button-tiny button-raised");
			$(domEle).attr("sec:authorize","hasAnyRole(#httpServletRequest.getAttribute('actRoles').get('import'))");
			$(domEle).append("<i class='fa fa-sign-in fa-padding'></i>导入</button>");

		}else if($.trim($(domEle).text()) == "导出"){
			$(domEle).text("");
			//导出
			// $(domEle).attr("class","button button-tiny button-raised button-com");
            $(domEle).attr("class","button-tiny button-raised");
			$(domEle).attr("sec:authorize","hasAnyRole(#httpServletRequest.getAttribute('actRoles').get('export'))");
			$(domEle).append("<i class='fa fa-sign-out fa-padding'></i>导出</button>");

		}else if($.trim($(domEle).text()) == "查询"){
			$(domEle).text("");
			//查询
			// $(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");
            $(domEle).attr("class","button-tiny button-raised");
			$(domEle).append("<i class='fa fa-search fa-padding'></i>查询</button>");

		}else if($.trim($(domEle).text()) == "重置"){
			$(domEle).text("");
			//重置
			// $(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");
            $(domEle).attr("class","button-tiny button-raised");
			$(domEle).append("<i class='fa fa-reply fa-padding'></i>重置</button>");
		}else if($.trim($(domEle).text()) == "详情"){
			$(domEle).text("");
			//查看详情
			// $(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");
            $(domEle).attr("class","button-tiny button-raised");
			$(domEle).append("<i class='fa fa-list-alt fa-padding'></i>详情</button>");
		}else if($.trim($(domEle).text()) == "查看明细"){
			$(domEle).text("");
			//查看明细
			// $(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");
            $(domEle).attr("class","button-tiny button-raised");
			$(domEle).append("<i class='fa fa-search fa-padding'></i>查看明细</button>");
		}else if($.trim($(domEle).text()) == "维护信息"){
			$(domEle).text("");
			//维护各资产负债项目信息置
			// $(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");
            $(domEle).attr("class","button-tiny button-raised");
			$(domEle).append("<i class='fa fa-pencil  fa-padding'></i>维护信息</button>");
		}else if($.trim($(domEle).text()) == "试算结果"){
			$(domEle).text("");
			//动态现金流试算结果
			// $(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");
            $(domEle).attr("class","button-tiny button-raised");
			// $(domEle).append("<i class='fa fa-search  fa-padding'></i>试算结果</button>");
            $(domEle).append("<i class='fa icon-calculator  fa-padding'></i>试算结果</button>");
		}else if($.trim($(domEle).text()) == "提交审批") {
        $(domEle).text("");
        //提交审批
        // $(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");
        $(domEle).attr("class", "button-tiny button-raised");
        $(domEle).append("<i class='fa fa-paper-plane-o  fa-padding'></i>提交审批</button>");
        }else if($.trim($(domEle).text()) == "驳回原因"){
			$(domEle).text("");
			//查看驳回原因
			// $(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");
            $(domEle).attr("class","button-tiny button-raised");
			$(domEle).append("<i class='fa fa-search  fa-padding'></i>驳回原因</button>");
		}else if($.trim($(domEle).text()) == "查看驳回原因") {
            $(domEle).text("");
            //查看驳回原因
            // $(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");
            $(domEle).attr("class", "button-tiny button-raised");
            $(domEle).append("<i class='fa fa-search  fa-padding'></i>查看驳回原因</button>");
        }else if($.trim($(domEle).text()) == "复制"){
			$(domEle).text("");
			//复制
			// $(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");
            $(domEle).attr("class","button-tiny button-raised");
			$(domEle).append("<i class='fa fa-copy fa-padding'></i>复制</button>");
		}else if($.trim($(domEle).text()) == "查看详细"){
			$(domEle).text("");
			//查看详细
			// $(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");
            $(domEle).attr("class","button-tiny button-raised");
			$(domEle).append("<i class='fa fa-search fa-padding'></i>查看详细</button>");
		}else if($.trim($(domEle).text()) == "返回"){
			$(domEle).text("");
			//返回
			// $(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");
            $(domEle).attr("class","button-tiny button-raised");
			$(domEle).append("<i class='fa fa-arrow-left fa-padding'></i>返回</button>");
		}else if($.trim($(domEle).text()) == "保存"){
			$(domEle).text("");
			//保存
			/*$(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");*/
            $(domEle).attr("class","button-tiny button-raised");
			$(domEle).append("<i class='fa fa-check fa-padding'></i>保存</button>");
		}else if($.trim($(domEle).text()) == "审批"){
			$(domEle).text("");
			//审批
			/*$(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");*/
            $(domEle).attr("class","button-tiny button-raised");
			$(domEle).append("<i class='fa fa-check fa-padding'></i>审批</button>");
		}else if($.trim($(domEle).text()) == "通过"){
			$(domEle).text("");
			//审批
			/*$(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");*/
            $(domEle).attr("class","button-tiny button-raised");
			$(domEle).append("<i class='fa fa-check fa-padding'></i>通过</button>");
		}else if($.trim($(domEle).text()) == "驳回"){
			$(domEle).text("");
			//审批
			/*$(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");*/
            $(domEle).attr("class","button-tiny button-raised");
			$(domEle).append("<i class='fa fa-remove fa-padding'></i>驳回</button>");
		}else if($.trim($(domEle).text()) == "测算"){
			$(domEle).text("");
			//测算
			/*$(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");*/
            $(domEle).attr("class","button-tiny button-raised");
			// $(domEle).append("<i class='fa fa-calculator fa-padding'></i>测算</button>");
            $(domEle).append("<i class='fa icon-calculator fa-padding'></i>测算</button>");
		}else if($.trim($(domEle).text()) == "预警值") {
            $(domEle).text("");
            //预警值
            /*$(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");*/
            $(domEle).attr("class", "button-tiny button-raised");
            $(domEle).append("<i class='fa fa-signal fa-padding'></i>预警值</button>");
        }else if($.trim($(domEle).text()) == "公式") {
            $(domEle).text("");
            //公式
            /*$(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");*/
            $(domEle).attr("class", "button-tiny button-raised");
            $(domEle).append("<i class='fa fa-sort-numeric-asc fa-padding'></i>公式</button>");
		}else if($.trim($(domEle).text()) == "查看LCR详情"){
            $(domEle).text("");
            //查看LCR详情
            /*$(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");*/
            $(domEle).attr("class","button-tiny button-raised");
            $(domEle).append("<i class='fa fa-table fa-padding'></i>查看LCR详情</button>");
        }else if($.trim($(domEle).text()) == "查看NSFR详情"){
            $(domEle).text("");
            //查看NSFR详情
            /*$(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");*/
            $(domEle).attr("class","button-tiny button-raised");
            $(domEle).append("<i class='fa fa-table fa-padding'></i>查看NSFR详情</button>");
        }else if($.trim($(domEle).text()) == "查看历史记录"){
            $(domEle).text("");
            //查看历史记录
            /*$(domEle).attr("class","button button-tiny button-raised button-com riskComSeaBtn");*/
            $(domEle).attr("class","button-tiny button-raised");
            $(domEle).attr("sec:authorize","hasAnyRole(#httpServletRequest.getAttribute('actRoles').get('vindicate'))");
            $(domEle).append("<i class='fa fa-table fa-padding'></i>查看历史记录</button>");
        }else if($.trim($(domEle).text()) == "清空") {
            $(domEle).text("");
            $(domEle).attr("class", "button-tiny button-raised");
            $(domEle).append("<i class='fa fa-trash-o fa-padding'></i>清空</button>");
		}else if($.trim($(domEle).text()) == "退格") {
            $(domEle).text("");
            //退格
            $(domEle).attr("class", "button-tiny button-raised");
            $(domEle).append("<i class='fa fa-chevron-circle-left fa-padding'></i>退格</button>");
		}
	});

};


$.ajaxSetup({
    contentType: "application/json; charset=utf-8",
    //关闭缓存，即在每条ajax请求后增加随机数戳  _=****
    cache: false,
    complete: function (res) {
        //测试遮罩框代码:
        //$.unblockUI();
    },
    beforeSend: function (xhr, options) {
        //根据不同userBranch 请求不同的页面
        //请根据实际情况修改
        /*
        if (options.url.indexOf("_fragment.html") > 0) {
            options.url = userBranch + options.url;
            alert(options.url)
        }
        */
        //  遮罩框文字和样式
    },
    error:function () {
    },
    statusCode: {
        401: function (XMLHttpRequest) {
            // var res = XMLHttpRequest.responseText;
            // var jsonData = JSON.parse(res);
            // $.messager.alert("错误", jsonData.msg, "error");
            // 隐藏掉所有窗口
            $(".easyui-dialog").dialog("close");
            //  导航向loginerror页面
            $("#mainPage").load("loginError");
        },
        500: function (XMLHttpRequest) {
            // if (!isIE()) {
            //     $.unblockUI();
            // }
            var res = XMLHttpRequest.responseText;
            if (typeof(res) == "undefined" || res == "") {
                $.messager.alert("错误", "服务器错误500", "error");
            } else {
                var jsonData = JSON.parse(res);
                //console.log(jsonData);
                if(jsonData.exception=="com.netflix.zuul.exception.ZuulException"){
                	$.messager.alert("错误", "服务无法访问!<br/><br/>请稍后重试或者联系系统管理员！", "error");
                }else{
                	$.messager.alert("错误", jsonData.msg, "error");
                }
            }

        }
    }
});

/*'visit','菜单访问

'view','查看'

'add','新增'

'update','修改',

'remove','删除',

'import','导入',

'export','导出',*/

//初始化Dialog居中
$(document).ready(function () {
    // 监听dom节点插入
    $(".comDialog").bind('DOMNodeInserted', function(e) {
            //$('.comDialog').dialog("center");
       $(this).dialog("center");
    //$("#detailDlg").dialog("center");
   // $("#dlg").dialog("center");
    });
});







/**
 * 判断是否为动态
 * @returns
 */
function isDynamic(){
	var planId = $("#maintenanceDynamicplanId").val();
    var planName = $("#maintenanceDynamicplanName").val();
    var dynamicBoolean = (typeof(planId) != "undefined" && typeof(planName) != "undefined")
        && (planId != "" && planName != "");
    return dynamicBoolean;
}
//URL编码
function encodeURLForDynamic(url){
		var planId = $("#maintenanceDynamicplanId").val();
		var planName = $("#maintenanceDynamicplanName").val();
		var dynamicBoolean = isDynamic();
		if(dynamicBoolean){
			url = url + "/Dynamic" + "/" + planId;
		}
	return url;
}


//公共参数
$.lrisk.param = {
	isfinancing: false
};
//样式,初始化
// $.lrisk.css = {}


// 解决IE下getElementsByClassName不兼容的问题
function getElementsByClassName(node,className){
    if (node.getElementsByClassName){
        return node.getElementsByClassName(className);
    }else {
        var results = [],
            elems = node.getElementsByTagName("*");
        for (var i = 0,len = elems.length; i < len; i++){
            if (elems[i].className.indexOf(className) != -1){
                results[results.length] = elems[i];
            }
        }
        return results;
    }
}
// 判断浏览器是否是IE浏览器
function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window){
        return true;
    }else{
        return false;
    }
}
//  获取浏览器详细版本
function checkBrower() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    if (window.ActiveXObject){
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(navigator.userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        // 获取版本
        var ie_version = 6;
        if (fIEVersion == 7){
            ie_version = 7;
        }
        if (fIEVersion == 8){
            ie_version = 8;
        }
        if (fIEVersion == 9){
            ie_version = 9;
        }
        if (fIEVersion == 10){
            ie_version = 10;
        }
        if (fIEVersion == 11){
            ie_version = 11;
        }
        Sys.ie= ie_version;
    }else if (ua.indexOf("firefox") > -1){
        Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1];
    }else if (ua.indexOf("chrome") > -1) {
        Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1];
    }else if (window.opera){
        Sys.opera = ua.match(/opera.([\d.]+)/)[1];
    }else if (window.openDatabase){
        Sys.safari = ua.match(/version\/([\d.]+)/)[1];
    }
    return Sys;
}


/*  easyUI 有关的方法 start*/
function disableAllInput(formId){
    $('#'+formId+' .easyui-textbox').textbox('readonly',true);
    $('#'+formId+' .easyui-combobox').combobox('readonly',true);
    $('#'+formId+' .easyui-numberbox').numberbox('readonly',true);
    $('#'+formId+' .easyui-datebox').datebox('readonly',true);
    $('#'+formId+' .easyui-datetimebox').datebox('readonly',true);
    $('#'+formId+' .checkbox-f').checkbox('readonly',true);
    // $('.subject').checkbox('readonly',true);
}
function setFormInputTooltip(formId) {
    // console.log( $('#' + formId + ' .textbox-label'))
    $('#' + formId + ' label.textbox-label').tooltip({
        content:'',
        deltaX:-50,
        deltaY:-10,
        onShow:function () {
            $(this).tooltip('update',$(this)[0].innerText.slice(0,$(this)[0].innerText.length - 1));
        }
    })
}
/*  改变datagrid的行高*/
function changeDatagridRowHeight(_this,rowHeight) {

    var panel = $(_this).datagrid("getPanel");
    //      序号列行高
    var tr1 = panel.find("div.datagrid-view1 .datagrid-body tr");
    tr1.each(function () {
        $(this).css({"height":rowHeight});
    });
    //      内容列行高
    var tr2 = panel.find("div.datagrid-view2 .datagrid-body tr");
    tr2.each(function () {
        $(this).css({"height":rowHeight});
    });
}



/*  easyUI 有关的方法 end*/

/**
 * 获取带参数的导出Url
 * @param url
 * @param param
 * @returns {*}
 */
function getExportUrl(url, param) {
    var exportUrl = url;
    var isFirstParm = true;
    for (f in param) {
        var val = param[f];
        if(val==null){
            continue;
        }
        if (isFirstParm) {
            exportUrl += "?" + f + "=" + val;
            isFirstParm = false;
        }else {
            exportUrl += "&" + f + "=" + val;
        }
    }
    return exportUrl;
}
/*
    获取对象的key数
 */
function getObjLength(obj) {
    var arr = Object.keys(obj);
    return arr.length;
}