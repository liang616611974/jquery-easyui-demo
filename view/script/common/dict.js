;
;
page.dict = system.initPage("dict");
page.dict.init = {
    initPage: function () {
        var page = window.page.dict; // window 一定要加上，否则全局的page变量不是页面定义那一个
        var fucn = window.page.dict.fucn;
        this.initForm(page, fucn);
        this.initDg(page, fucn);
    },

    initForm: function (page, fucn) {
        system.initInput(page.fm);
        system.initBtn(page.root.find(".page-btn"), page.fucnName);
        //adminUI.datebox(page.get("date"), "setValue", "2017-07-07");
    },

    initDg: function (page, fucn) {
        adminUI.datagrid(page.dg, {
            toolbar: '.dg-toolbar',
            //title : "字典列表",
            rownumbers: true,
            //fit:true,
            url: '/dict/queryPage',
            //data: data,
            queryParams: {sysCode: "SCD", "sortColumns": "id,cre_time desc"},
            pagination: true,
            columns: [[
                {field: 'ck', checkbox: true, width: 50},
                {field: 'id', title: '主键', width: 10, hidden: 'true'},
                {field: 'groupCode', title: '字典组编号', width: 200},
                {field: 'dictCode', title: '字典编号', width: 200},
                {field: 'sysCode', title: '系统编码', width: 200},
                {field: 'groupDesc', title: '字典组描述', width: 200},
                {field: 'dictDesc', title: '字典描述', width: 200},
                {field: 'dictOrder', title: '顺序', width: 100},
                {field: 'isUse', title: '是否使用', width: 200},
                {field: 'creUser', title: '创建用户', width: 200},
                {field: 'creTime', title: '创建时间', width: 200},
                {field: 'mdfUser', title: '修改用户', width: 200},
                {field: 'mdfTime', title: '修改时间', width: 200},
                {
                    field: 'oper', title: '操作', width: 800, formatter: function (value, row, index) {
                        return system.getOptBtn({title: "修改", isShow: true, event: page.getFucnAllName("modify", [1, "aa"])})
                            + system.getOptBtn({title: "详情", isShow: true, event: page.getFucnAllName("detail", [index])})
                            + system.getOptBtn({title: "删除", isShow: true, event: page.getFucnAllName("delete")});
                    },
                }
            ]],
            onLoadSuccess: function (data) {
                console.log("加载成功");
            }

        });

    }
}

page.dict.fucn = {
    query: function () {
        var page = window.page.dict;
        var param = page.fm.serializeObject();
        console.log(param);
        adminUI.datagrid('reload', param);
    }
    ,
    reset: function () {
        alert("重置111");
    },
    add: function (p1, p2) {
        var page = window.page.dict;
        page.action = "add";
        adminUI.openWindow(page,"新增字典", "page/common/dict_detail.html");
    },
    modify: function (index) {
        var page = window.page.dict;
        var row = system.getDgRow(page.dg, index);
        page.action = "modify";
        adminUI.openWindow(page,"修改字典", "page/common/dict_detail.html");
    },
    detail: function (index) {
        var page = window.page.dict;
        var row = system.getDgRow(page.dg, index);
        page.action = "detail";
        adminUI.openWindow(page, "字典详情--" + row.name, "page/common/dict_detail.html");
    },
    delete: function () {
        adminUI.confirm("删除字典", "确认删除字典?", function (r) {
            if (r) {
                alert("删除成功");
            } else {
                alert("考虑考虑")
            }
        })
    }
};

jq(document).ready(function () {
    page.dict.init.initPage();
});

