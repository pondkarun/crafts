'use strict'

app.service('customerService', function() {
    var id;
    var username;
    var nameTH;
    var loggedin = false;

    this.saveData = function(data) {
        // console.log("data", data);

        id = data.id;
        username = data.username;
        nameTH = data.nameTH;
        loggedin = true;
        localStorage.setItem('loginCustomer', JSON.stringify({
            id: id,
            username: username,
            nameTH: nameTH,
            loggedin: loggedin
        }));
    };

    this.isUserLoggedIn = function() {
        if (localStorage.getItem('loginCustomer')) {
            loggedin = true;
            var data = JSON.parse(localStorage.getItem('loginCustomer'));
            username = data.username;
            id = data.id;
        } else {
            loggedin = false;
        }
        return loggedin;
    };

    this.getUsername = function() {
        return username;
    };

    this.getNameTH = function() {
        var data = JSON.parse(localStorage.getItem('loginCustomer'));
        return data ? data.nameTH : null;
    };

    this.setID = function(userID) {
        id = userID;
    };

    this.getID = function() {
        return id;
    };

    this.getLoggedin = function() {
        return loggedin;
    };


})