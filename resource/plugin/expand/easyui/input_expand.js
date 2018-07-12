;
(function($) {

    /**
	 * 日期格式化
     * @param date
     * @returns {string}
     */
    $.fn.datebox.defaults.formatter = function(date){
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
    };

})(jQuery);
