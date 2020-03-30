'use strict'

app.controller("employedController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSearch = {
            id_card: null,
            Name: null,
            status: "ปกติ",
            id_position:  (userService.getPositionID() == '3' ? "all": null)
        };
        _this.ID = userService.getID();
        this.id_position = userService.getPositionID();
        $scope.title = (this.id_position == '3') ? "เจ้าหน้าที่และผู้รับจ้าง" : "ผู้รับจ้าง";
        

        this.init = function() {
            _this.searchEmployed();
        }

        this.gridOptions = {
            gridID: 'gridSearchEmployed',
            dataSource: new kendo.data.DataSource({ data: [], pageSize: 10 }),
            sortable: true,
            pageable: true,
            columns: [{
                    field: "id_card",
                    title: "เลขบัตรประชาชน",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "NameTH",
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

        this.addEmployed = () => {
            $location.path("employed" + "/add/" + 0);
        }

        this.gridCallbackView = (item) => {
            $location.path("employed" + "/view/" + item.id);
        }

        this.gridCallbackEdit = (item) => {
            $location.path("employed" + "/edit/" + item.id);
        }

        this.searchEmployed = () => {
            // console.log("modelSearch", _this.modelSearch);
            loading.open();
            $http.post(webURL.webApi + "employed/searchEmployedService.php", _this.modelSearch).then((res) => {
                // console.log("res.data", res.data);
                _this.gridOptions.dataSource.data(res.data);
                loading.close();
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        this.clearEmployed = () => {
            this.modelSearch = {
                id_card: null,
                Name: null,
                status: "ปกติ"
            };
            _this.searchEmployed();
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