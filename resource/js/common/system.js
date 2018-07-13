;
var system = (function () {
    var labelPosition = "top"; // 输入框标签位置
    var labelWidth = 50; // 输入框标签长度
    var inputWidth = 260; // 输入框长度
    var btnWidth = 120; // 按钮长度
    var dicts; // 字典数据集合
    function toJsonStr(prop) {
        if(!prop || prop == '') {
            return "{}";
        }
        prop = prop.replace(/:/g,"\":");
        prop = prop.replace(/;/g,",\"");
        prop = prop.replace(/'/g,"\"");
        prop = "{\"" + prop + "}";
        return prop;
    }

    function initInputs(objs) {
        var $ = jq;
        for (var i=0; i<objs.length; i++){
            var obj = $(objs[i]);
            var prop = toJsonStr(obj.attr("prop"));
            try{
                prop = JSON.parse(prop);
            }catch (e){
                console.log(e);
                prop = {};
            }
            var type = prop.type;
            prop.type = null; // 无关属性要清除，否则会有影响。
            if(!prop.labelWidth){
                prop.labelWidth = labelWidth;
            }
            if(!prop.labelPosition){
                prop.labelPosition = labelPosition;
            }
            if(!prop.width){
                prop.width = inputWidth;
            }
            //console.log(prop);
            if(type == "text"){
                adminUI.textbox(obj,prop);
            }else if(type == "date"){
                prop.editable = false;
                //console.log(prop);
                adminUI.datebox(obj,prop);
            }else if(type == 'datetime'){
                prop.editable = false;
                adminUI.datetimebox(obj,prop);
            } else if(type == "select"){
                prop.editable = false;
                adminUI.selectbox(obj,prop);
            } else if(type == "number"){
                prop.min = 0;
                prop.max = 999999999;
                prop.precision = 2;
                prop.groupSeparator = ',';
                adminUI.numberbox(obj, prop);
            }else {
                adminUI.textbox(obj,prop);
            }
        }
    }
    
    function initBtns() {
        
    }

    return {
        toJson : function (str) {
            console.log(toJsonStr(str));
            return JSON.parse(toJsonStr(str));
        },
        defineInput : function (scope) {
            //console.log(fm);
            var objs = scope.find("input[prop]");
            initInputs(objs);
        },
        defineBtn : function (scope) {
            var objs = scope.find("a[prop]");
            var prop = {};
            porp.width = btnWidth;
        }
    }
})();