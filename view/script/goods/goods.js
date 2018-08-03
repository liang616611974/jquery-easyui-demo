;
page.goods = system.initPage("goods");
page.goods.init = {
    initPage: function () {
        var page = window.page.goods; // window 一定要加上，否则全局的page变量不是页面定义那一个
        this.initForm(page);
        this.initDg(page);
    },

    initForm: function (page) {
        system.initInput(page.fm);
        system.initBtn(page.root.find(".page-btn"),page.fucnName);
        adminUI.datebox(page.get("date"), "setValue", "2017-07-07");
    },

    initDg: function (page) {
        adminUI.datagrid(page.dg, {
            //toolbar: '.dg-toolbar',
            //title : "商品列表",
            //rownumbers: true,
            //fit:true,
            //pagination: true,
            //data: data,
            url : '/goods/queryPage',
            queryParams: {sortColumns: "id desc,cre_time desc"},
            columns: [[
                {field: 'ck', checkbox: true, width: 50},
                {field: 'id', title: '主键', width: 10, hidden: 'true'},
                {field: 'goodsName', title: '商品名称', width: 100},
                {field: 'goodsType', title: '商品类型', width: 100,
                    formatter: function (value, row, index) {
                        return system.getDictDesc("GOODS_FIRST_TYPE", value);
                    }},
                {field: 'price', title: '价格', width: 100},
                {field: 'producer', title: '生产商', width: 100},
                {field: 'produceDate', title: '生产日期', width: 100},
                {field: 'imgUrl', title: '图片', width: 100},
                {field: 'creUser', title: '创建用户', width: 100},
                {field: 'creTime', title: '创建时间', width: 100},
                {field: 'mdfUser', title: '修改用户', width: 100},
                {field: 'mdfTime', title: '修改时间', width: 100},
                {field: 'oper', title: '操作', width: 400, formatter: function (value, row, index) {
                    // todo 考虑可以做到省略掉page.getFucnAllName
                        return system.getOptBtn({title: "修改", event: page.getFucnAllName("modify", [index])})
                            + system.getOptBtn({title: "详情", event: page.getFucnAllName("detail",[index])})
                            + system.getOptBtn({title: "删除", event: page.getFucnAllName("remove",[index])})
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
    test : function () {
        var page = window.page.goods;
        var ipt = page.fm.find("input[name='goodsName']");
        console.log(ipt.length);
        var val = adminUI.getValue(ipt);
        //var val = adminUI.textbox(page.fm.find("input[name='goodsName']","getValue"));
        console.log(val);
    },
    query : function () {
        var page = window.page.goods;
        if(!adminUI.validateForm(page.fm)){
            return false;
        }
        var param = page.fm.serializeObject();
        //console.log(param);
        //adminUI.datagrid(page.dg,'reload', param);
        adminUI.reloadDg(page.dg, param);
    },
    reset : function () {
        var page = window.page.goods;
        adminUI.clearForm(page.fm);
    },
    export : function () {
        var page = window.page.goods;
        if(!adminUI.validateForm(page.fm)){
            return false;
        }
        var url = "/goods/export";
        var param = {
            sortColumns: "id desc,cre_time desc",
            downloadName : '商品列表'
        };
        param = jq.extend(param, page.fm.serializeObject());
        system.download(url,param);
    },
    add: function () {
        var page = window.page.goods;
        window.page.action = "add";
        adminUI.openWindow(page,"商品新增", "page/goods/goods_detail.html");
    },
    modify : function (index) {
        var page = window.page.goods;
        var row = system.getDgRow(page.dg,index);
        window.page.action = "modify";
        window.page.param = row;
        adminUI.openWindow(page,"商品修改", "page/goods/goods_detail.html");
    },
    detail : function (index) {
        var page = window.page.goods;
        var row = system.getDgRow(page.dg,index);
        window.page.action = "detail";
        window.page.param = row;
        adminUI.openWindow(page,"商品详情","page/goods/goods_detail.html");
    },
    remove: function (index) {
        var page = window.page.goods;
        var row = system.getDgRow(page.dg, index);
        if(!row){
            adminUI.alertInfo("请选择要删除的数据！");
            return false;
        }
        // 构造请求参数
        var param = {
            ids:[row.id]
        };
        adminUI.confirm("删除商品","确认删除商品?",function (r) {
            if(!r){
                return false;
            }
            ajax.postJson("/goods/remove",param,function () {
                adminUI.alertInfo("删除成功");
                adminUI.reloadDg(page.dg);
            })
        })
    },
    removeChecked: function (index) {
        var page = window.page.goods;
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
        console.log(param.ids);
        adminUI.confirm("删除商品","确认删除商品?",function (r) {
            if(!r){
                return false;
            }
            ajax.postJson("/goods/remove",param,function () {
                adminUI.alertInfo("删除成功");
                adminUI.reloadDg(page.dg);
            })
        })
    }

};

jq(document).ready(function () {
    page.goods.init.initPage();
});

