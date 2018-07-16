;
var system = (function ($) {
        var inputSelector = "input[prop]";
        var btnSelector = "a[prop]";
        var labelPosition = "top"; // 输入框标签位置
        var labelWidth = 200; // 输入框标签长度
        var inputWidth = 260; // 输入框长度
        var btnWidth = 120; // 按钮长度
        var btnClass = "btn1 btn2"; // 按钮样式
        var dgOptBtnClass = 'dg-opt-btn'; // 表格操作按钮样式
        var dicts; // 字典数据集合

        /**
         * 自定义属性prop转成json对象
         * @param prop
         * @returns {*}
         */
        function toJson(prop) {
            if (!prop || prop == '') {
                return "{}";
            }
            prop = prop.replace(/:/g, "\":");
            prop = prop.replace(/;/g, ",\"");
            prop = prop.replace(/'/g, "\"");
            prop = "{\"" + prop + "}";
            try {
                prop = JSON.parse(prop);
            } catch (e) {
                console.log(e);
                prop = {};
            }
            return prop;
        }

        /**
         * 定义输入框集合
         * @param objs
         */
        function defineInputs(objs) {
            for (var i = 0; i < objs.length; i++) {
                var obj = $(objs[i]);
                var prop = toJson(obj.attr("prop"));
                var type = prop.type;
                delete prop.type; // 无关属性要清除，否则会有影响。
                //console.log(prop);
                if (!prop.labelWidth) {
                    prop.labelWidth = labelWidth;
                }
                if (!prop.labelPosition) {
                    prop.labelPosition = labelPosition;
                }
                if (!prop.width) {
                    prop.width = inputWidth;
                }
                //console.log(prop);
                if (type == "text") {
                    adminUI.textbox(obj, prop);
                } else if (type == "date") {
                    prop.editable = false;
                    //console.log(prop);
                    adminUI.datebox(obj, prop);
                } else if (type == 'datetime') {
                    prop.editable = false;
                    adminUI.datetimebox(obj, prop);
                } else if (type == "select") {
                    prop.editable = false;
                    adminUI.selectbox(obj, prop);
                } else if (type == "number") {
                    prop.min = 0;
                    prop.max = 999999999;
                    prop.precision = 2;
                    prop.groupSeparator = ',';
                    adminUI.numberbox(obj, prop);
                    //console.log(obj);
                    // 控制显示文本
                    obj.next("span").children("input").css("text-align","right");
                } else if(type == "file"){
                    //prop.buttonText = prop.label.replace("：","");
                    adminUI.filebox(obj, prop);
                } else {
                    adminUI.textbox(obj, prop);
                }
            }
        }

        /**
         * 定义按钮集合
         * @param objs
         */
        function defineBtns(objs) {
            var $ = jq;
            for (var i = 0; i < objs.length; i++) {
                var obj = $(objs[i]);
                //console.log(obj instanceof jQuery);
                var prop = toJson(obj.attr("prop"));
                delete prop.type; // 无关属性要清除，否则会有影响。
                //delete prop.event; // 无关属性要清除，否则会有影响。
                prop.width = btnWidth;
                // 1.给button去除连接功能
                obj.attr("href","#");
                // 2.加上样式
                obj.addClass(btnClass);
                // 初始化
                adminUI.button(obj,prop);
            }
        }

        return {

            /**
             * 初始化指定范围内的输入框
             * @param scope
             */
            initInput: function (scope) {
                //console.log(fm);
                var objs = scope.find(inputSelector);
                defineInputs(objs);
            },

            /**
             * 初始化指定范围内的按钮
             * @param scope
             */
            initBtn: function (scope) {
                var objs = scope.find(btnSelector);
                defineBtns(objs);
            },

            /**
             * 获取表格操作按钮
             * @param title 显示内容
             * @param event 触发事件
             * @returns {string}
             */
            getOptBtn:function (param) {
                // {title:"修改",event:""}
                if(!param || !param.isShow){
                    return "";
                }
                return "<a href='#' title='" + param.title + "' class='" + dgOptBtnClass + "' onclick='" + param.event + "'> " + param.title + " </a>";
            },
            getFucnAllName : function (fucnName,params) {
                var fucnAllName = fucnName;
                if(!params) {
                    return fucnAllName + "()";
                }
                fucnAllName += "(";
                for(var i=0; i<params.length; i++){
                    var param = params[i];
                    if(isNaN(param)){
                        param = "\"" + param + "\"";
                    }
                    if(i==params.length -1) {
                        fucnAllName += param + ")";
                        continue;
                    }
                    fucnAllName += param + ",";
                }
                return fucnAllName;
            }
        }
    }
)(jQuery);