;
var system = (function ($) {
        var root = $("#contDiv"); // 下载使用的表单
        var exportFm = $("#exportFm"); // 下载使用的表单
        var inputSelector = "input[prop]";
        var btnSelector = "a[prop]";
        var labelPosition = "top"; // 输入框标签位置
        var labelWidth = 200; // 输入框标签长度
        var inputWidth = 260; // 输入框长度
        var btnWidth = 100; // 按钮长度
        var btnClass = "btn1 btn2"; // 按钮样式
        var dgOptBtnClass = 'dg-opt-btn'; // 表格操作按钮样式
        var imgType = ['image/jpg', 'image/bmp', 'image/jpeg', 'image/gif', 'image/png']; // 图片格式
        var dicts = {}; // 字典数据集合

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
                    defineSelect(obj, prop);
                } else if (type == "number") {
                    prop.min = 0;
                    prop.max = 999999999;
                    prop.precision = 2;
                    prop.groupSeparator = ',';
                    adminUI.numberbox(obj, prop);
                    //console.log(obj);
                    // 控制显示文本
                    obj.next("span").children("input").css("text-align", "right");
                } else if (type == "file") {
                    //prop.buttonText = prop.label.replace("：","");
                    adminUI.filebox(obj, prop);
                } else if (type == 'img') {
                    if (!prop.accept) {
                        prop.accept = imgType;
                    }
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
        function defineBtns(objs, fucnName) {
            var $ = jq;
            for (var i = 0; i < objs.length; i++) {
                var obj = $(objs[i]);
                //console.log(obj instanceof jQuery);
                var prop = toJson(obj.attr("prop"));
                delete prop.type; // 无关属性要清除，否则会有影响。
                //delete prop.event; // 无关属性要清除，否则会有影响。
                prop.width = btnWidth;
                // 1.给button去除连接功能
                obj.attr("href", "#");
                // 2.加上样式
                obj.addClass(btnClass);
                // 3.加上点击事件  eval(fucnName + "()");那就是调用该函数
                prop.onClick = eval(fucnName + "." + prop.event);
                //console.log(prop);
                // 初始化
                adminUI.button(obj, prop);
            }
        }

        /**
         * 定义选择框
         * @param obj
         * @param prop
         */
        function defineSelect(obj, prop) {
            prop.editable = false;
            prop.data = (dicts[prop.dict] == null ? [] : $.extend(true, [], dicts[prop.dict]));
            //console.log(prop.data);
            if (prop.prompt) {
                prop.data.unshift({
                    dictCode: "", dictDesc: prop.prompt
                });
            }

            // 默认选择第一个元素
            if (!prop.onLoadSuccess) {
                prop.onLoadSuccess = function () {
                    var data = adminUI.selectbox(obj, "getData");
                    (data != null && data.length > 0) ? adminUI.selectbox(obj, "setValue", data[0].dictCode) : "";
                }
            }

            prop.valueField = "dictCode"
            prop.textField = "dictDesc"
            adminUI.selectbox(obj, prop);
        }

        /**
         * 判断浏览器是否是IE浏览器
         */
        function isIE() {
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
                return true;
            }
            return false;
        }

        /**
         * 判断是否是Json对象
         * @param obj
         * @returns {boolean}
         */
        function isJson(obj) {
            var isJson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
            return isJson;
        }

        return {
            /**
             * 初始化页面变量
             * @param id 页面的id,唯一标识
             * @returns {{fucnName: string, root, dg: number | * | {}, window, get: get, getFucnAllName: getFucnAllName, init: {}, fucn: {}, action: string, data: {}}}
             */
            initPage: function (id) {
                // 添加子窗口Div
                if ($("#" + id + "Win").length <= 0) {
                    //alert("不存在");
                    root.append("<div id='" + id + "Win' class='page-win'></div>");
                }
                var page = {
                    id: id, // 页面唯一标识
                    fucnName: "page." + id + ".fucn", // 页面的函数名称
                    root: $("#" + id + "Div"), // 页面的根节点对象
                    fm: $("#" + id + "Div").find("#fm"), // 页面的表单对象
                    dg: $("#" + id + "Div").find("#dg"), // 页面的表格对象
                    window: $("#" + id + "Win"), // 页面的子窗口对象
                    init: {}, // 页面的初始化对象
                    fucn: {}, // 页面的函数对象
                    action: window.page.action, // 页面动作
                    param: $.extend({}, window.page.param), // 页面获取到的参数
                    data: {}, // 页面的数据
                    /**
                     * 在当前页面根据id获取对象
                     * @param id
                     * @returns {number | * | {}}
                     */
                    get: function (id) {
                        //console.log(this.name);
                        return this.root.find("#" + id);
                    },
                    /**
                     * 获取函数的全称，其中包括参数，比如：page.dict.fucn.add(param1,param2)
                     *
                     * @param fucnName 函数名称 add
                     * @param params 参数数组 [param1,param2]
                     * @returns {*} page.dict.fucn.add(param1,param2)
                     */
                    getFucnAllName: function (fucnName, params) {
                        return system.getFucnAllName(this.fucnName + "." + fucnName, params);
                    },
                };
                return page;
            },

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
            initBtn: function (scope, fucnName) {
                var objs = scope.find(btnSelector);
                //console.log(objs.length);
                defineBtns(objs, fucnName);
            },

            /**
             * 初始化选择框
             * @param obj 选择框对象
             * @param prop 属性
             */
            initSelect: function (obj, prop) {
                defineSelect(obj, prop);
            },

            /**
             * 失效输入框
             * @param scope
             */
            disableInput: function (scope) {
                scope.find(inputSelector).textbox('readonly', true);
            },

            /**
             * 隐藏按钮
             * @param scope
             */
            hideBtn: function (scope) {
                scope.find(btnSelector).hide();
            },

            /**
             * 获取表格操作按钮
             * @param title 显示内容
             * @param event 触发事件
             * @returns {string} <a href="#" title="修改" class="dg-opt-btn" onclick="page.dict.fucn.modify(1,'aa')"> 修改 </a>
             */
            getOptBtn: function (param) {
                // {title:"修改",event:""}
                if (!param || param.isShow == false) {
                    return "";
                }
                return "<a href='#' title='" + param.title + "' class='" + dgOptBtnClass + "' onclick='" + param.event + "'> " + param.title + " </a>";
            },
            /**
             * 获取函数全名称，比如 page.dict.fucn.add(index)
             * @param fucnName page.dict.fucn.add
             * @param params [1,'str']
             * @returns {*}
             */
            getFucnAllName: function (fucnName, params) {
                var fucnAllName = fucnName;
                if (!params) {
                    return fucnAllName + "()";
                }
                fucnAllName += "(";
                for (var i = 0; i < params.length; i++) {
                    var param = params[i];
                    if (isNaN(param)) {
                        param = "\"" + param + "\"";
                    }
                    if (i == params.length - 1) {
                        fucnAllName += param + ")";
                        continue;
                    }
                    fucnAllName += param + ",";
                }
                return fucnAllName;
            },
            /**
             * 获取某表格中的某一行
             * @param obj 表格对象
             * @param index 行索引
             * @returns {*}
             */
            getDgRow: function (obj, index) {
                var rows = adminUI.datagrid(obj, 'getRows');//获得所有行
                var row = rows[index];//根据index获得其中一行。
                return row
            },
            /**
             * 获取某表格中所有选中的行
             * @param obj
             * @returns {*}
             */
            getDgCheckedRow: function (obj) {
                var rows = adminUI.datagrid(obj, 'getChecked');//获得所有行
                return rows
            },
            /**
             * 设置字典集合
             */
            setDicts: function (url, param, success) {
                /* dicts = {
                     "GOODS_TYPE": [
                         {"dictCode": "CLOTHING", "dictDesc": "服装"},
                         {"dictCode": "FOOD", "dictDesc": "食品"},
                         {"dictCode": "HOUSEHOLD", "dictDesc": "家居用品"},
                         {"dictCode": "VEHICLE", "dictDesc": "交通工具"}
                     ]
                 }*/
                // 公用的字典
                dicts["TRUE_FALSE"] = [
                    {"dictCode": true, "dictDesc": "是"},
                    {"dictCode": false, "dictDesc": "否"}
                ];
                ajax.postJson(url, param, function (data) {
                    $.extend(dicts, data.data, true);
                    if(success){
                        success(data);
                    }
                    //console.log(dicts);
                });
            },
            /**
             * 获取字典描述
             * @param groupCode
             * @param dictCode
             */
            getDictDesc: function (groupCode, dictCode) {
                var dict = dicts[groupCode];
                if (!dict) {
                    return "";
                }
                for (var i = 0; i < dict.length; i++) {
                    if (dict[i].dictCode == dictCode) {
                        return dict[i].dictDesc;
                    }
                }
            },
            /**
             * 获取带参数的
             * @param url
             * @param param
             * @returns {*}
             */
            getUrlWithParam: function (url, param) {
                if (!param) {
                    return url;
                }
                var newUrl = url;
                var isFirstParm = true;
                for (f in param) {
                    var val = param[f];
                    if (val == null || val == "") {
                        continue;
                    }
                    if (isFirstParm) {
                        newUrl += "?" + f + "=" + val;
                        isFirstParm = false;
                    } else {
                        newUrl += "&" + f + "=" + val;
                    }
                }
                return newUrl;
            },
            /**
             * 下载文件
             * @param url
             * @param param
             */
            download: function (url, param) {
                url = encodeURI(system.getUrlWithParam(url, param));
                //console.log(url);
                exportFm.attr("action", url);
                exportFm.submit();
            },
            /**
             * 上传文件
             * @param url
             * @param param
             * @param success
             */
            upload: function (fm, url, param, success) {
                var options = {
                    type: "POST",
                    //target:     '#divToUpdate',
                    url: url,
                    data: param, // 除了表单，额外传送的数据
                    dataType: "json", // 返回数据的格式
                    resetForm: true, //  调用成功后，是否重置表单
                    // 成功回调函数
                    success: function (data) {
                        if (isIE() && !isJson()) {
                            data = JSON.parse(data);
                        }
                        if (data.code && data.code != '200') {
                            adminUI.alertErr(data.msg);
                            return false;
                        }
                        success(data);
                    }
                };
                fm.ajaxSubmit(options);
            }
        };
    }
)(jQuery);