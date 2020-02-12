'use strict'

app.controller("requestController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.modelSearch = {
            SERVICES_CODE: null,
            NAME_TH: null,
            STATUS: "แจ้งซ้อม"
        };

        $scope.listStatus = [{
                ID: 1,
                STATUS: "Search All",
                VALUE: "all"
            },
            {
                ID: 2,
                STATUS: "แจ้งซ้อม",
                VALUE: "แจ้งซ้อม"
            },
            {
                ID: 3,
                STATUS: "รอการอนุมัติของ",
                VALUE: "รอการอนุมัติของ"
            },
            {
                ID: 4,
                STATUS: "แก้ไขเรียบร้อย",
                VALUE: "แก้ไขเรียบร้อย"
            },
            {
                ID: 5,
                STATUS: "จบงาน",
                VALUE: "จบงาน"
            },
        ]

        this.init = function() {
            _this.searchRequest()
        }

        this.gridOptions = {
            gridID: 'gridSearchRequest',
            dataSource: new kendo.data.DataSource({ data: [], pageSize: 10 }),
            sortable: true,
            pageable: true,
            columns: [{
                    field: "SERVICES_CODE",
                    title: "ID",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "NAME_TH",
                    title: "ผู้แจ้ง",
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
                    field: "EMAIL",
                    title: "E-Mail",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "LOCATION",
                    title: "Location",
                    attributes: {
                        class: "text-center"
                    }
                },

                {
                    field: "CreateDate",
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
                view: true,
                del: false,
                edit: false
            },
            showIndex: false,
        };
        this.gridCallbackView = (item) => {
            // console.log("item", item);
            $location.path("request" + "/view/" + item.ID);
        }


        this.searchRequest = () => {
            // console.log("modelSearch", _this.modelSearch);
            loading.open();
            $http.post(webURL.webApi + "request/searchRequestService.php", _this.modelSearch).then((res) => {
                // console.log("res.data", res.data);
                _this.gridOptions.dataSource.data(res.data);
                loading.close();
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        this.clearRequest = () => {
            _this.modelSearch = {
                SERVICES_CODE: null,
                NAME_TH: null,
                STATUS: "แจ้งซ้อม"
            };
            _this.searchRequest();
        }

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }


    }

]);