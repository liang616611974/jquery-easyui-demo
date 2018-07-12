;
var ajax = (function ($) {
    var badRequestStatus = 400;
    var noPrivilegeStatus = 403;
    var repeatSubmitStatus = 401;
    var errorMsg = "请求失败";
    var noPrivilegeMsg = "无权限操作";
    var repeatSubmitMsg = "重复提交";
    var badRequestMsg = "非法请求";
    var tokenHeader = "asyncToken";
    var tokenKey = "token";
    var timeout = 180000;
    return {
        /* /!** ajax请求 *!/
         ajax: function (url, type, timeout, async, cache, contentType, data, dataType, beforeSendFucn, successFucn, completeFucn, errorFucn) {
             $.ajax({
                 url: url, // (默认: 当前页地址) 发送请求的地址。 
                 type: type, // (默认: "GET") 请求方式 ("POST" 或 "GET")， 默认为 "GET"。注意：其它 HTTP 请求方法，如 PUT 和 DELETE 也可以使用，但仅部分浏览器支持。
                 timeout: timeout,// 设置请求超时时间（毫秒）。此设置将覆盖全局设置。
                 async: async, // (默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
                 cache: cache, // (默认: true) jQuery 1.2 新功能，设置为 false 将不会从浏览器缓存中加载请求信息。
                 //contentType: contentType, // (默认: "application/x-www-form-urlencoded") 发送信息至服务器时内容编码类型。默认值适合大多数应用场合。
                 data: data, // 请求参数数据
                 dataType: dataType, // 接收的数据类型 
                 beforeSend: function (XMLHttpRequest) {
                     //请求前的处理
                     if (beforeSendFucn) {
                         return beforeSendFucn(XMLHttpRequest);
                     }
                 },
                 success: function (data, textStatus) {
                     //请求成功时处理
                     if (!successFucn) {
                         return;
                     }
                     var count = successFucn.length;
                     if (count == 1) {
                         return successFucn(data);
                     }
                     else if (count == 2) {
                         return successFucn(data, textStatus);
                     }
                     else {
                         return successFucn();
                     }
                 },
                 complete: function (XMLHttpRequest, textStatus) {
                     //更新token值
                     var asyncToken = XMLHttpRequest.getResponseHeader(tokenHeader);
                     if (asyncToken) {
                         $("#" + tokenKey).val(asyncToken);
                     }
                     //请求完成后回调函数 (请求成功或失败时均调用)。参数： XMLHttpRequest 对象，成功信息字符串。
                     if (completeFucn) {
                         return completeFucn(XMLHttpRequest, textStatus);
                     }
                 },
                 error: function (XMLHttpRequest, textStatus, errorThrown) {
                     //(默认: 自动判断 (xml 或 html)) 请求失败时将调用此方法。这个方法有三个参数：XMLHttpRequest 对象，错误信息，（可能）捕获的错误对象。
                     if (noPrivilegeStatus == XMLHttpRequest.status) {
                         adminUI.alertWarn(noPrivilegeMsg);
                     } else if (repeatSubmitStatus == XMLHttpRequest.status) {
                         adminUI.alertWarn(repeatSubmitMsg);
                     } else if (badRequestStatus == XMLHttpRequest.status) {
                         adminUI.alertWarn(badRequestMsg);
                     } else {
                         adminUI.alertErr(errorMsg);
                     }
                     if (errorFucn) {
                         return errorFucn(XMLHttpRequest, textStatus, errorThrown);
                     }
 
                 }
             });
         },*/
        /* /!** post请求 *!/
         post: function (url, dataType, data, successFucn, completeFucn, errorFucn) {
             this.ajax(url, "POST", timeout, true, false, null, data, dataType, null, successFucn, completeFucn, errorFucn);
         },
         /!** get请求 *!/
         get: function (url, dataType, data, successFucn, completeFucn, errorFucn) {
             this.ajax(url, "GET", timeout, true, false, null, data, dataType, null, successFucn, completeFucn, errorFucn);
         },*/

        setup: function () {
            // 设置jQuery Ajax全局的参数
            $.ajaxSetup({
                //url: url, // (默认: 当前页地址) 发送请求的地址。
                //type: "post", // (默认: "GET") 请求方式 ("POST" 或 "GET")， 默认为 "GET"。注意：其它 HTTP 请求方法，如 PUT 和 DELETE 也可以使用，但仅部分浏览器支持。
                //timeout: timeout,// 设置请求超时时间（毫秒）。此设置将覆盖全局设置。
                //async: false, // (默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
                cache: false, // (默认: true) jQuery 1.2 新功能，设置为 false 将不会从浏览器缓存中加载请求信息。
                //contentType: contentType, // (默认: "application/x-www-form-urlencoded") 发送信息至服务器时内容编码类型。默认值适合大多数应用场合。
                //data: data, // 请求参数数据
                //dataType: '', // 接收的数据类型
                beforeSend: function (xhr) {
                    adminUI.openProgress();
                },
                error: function (xhr, textStatus, errorThrown) {
                    switch (xhr.status) {
                        case(500):
                            adminUI.alertWarn("服务器系统内部错误");
                            break;
                        case(401):
                            adminUI.alertWarn("未登录");
                            break;
                        case(403):
                            adminUI.alertWarn("无权限执行此操作");
                            break;
                        case(404):
                            adminUI.alertWarn("找不到页面");
                            break;
                        case(408):
                            adminUI.alertWarn("请求超时");
                            break;
                        default:
                            //alert(errorThrown);
                            adminUI.alertWarn("未知错误：" + errorThrown);
                    }
                },

                success: function (data) {
                    if(data.code && data.code!= '200'){
                        adminUI.alertErr(data);
                        return false;
                    }
                },
                complete: function (xhr, status) {
                    setTimeout(function () {
                        adminUI.closeProgress();
                    }, 1000);
                }
            });
        },

        ajax: function (param) {
            $.ajax(param);
        },

        post: function (param) {
            param.method = 'post';
            this.ajax(param);
        },

        /**
         * 提交json数据
         * @param url
         * @param param
         * @param succeess
         */
        postJson: function (url,param,succeess) {
            param.url = url;
            param.data = param;
            param.contentType = "application/json; charset=utf-8";
            param.dataType = "json";
            param.success = succeess;
            this.post(param);
        }
    }
})(jQuery);

jq(document).ready(function () {
   ajax.setup();
});




