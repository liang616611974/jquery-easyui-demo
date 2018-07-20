;
;
page.dict = system.initPage("dict");
page.dict.init = {
    initPage: function () {
        var page = window.page.dict; // window 一定要加上，否则全局的page变量不是页面定义那一个
        var fucn = window.page.dict.fucn;
        this.initForm(page,fucn);
        this.initDg(page,fucn);
    },

    initForm: function (page,fucn) {
        system.initInput(page.get("queryFm"));
        system.initBtn(page.root.find(".btn-nav-right"),page.fucnName);
        //adminUI.button(that.root.find(".btn-nav-right").find("a[prop]"));
        adminUI.datebox(page.get("date"), "setValue", "2017-07-07");
    },

    initDg: function (page,fucn) {
        var data = [{id: 1, name: "张三", date: '2018-01-01', type: "男", amount: '1000'},
            {id: 2, name: "李四", date: '2018-02-01', type: "男", amount: '2000'},
            {id: 3, name: "王五", date: '2018-03-01', type: "男", amount: '3000'},
            {id: 4, name: "小三", date: '2018-04-01', type: "女", amount: '4000'},
            {id: 4, name: "小三", date: '2018-04-01', type: "女", amount: '4000'},
            {id: 4, name: "小三", date: '2018-04-01', type: "女", amount: '4000'},
            {id: 4, name: "小三", date: '2018-04-01', type: "女", amount: '4000'},
            {id: 4, name: "小三", date: '2018-04-01', type: "女", amount: '4000'},
            {id: 4, name: "小三", date: '2018-04-01', type: "女", amount: '4000'},
            {id: 4, name: "小三", date: '2018-04-01', type: "女", amount: '4000'},
            {id: 4, name: "小三", date: '2018-04-01', type: "女", amount: '4000'},
            {id: 5, name: "小四", date: '2018-05-01', type: "女", amount: '5000'}
        ];
        adminUI.datagrid(page.dg, {
            toolbar: '.dg-toolbar',
            //title : "字典列表",
            rownumbers: true,
            //fit:true,
            //url : '/dict/dict/query',
            data: data,
            queryParams: {},
            pagination: true,
            columns: [[
                {field: 'ck', checkbox: true, width: 50},
                {field: 'id', title: '主键', width: 10, hidden: 'true'},
                {field: 'name', title: '姓名', width: 200},
                {field: 'date', title: '日期', width: 200},
                {field: 'type', title: '类型', width: 100},
                {field: 'amount', title: '金额', width: 200},
                {field: 'oper', title: '操作', width: 800, formatter: function (value, row, index) {
                        return system.getOptBtn({title: "修改", isShow: true, event: page.getFucnAllName("modify", [1, "aa"])})
                            + system.getOptBtn({title: "详情", isShow: true, event: page.getFucnAllName("detail",[index])})
                            + system.getOptBtn({title: "删除", isShow: true, event: page.getFucnAllName("delete")});
                    },}
            ]],
            onLoadSuccess: function (data) {
                /*var h1 = that.root.outerHeight(true);
                var h2 = that.get("fmBtnDiv").outerHeight(true);
                var h3 = that.get("dgDiv").height(h1 - h2 - 240);
                var h4 = that.root.find(".datagrid-view .datagrid-body").height(h1 - h2 - 240);
                h3 =  that.get("dgDiv").height();
                h4 =  that.get("dgDiv .datagrid-view").height();
                console.log(h1);
                console.log(h2);
                console.log(h3);
                console.log(h4);
                adminUI.datagrid(that.dg,"resize");*/

                //that.get("dgDiv").find(".dg-contain .datagrid-body").css("height",   "400px");

                /* alert("aaa");
                 that.get("dgDiv").find(".panel").find(".datagrid-wrap").css("height", "400px");*/
                /*setTimeout(function () {
                    var h1 = that.root.outerHeight(true);
                    var h2 = that.get("fmBtnDiv").outerHeight(true);
                    //that.get("dgDiv").height(h1 - h2 - 40);
                    //that.get("dgDiv .datagrid-view").height(h1 - h2 - 40);
                    that.get("dgDiv").find(".datagrid-view").css("height", (h1 - h2 - 95) + "px");
                    console.log(jq("#dgDiv").find(".datagrid-view").height());
                    that.get("dgDiv").find(".datagrid-body").css("height",  (h1 - h2 - 135) + "px");
                }, 1000);*/
            },
            /*view : {
                onAfterRender : function () {
                    var h1 = that.root.outerHeight(true);
                    var h2 = that.get("fmBtnDiv").outerHeight(true);
                    //that.get("dgDiv").height(h1 - h2 - 40);
                    //that.get("dgDiv .datagrid-view").height(h1 - h2 - 40);
                    that.get("dgDiv").find(".datagrid-view").css("height", (h1 - h2 - 95) + "px");
                    console.log(jq("#dgDiv").find(".datagrid-view").height());
                    that.get("dgDiv").find(".datagrid-body").css("height",  (h1 - h2 - 135) + "px");
                }
            }*/
            /* onResizeColumn :function () {
                 var h1 = that.root.outerHeight(true);
                 var h2 = that.get("fmBtnDiv").outerHeight(true);
                 //that.get("dgDiv").height(h1 - h2 - 40);
                 //that.get("dgDiv .datagrid-view").height(h1 - h2 - 40);
                 that.get("dgDiv").find(".datagrid-view").css("height", (h1 - h2 - 95) + "px");
                 console.log(jq("#dgDiv").find(".datagrid-view").height());
                 that.get("dgDiv").find(".datagrid-body").css("height",  (h1 - h2 - 135) + "px");
             }*/
        });


        //that.get("dgDiv").find(".panel").find(".datagrid-wrap").css("height", "400px");
        //that.root.find(".dg-contain").height(400);
        /* var h1 = that.root.outerHeight(true);
         var h2 = that.get("fmBtnDiv").outerHeight(true);
         var h3 = that.get("dgDiv").height(h1 - h2 - 140);
         var h4 = that.get("dgDiv .datagrid-view").height(h1 - h2 - 140);
         h3 =  that.get("dgDiv").height();
         h4 =  that.get("dgDiv .datagrid-view").height();
         console.log(h1);
         console.log(h2);
         console.log(h3);
         console.log(h4);
         adminUI.datagrid(that.dg,"resize");*/
    }
}

