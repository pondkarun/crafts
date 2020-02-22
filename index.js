'use strict'

app.controller("appController", ['$scope', '$rootScope', '$location', '$routeParams', '$http',
    function($scope, $rootScope, $location, $routeParams, userService, $http) {
        var _this = this;
        this.init = () => {}

        $scope.register = () => {
            $location.path("register");
        }

        $scope.logOut = () => {
            location.reload();
            localStorage.removeItem("login");
            $location.path("login");
        }

    }
]);