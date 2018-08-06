;
page.goodsDetail = system.initPage("goodsDetail");
page.goodsDetail.init = {
    initPage: function () {
        var page = window.page.goodsDetail; // window 一定要加上，否则全局的page变量不是页面定义那一个
        if(page.action == "add"){
            page.init.initForm(page);
            return;
        }
        ajax.postJson("/goods/get",page.param,function (data) {
            page.data = data.data;
            page.init.initForm(page);
        });
    },

    initForm: function (page) {
        system.initInput(page.fm);
        system.initBtn(page.root.find(".page-btn"), page.fucnName);
        adminUI.loadForm(page.fm, page.data);
        if(page.action == "detail"){
            system.disableInput(page.fm);
            system.hideBtn(page.root.find(".page-btn"));
        }
    }
}

page.goodsDetail.fucn = {
    save: function () {
        var page = window.page.goodsDetail;
        if(!adminUI.validateForm(page.fm)){
            return false;
        }
        var action,url,param,msg;
        action = page.action;
        if(action=="add"){
            url = "/goods/add";
            msg = "新增成功";
        }else {
            url = "/goods/modify";
            msg = "修改成功";
        }
        param = page.fm.serializeObject();
        ajax.postJson(url, param, function () {
            adminUI.alertInfo(msg);
            adminUI.closeWindow(page);
        });
    },
    cancel: function () {
        var page = window.page.goodsDetail;
        adminUI.closeWindow(page);
    },
};

jq(document).ready(function () {
    page.goodsDetail.init.initPage();
});

