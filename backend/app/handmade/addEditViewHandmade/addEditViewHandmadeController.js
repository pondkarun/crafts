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
            imageStrings: [],
            employed_id: userService.getID()
        };


        this.typePage = {};
        $scope.isView = false;
        this.init = function() {
            checkRouteParams()
            getType()
        }


        this.chipModel = (chip) => {
            let item = {
                color: _this.model.color,
                size: chip
            }
            _this.modelSave.size.push(item);
        }

        this.removableSize = (item) => {
            let delIndex = _this.modelSave.size.findIndex((x) => x.size == item && x.color == _this.model.color);
            _this.modelSave.size.splice(delIndex, 1);
        }

        this.mapchipModel = (item) => {
            _this.model.size = [];
            _this.modelSave.size.filter((e) => {
                if (e.color == item) {
                    _this.model.size.push(e.size);
                }
            })
        }


        //อัพโหลด
        this.processFiles = (files) => {
            angular.forEach(files, function(flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function(event) {
                    let item = {
                        image: event.target.result,
                        name: flowFile.name
                    }
                    _this.modelSave.imageStrings.push(item);
                };
                fileReader.readAsDataURL(flowFile.file);
            });
        };

        this.delImg = (item) => {
            let delIndex = _this.modelSave.imageStrings.findIndex((x) => x.name == item);
            _this.modelSave.imageStrings.splice(delIndex, 1);
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

            } else if (_this.modelSave.imageStrings.length <= 0) {
                showAlertBox("กรุณาเลือกรูปภาพ", null);
            } else {

                $http.post(webURL.webApi + "handmade/addEditHandmadeService.php", _this.modelSave).then((res) => {
                    // console.log("res.data", res.data);
                    if (res.data.status == "200") {
                        if (res.data.id) {
                            showAlertBox(msgSettings.msgSaveSucc, null);
                        }
                    } else {
                        showAlertBox(msgSettings.msgNotSave, null);
                    }
                }).catch((err) => {
                    showAlertBox(msgSettings.msgErrorApi, null);
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
                if (res.data == "200") {
                    $location.path("handmade");
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