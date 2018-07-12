;
page.dict.init = {
    init: function () {
        var that = page.dict.fucn;
        this.defineInput(that);
        this.defineDg(that);
    },

    defineInput: function (that, action, obj) {
        system.defineInput(that.get("queryFm"));
        adminUI.button(that.root.find(".btn-nav a"),{width:120});

    },

    defineDg: function (that, action, obj) {

    }
}

page.dict.fucn = {
    name: "page.dict.fucn",
    root: jq("#dictDiv"),
    get: function (id) {
        //console.log(this.name);
        return this.root.find("#" + id);
    }
};

/*function toJsonStr(prop) {
    if(!prop || prop == '') {
        return "{}";
    }
    prop = prop.replace(/:/g,"\":");
    prop = prop.replace(/;/g,",\"");
    prop = prop.replace(/'/g,"\"");
    prop = "{\"" + prop + "}";
    return prop;
}*/

jq(document).ready(function () {
    //alert("初始化加载");
    /* var obj = toJsonStr("aaa:111;label:'姓名：';prompt:'请填写姓名'");
     console.log(obj);
     obj = JSON.parse(obj);
     console.log(obj);*/
    //alert(jq("#date"));
    //jq("#date").datebox();
    /*jq("#date").datebox({
        //currentText : "Today"
    });*/
   page.dict.init.init();
});

