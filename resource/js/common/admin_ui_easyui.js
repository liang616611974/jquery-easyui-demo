;
var adminUI = (function($){
    var tabId = "#tabs";
    var tabMaxLength = 10;
    return {
    	
    	/** 文本框 */
    	textbox : function (obj,param) {
            obj.textbox(param);
        },
    /*	textbox : function(id,fucnName,param){
    		if(fucnName=='getValue'){
    			return $("#" + id).textbox('getValue');
    		}else if(fucnName=='setValue'){
    			return $("#" + id).textbox('setValue',param);
    		}
    	},*/
    	/** 日期框 */
        selectbox : function (obj,param) {
            obj.combobox(param);
        },
    	/*combobox : function(id,fucnName,param){
    		if(fucnName=='getValue'){
    			return $("#" + id).combobox('getValue');
    		}else if(fucnName=='setValue'){
    			return $("#" + id).combobox('setValue',param);
    		}
    	},*/

    	/** 日期框 */
    	datebox : function (obj,param) {
            obj.datebox(param);
        },
    	/*datebox : function(id,fucnName,param){
    		if(fucnName=='getValue'){
    			return $("#" + id).datebox('getValue');
    		}else if(fucnName=='setValue'){
    			return $("#" + id).datebox('setValue',param);
    		}
    	},*/

    	/** 日期时间框 */
        datetimebox : function (obj,param) {
            obj.datetimebox(param);
        },

        /** 数值框 */
        numberbox : function (obj,param) {
            obj.numberbox(param);
        },

        button : function (obj,param) {
            obj.linkbutton(param);
        },

        /** 表单处理 */
        validateForm : function (obj) {
            return obj.form('validate');
        },
        loadForm : function (obj,data) {
            return obj.form('load',data);
        },
        clearForm : function (obj) {
            return this.form('clear');
        },
    	
    	/** 数据表格datagrid */
    	datagrid:function(id,fucnName,param){
    		if(fucnName=='show'){
    			return $("#" + id).datagrid(param);
    		}else if(fucnName=='getSelected'){
    			return $("#" + id).datagrid('getSelected');
    		}else if(fucnName=='reload'){
    			return $("#" + id).datagrid('reload');
    		}else if(fucnName=='load'){
    			return $("#" + id).datagrid('load',param);
    		}
    	},

        panel : function (obj,param) {
            return obj.panel(param)
        },
    	
    	/** 确认框 */
    	confirm:function(title,content,fucn){
    		return $.messager.confirm(title,content, function(r){
    			return fucn(r);
    		});
    	},
    	
        /** 弹窗alert */
        alert: function(title, msg, level){
            $.messager.alert(title, msg, level);
        },
        alertInfo: function(msg){
            $.messager.alert("提示", msg, "info");
        },
        alertWarn: function(msg){
            $.messager.alert("警告", msg, "warning");
        },
        alertErr: function(msg){
            $.messager.alert("错误", msg, "error");
        },
        
		/** 进度条 progress*/
		openProgress:function(){
			 $.messager.progress({
				title:'请稍等',
				msg:'处理中...'
			});
		},
        closeProgress:function(){
        	$.messager.progress('close');
        },
        
        /** 对话框 */
        openDialog:function(id,title){
        	$("#" + id).dialog("open").dialog("setTitle",title);
        },
        closeDialog:function(id){
        	$("#" + id).dialog("close");
        },
        
        /** 面板tab */
        /* 在当前页面添加面板 */
        addTab:function(title,url){
        	this.addTabByObj(self,title,url);
        },
        /* 在父页面添加面板 */
        addTabByParent:function(title,url){
        	this.addTabByObj(self.parent,title,url);
        },
        /* 在指定页面对象中添加面板 */
        addTabByObj:function(obj,title,url){
            //1.判断该面板是否存在,存在先关闭
            if (obj.$(tabId).tabs('exists', title)) {
            	obj.$(tabId).tabs('close', title);
            }
            //2.判断是否达到最大窗口数
            var tabLength = obj.$(tabId).tabs('tabs').length;
            if (tabLength > tabMaxLength) {
                this.alertInfo("最多只能打开" + tabMaxLength + "个窗口");
                return;
            }
            //3.打开新窗口
            var content = "<iframe scrolling='auto' frameborder='0' src='" +
            url +
            "' style='width:100%; height:100%'></iframe>";
            obj.$(tabId).tabs('add', {
                title: title,
                content: content,
                closable: true
            });
			
			//4.获取最后一个tabs 在新加的选项卡后面添加"关闭全部"
			var li = obj.$(".tabs-wrap ul li:last-child");
			obj.$("#closeAllTab").remove();
			li.after("<li id='closeAllTab'><a class='tabs-inner' href='javascript:void(0)' onClick='javascript:adminUI.closeAllTab()'>关闭全部</a></li>");
        },
        /* 关闭当前面板 */
		closeCurrTab : function() { 
			var currentTab = $(tabId).tabs('getSelected');
			//var currentTabIndex = $(tabId).tabs('getTabIndex',currentTab);
			$(tabId).tabs('close', currentTab);
		},
		/* 关闭所有面板 */
        closeAllTab: function(){
            $(".tabs li").each(function(index, obj){
                //获取所有可关闭的选项卡  
                var tab = $(".tabs-closable", this).text();
                $(tabId).tabs('close', tab);
            });
            $("#closeAllTab").remove();//同时把此按钮关闭  
        }
    }
})(jQuery);
