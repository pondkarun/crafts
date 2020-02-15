'use strict'

app.controller("handmadeController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSearch = {
            code_handmade: null,
            name: null,
            type_id: null,
            price1: null,
            price2: null,
            is_use: "true"
        };
        _this.ID = userService.getID();

        this.init = function() {
            _this.searchHandmade();
        }

        this.gridOptions = {
            gridID: 'gridSearchHandmade',
            dataSource: new kendo.data.DataSource({ data: [], pageSize: 10 }),
            sortable: true,
            pageable: true,
            columns: [{
                    field: "code_handmade",
                    title: "รหัสงานฝีมือ",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "name",
                    title: "รายการงานฝีมือ",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "type",
                    title: "ประเภทงานฝีมือ",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "price",
                    title: "ราคา",
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

        this.addHandmade = () => {
            $location.path("handmade" + "/add/" + 0);
        }

        this.gridCallbackView = (item) => {
            $location.path("handmade" + "/view/" + item.id);
        }

        this.gridCallbackEdit = (item) => {
            $location.path("handmade" + "/edit/" + item.id);
        }

        this.searchHandmade = () => {
            // console.log("modelSearch", _this.modelSearch);
            // loading.open();
            // $http.post(webURL.webApi + "employed/searchEmployedService.php", _this.modelSearch).then((res) => {
            //     // console.log("res.data", res.data);

            //     res.data.filter((e) => {
            //         e.PurchaseDate = commonService.formatDate(e.PurchaseDate)
            //         e.STATUS = (e.STATUS == 'ใช้งาน') ? "Active" : "Inactive";
            //         if (e.DisposedDate && e.DisposedDate != "0000-00-00") {
            //             e.DisposedDate = commonService.formatDate(e.DisposedDate)
            //         } else {
            //             e.DisposedDate = "-"
            //         }
            //     })

            //     _this.gridOptions.dataSource.data(res.data);
            //     loading.close();
            // }).catch((err) => {
            //     console.log("Error");
            //     loading.close();
            //     showAlertBox(msgSettings.msgErrorApi, null);
            // })
        }

        this.clearHandmade = () => {
            this.modelSearch = {
                code_handmade: null,
                name: null,
                type_id: null,
                price1: null,
                price2: null,
                is_use: "true"
            };
            _this.searchHandmade();
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