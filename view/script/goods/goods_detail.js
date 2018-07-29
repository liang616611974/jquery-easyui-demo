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
        system.initBtn(page.root.find(".page-btn"), page.fucnName);
        system.initBtn(page.root.find(".page-upload"), page.fucnName);
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
        var options = {
            type : "POST",
            //target:     '#divToUpdate',
            url: "/dict/common/uploadImg",
            data : {dowloadName:"商品列表"}, // 除了表单，额外传送的数据
            //dataType : "json", // 返回数据的格式
            //resetForm : true, //  调用成功后，是否重置表单
            success:    function(data) {
                console.log(data);
                //alert('Thanks for your comment!');
            }
        };
        // pass options to ajaxForm
        //console.log($('#exportFm').length);
        //debugger;
        page.root.find('.page-upload form').ajaxSubmit(options);
    }
};

jq(document).ready(function () {
    page.goodsDetail.init.initPage();
});

