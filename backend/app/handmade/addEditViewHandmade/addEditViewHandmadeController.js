'use strict'

app.controller("addEditViewHandmadeController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSave = {
            name: null,
            price: null,
            type_id: null,
            color: [],
            size: [],
            employed_id: userService.getID()
        };
        this.modelSave = {
            name: "fgfd",
            price: 953751301,
            type_id: "18F9D3C992A84D15AE016B6FFF5F6CCE",
            color: ["5"],
            size: [{ color: "5", size: "2" }],
            employed_id: userService.getID()
        };
        this.listType = [];
        this.model = {
            color: null,
            size: []
        };

        this.chipModel = (chip) => {
            let item = {
                color: _this.model.color,
                size: chip
            }
            _this.modelSave.size.push(item);
        }

        this.mapchipModel = (item) => {
            _this.model.size = [];
            _this.modelSave.size.filter((e) => {
                if (e.color == item) {
                    _this.model.size.push(e.size);
                }
            })
        }

        this.typePage = {};
        $scope.isView = false;
        this.init = function() {
            checkRouteParams()
            getType()
        }

        this.cancelForm = () => {
            $location.path("handmade");
        }

        this.saveFormAdd = () => {
            if (!$scope.employedForm.$valid) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else if (_this.modelSave.color.length <= 0) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else if (_this.modelSave.size.length <= 0) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else {

                $http.post(webURL.webApi + "handmade/addEditHandmadeService.php", _this.modelSave).then((res) => {
                    console.log("res.data", res.data);
                    if (res.data.status == "200") {
                        if (res.data.id) {
                            uploadImage(res.data.id)
                        }
                    } else {
                        showAlertBox(msgSettings.msgNotSave, null);
                    }
                }).catch((err) => {
                    showAlertBox(msgSettings.msgNotSave, null);
                })
            }
        }

        function uploadImage(id) {
            var fd = new FormData();
            angular.forEach($scope.files, function(file) {
                fd.append('file[]', file);
            });
            fd.append('formdata', JSON.stringify(id));
            $http.post(webURL.webApi + '/handmade/uploadImageHandmadeService.php', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-type': undefined
                }
            }).then((res) => {
                console.log("res", res);
            });
        }

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }

        function checkRouteParams() {
            _this.typePage = $routeParams;
            if (_this.typePage.Type == "edit") {
                $scope.title = "แก้ไขงานฝีมือ";
                getEmployedEdit(_this.typePage.ID);
            } else if (_this.typePage.Type == "add") {
                $scope.title = "เพิ่มงานฝีมือ";
            } else if (_this.typePage.Type == "view") {
                $scope.title = "ข้อมูลงานฝีมือ";
                getEmployedEdit(_this.typePage.ID);
                $scope.isView = true;
            } else {
                $location.path("handmade");
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

        const getType = () => {
            $http.get(webURL.webApi + "type/getTypeService.php").then((res) => {
                // console.log("res.data", res.data);
                _this.listType = res.data
            }).catch((err) => {
                console.log("Error");
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

    }

]);