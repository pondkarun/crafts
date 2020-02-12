'use strict'

app.controller("inventoryController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSearch = {
            INVENTORY_CODE: null,
            BRAND: null,
            TYPE_ID: null,
            MODEL: null,
            SERIAL: null,
            STATUS: "all"
        };
        _this.ID = userService.getID();

        this.init = function() {
            getTypeInventory();
            _this.searchInventory();
        }

        this.gridOptions = {
            gridID: 'gridSearchInventory',
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
                    field: "BRAND",
                    title: "Brand",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "MODEL",
                    title: "Model",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "SERIAL",
                    title: "Serial",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "PurchaseDate",
                    title: "Purchase Date",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "DisposedDate",
                    title: "Disposed Date",
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
                del: false,
                edit: true
            },
            showIndex: false,
        };
        this.gridCallbackEdit = (item) => {
            // console.log("item", item);
            $location.path("inventory" + "/edit/" + item.ID);
        }
        this.addInventory = () => {
            $location.path("inventory" + "/add/" + 0);
        }

        const getTypeInventory = () => {
            $http.get(webURL.webApi + "inventory/getTypeInventoryService.php").then((res) => {
                $scope.listType = res.data
            }).catch((err) => {
                console.log("Error");
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        this.searchInventory = () => {
            // console.log("modelSearch", _this.modelSearch);
            loading.open();
            $http.post(webURL.webApi + "inventory/searchInventoryService.php", _this.modelSearch).then((res) => {
                // console.log("res.data", res.data);

                res.data.filter((e) => {
                    e.PurchaseDate = commonService.formatDate(e.PurchaseDate)
                    e.STATUS = (e.STATUS == 'ใช้งาน') ? "Active" : "Terminate";
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

        this.clearInventory = () => {
            _this.modelSearch = {
                INVENTORY_CODE: null,
                BRAND: null,
                TYPE_ID: null,
                MODEL: null,
                SERIAL: null,
                STATUS: "all"
            };
            _this.searchInventory();
        }

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }


    }

]);