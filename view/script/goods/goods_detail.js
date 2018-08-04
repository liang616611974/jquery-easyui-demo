;
page.goodsDetail = system.initPage("goodsDetail");
page.goodsDetail.init = {
    initPage: function () {
        var page = window.page.goodsDetail; // window 一定要加上，否则全局的page变量不是页面定义那一个
        if(page.action == "add"){
            page.init.initForm(page);
            //page.init.initDg(page,fucn);
            return;
        }
        ajax.postJson("/goods/get",page.param,function (data) {
            page.data = data.data;
            page.init.initForm(page);
            //this.initDg(page,fucn);
        });
    },

    initForm: function (page) {
        system.initInput(page.fm);
        system.initInput(page.root.find(".page-upload"));
        system.initBtn(page.root.find(".page-btn"), page.fucnName);
        system.initBtn(page.root.find(".page-upload"), page.fucnName);
        adminUI.loadForm(page.fm, page.data);
        if(page.data.imgUrl){
            var imgDiv = page.root.find(".page-img-list");
            imgDiv.find("#pic").attr("src", page.data.imgUrl);
            imgDiv.html(imgDiv.html());
        }
        if(page.action == "detail"){
            system.disableInput(page.fm);
            system.hideBtn(page.root.find(".page-btn"));
            // 隐藏文件选择框
            page.root.find(".page-upload").hide();
            //system.hideBtn(page.root.find(".page-upload"));
        }
    }
}

page.goodsDetail.fucn = {
    test : function () {
        var page = window.page.goodsDetail;
        //var ipt = page.fm.find("input[name='goodsName']");
        var ipt = page.get("goodsName");
        var ipt = page.get("goodsType");
        //var ipt = page.get("produceDate");
        //var ipt = page.get("price");
        //var ipt = page.get("img");
        //var ipt = page.get("produceDateTime");
        //console.log(ipt.length);
        //var val = adminUI.getValue(ipt);
        var val = adminUI.setValue(ipt,"VEHICLE");
        //console.log(val);
    },
    save: function () {
        var page = window.page.goodsDetail;
        if(!adminUI.validateForm(page.fm)){
            //alert("验证失败");
            return false;
        }
        var param,url,msg;
        var action = page.action;
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
    upload : function () {
        var page = window.page.goodsDetail;
        var fileName = adminUI.getValue(page.get("img"));
        //console.log(fileName);
        if(!fileName || fileName=="") {
            adminUI.alertInfo("请选择要上传的图片");
            return false;
        }
        var url,param;
        url = "/dict/common/uploadImg";
        param = {dowloadName:"商品列表"};
        system.upload(page.get("multiFm"),url,param,function (data) {
            console.log(data.data);
            page.fm.find("input[name='imgUrl']").val(data.data.url);
            page.root.find(".page-img-list img").attr("src", data.data.url);
            //page.root.find(".page-img-list img").css("background-image",":url('" +data.data.url+ "')" );
        });
    }
};

jq(document).ready(function () {
    page.goodsDetail.init.initPage();
});

