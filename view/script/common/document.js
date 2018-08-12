;
page.docuemnt = system.initPage("docuemnt");
page.docuemnt.init = {
    initPage: function () {
        var page = window.page.docuemnt; // window 一定要加上，否则全局的page变量不是页面定义那一个
        this.initForm(page);
    },

    initForm: function (page) {
        system.initBtn(page.root.find(".page-btn"), page.fucnName);
    }
}

page.docuemnt.fucn = {
    downloadWord: function () {
        alert("下载Word文档");
    },
    downloadPDF: function () {
        alert("下载PDF文档");
    }
};

jq(document).ready(function () {
    page.docuemnt.init.initPage();
});

