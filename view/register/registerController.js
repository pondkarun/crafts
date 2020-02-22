'use strict'

app.controller("registerController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings) {
        var _this = this;
        this.modelSave = {
            username: null,
            password: null,
            password_con: null,
            name: null,
            surname: null,
            email: null,
            address: null,
            tel: null
        }
        this.init = function() {}

        this.save = () => {
            console.log("this.modelSave", _this.modelSave);
        }

        this.cancel = () => {
            $location.path("home");
        }
    }
]);