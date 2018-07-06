$(document).ready(function () {
    $("#navTree").tree({
        data: navTree,
        onClick: function(node){
            alert(node.text + node.attributes.url);  // 在用户点击的时候提示
            $("#contDiv").load(node.attributes.url);
            //$("#contDiv").html("<p>测试填充</p>");
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
            "url":"http://liangfeng.com:63342/jquery-easyui-demo/view/page/dict/dict.html",
            "price":100
        },

    }, {
        "id": 12,
        "text": "商品管理",
        "attributes":{
            "url":window.rootPage + "/dict/dict.html",
            "price":100
        },

    }]
}]