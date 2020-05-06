'use strict'

app.controller("craftsController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'msgSettings' , 'customDialog' ,
    function($scope, $rootScope, $location, $routeParams, userService, $http , msgSettings , customDialog) {
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
        $scope.account = () => {
            $scope.states.activeItem = "account"
            $location.path("account");
        }
        

        $scope.logOut = () => {
            var callback = (res) => {
                location.reload();
                localStorage.removeItem("loginCrafts");
                $location.path("loginCrafts");
            }
            showConfirmBox(msgSettings.msglogOut, callback, null);  
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
                $scope.positionName = userService.getnameTH() + " (" + userService.getPositionName() + ")";
                loading.close();
            }).catch((err) => {
                loading.close();
                console.log("Error");
            })
        }

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }
        function showConfirmBox(msg, okCallback, cancelCallback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.confirm(okCallback, cancelCallback, dialog);
        }


    }
]);