'use strict'

app.service('userService', function() {
    var username;
    var id_card;
    var position;
    var id_position;
    var loggedin = false;
    var id;



    this.saveData = function(data) {
        username = data.username;
        id_card = data.id_card;
        position = data.position;
        id_position = data.id_position;
        id = data.id;
        loggedin = true;
        localStorage.setItem('loginCrafts', JSON.stringify({
            username: username,
            id_card: id_card,
            id_position: id_position,
            position: position,
            id: id,
            loggedin: loggedin
        }));
    };

    this.isUserLoggedIn = function() {
        if (localStorage.getItem('loginCrafts')) {
            loggedin = true;
            var data = JSON.parse(localStorage.getItem('loginCrafts'));
            username = data.username;
            id = data.id;
        } else {
            loggedin = false;
        }
        return loggedin;
    };


    this.getName = function() {
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
    this.getStatusID = function() {
        let STATUS_MENU = null;
        if (localStorage.getItem('loginCrafts')) {
            let position = JSON.parse(localStorage.getItem('loginCrafts'));
            STATUS_MENU = position.id_position
        }
        return STATUS_MENU;
    };

})