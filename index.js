'use strict'

app.controller("appController", ['$scope', '$rootScope', '$location', '$routeParams', 'customerService', '$http', 'msgSettings', 'customDialog',
    function ($scope, $rootScope, $location, $routeParams, customerService, $http, msgSettings, customDialog) {
        var _this = this;
        this.modelLogin = {
            username: null,
            password: null
        }
        this.init = () => {
            getNameTH()
        }
        $scope.states = {};
        $scope.states.activeItem = 'home';
        $scope.modal = null
        $scope.register = () => {
            $location.path("register");
        }
        const getNameTH = () => {
            $scope.NameTH = customerService.getNameTH()
        }
        $scope.showMenu = () => {
            return customerService.isUserLoggedIn()
        }

        this.routep = (item) => {
            // console.log("item", item);
            $scope.states.activeItem = item
            $location.path(item);
        }

        function set() {
            var o = document.getElementsByTagName("BODY")[0]
            o.style.cssText = "padding-right: 0px;"
        }

        this.login = () => {
            loading.open();
            _this.modelLogin.password = md5(_this.modelLogin.password);
            $http.post(webURL.webApi + "login/loginCustomersService.php", _this.modelLogin).then((res) => {
                console.log("res.data", res.data);
                if (res.data.loginCustomersStatus == '200') {
                    customerService.saveData(res.data);
                    getNameTH()
                    $scope.modal = "modal";
                    showAlertBox(msgSettings.msgWelcomeLogin + " " + $scope.NameTH, set);
                } else {
                    _this.modelLogin.password = null
                    loading.close();
                    showAlertBox(msgSettings.msgErrUserNot, set);
                }
            }).catch((err) => {
                _this.modelLogin.password = null
            }).finally(() => {
                loading.close();
               
            });

        }

        this.logOut = () => {
            var callback = (res) => {
                location.reload();
                localStorage.removeItem("loginCustomer");
                $location.path("home");
            }
            showConfirmBox(msgSettings.msglogOut, callback, null);  
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