page.dict.fucn = {
    query : function () {
        alert("查询");
    },
    reset : function () {
        alert("重置");
    },
    add: function (p1, p2) {
        var page = window.page.dict;
        page.action = "add";
        adminUI.openWindow(page.window,"新增字典", "page/dict/dict_detail.html");
    },
    modify : function (index) {
        var page = window.page.dict;
        var row = system.getDgRow(page.dg,index);
        page.action = "modify";
        adminUI.openWindow(page.window,"修改字典", "page/dict/dict_detail.html");
    },
    detail : function (index) {
        var page = window.page.dict;
        var row = system.getDgRow(page.dg,index);
        page.action = "detail";
        adminUI.openWindow(page.window,"字典详情--" + row.name, "page/dict/dict_detail.html");
    },
    delete: function () {
        adminUI.confirm("删除字典","确认删除字典?",function (r) {
            if(r){
                alert("删除成功");
            }else {
                alert("考虑考虑")
            }
        })
    }
};

/*function toJsonStr(prop) {
    if(!prop || prop == '') {
        return "{}";
    }
    prop = prop.replace(/:/g,"\":");
    prop = prop.replace(/;/g,",\"");
    prop = prop.replace(/'/g,"\"");
    prop = "{\"" + prop + "}";
    return prop;
}*/

jq(document).ready(function () {
    page.dict.init.initPage();
});

