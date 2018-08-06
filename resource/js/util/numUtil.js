;
var numUtil = (function () {

    return {
        /**
         * 数值字符串千分位格式化
         */
        toThousands: function (num) {
            if(!num || num == ""){
                return "";
            }
            var result = '';
            var r = num.split(".")[1];// 小数点部分
            num = num.split(".")[0];
            var neg = num.indexOf("-");
            if (neg == 0) {
                num = num.substr(1);
            }
            while (num.length > 3) {
                result = "," + num.slice(-3) + result;
                num = num.slice(0, num.length - 3);
            }
            if (num) {
                result = num + result;
            }
            return (neg == 0 ? "-" : "") + result + (r ? "." + r : "");
        },

        /**
         * 数值格式化成字符串
         * @param num
         * @param digit 小数位，不够补0
         * @returns {string}
         */
        toDecimals: function (num, digit) {
            var val = (num || 0).toString();
            var vl = val.indexOf(".");
            if (vl < 0 && (digit && digit > 0)) {
                vl = val.length;
                val = val + ".";
            }
            while (val.length <= vl + digit) {
                val = val + "0";
            }
            return val;
        }
    }

})();