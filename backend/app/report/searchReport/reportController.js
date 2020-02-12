'use strict'

app.controller("reportController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSearch = {
            ID: null,
            COMID: null,
            NAME_STAFF: null,
            NAME_EM: null,
            START_DATE: null,
            END_DATE: null,
            STATUS: "all"
        };
        _this.ID = userService.getID();

        this.init = function() {
            _this.searchReport();
        }

        this.gridOptions = {
            gridID: 'gridSearchReport',
            dataSource: new kendo.data.DataSource({ data: [], pageSize: 10 }),
            sortable: true,
            pageable: true,
            columns: [{
                    field: "ID",
                    title: "ID",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "COMID",
                    title: "Company",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "NAME_STAFF",
                    title: "ผู้ซ่อม",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "NAME_EM",
                    title: "ผู้แจ้ง",
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
                },

                {
                    field: "START_DATE",
                    title: "Start Date ",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "END_DATE",
                    title: "End Date",
                    attributes: {
                        class: "text-center"
                    }
                },

            ],
            management: false,
            operation: {
                view: false,
                del: false,
                edit: false
            },
            showIndex: false,
        };


        this.searchReport = () => {
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

        this.clearReport = () => {
            _this.modelSearch = {
                INVENTORY_CODE: null,
                BRAND: null,
                TYPE_ID: null,
                MODEL: null,
                SERIAL: null,
                STATUS: "all"
            };
            _this.searchReport();
        }

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }


    }

]);