;
page.goods = system.initPage("goods");
page.goods.init = {
    initPage: function () {
        var page = window.page.goods; // window 一定要加上，否则全局的page变量不是页面定义那一个
        var fucn = window.page.goods.fucn;
        this.initForm(page,fucn);
        this.initDg(page,fucn);
    },

    initForm: function (page,fucn) {
        system.initInput(page.fm);
        system.initBtn(page.root.find(".page-btn"),page.fucnName);
        adminUI.datebox(page.get("date"), "setValue", "2017-07-07");
    },

    initDg: function (page,fucn) {
        adminUI.datagrid(page.dg, {
            toolbar: '.dg-toolbar',
            //title : "商品列表",
            rownumbers: true,
            //fit:true,
            url : '/goods/queryPage',
            //data: data,
            queryParams: {sysCode:"SCD","sortColumns": "id desc,cre_time desc"},
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
                {field: 'oper', title: '操作', width: 400, formatter: function (value, row, index) {
                        return system.getOptBtn({title: "修改", event: page.getFucnAllName("modify", [1, "aa"])})
                            + system.getOptBtn({title: "详情", event: page.getFucnAllName("detail",[index])})
                            + system.getOptBtn({title: "删除", event: page.getFucnAllName("delete")})
                            + system.getOptBtn({title: "测试隐藏", event: page.getFucnAllName("test"),isShow:false});
                    },}
            ]],
            onLoadSuccess: function (data) {
                console.log("加载成功");
            }

        });

    }
}

page.goods.fucn = {
    query : function () {
        var page = window.page.goods;
        var param = page.fm.serializeObject();
        //console.log(param);
        adminUI.datagrid(page.dg,'reload', param);
    },
    reset : function () {
        var page = window.page.goods;
        adminUI.clearForm(page.fm);
    },
    add: function () {
        var page = window.page.goods;
        page.action = "add";
        adminUI.openWindow(page,"新增商品", "page/goods/goods_detail.html");
    },
    modify : function (index) {
        var page = window.page.goods;
        var row = system.getDgRow(page.dg,index);
        page.data = row;
        page.action = "modify";
        adminUI.openWindow(page,"修改商品", "page/goods/goods_detail.html");
    },
    detail : function (index) {
        var page = window.page.goods;
        var row = system.getDgRow(page.dg,index);
        page.action = "detail";
        adminUI.openWindow(page.window,"商品详情--" + row.name, "page/goods/goods_detail.html");
    },
    delete: function () {
        adminUI.confirm("删除商品","确认删除商品?",function (r) {
            if(r){
                alert("删除成功");
            }else {
                alert("考虑考虑")
            }
        })
    }
};

jq(document).ready(function () {
    page.goods.init.initPage();
});

