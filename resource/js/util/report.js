;
var tableResize = {};
var reportTable = (function () {
    var thMargin = 0;
    var thHeight = 50;
    var rowHeight = 45;

    /**
     * 获取对象属性字段个数
     */
    function getObjFiledCount(obj) {
        var count = 0;
        for (f in obj) {
            count++;
        }
        return count;
    }

    return {
        /**
         * 初始化表格样式
         */
        initTableStyle: function (data, cloumnWidth, frozenLen) {
            //  设置reptParentDiv样式，在屏幕里100%显示
            $("#outDiv").css({width: "100%", height: "100%", overflow: "auto"});

            // 设置reptParentDiv宽度高度
            var width;
            var table = this.getTable(data, cloumnWidth, frozenLen);
            if (table.width > $("#outDiv").width()) {
                width = $("#outDiv").width() - 60;
            } else {
                width = table.width;
            }
            tableResize.width = table.width;
            //tableResize.height = table.height;
            // $("#reptParentDiv").css({width: width, height: table.height});
            $.lrisk.css.DgheightRelize(null, null, "rptDg");
            $(".rptDg").css({width: width});
        },
        /**
         * 获取表格属性
         * @param data 表数据
         * @param fieldWidth 字段宽度
         * @returns {{}}
         */
        getTable: function (data, fieldWidth, frozenLen) {
            if (!fieldWidth) {
                fieldWidth = 200;
            }
            var table = {};
            // 1.设置表格的样式
            var n = getObjFiledCount(data.headers[data.headers.length - 1]);
            //var width = n * fieldWidth + (frozenLen * frozenWidth ) - 200 + thMargin;
            var width = n * fieldWidth + thMargin;
            //var height = data.headers.length * thHeight + data.rows.length * rowHeight + thMargin;
            table.width = width;
            //table.height = height;
            tableResize.width = table.width;
            tableResize.height = table.height;
            return table;
        },

        /**
         * 初始化表格
         * @param obj 参数对象
         */
        initDg: function (obj) {
            this.initDgByParams(obj.dg, obj.data, obj.cloumnWidth, obj.frozenCloumnNames, obj.frozenCloumnWidths, obj.mergeColumnNames, obj.rowStyler);
        },

        /**
         * 初始化表格
         * @param dg dataGrid对象
         * @param data 表数据
         * @param cloumnWidth 普通列宽
         * @param frozenCloumnNames 冻结列
         * @param frozenCloumnWidths 冻结列宽度
         * @param mergeColumnNames 合并名称列
         * @param rowStyler 行样式
         */
        initDgByParams: function (dg, data, cloumnWidth, frozenCloumnNames, frozenCloumnWidths, mergeColumnNames, rowStyler) {

            this.initTableStyle(data, cloumnWidth, frozenCloumnNames.length);

            // 2.构造列
            //var columnsResult  =  createColumns(data.headers);
            var columns = this.createColumns(data.headers, frozenCloumnNames, cloumnWidth);

            var frozenColumns = this.createFrozenColumns(data.headers, frozenCloumnNames, frozenCloumnWidths);
            //alert(JSON.stringify(frozenColumns));

            // 3.初始化dg
            //defineDg(columns, frozenColumns, data.rows);
            this.defineDg(dg, data.rows, frozenColumns, columns, mergeColumnNames, rowStyler);

            // 4.格式化表头
            this.formatDg(data);

        },
        /**
         * 定义表格
         * @param dg 表格对象
         * @param data 表格数据
         * @param frozenColumns 冻结列
         * @param columns 普通列
         * @param mergeColumnNames 合并名称列
         * @param rowStyler 行样式
         * @param onLoadSuccess 加载成功回调函数
         */
        defineDg: function (dg, data, frozenColumns, columns, mergeColumnNames, rowStyler, onLoadSuccess) {
            dg.datagrid({
                //url: "/management/bankLoanItems",
                method: 'get',
                //pageNumber: 1,
                //pageSize: 20,
                idField: "id",
                autoRowHeight: true,
                loadMsg: '数据加载中,请稍后……',
                striped: true,
                fit: true,
                fitColumns: false,
                singleSelect: true,
                rownumbers: false,
                pagination: false,
                frozenColumns: frozenColumns,
                columns: columns,
                data: data,
                onLoadSuccess: function () {
                    window.reportTable.createMergesColumns(dg, data, mergeColumnNames); // 合并同列中相同名称的单元格
                    if (!onLoadSuccess) {
                        return;
                    }
                    ;
                    return onLoadSuccess();
                },
                rowStyler: function (index, row) {
                    if (!rowStyler) {
                        return;
                    }
                    return rowStyler(index, row);
                }
            });
        },

        /**
         * 创建冻结列
         * @param headers 表头数组
         * @param includeColumnNames 包含的表头名称
         * @param fieldWidths 表头字段宽度
         * @returns {Array}
         */
        createFrozenColumns: function (headers, includeColumnNames, fieldWidths) {
            var columns = []; // 列集合
            for (var i = 0; i < headers.length; i++) {
                var column = [];// 列对象
                var obj = headers[i]; // 头对象
                for (f in obj) {
                    if (includeColumnNames && (!includeColumnNames.contains(f))) {
                        continue;
                    }
                    var fWidth = fieldWidths ? fieldWidths[includeColumnNames.indexOf(f)] : 200;
                    var col = {field: f, title: obj[f], width: fWidth, align: 'center'};
                    column.push(col);
                }
                columns.push(column);
            }
            return columns;
        },

        /**
         * 创建列
         * @param headers 表头数组
         * @param noIncludeColumnNames 排除的表头
         * @param fieldWidth 字段宽度
         * @param formatter 列格式化函数
         * @param styler 表格格式化函数
         * @returns {Array}
         */
        createColumns: function (headers, noIncludeColumnNames, fieldWidth, formatter, styler) {
            if (!fieldWidth) {
                fieldWidth = 200;
            }
            var columns = []; // 列集合
            for (var i = 0; i < headers.length; i++) {
                var column = [];// 列对象
                var obj = headers[i]; // 头对象
                for (f in obj) {
                    if (noIncludeColumnNames && noIncludeColumnNames.contains(f)) {
                        continue;
                    }
                    var col = {field: f, title: obj[f], width: fieldWidth, align: 'center'};
                    if (f == "projectId" || f == "branchId") {
                        col.hidden = "true";
                    }
                    // 格式化表格内容
                    if (formatter) {
                        col.formatter = formatter;
                    } else {
                        col.formatter = function (val, row) {
                            return window.reportTable.formatVal(val);
                        }
                    }
                    if (styler) {
                        col.styler = styler;
                    } else {
                        // 添加表格背景色
                        col.styler = function (value, row, index) {
                            return;// 原来的行色
                        }
                    }
                    column.push(col);
                }
                columns.push(column);
            }
            //alert(JSON.stringify(columns));
            return columns;
        }
        ,

        /**
         * 格式化表格数值
         * @param val 值
         * @returns {*}
         */
        formatVal: function (val) {
            // 过滤非数值字段
            if (val == "" || isNaN(val)) {
                return val;
            }
            /* // 转换成万元/亿元单位
             if (unit == "亿元") {
                 val = (parseFloat(val) / 10000 / 10000).toFixed(2);
             } else {
                 val = (parseFloat(val) / 10000).toFixed(2);
             }*/
            val = toThousands(val);// 千分符格式化
            // 如果值为负数
            if (val.indexOf("-") == 0) {
                return "<span style='color: red;'>(" + val.substr(1) + ")</span>";
            }
            return val;
        }
        ,
        /**
         * 创建合并单元格数组
         * @param rows 行数组对象
         * @param fName 合并的字段名称
         * @returns {{}}
         */
        createMerges: function (rows, fName) {
            var mergeCol = {};
            var merges = [];
            // 定义merge
            var merge = {};
            merge.index = 0;
            merge.rowspan = 1;
            for (var i = 0; i < rows.length; i++) {
                //alert( i + " " + JSON.stringify(rows[i].branchName));
                // 最后一个
                if (i == rows.length - 1) {
                    if (rows[i][fName] == rows[i - 1][fName]) {
                        merges.push(merge);
                    } else {
                        merges.push({index: i, rowspan: 1});
                    }
                    break;
                }
                if (rows[i + 1][fName] == rows[i][fName]) {
                    merge.rowspan += 1;
                    continue;
                }
                merges.push(merge);
                merge = {index: i + 1, rowspan: 1};
            }
            mergeCol.field = fName;
            mergeCol.merges = merges;
            return mergeCol;
        }
        ,
        /**
         * 创建合并列
         * @param dg dg对象
         * @param mergeColumns 合并列数组
         */
        createMergesColumns: function (dg, rows, mergeColumnNames) {
            if (!mergeColumnNames) {
                return;
            }
            var mergeColumns = [];
            for (var i = 0; i < mergeColumnNames.length; i++) {
                var mergeCol = this.createMerges(rows, mergeColumnNames[i]);
                mergeColumns.push(mergeCol);
            }
            for (var i = 0; i < mergeColumns.length; i++) {
                for (var j = 0; j < mergeColumns[i].merges.length; j++) {
                    dg.datagrid('mergeCells', {
                        index: mergeColumns[i].merges[j].index,
                        field: mergeColumns[i].field,
                        rowspan: mergeColumns[i].merges[j].rowspan
                    });
                }
            }
        }
        ,
        /**
         * 格式化表头
         */
        formatDg: function (data) {
            //$("#reptParentDiv").css("width", "auto");
            $("#outDiv").scrollTop(0).animate({
                scrollTop: $("#reptDiv").offset().top - 20
            }, 100);
            // 设置表格body行高
            var panel = dg.datagrid("getPanel");
            var tr2 = panel.find("div.datagrid-view2 .datagrid-body tr");
            var tr1 = panel.find("div.datagrid-view1 .datagrid-body tr");
            tr1.each(function () {
                $(this).css({"height": 45});
            });
            tr2.each(function () {
                $(this).css({"height": 45});
            });
            // 格式化表头
            //  整个表格第一行（日期）的颜色
            $("#reptDiv .datagrid-header-row").eq(0).css("background-color", "#dadada"); // 灰色
            $("#reptDiv .datagrid-header-row").eq(2).css("background-color", "#dadada"); // 灰色
            //  整个表格第二行（天数）的颜色
            $("#reptDiv .datagrid-header-row").eq(1).css("background-color", "white");
            $("#reptDiv .datagrid-header-row").eq(3).css("background-color", "white");
            //  整个表格第二行（天数）的字体颜色
            $("#reptDiv .datagrid-header-row").eq(1).find(".datagrid-cell span").css("color", "black");
            $("#reptDiv .datagrid-header-row").eq(3).find(".datagrid-cell span").css("color", "black");

            // 给表格加上阴影
            if ($(".rptDg").length != 0) {
                $(".rptDg").addClass("report-shadow");
            } else if ($(".comDg").length != 0) {
                $(".comDg").addClass("report-shadow");
            }
        }
    }
})();

