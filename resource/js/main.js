jq(document).ready(function () {
    var $ = window.jq;
    // 初始化左侧菜单栏
    $("#navTree").tree({
        data: navTree,
        onClick: function (node) {
            /*ajax.load($("#contDiv"),node.attributes.url,
                function (data) {
                    //console.log(data);
                    $("#contDiv").panel({title:node.text});
                });*/

            window.page.action = "init";// 页面的动作
            window.page.param = {};// 页面传递的参数

            // 加载页面
            $("#contDiv").load(node.attributes.url, function (data) {
                //$("#contDiv").panel({title:node.text});
                adminUI.panel($("#contDiv"), {title: node.text});
            });
        }
    });
    // 初始化字典数据
    var dictUrl = "/dict/webCache"; // 获取字典的数据的接口
    var dictParam = {sysCode: "SCD"}; // 获取字典的数据的接口的请求参数
    system.setDicts(dictUrl, dictParam, function (data) {
        //console.log(data.data);
    });

});

var rootPage = "./page";
var navTree = [{
    "id": 1,
    "text": "系统",
    "iconCls": "icon-main-home",
    "children": [
        {
            "id": 1,
            "text": "公共模块",
            "children": [
                {
                    "id": 11,
                    "text": "字典管理",
                    "attributes": {
                        "url": window.rootPage + "/common/dict.html",
                        "price": 100
                    },
                }, {
                    "id": 12,
                    "text": "商品管理",
                    "attributes": {
                        "url": window.rootPage + "/common/goods.html",
                        "price": 100
                    },

                }, {
                    "id": 13,
                    "text": "图片管理",
                    "attributes": {
                        "url": window.rootPage + "/common/picture.html",
                        "price": 100
                    }
                }
            ]
        },
        {
            "id": 1,
            "text": "业务模块",
            "children": [
                {
                    "id": 14,
                    "text": "商品管理",
                    "attributes": {
                        "url": window.rootPage + "/goods/goods.html",
                        "price": 100
                    },

                }
            ]
        }
    ]
}];