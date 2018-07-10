jq(document).ready(function () {
    var $ = window.jq;
    $("#navTree").tree({
        data: navTree,
        onClick: function(node){
            ajax.load($("#contDiv"),node.attributes.url,null,
                function (data) {
                    console.log(data);
                });
        }
    });

});

var rootPage = "./page";
var navTree = [{
    "id": 1,
    "text": "根节点",
    "iconCls":"icon-main-home",
    "children": [{
        "id": 11,
        "text": "字典管理",
        "attributes":{
            "url":window.rootPage + "/dict/dict.html",
            "price":100
        },

    }, {
        "id": 12,
        "text": "商品管理",
        "attributes":{
            "url":window.rootPage + "/goods/goods.html",
            "price":100
        },

    }]
}]