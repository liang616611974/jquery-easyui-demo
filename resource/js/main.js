jq(document).ready(function () {
    var $ = window.jq;
    // 初始化左侧菜单栏
    $("#navTree").tree({
        data: navTree,
        onClick: function(node){
            /*ajax.load($("#contDiv"),node.attributes.url,
                function (data) {
                    //console.log(data);
                    $("#contDiv").panel({title:node.text});
                });*/

            $("#contDiv").load(node.attributes.url,function (data) {
                //$("#contDiv").panel({title:node.text});
                adminUI.panel($("#contDiv"), {title: node.text});
            });
        }
    });
    // 初始化字典数据
    system.setDicts();

});

var rootPage = "./page";
var navTree = [{
    "id": 1,
    "text": "根节点",
    "iconCls": "icon-main-home",
    "children": [{
        "id": 11,
        "text": "字典管理",
        "attributes": {
            "url": window.rootPage + "/dict/dict.html",
            "price": 100
        },

    }, {
        "id": 12,
        "text": "商品管理",
        "attributes": {
            "url": window.rootPage + "/goods/goods.html",
            "price": 100
        },

    }]
}];