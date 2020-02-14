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
            address: null
        };
        this.typePage = {};
        $scope.isView = false;
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

                $http.post(webURL.webApi + "employed/addEmployedService.php", _this.modelSave).then((res) => {
                    console.log("res.data", res.data);
                    showAlertBox(msgSettings.msgSaveSucc, null);
                }).catch((err) => {
                    showAlertBox(msgSettings.msgNotSave, null);
                }).finally(() => {
                    $location.path("employed");
                });

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
                $scope.title = "แก้ไขผู้รับจ้าง";
                getEmployedEdit(_this.typePage.ID);
            } else if (_this.typePage.Type == "add") {
                $scope.title = "เพิ่มผู้รับจ้าง";
            } else if (_this.typePage.Type == "view") {
                $scope.title = "ข้อมูลผู้รับจ้าง";
                $scope.isView = true;
            } else {
                $location.path("employed");
            }
        }

        const getEmployedEdit = (ID) => {
            // $http.get(webURL.webApi + "inventory/getInventoryService.php" , ID).then((res) => {
            //     // console.log("res.data", res.data);
            //     loading.close();
            // }).catch((err) => {
            //     console.log("Error");
            //     loading.close();
            //     showAlertBox(msgSettings.msgErrorApi, null);
            // })
        }

    }

]);