;
var jq = jQuery.noConflict(); // 重命名Jquery
var base = (function () {
    var prjUrl = null;
    return {
        /** 获取项目名称url */
        getPrjUrl: function () {
            if (prjUrl != null) {
                return prjUrl;
            }
            var url = window.location.href;
            //去掉http://或https://等
            var url1 = url.substring(url.indexOf("//") + 2);
            //去掉域名和端口
            var url2 = url1.substring(url1.indexOf("/"));
            //保留“/应用名”
            var url3 = url2.substring(0, url2.indexOf("/", 1));
            prjUrl = url3;
            return prjUrl;
        }
    };
})();

