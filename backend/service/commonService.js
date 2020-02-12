'use strict';

app.factory('commonService', ['$http', function($http) {

    var commonServiceFactory = {};


    var _getNumberThai = function(number) {

        if (number == null) return number;
        var newText = '';
        for (var i = 0; i < number.toString().length; i++) {
            var _number = number.toString().substr(i, 1);

            if (_number == '0') newText += '๐';
            else if (_number == '0') newText += '๐';
            else if (_number == '1') newText += '๑';
            else if (_number == '2') newText += '๒';
            else if (_number == '3') newText += '๓';
            else if (_number == '4') newText += '๔';
            else if (_number == '5') newText += '๕';
            else if (_number == '6') newText += '๖';
            else if (_number == '7') newText += '๗';
            else if (_number == '8') newText += '๘';
            else if (_number == '9') newText += '๙';
            else newText += _number;
        }
        return newText;

    };
    var _getMonthThai = function(month) {
        month = parseInt(month)
        switch (month) {

            case 1:
                return "มกราคม";
            case 2:
                return "กุมภาพันธ์";
            case 3:
                return "มีนาคม";
            case 4:
                return "เมษายน";
            case 5:
                return "พฤษภาคม";
            case 6:
                return "มิถุนายน";
            case 7:
                return "กรกฎาคม";
            case 8:
                return "สิงหาคม";
            case 9:
                return "กันยนายน";
            case 10:
                return "ตุลาคม";
            case 11:
                return "พฤศจิกายน";
            case 12:
                return "ธันวาคม";
        }

    };
    var _dateEngToThaiStr = function(dateStr) {
        var arr = dateStr.split(" ");
        var date = arr[0];
        var time = arr[1];
        var dateArr = date.split("/");
        return dateArr[0] + " " + _getMonthThai(dateArr[1]) + " " + (parseInt(dateArr[2]) + 543) + " เวลา " + time + " น"
    }

    var _formatDate = (date) => {
        let strDate = moment(date).format('DD/MM/YYYY');
        let result = "";
        if (!strDate || strDate == null) { return result; }
        let arrDate = strDate.trim().split('/');
        let strYear = Number(arrDate[2]) + 543;
        let strMonth = Number(arrDate[1]);
        let strDay = Number(arrDate[0]);
        result = `${strDay}/${strMonth}/${strYear}`
        return result;
    }

    var _formatDatDB = (date) => {
            let strDate = moment(date).format('DD/MM/YYYY');
            let result = "";
            if (!strDate || strDate == null) { return result; }
            let arrDate = strDate.trim().split('/');
            let strYear = Number(arrDate[2]);
            let strMonth = Number(arrDate[1]);
            let strDay = Number(arrDate[0]);
            result = `${strYear}-${strMonth}-${strDay}`
            return result;
        }
        // Date Converter
    var _dateConverter = function(strDate) {
        var res;

        var arr = strDate.split(" ");
        var arrDate = arr[0].split("/");

        var year = parseInt(arrDate[0]);
        var month = parseInt(arrDate[1]) - 1;
        var day = parseInt(arrDate[2]);

        res = new Date(year, month, day);

        return res;

    }
    var _dateConverterStr = function(strDate) {
            var res;

            var arr = strDate.split(" ");
            var arrDate = arr[0].split("/");

            var year = parseInt(arrDate[0]);
            var month = parseInt(arrDate[1]);
            var day = parseInt(arrDate[2]);

            res = day + "/" + month + "/" + year;

            return res;

        }
        // UUID Generate
    var _generateUUID = function() {

        var d = new Date().getTime();

        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

        return uuid;
    }

    // Check Expressions
    var _checkThaiExpressions = function(value) {

        var letters = /^[ก-๙0-9._ ]*$/;

        return (value) ? letters.test(value) : false;
    }
    var _checkEngExpressions = function(value) {

        var letters = /^[a-zA-Z0-9._ ]*$/;

        return (value) ? letters.test(value) : false;
    }
    var _checkZipcodeExpressions = function(value) {

        var zipcode = /^\d{5}$/;

        return (value) ? zipcode.test(value) : false;
    }
    var _chectTelephoneExpressions = function(value) {

        var tel = /^\d{9}$/;

        return (value) ? tel.test(value) : false;
    }

    // Check Validate
    // coords are in lat and long
    var _filterInt = function(value) {
        if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
            return Number(value);
        return NaN;
    }
    var _checkValidLatitude = function(value) {

        var num = _filterInt(value);

        if (typeof num === 'number' && num <= 90 && num >= -90) {
            //valid
            return true;
        } else {
            //invalid
            return false;
        }
    }
    var _checkValidLongitude = function(value) {

        var num = _filterInt(value);

        if (typeof num === 'number' && num <= 180 && num >= -180) {
            //valid
            return true;
        } else {
            //invalid
            return false;
        }
    }

    var _setDateTimeThai = function(date, selectTime) {
        var tmpDt = new Date(date);
        var tmpH = (tmpDt.getHours() >= 10) ? tmpDt.getHours().toString() : ('0' + tmpDt.getHours().toString());
        var tmpM = (tmpDt.getMinutes() >= 10) ? tmpDt.getMinutes().toString() : ('0' + tmpDt.getMinutes().toString());
        if (selectTime) {
            return convertToDate(tmpDt) + ' ' + tmpH + ':' + tmpM + ' น.';
        } else {
            return convertToDate(tmpDt);
        }

    }


    var meterPerPixel = {
        0: '156412',
        1: '78206',
        2: '39103',
        3: '19551',
        4: '9776',
        5: '4888',
        6: '2444',
        7: '1222',
        8: '610.984',
        9: '305.492',
        10: '152.746',
        11: '76.373',
        12: '38.187',
        13: '19.093',
        14: '9.547',
        15: '4.773',
        16: '2.387',
        17: '1.193',
        18: '0.596',
        19: '0.298',
    };

    // convertNauticalMileToPixel
    var _convertNauticalMileToPixel = function(zoomLevel, radius) {
        var meter = _convertNauticalMileToMeter(radius);
        var pixel = _convertMeterToPixel(zoomLevel, meter);

        return pixel;
    }
    var _convertNauticalMileToMeter = function(nauticalMile) {
        return nauticalMile * 1852;
    }
    var _convertMeterToPixel = function(zoomLevel, meter) {
        return meter / parseFloat(meterPerPixel[zoomLevel]);
    }
    _formatDate
    // public
    commonServiceFactory.getNumberThai = _getNumberThai;
    commonServiceFactory.formatDate = _formatDate;
    commonServiceFactory.formatDatDB = _formatDatDB;
    commonServiceFactory.getMonthThai = _getMonthThai;
    commonServiceFactory.dateConverter = _dateConverter;
    commonServiceFactory.dateConverterStr = _dateConverterStr
    commonServiceFactory.generateUUID = _generateUUID;
    commonServiceFactory.checkThaiExpressions = _checkThaiExpressions;
    commonServiceFactory.checkEngExpressions = _checkEngExpressions;
    commonServiceFactory.checkZipcodeExpressions = _checkZipcodeExpressions;
    commonServiceFactory.chectTelephoneExpressions = _chectTelephoneExpressions;
    commonServiceFactory.filterInt = _filterInt;
    commonServiceFactory.checkValidLatitude = _checkValidLatitude;
    commonServiceFactory.checkValidLongitude = _checkValidLongitude;
    commonServiceFactory.convertNauticalMileToPixel = _convertNauticalMileToPixel;
    commonServiceFactory.setDateTimeThai = _setDateTimeThai;
    commonServiceFactory.dateEngToThaiStr = _dateEngToThaiStr;
    return commonServiceFactory;

}]);