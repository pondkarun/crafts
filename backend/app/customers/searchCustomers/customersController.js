'use strict'

app.controller("customersController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSearch = {
            Name: null,
            status: "ปกติ",
        };
        _this.ID = userService.getID();
        this.id_position = userService.getPositionID();
        $scope.title = "ลูกค้า";
        

        this.init = function() {
            _this.searchCustomers();
        }

        this.gridOptions = {
            gridID: 'gridSearchCustomers',
            dataSource: new kendo.data.DataSource({ data: [], pageSize: 10 }),
            sortable: true,
            pageable: true,
            columns: [
                {
                    field: "nameTH",
                    title: "ชื่อ - นามสกุล",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "email",
                    title: "E-mail",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "tel",
                    title: "เบอร์ติดต่อ",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "status",
                    title: "สถานะ",
                    attributes: {
                        class: "text-center"
                    }
                }

            ],
            management: true,
            operation: {
                view: true,
                del: false,
                edit: true
            },
            showIndex: false,
        };

        this.addCustomers = () => {
            $location.path("customers" + "/add/" + 0);
        }

        this.gridCallbackView = (item) => {
            $location.path("customers" + "/view/" + item.id);
        }

        this.gridCallbackEdit = (item) => {
            $location.path("customers" + "/edit/" + item.id);
        }

        this.searchCustomers = () => {
            // console.log("modelSearch", _this.modelSearch);
            loading.open();
            $http.post(webURL.webApi + "customers/searchCustomersService.php", _this.modelSearch).then((res) => {
                // console.log("res.data", res.data);
                _this.gridOptions.dataSource.data(res.data);
                loading.close();
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        this.clearCustomers = () => {
            this.modelSearch = {
                Name: null,
                status: "ปกติ",
            };
            _this.searchCustomers();
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