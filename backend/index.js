'use strict'

app.controller("craftsController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http',
    function($scope, $rootScope, $location, $routeParams, userService, $http) {
        $scope.menuShow = [];
       
        this.init = () => {
            $rootScope.getMenu();
        }
        $scope.states = {};
        $scope.states.activeItem = 'account';
        $scope.showMenu = () => {
            if (!userService.isUserLoggedIn()) {
                localStorage.removeItem("loginCrafts");
                $location.path("login");
            }
            return userService.isUserLoggedIn()
        }

        $scope.routep = (item) => {
            // console.log("item", item);
            $scope.states.activeItem = item
            $location.path(item);
        }

        $scope.logOut = () => {
            location.reload();
            localStorage.removeItem("loginCrafts");
            $location.path("loginCrafts");
        }

        /** เรียก sidebar */
        $rootScope.getMenu = () => {
            $scope.menuShow = [];
            loading.open();
            let StatusID = userService.getStatusID()
            $http.post(webURL.webApi + "menu/menuService.php", StatusID).then((res) => {
                // console.log("res.data", res.data);
                for (let i = 0; i < res.data.length; i++) {
                    $scope.menuShow.push(res.data[i]);
                }
                $scope.positionName = userService.getPositionName()
                loading.close();
            }).catch((err) => {
                loading.close();
                console.log("Error");
            })
        }


    }
]);