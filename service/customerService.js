'use strict'

app.service('customerService', function() {
    var id;
    var username;
    var loggedin = false;

    this.saveData = function(data) {
        console.log("data", data);

        id = data.id;
        username = data.username;
        loggedin = true;
        localStorage.setItem('loginCustomer', JSON.stringify({
            id: id,
            username: username,
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