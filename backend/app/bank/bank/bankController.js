'use strict'

app.controller("bankController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function ($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;

        this.modelSearch = {
            id_employed: userService.getID()
        }

        this.setModelSave = () => {
            _this.modelSave = {
                id: null,
                id_bank: null,
                name_bank: null,
                number: null,
                id_employed: userService.getID()
            }
        }

        this.init = function () {
            _this.setModelSave()
            getBank()
            _this.searchBank()
            
        }

        this.gridOptions = {
            gridID: 'gridSearchBank',
            dataSource: new kendo.data.DataSource({ data: [], pageSize: 10 }),
            sortable: true,
            pageable: true,
            columns: [{
                field: "bank",
                title: "ธนาคาร",
                attributes: {
                    class: "text-center"
                }
            },
            {
                field: "number",
                title: "เลขบัญชี",
                attributes: {
                    class: "text-center"
                }
            },
            {
                field: "name_bank",
                title: "ชื่อบัญชี",
                attributes: {
                    class: "text-center"
                }
            }
            ],
            management: true,
            operation: {
                view: false,
                del: true,
                edit: true
            },
            showIndex: false,
        };


        this.searchBank = () => {
            loading.open();
            $http.post(webURL.webApi + "bank/searchBankEmployedService.php", _this.modelSearch).then((res) => {
                // console.log("res.data", res.data);
                _this.gridOptions.dataSource.data(res.data);
                loading.close();
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        this.addEditBank = () => {
            // console.log("$scope.bankForm" , $scope.bankForm);
            if ($scope.bankForm.$valid) {
                // console.log("modelSave", _this.modelSave);
                $http.post(webURL.webApi + "bank/addEditBankEmployedService.php", _this.modelSave).then((res) => {
                    // console.log("res.data", res.data);
                    _this.searchBank()
                }).catch((err) => {
                    console.log("Error");
                    loading.close();
                    showAlertBox(msgSettings.msgErrorApi, null);
                })
            } else {
                showAlertBox(msgSettings.msgRequireText, null);
            }
            _this.setModelSave()
        }

        this.gridCallbackDel = (item) => {
            // console.log("item", item);
            $http.post(webURL.webApi + "bank/delBankEmployedService.php", item.id).then((res) => {
                // console.log("res.data", res.data);
                _this.searchBank()
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        this.gridCallbackEdit = (item) => {
            // console.log("item", item);
            this.modelSave = {
                id: item.id,
                id_bank: item.id_bank,
                name_bank: item.name_bank,
                number: item.number,
                id_employed: userService.getID()
            }
        }

        const getBank = () => {
            $http.get(webURL.webApi + "bank/getBankService.php").then((res) => {
                // console.log("res.data", res.data);
                _this.listBank = res.data
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