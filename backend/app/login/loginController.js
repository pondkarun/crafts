'use strict'

app.controller("loginController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings) {

        $scope.model = {
            username: null,
            password: null
        }

        this.init = function() {}

        $scope.login = () => {


            loading.open();
            $scope.model.password = md5($scope.model.password);
            $http.post(webURL.webApi + "login/loginService.php", $scope.model).then((res) => {

                // console.log("res.data", res.data);
                if (res.data.loginStatus == '200') {
                    userService.saveData(res.data);
                    $rootScope.getMenu();
                    $location.path("/");
                    showAlertBox(msgSettings.msgWelcomeLogin + " " + userService.getnameTH());
                } else {
                    $scope.model.password = null
                    showAlertBox(msgSettings.msgErrPassword);
                }
            }).catch((err) => {
                $scope.model.password = null
                loading.close();
                showAlertBox(msgSettings.msgErrorApi);
            }).finally(() => {
                loading.close();
            });

        }

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }

    }
]);