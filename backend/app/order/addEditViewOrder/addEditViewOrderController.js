'use strict'

app.controller("addEditViewOrderController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function ($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.model = {
            id: null,
            name_handmade: $routeParams.id,
            price_handmade: null,
            unit: null,
            color: null,
            size: null,
            detail: null,
            deposit: null,
            priceFull: null,
            status: null,
            reference: null,
            nameTH: null,
            tel: null,
            address: null,
            id_bank: null,
        };
        this.typePage = {};
        $scope.isView = false;
        this.init = function () {
            checkRouteParams()
        }

        this.cancelForm = () => {
            $location.path("order");
        }

        this.saveFormAdd = () => {

        }

        const getVerifyViewEdit = (ID) => {
            $http.post(webURL.webApi + "order/getViewOrderService.php", ID).then((res) => {
                if (res.data.status == "400") {
                    showAlertBox(msgSettings.msgErrorApi, null);
                } else {
                    console.log("res.data", res.data);
                    getBank(res.data.employed_id)
                    _this.model = res.data
                    let deposit = ((res.data.unit * res.data.price_handmade) * 30 ) / 100
                    _this.model.priceFull =  Number(res.data.unit) * Number(res.data.price_handmade)
                    _this.model.deposit = (res.data.status_type == "handmadeMade") ? deposit.toFixed() : 0 ;
                }
            }).catch((err) => {
                console.log("Error");
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }


        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }

        function checkRouteParams() {
            _this.typePage = $routeParams;
            if (_this.typePage.Type == "view") {
                $scope.title = "ข้อมูลงานฝีมือ";
                getVerifyViewEdit(_this.typePage.ID)
                $scope.isView = true;
            } else {
                $location.path("handmade");
            }
        }


        const getBank = (id) => {
            _this.getBank = {
                id_employed: id
            }
            loading.open();
            $http.post(webURL.webApi + "bank/searchBankEmployedService.php", _this.getBank).then((res) => {
                // console.log("res.data", res.data);
                res.data.filter((e) => {
                    e.path = webURL.webImagesView + e.img
                })
                _this.listBank = res.data
                loading.close();
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

    }

]);