'use strict'

app.controller("viewRequestController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        $scope.isDisabled = false;
        this.modelSave = {
            ID: null,
            SERVICES_CODE: null,
            CreateDate: null,
            TYPE_ID: null,
            DETAIL: null,
            REMARK: null,
            ANALYZE: null,
            STATUS: null
        };
        this.listType = [];

        $scope.listStatus = [{
                ID: 2,
                STATUS: "แจ้งซ้อม",
                VALUE: "แจ้งซ้อม"
            },
            {
                ID: 3,
                STATUS: "รอการอนุมัติของ",
                VALUE: "รอการอนุมัติของ"
            },
            {
                ID: 4,
                STATUS: "แก้ไขเรียบร้อย",
                VALUE: "แก้ไขเรียบร้อย"
            }

        ]

        this.init = function() {
            _this.typePage = $routeParams;
            getTypeInventory();
            getRequestIT(_this.typePage.ID);
        }


        this.cancelForm = () => {
            $location.path("request");
        }

        this.saveForm = () => {

            if (!$scope.projectForm.$valid) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else {
                // console.log("modelSave", _this.modelSave);
                _this.modelSave.STAF_ID = userService.getID();
                $http.post(webURL.webApi + "request/updateRequestService.php", _this.modelSave).then((res) => {
                    // console.log("res.data", res.data);
                    showAlertBox(msgSettings.msgSaveSucc, null);
                }).catch((err) => {
                    showAlertBox(msgSettings.msgNotSave, null);
                }).finally(() => {
                    $location.path("request");
                });
            }
        }


        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
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

        const getRequestIT = (ID) => {
            loading.open();
            // console.log("getRequestIT ID", ID);
            $http.post(webURL.webApi + "request/getRequestEditViewService.php", ID).then((res) => {
                console.log("res.data", res.data);
                if (res.data.status == "404") {
                    showAlertBox(msgSettings.msgErrorApi, null);
                } else {
                    _this.modelSave = res.data
                }

                if (_this.modelSave.STATUS != "แจ้งซ้อม") {
                    $scope.isDisabled = true;
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