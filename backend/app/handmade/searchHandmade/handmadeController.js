'use strict'

app.controller("handmadeController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSearch = {
            code_handmade: null,
            name: null,
            type_id: "all",
            price1: null,
            price2: null,
            employed_id: userService.getID(),
            is_use: "true"
        };

        this.typePage = {};

        this.init = function() {
            _this.searchHandmade();
            getType()
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
                    field: "is_use",
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
            if (_this.modelSearch.price2 && !_this.modelSearch.price1) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else {
                loading.open();
                $http.post(webURL.webApi + "handmade/searchHandmadeService.php", _this.modelSearch).then((res) => {
                    // console.log("res.data", res.data);
                    res.data.filter((e) => {
                        e.price = Number(e.price).toLocaleString()
                        e.is_use = (e.is_use == 'true') ? 'ปกติ' : 'ยกเลิกรายการ';
                    })
                    _this.gridOptions.dataSource.data(res.data);
                    loading.close();
                }).catch((err) => {
                    console.log("Error");
                    loading.close();
                    showAlertBox(msgSettings.msgErrorApi, null);
                })
            }
        }

        this.clearHandmade = () => {
            this.modelSearch = {
                code_handmade: null,
                name: null,
                type_id: "all",
                price1: null,
                price2: null,
                employed_id: userService.getID(),
                is_use: "true"
            };
            _this.searchHandmade();
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