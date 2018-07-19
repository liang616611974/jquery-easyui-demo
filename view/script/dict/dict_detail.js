;
page.id = "dictDetail"
page.dictDetail = {
    //id:"dictDetail"
};
page.dictDetail.init = {
    initPage: function () {
        var that = page.dictDetail.fucn;
        this.initForm(that);
        //this.initDg(that);
    },

    initForm: function (that, action, obj) {
        system.initInput(that.get("queryFm"));
        system.initBtn(that.root.find(".btn-nav-right"),that.name);
        //adminUI.button(that.root.find(".btn-nav-right").find("a[prop]"));
        adminUI.datebox(that.get("date"), "setValue", "2017-07-07");
    },

    initDg: function (that, action, obj) {
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
        adminUI.datagrid(that.dg, {
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
                        return system.getOptBtn({title: "修改", isShow: true, event: that.getFucnAllName("add", [1, "aa"])})
                            + system.getOptBtn({title: "详情", isShow: true, event: that.getFucnAllName("detail",[row.id])})
                            + system.getOptBtn({title: "删除", isShow: false, event: that.getFucnAllName("delete")});
                    },}
            ]],
            onLoadSuccess: function (data) {

            },
        });

    }
}

page.dictDetail.fucn = {
    name: "page." + page.id + ".fucn",
    root: jq("#" + page.id + "Div"),
    dg: jq("#" + page.id + "Div").find("#dg"),
    window : jq("#" + page.id + "Win"),
    get: function (id) {
        //console.log(this.name);
        return this.root.find("#" + id);
    },
    getFucnAllName: function (fucnName, params) {
        return system.getFucnAllName(this.name + "." + fucnName, params);
    },
    query : function () {
        alert("查询详情");
    },
    reset : function () {
        alert("重置详情");
    },
    add: function (p1, p2) {
        adminUI.alertInfo("新增成功" + p1 + p2);
    },
    detail : function (id) {
        adminUI.window(this.get("dictWin"),function () {
            
        })
    },
    delete: function () {
        adminUI.alertInfo("删除成功");
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
    page.dictDetail.init.initPage();
});

