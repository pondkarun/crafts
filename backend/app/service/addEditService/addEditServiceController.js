'use strict'

app.controller("addEditServiceController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSave = {};
        this.listType = [];
        this.listPeripeteiasAll = [];
        this.listPeripeteias = [];
        $scope.showSatisfaction = false;

        this.init = function() {
            _this.typePage = $routeParams;
            if (_this.typePage.Type == "add") {
                $scope.isAdd = true
                _this.modelSave = {
                    USER_ID: userService.getID(),
                    PERIPETEIA_ID: null,
                    DETAIL: null,
                    TYPE_ID: null
                }
            } else if (_this.typePage.Type == "view") {
                $scope.isAdd = false
                getRequestIT(_this.typePage.ID);
            } else {
                $location.path("service");
            }

            getTypeInventory();
            getPeripeteias();


        }


        this.cancelForm = () => {
            $location.path("service");
        }

        this.saveForm = () => {

            if (!$scope.projectForm.$valid || !_this.modelSave.TYPE_ID) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else {
                // console.log("modelSave", _this.modelSave);
                if ($scope.isAdd) {
                    $http.post(webURL.webApi + "service/addServiceService.php", _this.modelSave).then((res) => {
                        // console.log("res.data", res.data);
                        showAlertBox(msgSettings.msgSaveSucc, null);
                    }).catch((err) => {
                        showAlertBox(msgSettings.msgNotSave, null);
                    }).finally(() => {
                        $location.path("service");
                    });
                } else {
                    $http.post(webURL.webApi + "service/updateServiceService.php", _this.modelSave).then((res) => {
                        // console.log("res.data", res.data);
                        showAlertBox(msgSettings.msgSaveSucc, null);
                    }).catch((err) => {
                        showAlertBox(msgSettings.msgNotSave, null);
                    }).finally(() => {
                        $location.path("service");
                    });
                }
            }
        }


        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }

        this.filterPeripeteias = (ID) => {
            this.listPeripeteias = [];
            this.modelSave.PERIPETEIA_ID = null;
            // console.log("filterPeripeteias ID", ID);
            _this.listPeripeteiasAll.filter((e) => {
                if (e.TYPE_ID == ID) {
                    this.listPeripeteias.push(e)
                }
            })
        }

        const getTypeInventory = () => {
            loading.open();
            $http.get(webURL.webApi + "inventory/getTypeInventoryService.php").then((res) => {
                // console.log("res.data", res.data);
                loading.close();
                _this.listType = res.data
                    // console.log("listType", _this.listType);
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        const getPeripeteias = () => {
            loading.open();
            $http.get(webURL.webApi + "peripeteias/getPeripeteiasService.php").then((res) => {
                // console.log("res.data", res.data);
                _this.listPeripeteiasAll = res.data;
                // console.log("listPeripeteiasAll", _this.listPeripeteiasAll);
                loading.close();
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }


        const getRequestIT = (ID) => {
            loading.open();
            // console.log("getRequestIT ID", ID);
            $http.post(webURL.webApi + "request/getRequestEditViewService.php", ID).then((res) => {
                // console.log("res.data", res.data);
                if (res.data.status == "404") {
                    showAlertBox(msgSettings.msgErrorApi, null);
                } else {
                    _this.modelSave = res.data
                }

                if (_this.modelSave.STATUS == "แก้ไขเรียบร้อย") {
                    $scope.showSatisfaction = true;
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