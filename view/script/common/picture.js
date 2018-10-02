;
page.picture = system.initPage("picture");
page.picture.init = {
    initPage: function () {
        var page = window.page.picture; // window 一定要加上，否则全局的page变量不是页面定义那一个
        this.initForm(page);
    },

    initForm: function (page) {
        system.initInput(page.root.find(".page-upload"));
        system.initBtn(page.root.find(".page-upload"), page.fucnName);
        // 加入图片
        var img;
        var imgParam = {id:"pic",style:"width:400px;"}
        img = system.getImg(imgParam);
        page.root.find(".page-img-list").append(img);
    }
}

page.picture.fucn = {
    upload : function () {
        var page = window.page.picture;
        var fileName = adminUI.getValue(page.get("img"));
        //console.log(fileName);
        if(!fileName || fileName=="") {
            adminUI.alertInfo("请选择要上传的图片");
            return false;
        }
        if(!adminUI.validateForm(page.get("multiFm"))){
            return false;
        }
        var url,param;
        url = "/dict/dict/common/uploadImg";
        param = {dowloadName:"商品列表"};
        system.upload(page.get("multiFm"),url,param,function (data) {
            console.log(data.data);
            page.get("pic").attr("src", data.data.url);
            //page.root.find(".page-img-list img").css("background-image",":url('" +data.data.url+ "')" );
        });
    }
};

jq(document).ready(function () {
    page.picture.init.initPage();
});

