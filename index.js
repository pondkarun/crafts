'use strict'

app.controller("appController", ['$scope', '$rootScope', '$location', '$routeParams', 'customerService', '$http', 'msgSettings', 'customDialog',
    function($scope, $rootScope, $location, $routeParams, customerService, $http, msgSettings, customDialog) {
        var _this = this;
        this.modelLogin = {
            username: null,
            password: null
        }
        this.init = () => {}
        $scope.modal = null
        $scope.register = () => {
            $location.path("register");
        }

        $scope.showMenu = () => {
            return customerService.isUserLoggedIn()
        }

        this.login = () => {
            loading.open();
            _this.modelLogin.password = md5(_this.modelLogin.password);
            $http.post(webURL.webApi + "login/loginCustomersService.php", _this.modelLogin).then((res) => {
                console.log("res.data", res.data);
                if (res.data.loginCustomersStatus == '200') {
                    customerService.saveData(res.data);
                    $scope.modal = "modal";
                } else {
                    _this.modelLogin.password = null
                    loading.close();
                    alert(msgSettings.msgErrUserNot)
                }
            }).catch((err) => {
                _this.modelLogin.password = null
            }).finally(() => {
                loading.close();
            });

        }

        this.logOut = () => {
            location.reload();
            localStorage.removeItem("loginCustomer");
            $location.path("home");
        }

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }

    }
]);