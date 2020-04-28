'use strict'

app.controller("accountController", ['$scope', '$rootScope', '$location', '$routeParams', 'customerService', '$http', 'customDialog', 'msgSettings', 'PaginationService',
    function($scope, $rootScope, $location, $routeParams, customerService, $http, customDialog, msgSettings, PaginationService) {
        var _this = this;
      
        this.init = function() {
            getCustomerFormEdit(customerService.getID());
            $scope.isView = true;
            title($scope.isView)
        }

        this.editCustomer = () => {
            $scope.isView = false;
            title($scope.isView)
        }

        this.cancelForm = () => {
            $scope.isView = true;
            title($scope.isView)
        }

        this.saveFormAdd = () => {
            // console.log("modelSave", _this.modelSave);
            if (!$scope.customerForm.$valid) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else if (_this.modelSave.passwordNew1 != _this.modelSave.passwordNew2) {
                showAlertBox(msgSettings.msgUnlikePassword, null);
                modelPassNull()
            } else if (_this.modelSave.password != md5(_this.modelSave.passwordTrue)) {
                showAlertBox(msgSettings.msgErrPassword, null);
                modelPassNull()
            } else {

                this.modelSave.passwordNew = (_this.modelSave.passwordNew1) ? md5(_this.modelSave.passwordNew1) : md5(_this.modelSave.passwordTrue);

                $http.post(webURL.webApi + "customers/editCustomerService.php", _this.modelSave).then((res) => {
                    // console.log("res.data", res.data);
                    if (res.data == "404") {
                        showAlertBox(msgSettings.msgErrIDcardRepeat, null);
                    } else {
                        showAlertBox(msgSettings.msgSaveSucc, getCustomerFormEdit(customerService.getID()));
                        $scope.isView = true;
                        title($scope.isView)
                    }
                }).catch((err) => {
                    showAlertBox(msgSettings.msgNotSave, null);
                })
                modelPassNull()
            }
        }

        function title(item) {
            $scope.title = item ? "บัญชีผู้ใช้" : "แก้ไขบัญชีผู้ใช้";
        }

        function modelPassNull(item) {
            _this.modelSave.passwordNew1 = null
            _this.modelSave.passwordNew2 = null
            _this.modelSave.passwordTrue = null
        }

        const getCustomerFormEdit = (ID) => {
            // console.log(ID);
            
            loading.open();
            $http.post(webURL.webApi + "customers/getViewEditCustomerService.php", ID).then((res) => {
                // console.log("res.data", res.data);
                if (res.data.status == "200") {
                    this.modelSave = res.data;
                } else {
                    showAlertBox(msgSettings.msgErrorApi, null);
                }
                loading.close();
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }
       
        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }

    }
]);