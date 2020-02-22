'use strict'

app.service('userService', function () {
    var USERNAME;
    var EMPLOYEE_CODE;
    var STATUS;
    var STATUS_ID;
    var loggedin = false;
    var ID;



    this.saveData = function (data) {
        USERNAME = data.USERNAME;
        EMPLOYEE_CODE = data.EMPLOYEE_CODE;
        STATUS = data.STATUS;
        STATUS_ID = data.STATUS_ID;
        ID = data.ID;
        loggedin = true;
        localStorage.setItem('login', JSON.stringify({
            USERNAME: USERNAME,
            EMPLOYEE_CODE: EMPLOYEE_CODE,
            STATUS_ID: STATUS_ID,
            STATUS: STATUS,
            ID: ID,
            loggedin: loggedin
        }));
    };

    this.isUserLoggedIn = function () {
        if (localStorage.getItem('login')) {
            loggedin = true;
            var data = JSON.parse(localStorage.getItem('login'));
            USERNAME = data.USERNAME;
            ID = data.ID;
        } else {
            loggedin = false;
        }
        return loggedin;
    };


    this.getName = function () {
        return USERNAME;
    };

    this.setID = function (userID) {
        ID = userID;
    };
    this.getID = function () {
        return ID;
    };
    this.getLoggedin = function () {
        return loggedin;
    };
    this.getStatusID = function () {
        let STATUS_MENU = null;
        if (localStorage.getItem('login')) {
            let STATUS = JSON.parse(localStorage.getItem('login'));
            STATUS_MENU = STATUS.STATUS_ID
        }
        return STATUS_MENU;
    };

})