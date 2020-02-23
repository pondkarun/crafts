'use strict'

app.controller("registerController", ['$scope', '$rootScope', '$location', '$routeParams', 'customerService', '$http', 'customDialog', 'msgSettings',
    function($scope, $rootScope, $location, $routeParams, customerService, $http, customDialog, msgSettings) {
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
            if (!$scope.register.$valid) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else if (_this.modelSave.password != _this.modelSave.password_con) {
                showAlertBox(msgSettings.msgUnlikePassword, null);
                modelPassNull()
            } else {
                _this.modelSave.password = md5(_this.modelSave.password);
                _this.modelSave.password_con = md5(_this.modelSave.password_con);
                $http.post(webURL.webApi + "customers/registerService.php", _this.modelSave).then((res) => {
                    console.log("res.data", res.data);
                    if (res.data == "404") {
                        showAlertBox(msgSettings.msgErrUserRepeat, null);
                        modelPassNull()
                    } else if (res.data == "200") {
                        showAlertBox(msgSettings.msgSaveSucc, null);
                        $location.path("home");
                    } else {
                        showAlertBox(msgSettings.msgNotSave, null);
                        modelPassNull()
                    }
                }).catch((err) => {
                    showAlertBox(msgSettings.msgNotSave, null);
                })

            }
        }

        this.cancel = () => {
            $location.path("home");
        }

        function modelPassNull(item) {
            _this.modelSave.password = null
            _this.modelSave.password_con = null
        }


        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }

    }
]);