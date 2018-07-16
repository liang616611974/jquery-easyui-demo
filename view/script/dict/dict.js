;
page.dict.init = {
    initPage: function () {
        var that = page.dict.fucn;
        this.initForm(that);
        this.initDg(that);
    },

    initForm: function (that, action, obj) {
        system.initInput(that.get("queryFm"));
        system.initBtn(that.root.find(".btn-nav-right"))
        //adminUI.button(that.root.find(".btn-nav-right").find("a[prop]"));
        adminUI.datebox(that.get("date"), "setValue", "2017-07-07");
    },

    initDg: function (that, action, obj) {
        var data = [{id :1,name:"张三",date:'2018-01-01',type:"男",amount:'1000'},
            {id :2,name:"李四",date:'2018-02-01',type:"男",amount:'2000'},
            {id :3,name:"王五",date:'2018-03-01',type:"男",amount:'3000'},
            {id :4,name:"小三",date:'2018-04-01',type:"女",amount:'4000'},
            {id :4,name:"小三",date:'2018-04-01',type:"女",amount:'4000'},
            {id :4,name:"小三",date:'2018-04-01',type:"女",amount:'4000'},
            {id :4,name:"小三",date:'2018-04-01',type:"女",amount:'4000'},
            {id :4,name:"小三",date:'2018-04-01',type:"女",amount:'4000'},
            {id :4,name:"小三",date:'2018-04-01',type:"女",amount:'4000'},
            {id :4,name:"小三",date:'2018-04-01',type:"女",amount:'4000'},
            {id :4,name:"小三",date:'2018-04-01',type:"女",amount:'4000'},
            {id :5,name:"小四",date:'2018-05-01',type:"女",amount:'5000'}
        ];
        adminUI.datagrid(that.dg,{
            //toolbar: '#dictDiv #tb',
            //title : "字典列表",
            rownumbers:true,
            //fit:true,
            //url : '/dict/dict/query',
            data : data,
            queryParams : {},
            pagination : true,
            columns :[[
                {field:'ck',checkbox:true,width:50},
                {field:'id',title:'主键',width:10,hidden:'true'},
                {field:'name',title:'姓名',width:200},
                {field:'date',title:'日期',width:200},
                {field:'type',title:'类型',width:100},
                {field:'amount',title:'金额',width:200},
                {field:'oper',title:'操作',width:400,formatter:that.formatDgOper}
            ]],
            onLoadSuccess : function (data) {
                /*var h1 = that.root.outerHeight(true);
                var h2 = that.get("fmBtnDiv").outerHeight(true);
                var h3 = that.get("dgDiv").height(h1 - h2 - 240);
                var h4 = that.root.find(".datagrid-view .datagrid-body").height(h1 - h2 - 240);
                h3 =  that.get("dgDiv").height();
                h4 =  that.get("dgDiv .datagrid-view").height();
                console.log(h1);
                console.log(h2);
                console.log(h3);
                console.log(h4);
                adminUI.datagrid(that.dg,"resize");*/

                //that.get("dgDiv").find(".dg-contain .datagrid-body").css("height",   "400px");

               /* alert("aaa");
                that.get("dgDiv").find(".panel").find(".datagrid-wrap").css("height", "400px");*/
                /*setTimeout(function () {
                    var h1 = that.root.outerHeight(true);
                    var h2 = that.get("fmBtnDiv").outerHeight(true);
                    //that.get("dgDiv").height(h1 - h2 - 40);
                    //that.get("dgDiv .datagrid-view").height(h1 - h2 - 40);
                    that.get("dgDiv").find(".datagrid-view").css("height", (h1 - h2 - 95) + "px");
                    console.log(jq("#dgDiv").find(".datagrid-view").height());
                    that.get("dgDiv").find(".datagrid-body").css("height",  (h1 - h2 - 135) + "px");
                }, 1000);*/
            },
            view : {
                onAfterRender : function () {
                    var h1 = that.root.outerHeight(true);
                    var h2 = that.get("fmBtnDiv").outerHeight(true);
                    //that.get("dgDiv").height(h1 - h2 - 40);
                    //that.get("dgDiv .datagrid-view").height(h1 - h2 - 40);
                    that.get("dgDiv").find(".datagrid-view").css("height", (h1 - h2 - 95) + "px");
                    console.log(jq("#dgDiv").find(".datagrid-view").height());
                    that.get("dgDiv").find(".datagrid-body").css("height",  (h1 - h2 - 135) + "px");
                }
            }
           /* onResizeColumn :function () {
                var h1 = that.root.outerHeight(true);
                var h2 = that.get("fmBtnDiv").outerHeight(true);
                //that.get("dgDiv").height(h1 - h2 - 40);
                //that.get("dgDiv .datagrid-view").height(h1 - h2 - 40);
                that.get("dgDiv").find(".datagrid-view").css("height", (h1 - h2 - 95) + "px");
                console.log(jq("#dgDiv").find(".datagrid-view").height());
                that.get("dgDiv").find(".datagrid-body").css("height",  (h1 - h2 - 135) + "px");
            }*/
        });


        //that.get("dgDiv").find(".panel").find(".datagrid-wrap").css("height", "400px");
        //that.root.find(".dg-contain").height(400);
       /* var h1 = that.root.outerHeight(true);
        var h2 = that.get("fmBtnDiv").outerHeight(true);
        var h3 = that.get("dgDiv").height(h1 - h2 - 140);
        var h4 = that.get("dgDiv .datagrid-view").height(h1 - h2 - 140);
        h3 =  that.get("dgDiv").height();
        h4 =  that.get("dgDiv .datagrid-view").height();
        console.log(h1);
        console.log(h2);
        console.log(h3);
        console.log(h4);
        adminUI.datagrid(that.dg,"resize");*/
    }
}

page.dict.fucn = {
    name: "page.dict.fucn",
    root: jq("#dictDiv"),
    dg : jq("#dictDiv").find("#dg"),
    get: function (id) {
        //console.log(this.name);
        return this.root.find("#" + id);
    },
    formatDgOper : function (value,row,index) {
        var that = page.dict.fucn;
        return system.getOptBtn({title: "修改",isShow:true,event:that.getFucnAllName("add",[1,"aa"])})
            + system.getOptBtn({title: "删除",isShow:true,event:that.getFucnAllName("delete")})
            + system.getOptBtn({title: "删除",isShow:false,event:that.getFucnAllName("delete")});
    },
    getFucnAllName : function (fucnName,params) {
        return system.getFucnAllName(this.name + "." + fucnName,params);
    },
    add:function (p1,p2) {
        adminUI.alertInfo("新增成功" + p1 + p2);
    },
    delete:function () {
        adminUI.alertInfo("删除成功");
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
   page.dict.init.initPage();
});

