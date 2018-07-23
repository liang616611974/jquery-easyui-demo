;
var adminUI = (function ($) {
    var tabId = "#tabs";
    var tabMaxLength = 10;
    return {

        /** 文本框 */
        textbox: function (obj, param1, param2) {
            if (arguments.length <= 2) {
                return obj.textbox(param1);
            }
            return obj.textbox(param1, param2);
        },
        /*	textbox : function(id,fucnName,param){
                if(fucnName=='getValue'){
                    return $("#" + id).textbox('getValue');
                }else if(fucnName=='setValue'){
                    return $("#" + id).textbox('setValue',param);
                }
            },*/
        /** 日期框 */
        selectbox: function (obj, param1, param2) {
            if (arguments.length <= 2) {
                return obj.combobox(param1);
            }
            return obj.combobox(param1, param2);
        },

        /** 日期框 */
        datebox: function (obj, param1, param2) {
            if (arguments.length <= 2) {
                return obj.datebox(param1);
            }
            return obj.datebox(param1, param2);

        },

        /** 日期时间框 */
        datetimebox: function (obj, param1, param2) {
            if (arguments.length <= 2) {
                return obj.datetimebox(param1);
            }
            return obj.datetimebox(param1, param2);
        },

        /** 数值框 */
        numberbox: function (obj, param1, param2) {
            if (arguments.length <= 2) {
                return obj.numberbox(param1);
            }
            return obj.numberbox(param1, param2)
        },

        /** 按钮 */
        button: function (obj, param1, param2) {
            if (arguments.length <= 2) {
                return obj.linkbutton(param1);
            }
            return obj.linkbutton(param1, param2)
        },

        /** 文件选择框 */
        filebox: function (obj, param1, param2) {
            if (arguments.length <= 2) {
                return obj.filebox(param1);
            }
            return obj.filebox(param1, param2);
        },

        /** 表单处理 */
        validateForm: function (obj) {
            return obj.form('validate');
        },
        loadForm: function (obj, data) {
            return obj.form('load', data);
        },
        clearForm: function (obj) {
            return obj.form('clear');
        },

        /** 数据表格datagrid */
        datagrid: function (obj, param1, param2) {
            if (arguments.length <= 2) {
                if ($.type(param1) == "object") {
                    // 如果是请求远程服务数据
                    if(param1.url && param1.url!=""){
                        var url = param1.url; // 暂存url;
                        param1.url = null; // 不让datagrio自动加载
                        param1.onBeforeLoad = function () {
                            // 获取分页参数
                            var pager = obj.datagrid("getPager").data("pagination").options;
                            //console.log(pager);
                            var pagerParam = {
                                "page": pager.pageNumber == 0 ? 1 : pager.pageNumber,
                                "rows": pager.pageSize
                            };
                            // 合并其它请求参数
                            var options = obj.datagrid("options");
                            //console.log(options);
                            var requestParam = $.extend(options.queryParams, pagerParam);
                            //console.log(options.requestParam);
                            // 发起请求获取数据
                            ajax.postJson(url, requestParam, function (data) {
                                //console.log(data);
                                obj.datagrid("loadData", data.data);
                            });
                        };
                    }
                    param1.onLoadError = function () {
                        adminUI.alertErr("加载列表数据错误");
                    };
                }
                return obj.datagrid(param1);
            }
            return obj.datagrid(param1, param2);
        },

        /** 窗口 */
        window: function (obj, param1, param2) {
            if (arguments.length <= 2) {
                return obj.window(param1);
            }
            return obj.window(param1, param2)
        },

        openWindow: function (obj, title, href,width,height) {
            var param = {
                collapsible: false,
                minimizable: false,
                maximizable: false,
                inline: true,
                constrain: true,
                //zIndex : 9000,
                width : "100%",
                height: "100%",
                title: title,
                href: href
            };
            if(width){
                param.width = width
                param.onOpen = function () {
                    setTimeout(function () {
                        obj.find(".page-fm").addClass("page-fm-center");
                        console.log(obj.find(".page-fm").length);
                        obj.find(".fm-input").addClass("fm-input-center");
                        console.log(obj.find(".fm-input").length);
                        obj.find(".page-btn").addClass("page-btn-bottom");
                        console.log(obj.find(".page-btn").length);
                    },100);
                    obj.window('center');
                }
            }else {
                param.width = "100%";
                param.onOpen = function () {
                    setTimeout(function () {
                        obj.find(".page-fm").addClass("page-fm-top");
                        obj.find(".fm-input").addClass("fm-input-left");
                        obj.find(".page-btn").addClass("page-btn-top");
                    },100);
                    obj.window('maximize');
                }
            }
            if(height){
                param.height = height
            }else {
                param.height = "100%";
            }
            obj.window(param);
        },

        panel: function (obj, param) {
            return obj.panel(param)
        },

        /**
         * 确认框
         * @param title 标题
         * @param content 内容
         * @param fucn 回调函数，参数 r booolean
         * @returns {*|boolean}
         */
        confirm: function (title, content, fucn) {
            return $.messager.confirm(title, content, function (r) {
                return fucn(r);
            });
        },

        /** 弹窗alert */
        alert: function (title, msg, icon, fn) {
            $.messager.alert(title, msg, icon, fn);
        },
        alertInfo: function (msg) {
            $.messager.alert("提示", msg, "info");
        },
        alertWarn: function (msg) {
            $.messager.alert("警告", msg, "warning");
        },
        alertErr: function (msg) {
            $.messager.alert("错误", msg, "error");
        },

        /** 进度条 progress*/
        openProgress: function () {
            $.messager.progress({
                title: '请稍等',
                msg: '处理中...'
            });
        },
        closeProgress: function () {
            $.messager.progress('close');
        },

        /** 对话框 */
        openDialog: function (id, title) {
            $("#" + id).dialog("open").dialog("setTitle", title);
        },
        closeDialog: function (id) {
            $("#" + id).dialog("close");
        },

        /** 面板tab */
        /* 在当前页面添加面板 */
        addTab: function (title, url) {
            this.addTabByObj(self, title, url);
        },
        /* 在父页面添加面板 */
        addTabByParent: function (title, url) {
            this.addTabByObj(self.parent, title, url);
        },
        /* 在指定页面对象中添加面板 */
        addTabByObj: function (obj, title, url) {
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
        closeCurrTab: function () {
            var currentTab = $(tabId).tabs('getSelected');
            //var currentTabIndex = $(tabId).tabs('getTabIndex',currentTab);
            $(tabId).tabs('close', currentTab);
        },
        /* 关闭所有面板 */
        closeAllTab: function () {
            $(".tabs li").each(function (index, obj) {
                //获取所有可关闭的选项卡  
                var tab = $(".tabs-closable", this).text();
                $(tabId).tabs('close', tab);
            });
            $("#closeAllTab").remove();//同时把此按钮关闭  
        }
    }
})(jQuery);
