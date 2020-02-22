'use strict'

app.controller("appController", ['$scope', '$rootScope', '$location', '$routeParams', '$http',
    function($scope, $rootScope, $location, $routeParams, userService, $http) {

        this.init = () => {

        }


        $scope.logOut = () => {
            location.reload();
            localStorage.removeItem("login");
            $location.path("login");
        }



    }
]);