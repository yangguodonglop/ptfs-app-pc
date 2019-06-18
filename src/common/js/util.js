var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

export default {
    getQueryStringByName: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    formatDate: {


        format: function(date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function($0) {
                switch ($0.charAt(0)) {
                    case 'y':
                        return padding(date.getFullYear(), $0.length);
                    case 'M':
                        return padding(date.getMonth() + 1, $0.length);
                    case 'd':
                        return padding(date.getDate(), $0.length);
                    case 'w':
                        return date.getDay() + 1;
                    case 'h':
                        return padding(date.getHours(), $0.length);
                    case 'm':
                        return padding(date.getMinutes(), $0.length);
                    case 's':
                        return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function(dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y':
                            _date.setFullYear(_int);
                            break;
                        case 'M':
                            _date.setMonth(_int - 1);
                            break;
                        case 'd':
                            _date.setDate(_int);
                            break;
                        case 'h':
                            _date.setHours(_int);
                            break;
                        case 'm':
                            _date.setMinutes(_int);
                            break;
                        case 's':
                            _date.setSeconds(_int);
                            break;
                    }
                }
                return _date;
            }
            return null;
        }

    },
    //将时间格式化
    getTimes: function(b) {
        let e = new Date(b)
        let year = e.getFullYear();
        let month = e.getMonth() + 1;
        let day = e.getDate();
        let hh =
            e.getHours() < 10 ?
            "0" + e.getHours() :
            e.getHours();
        let mm =
            e.getMinutes() < 10 ?
            "0" + e.getMinutes() :
            e.getMinutes();
        let ss =
            e.getSeconds() < 10 ?
            "0" + e.getSeconds() :
            e.getSeconds();
        let endTime = `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
        return endTime
    },
    //判断结束时间是否大于起始时间
    checkTimes: function(a, b) {
        var startTime = new Date(a).getTime()
        var endTime = new Date(b).getTime()
        if (endTime - startTime >= 0) {
            return true
        } else {
            return false
        }
    },
    //将字符串转化为GB,MB,KB,B
    formatByte: function(row, column, cellValue, index) {
        var limit = parseInt(cellValue);
        var size = "";
        if (limit < 0.1 * 1024) {
            //小于0.1KB，则转化成B
            size = limit.toFixed(2) + "B";
        } else if (limit < 0.1 * 1024 * 1024) {
            //小于0.1MB，则转化成KB
            size = (limit / 1024).toFixed(2) + "KB";
        } else if (limit < 0.1 * 1024 * 1024 * 1024) {
            //小于0.1GB，则转化成MB
            size = (limit / (1024 * 1024)).toFixed(2) + "MB";
        } else {
            //其他转化成GB
            size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
        }

        var sizeStr = size + ""; //转成字符串
        var index = sizeStr.indexOf("."); //获取小数点处的索引
        var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
        // if (dou == "00") {
        //   //判断后两位是否为00，如果是则删除00
        //   return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
        // }
        return size;
    },
    formatByteActive: function(cellValue, index) {
        var limit = parseInt(cellValue);
        var size = "";
        if (limit < 0.1 * 1024) {
            //小于0.1KB，则转化成B
            size = limit.toFixed(2) + "B";
        } else if (limit < 0.1 * 1024 * 1024) {
            //小于0.1MB，则转化成KB
            size = (limit / 1024).toFixed(2) + "KB";
        } else if (limit < 0.1 * 1024 * 1024 * 1024) {
            //小于0.1GB，则转化成MB
            size = (limit / (1024 * 1024)).toFixed(2) + "MB";
        } else {
            //其他转化成GB
            size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
        }

        var sizeStr = size + ""; //转成字符串
        var index = sizeStr.indexOf("."); //获取小数点处的索引
        var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
        // if (dou == "00") {
        //   //判断后两位是否为00，如果是则删除00
        //   return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
        // }
        return size;
    },




};