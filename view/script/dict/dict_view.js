;
page.dictView = system.initPage("dictView");
page.dictView.init = {
    initPage: function () {
        var page = window.page.dictView; // window 一定要加上，否则全局的page变量不是页面定义那一个
        var fucn = window.page.dictView.fucn;
        this.initForm(page, fucn);
    },

    initForm: function (page, fucn) {
        system.initInput(page.get("queryFm"));
        system.initBtn(page.root.find(".btn-nav-right"), page.fucnName);
        adminUI.datebox(page.get("date"), "setValue", "2017-07-07");
    },

}

page.dictView.fucn = {
    query: function () {
        alert("查询视图");
    },
    reset: function () {
        alert("重置视图");
    },
    add: function (p1, p2) {
        var page = window.page.dict;
        var row = system.getDgRow(page.dg, index)
        //console.log(row);
        adminUI.openWindow(page.window, "哇哈哈", "page/dict/dict_detail.html");

    },
    modify: function (index) {
        var page = window.page.dict;
        var row = system.getDgRow(page.dg, index);
        alert("修改详情");
    },
    detail: function (index) {
        var page = window.page.dict;
        var row = system.getDgRow(page.dg, index)
        //console.log(row);
        adminUI.window(page.window, {
            collapsible: false,
            minimizable: false,
            maximizable: false,
            inline: true,
            constrain: true,
            zIndex: 9000,
            width: "100%",
            height: "100%",
            //modal : true,
            title: "项目详情--" + row.name,
            href: "page/dict/dict_detail.html"
        });
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
    page.dictView.init.initPage();
});

