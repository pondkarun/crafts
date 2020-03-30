'use strict'

app.controller("addEditEmployedController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSave = {
            name: null,
            surname: null,
            id_card: null,
            tel: null,
            email: null,
            address: null,
            id_position: null
        };
        this.typePage = {};
        $scope.isView = false;
        this.id_position = userService.getPositionID();
        $scope.titelPosition = (this.id_position == '3') ? "เจ้าหน้าที่" : "ผู้รับจ้าง";
        this.init = function() {
            checkRouteParams()
        }

        this.cancelForm = () => {
            $location.path("employed");
        }

        this.saveFormAdd = () => {
            // console.log("modelSave", _this.modelSave);
            if (!$scope.employedForm.$valid) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else {
                let goto = () => {
                    $location.path("employed");
                }
                $http.post(webURL.webApi + "employed/addEditEmployedService.php", _this.modelSave).then((res) => {
                    // console.log("res.data", res.data);
                    if (res.data == "404") {
                        showAlertBox(msgSettings.msgErrIDcardRepeat, null);
                    } else {
                        showAlertBox(msgSettings.msgSaveSucc, goto());
                    }
                }).catch((err) => {
                    showAlertBox(msgSettings.msgNotSave, null);
                })

            }
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
            $http.post(webURL.webApi + "employed/getViewEditEmployedService.php", ID).then((res) => {
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

    }

]);