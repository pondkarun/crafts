'use strict'

app.controller("addEditCustomersController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function ($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSave = {
            username: null,
            password: null,
            password_con: null,
            name: null,
            surname: null,
            email: null,
            address: null,
            tel: null,
            statusCustomers: "ปกติ"
        }

        $scope.isDisabled = ($routeParams.Type == "add") ? false : true;
        $scope.isView = ($routeParams.Type == "view") ? true : false;

        $scope.titelPosition = "ลูกค้า";
        this.init = function () {
            checkRouteParams()
        }

        this.cancel = () => {
            $location.path("customers");
        }

        this.save = () => {
            if ($routeParams.Type == "edit") {
                if (!$scope.register.$valid) {
                    showAlertBox(msgSettings.msgValidForm, null);
                } else {
                    $http.post(webURL.webApi + "customers/editCustomerService.php", _this.modelSave).then((res) => {
                        // console.log("res.data", res.data);
                        if (res.data == "404") {
                            showAlertBox(msgSettings.msgErrIDcardRepeat, null);
                        } else {
                            showAlertBox(msgSettings.msgSaveSucc, ()=> {
                                $location.path("customers");
                            });
                        }
                    }).catch((err) => {
                        showAlertBox(msgSettings.msgNotSave, null);
                    })
                }
            } else {
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
                            $location.path("customers");
                        } else {
                            showAlertBox(msgSettings.msgNotSave, null);
                            modelPassNull()
                        }
                    }).catch((err) => {
                        showAlertBox(msgSettings.msgNotSave, null);
                    })

                }
            }
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

        function checkRouteParams() {
            _this.typePage = $routeParams;
            // console.log("_this.typePage", _this.typePage);
            if (_this.typePage.Type == "edit") {
                $scope.title = "แก้ไข" + $scope.titelPosition;
                getEmployedEdit(_this.typePage.ID);
            } else if (_this.typePage.Type == "add") {
                $scope.title = "เพิ่ม" + $scope.titelPosition;
            } else if (_this.typePage.Type == "view") {
                $scope.title = "ข้อมูล" + $scope.titelPosition;
                getEmployedEdit(_this.typePage.ID);
                $scope.isView = true;
            } else {
                $location.path("employed");
            }
        }

        const getEmployedEdit = (ID) => {
            loading.open();
            $http.post(webURL.webApi + "customers/getViewEditCustomerService.php", ID).then((res) => {
                // console.log("res.data", res.data);
                if (res.data.status == "200") {
                    this.modelSave = res.data;
                    this.modelSave.password_con = this.modelSave.password
                    this.modelSave.passwordNew = this.modelSave.password
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

    }

]);