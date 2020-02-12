'use strict'

app.controller("loginController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings',
    function ($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings) {

        $scope.model = {
            USERNAME: null,
            PASSWORD: null
        }

        this.init = function () {
            // var callback = (res) => {
            //     $('.k-window').css("visibility", "visible");
            //     $('.k-overlay').css("display", "block");
            // }
            // $('.k-window').css("visibility", "hidden");
            // $('.k-overlay').css("display", "none");
            // showAlertBox(msgSettings.msgValidForm, callback);
        }

        $scope.login = () => {


            loading.open();
            $scope.model.PASSWORD = md5($scope.model.PASSWORD);
            $http.post(webURL.webApi + "login/loginService.php", $scope.model).then((res) => {

                //console.log("res.data", res.data);
                if (res.data.statusLogin == 'loggedin') {
                    userService.saveData(res.data);
                    $rootScope.getMenu();
                    $location.path("/");
                } else {
                    $scope.model.PASSWORD = null
                    showAlertBox('invalid login');
                }
            }).catch((err) => {
                $scope.model.PASSWORD = null
            }).finally(() => {
                loading.close();
            });

        }

        // function showAlertBox(msg, callback) {
        //     var dialog = customDialog.defaultObj();
        //     dialog.content = msg;
        //     customDialog.alert(callback, dialog);
        // }

    }
]);