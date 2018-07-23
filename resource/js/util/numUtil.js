/**
 * 定义四则远算，处理浮点类型计算失真
 */
//加法   
Number.prototype.add = function(arg){   
        var r1,r2,m;   
        try{r1=this.toString().split(".")[1].length;}catch(e){r1=0;}   
        try{r2=arg.toString().split(".")[1].length;}catch(e){r2=0;}   
        m=Math.pow(10,Math.max(r1,r2)); 
        return (this*m+arg*m)/m;
    }  
    //减法  
Number.prototype.sub = function (arg){   
    return this.add(-arg);   
}   

//乘法   
Number.prototype.mul = function (arg)   {   
    var m=0,s1=this.toString(),s2=arg.toString();   
    try{m+=s1.split(".")[1].length;}catch(e){}   
    try{m+=s2.split(".")[1].length;}catch(e){}   
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}   

//除法   
Number.prototype.div = function (arg){   
    var t1=0,t2=0,r1,r2;   
    try{t1=this.toString().split(".")[1].length}catch(e){}   
    try{t2=arg.toString().split(".")[1].length}catch(e){}   
    with(Math){   
        r1=Number(this.toString().replace(".",""))   
        r2=Number(arg.toString().replace(".",""))   
        return (r1/r2)*pow(10,t2-t1);   
    }   
}

//数值末尾添加0
function addZero(a) {
    var num=a.toString()
    var arr=num.split('.');
    if(arr.length==2&&arr[1].length==1){
        num+='0';
    }
    if(arr.length==1){
        num+='.00';
    }
    return num;
}

/**
 * 数值字符串千分位格式化
 */
function toThousands(num) {
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
}

/**
 * 数值格式化成字符串
 * @param num
 * @param digit 小数位，不够补0
 * @returns {string}
 */
function toDecimals(num, digit) {
    var val = (num || 0).toString();
    var vl = val.indexOf(".");
    if (vl < 0 && (digit && digit>0)) {
        vl = val.length;
        val = val + ".";
    }
    while (val.length <= vl + digit) {
        val = val + "0";
    }
    return val;
}

/**
 * 注册数组是否包含某个值
 * @param val
 * @returns {boolean}
 */
Array.prototype.contains = function (val) {
    for ( i in this){
        if(this[i] == val){
            return true;
        }
    }
    return false;
}

/**
 * 返回元素在数组中的索引
 * @param val
 * @returns {*}
 */
Array.prototype.indexOf = function (val) {
    for ( i in this){
        if(this[i] == val){
            return i;
        }
    }
    return -1;
}