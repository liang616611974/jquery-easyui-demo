;
page.dictDetail = system.initPage("dictDetail");
page.dictDetail.init = {
    initPage: function () {
        var page = window.page.dictDetail; // window 一定要加上，否则全局的page变量不是页面定义那一个
        var fucn = window.page.dictDetail.fucn;
        var action = window.page.dict.action;
        this.initForm(page, fucn,action);
    },

    initForm: function (page, fucn,action) {
        //alert(action);
        system.initInput(page.root);
        system.initBtn(page.root.find(".btn-nav-right"), page.fucnName);
        adminUI.datebox(page.get("date"), "setValue", "2017-07-07");
        if(action == "detail"){
            system.disableInput(page.root);
        }
    },

}

page.dictDetail.fucn = {
    query: function () {
        alert("查询详情");
    },
    reset: function () {
        alert("重置详情");
    },
    add: function (p1, p2) {
        var page = window.page.dictDetail;
        /*
        var row = system.getDgRow(page.dg, index)
        //console.log(row);*/
        adminUI.openWindow(page.window,"项目视图","page/dict/dict_view.html");
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
    page.dictDetail.init.initPage();
});

