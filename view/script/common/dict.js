;
page.dict = system.initPage("dict");
page.dict.init = {
    initPage: function () {
        var page = window.page.dict; // window 一定要加上，否则全局的page变量不是页面定义那一个
        this.initForm(page);
        this.initDg(page);
    },

    initForm: function (page) {
        system.initInput(page.fm);
        system.initBtn(page.root.find(".page-btn"),page.fucnName);
    },

    initDg: function (page) {
        adminUI.datagrid(page.dg, {
            url : '/dict/dict/queryPage',
            queryParams: {sortColumns: "id desc,cre_time desc"},
            columns: [[
                {field: 'ck', checkbox: true, width: 50},
                {field: 'id', title: '主键', width: 10, hidden: 'true'},
                {field: 'groupCode', title: '字典组编号', width: 100},
                {field: 'dictCode', title: '字典编号', width: 100},
                {field: 'sysCode', title: '系统编码', width: 100},
                {field: 'groupDesc', title: '字典组描述', width: 100},
                {field: 'dictDesc', title: '字典描述', width: 100},
                {field: 'dictOrder', title: '顺序', width: 100,
                    formatter: function (value, row, index) {
                        return numUtil.toThousands(value);
                    }
                },
                {field: 'isUse', title: '是否使用', width: 100},
                {field: 'creUser', title: '创建用户', width: 100},
                {field: 'creTime', title: '创建时间', width: 150},
                {field: 'mdfUser', title: '修改用户', width: 100},
                {field: 'mdfTime', title: '修改时间', width: 150},
                {field: 'oper', title: '操作', width: 400,
                    formatter: function (value, row, index) {
                        return system.getOptBtn({title: "修改", event: page.getFucnAllName("modify", [index])})
                            + system.getOptBtn({title: "详情", event: page.getFucnAllName("detail",[index])})
                            + system.getOptBtn({title: "删除", event: page.getFucnAllName("remove",[index])});
                    }
                }
            ]],
            onLoadSuccess: function (data) {
                console.log("加载成功");
            }

        });

    }
}

page.dict.fucn = {
    query : function () {
        var page = window.page.dict;
        if(!adminUI.validateForm(page.fm)){
            return false;
        }
        var param = page.fm.serializeObject();
        adminUI.reloadDg(page.dg, param);
    },
    reset : function () {
        var page = window.page.dict;
        adminUI.clearForm(page.fm);
    },
    export : function () {
        var page = window.page.dict;
        if(!adminUI.validateForm(page.fm)){
            return false;
        }
        var url = "/dict/export";
        var param = {
            sortColumns: "id desc,cre_time desc",
            downloadName : '字典列表'
        };
        param = jq.extend(param, page.fm.serializeObject());
        system.download(url,param);
    },
    add: function () {
        var page = window.page.dict;
        window.page.action = "add";
        adminUI.openWindow(page,"字典新增", "page/common/dict_detail.html");
    },
    modify : function (index) {
        var page = window.page.dict;
        var row = system.getDgRow(page.dg,index);
        window.page.action = "modify";
        window.page.param = row;
        adminUI.openWindow(page,"字典修改", "page/common/dict_detail.html");
    },
    detail : function (index) {
        var page = window.page.dict;
        var row = system.getDgRow(page.dg,index);
        window.page.action = "detail";
        window.page.param = row;
        adminUI.openWindow(page,"字典详情","page/common/dict_detail.html");
    },
    remove: function (index) {
        var page = window.page.dict;
        var row = system.getDgRow(page.dg, index);
        if(!row){
            adminUI.alertInfo("请选择要删除的数据！");
            return false;
        }
        // 构造请求参数
        var param = {
            ids:[row.id]
        };
        adminUI.confirm("删除字典","确认删除字典?",function (r) {
            if(!r){
                return false;
            }
            ajax.postJson("/dict/dict/remove",param,function () {
                adminUI.alertInfo("删除成功");
                adminUI.reloadDg(page.dg);
            })
        })
    },
    removeChecked: function (index) {
        var page = window.page.dict;
        var rows = system.getDgCheckedRow(page.dg);
        if(!rows || rows.length==0){
            adminUI.alertInfo("请选择要删除的数据！");
            return false;
        }
        // 构造请求参数
        var param = {
            ids:[]
        };
        jq.each(rows,function (i,n) {
            param.ids.push(n.id);
        });
        adminUI.confirm("删除字典","确认删除字典?",function (r) {
            if(!r){
                return false;
            }
            ajax.postJson("/dict/dict/remove",param,function () {
                adminUI.alertInfo("删除成功");
                adminUI.reloadDg(page.dg);
            })
        })
    }

};

jq(document).ready(function () {
    page.dict.init.initPage();
});

