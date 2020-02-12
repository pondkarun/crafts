'use strict'

app.controller("deviceController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function ($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSearch = {
            INVENTORY_CODE: null,
            TYPE_ID: null,
            Name: null,
            EMPLOYEE_CODE: null,
            STATUS: "ใช้งาน"
        };
        _this.ID = userService.getID();

        this.init = function () {
            getTypeInventory();
            _this.searchDevice();
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
                field: "Name",
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
                field: "EMPLOYEE_CODE",
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
        this.gridCallbackDel = (item) => {

            var callback = () => {
                let dateNow = commonService.formatDatDB(new Date());
                let model = {
                    ID: item.ID,
                    EXPIRED_DATE: dateNow
                }
                console.log("model", model);
                loading.open();
                $http.post(webURL.webApi + "device/delDeviceService.php", model).then((res) => {
                    //console.log("res.data", res.data);
                    // showAlertBox(msgSettings.msgSaveSucc, null);
                }).catch((err) => {
                    loading.close();
                    showAlertBox(msgSettings.msgNotSave, null);
                }).finally(() => {
                    loading.close();
                    _this.searchDevice()
                });
            }
            showConfirmBox(msgSettings.msgDelConfirm, callback, undefined);
        }
        this.addDevice = () => {
            $location.path("device" + "/add/" + 0);
        }

        const getTypeInventory = () => {
            $http.get(webURL.webApi + "inventory/getTypeInventoryService.php").then((res) => {
                $scope.listType = res.data
            }).catch((err) => {
                console.log("Error");
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        this.searchDevice = () => {
            console.log("modelSearch", _this.modelSearch);
            loading.open();
            $http.post(webURL.webApi + "device/searchDeviceService.php", _this.modelSearch).then((res) => {
                // console.log("res.data", res.data);

                res.data.filter((e) => {
                    e.PurchaseDate = commonService.formatDate(e.PurchaseDate)
                    e.STATUS = (e.STATUS == 'ใช้งาน') ? "Active" : "Inactive";
                    if (e.DisposedDate && e.DisposedDate != "0000-00-00") {
                        e.DisposedDate = commonService.formatDate(e.DisposedDate)
                    } else {
                        e.DisposedDate = "-"
                    }
                })

                _this.gridOptions.dataSource.data(res.data);
                loading.close();
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        this.clearDevice = () => {
            this.modelSearch = {
                INVENTORY_CODE: null,
                TYPE_ID: null,
                Name: null,
                EMPLOYEE_CODE: null,
                STATUS: "ใช้งาน"
            };
            _this.searchDevice();
        }

        //************dialog func***************//

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }

        function showConfirmBox(msg, okCallback, cancelCallback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.confirm(okCallback, cancelCallback, dialog);
        }

        //************end dialog func***************//
    }

]);