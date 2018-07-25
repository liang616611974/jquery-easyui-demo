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
        adminUI.loadForm(page.fm, page.data);
        if(page.action == "detail"){
            system.disableInput(page.fm);
            system.hideBtn(page.root.find(".page-btn"));
        }
    },

    /*initDg: function (page, fucn) {
        adminUI.datagrid(page.dg, {
            toolbar: '.dg-toolbar',
            //title : "字典列表",
            rownumbers: true,
            //fit:true,
            url: '/goods/queryPage',
            //data: data,
            queryParams: {sysCode: "SCD", "sortColumns": "id desc,cre_time desc"},
            pagination: true,
            columns: [[
                {field: 'ck', checkbox: true, width: 50},
                {field: 'id', title: '主键', width: 10, hidden: 'true'},
                {field: 'goodsName', title: '商品名称', width: 100},
                {field: 'goodsType', title: '商品类型', width: 100},
                {field: 'price', title: '价格', width: 100},
                {field: 'producer', title: '生产商', width: 100},
                {field: 'produceDate', title: '生产日期', width: 100},
                {field: 'creUser', title: '创建用户', width: 100},
                {field: 'creTime', title: '创建时间', width: 100},
                {field: 'mdfUser', title: '修改用户', width: 100},
                {field: 'mdfTime', title: '修改时间', width: 100},
                {
                    field: 'oper', title: '操作', width: 400, formatter: function (value, row, index) {
                        return system.getOptBtn({title: "修改", event: page.getFucnAllName("modify", [1, "aa"])})
                            + system.getOptBtn({title: "详情", event: page.getFucnAllName("detail", [index])})
                            + system.getOptBtn({title: "删除", event: page.getFucnAllName("delete")})
                            + system.getOptBtn({title: "测试隐藏", event: page.getFucnAllName("test"), isShow: false});
                    },
                }
            ]],
            onLoadSuccess: function (data) {
                console.log("加载成功");
            }

        });

    }*/
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
    }
};

jq(document).ready(function () {
    page.goodsDetail.init.initPage();
});