var reportChart = (function () {
    return {
        /**
         * 初始化条形图
         * @param data
         * @returns {*}
         */
        initLine: function (data) {
            var line = null;
            var unit = $("#unitCombo").combobox("getText");
            $("#cashFlowChart").css({"width": $("#echartsDiv").width()}, {"height": $("#echartsDiv").height() - 60});
            // 基于准备好的dom，初始化echarts实例#0098d9#c12e34#2b821d#aaaaaa
            line = echarts.init(document.getElementById('cashFlowChart'), 'shine');
            line.showLoading({text: '加载中...', maskColor: 'rgba(255, 255, 255, 0.6)'});
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: ''
                },
                grid:{
                  x:200
                },
                tooltip: {},
                legend: {
                    data: data.legend
                },
                xAxis: {
                    data: data.xaxis,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#333',
                            width: 0
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#333"
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: unit,
                    /* min: -3000,
                     max: 5000,
                     interval: 1000,*/
                    axisLabel: {
                        formatter: function (value) {
                            return toThousands(value.toString());
                        },
                        textStyle: {
                            color: "#333"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['#fff', new echarts.graphic.LinearGradient(
                                0, 0, 1, 0,
                                [
                                    {offset: 0, color: '#f4f4f4'},
                                    {offset: 1, color: "#f7f7f7"}
                                ]
                            )]
                        }
                    },
                    splitLine: {
                        // lineStyle:{
                        //     color:['#ddd']
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#333',
                            width: 0
                        }
                    }
                },
                series: [{
                    name: '现金流入',
                    type: 'bar',
                    data: data.series[0].data,
                    itemStyle: {
                        "normal": {
                            // "barBorderWidth": 0,
                            // "barBorderColor": "#ccc"
                            barBorderRadius: [3, 3, 0, 0],
                            color: new echarts.graphic.LinearGradient(
                                0, 1, 0, 0,
                                [
                                    {offset: 0, color: '#0396ff'},
                                    {offset: 1, color: "#abdcff"}
                                ]
                            )
                        },
                        "emphasis": {
                            // "barBorderWidth": 0,
                            // "barBorderColor": "#ccc"
                            barBorderRadius: 2
                        }
                    }
                }, {
                    name: '现金流出',
                    type: 'bar',
                    data: data.series[1].data,
                    itemStyle: {
                        "normal": {
                            barBorderWidth: 0,
                            // "barBorderColor": "#ccc"
                            barBorderRadius: [3, 3, 0, 0],
                            color: new echarts.graphic.LinearGradient(
                                0, 1, 0, 0,
                                [
                                    {offset: 0, color: '#ea5455'},
                                    {offset: 1, color: "#feb692"}
                                ]
                            )
                        },
                        "emphasis": {
                            // "barBorderWidth": 0,
                            // "barBorderColor": "#ccc"
                            barBorderRadius: 2
                        }
                    }
                }, {
                    name: '累计缺口',
                    type: 'line',
                    data: data.series[2].data,
                    itemStyle: {
                        "normal": {
                            // "barBorderWidth": 0,
                            // "barBorderColor": "#ccc"
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 1, 0,
                                [
                                    {offset: 0, color: '#28c76f'},
                                    {offset: 1, color: "#81fbb8"}
                                ]
                            )
                        },
                        "emphasis": {
                            // "barBorderWidth": 0,
                            // "barBorderColor": "#ccc"
                        }
                    }
                }, {
                    name: '经缓释的累计缺口',
                    type: 'line',
                    data: data.series[3].data,
                    itemStyle: {
                        "normal": {
                            // "barBorderWidth": 0,
                            // "barBorderColor": "#ccc"
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 1, 0,
                                [
                                    {offset: 0, color: '#6d6e6d'},
                                    {offset: 1, color: "#eaeae9"}
                                ]
                            )
                        },
                        "emphasis": {
                            // "barBorderWidth": 0,
                            // "barBorderColor": "#ccc"
                        }
                    }
                }]
            };

            if (checkBrower().ie < 9) {
                option.series[0].itemStyle.normal.color = "#0396ff";
                option.series[1].itemStyle.normal.color = "#ea5455";
                option.series[2].itemStyle.normal.color = "#28c76f";
                option.series[3].itemStyle.normal.color = "#6d6e6d";
            }
            // 使用刚指定的配置项和数据显示图表。
            line.setOption(option);
            line.hideLoading();
            return line;
        }
    }
})();

/**
 * 调整浏览器窗口大小
 */
// function onresize() {
//     setTimeout(function () {
//       /*  if ($("#listDivForReport").length != 0) {
//             $(".comDg").css("width", $("#outDiv").width() - 60);
//             $("#reptDiv #dg").datagrid('resize', {
//                 width: $(".comDg").width()
//             })
//         }
//         ;*/
//         if (!typeof line =="undefined") {
//             $("#cashFlowChart").css({"width": $("#echartsDiv").width() - 20}, {"height": $("#echartsDiv").height() - 60});
//             line.resize();
//         }
//     }, 150);
// }


/**
 * 是否中文编号
 * @param data
 * @returns {boolean}
 */
function isChineseOrder(data) {
    var keys = ["一", "二", "三", "四", "五", "六", "七"];
    for (var i = 0; i < keys.length; i++) {
        if (data == keys[i]) {
            return true;
        }
    }
    return false;
}

