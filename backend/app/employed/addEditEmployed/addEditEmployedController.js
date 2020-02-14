'use strict'

app.controller("addEditEmployedController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSaveAdd = [];
        this.model = {};
        this.typePage = {};
        this.Inventory = [];
        this.Users = [];

        this.init = function() {
            // checkRouteParams()
            // if ($scope.typeAdd) {
            //     getUsers();
            //     getInventory();
            // }

        }

        this.gridOptions = {
            gridID: 'gridSearchDevice',
            dataSource: new kendo.data.DataSource({ data: [], pageSize: 10 }),
            sortable: true,
            pageable: true,
            columns: [{
                    field: "INVENTORY_CODE",
                    title: "ID",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "TYPE",
                    title: "Type",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "NAME_TH",
                    title: "Name",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "DEPARTMENT",
                    title: "Department",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "ID_Staff",
                    title: "ID Staff",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "CREATE_DATE",
                    title: "Create Date",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "STATUS",
                    title: "Status",
                    attributes: {
                        class: "text-center"
                    }
                }
            ],
            management: true,
            operation: {
                view: false,
                del: true,
                edit: false
            },
            showIndex: false,
        };

        //ลบข้อมูลในตาราง
        this.gridCallbackDel = (item) => {
            // console.log("item", item);
            let delIndex = _this.modelSaveAdd.findIndex(x => x.arrNumber == item.arrNumber);
            _this.modelSaveAdd.splice(delIndex, 1);
            _this.gridOptions.dataSource.data(_this.modelSaveAdd);
        }

        this.addDevice = () => {

            if (!$scope.deviceForm.$valid) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else {


                let chk = _this.modelSaveAdd.find(e => {
                    return e.INVENTORY_CODE == _this.model.INVENTORY_CODE
                })

                if (chk) {
                    showAlertBox(msgSettings.msgRepeatedlyData, null);
                } else {
                    _this.modelSaveAdd.push(_this.model)
                    _this.gridOptions.dataSource.data(_this.modelSaveAdd);
                    _this.configInventory = undefined;
                    _this.config = undefined;
                    _this.model = {}
                }


            }
        }
        this.cancelForm = () => {
            $location.path("device");
        }

        this.saveFormAdd = () => {
            console.log("modelSaveAdd", _this.modelSaveAdd);
            if (_this.modelSaveAdd.length <= 0) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else {

                $http.post(webURL.webApi + "device/addDeviceService.php", _this.modelSaveAdd).then((res) => {
                    // console.log("res.data", res.data);
                    showAlertBox(msgSettings.msgSaveSucc, null);
                }).catch((err) => {
                    showAlertBox(msgSettings.msgNotSave, null);
                }).finally(() => {
                    $location.path("device");
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
            if (_this.typePage.type == "edit") {
                $scope.typeAdd = false;
                getInventoryEdit(_this.typePage.ID);
            } else {
                $scope.typeAdd = true;
            }
        }

        const getUsers = () => {
            loading.open();
            $http.get(webURL.webApi + "user/getUsersService.php").then((res) => {
                // console.log("res.data", res.data);
                _this.Users = res.data
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        const getInventory = () => {
            $http.get(webURL.webApi + "inventory/getInventoryService.php").then((res) => {
                // console.log("res.data", res.data);
                _this.Inventory = res.data
                loading.close();
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }


        ////////////Auto Complete Users//////////////////////////////////////

        this.config = {
            isDisabled: false,
            noCache: true,
            selectedItem: undefined,
        };




        this.selectedItem = (item) => {
            if (item) {

                _this.config.selectedItem = item;
                _this.model.USER_ID = item.ID;
                _this.model.NAME_TH = item.NAME_TH;
                _this.model.DEPARTMENT = item.DEPARTMENT;
                _this.model.ID_Staff = item.EMPLOYEE_CODE;

            }
        }



        this.querySearch = (query) => {
            var results = query ? _this.Users.filter(this.createFilterFor(query)) : _this.Users;
            return results;
        }
        this.createFilterFor = (query) => {
            var lowercaseQuery = angular.copy(query);

            return function filterFn(item) {
                return ((item.Name).search(new RegExp('(' + lowercaseQuery + ')', 'gi')) != -1);
            };
        }


        ////////////END Auto Complete Users//////////////////////////////////////

        ////////////Auto Complete Inventory//////////////////////////////////////

        this.configInventory = {
            isDisabled: false,
            noCache: true,
            selectedItem: undefined,
        };
        this.selectedItemInventory = (item) => {

            if (item) {
                _this.configInventory.selectedItem = item;
                _this.model.INVENTORY_ID = item.ID;
                _this.model.INVENTORY_CODE = item.INVENTORY_CODE;
                _this.model.STATUS = item.STATUS;
                _this.model.TYPE = item.TYPE;
                _this.model.CREATE_DATE = item.CREATE_DATE;
            }
        }
        this.querySearchInventory = (query) => {
            var results = query ? _this.Inventory.filter(this.createFilterFor(query)) : _this.Inventory;
            return results;
        }
        this.createFilterForInventory = (query) => {
            var lowercaseQuery = angular.copy(query);

            return function filterFn(item) {
                return ((item.Name).search(new RegExp('(' + lowercaseQuery + ')', 'gi')) != -1);
            };
        }


        ////////////END Auto Complete Inventory//////////////////////////////////////



    }

]);