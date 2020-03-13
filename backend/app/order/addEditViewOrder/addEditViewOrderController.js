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
        $scope.handmade = null
        this.typePage = {};
        $scope.isView = false;
        this.init = function () {
            checkRouteParams()
        }

        this.cancelForm = () => {
            $location.path("order");
        }

        this.saveFormAdd = (item) => {
            let deposit = this.model.is_deposit
            if (this.model.status_type == "handmadeMade") {
                if(item == "กำลังทำงานฝีมือ"){
                     deposit = "T"
                }     
            } 
            _this.modelSave = {
                id: _this.model.id,
                comment: _this.model.comment,
                status: item,
                is_deposit: deposit
            }
            // console.log("_this.modelSave", _this.modelSave);
            loading.open();
            $http.post(webURL.webApi + "order/statusOrderService.php", _this.modelSave).then((res) => {
                // console.log("res.data" , res.data);

                loading.close();
                _this.cancelForm()
            }).catch((err) => {
                console.log("Error");
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        const getVerifyViewEdit = (ID) => {
            loading.open();
            $http.post(webURL.webApi + "order/getViewOrderService.php", ID).then((res) => {
                if (res.data.status == "400") {
                    showAlertBox(msgSettings.msgErrorApi, null);
                } else {
                    // console.log("res.data", res.data);
                    if (res.data.status == "404") {
                        showAlertBox(msgSettings.msgErrorApi, null);
                    } else {
                        getBank(res.data.employed_id)
                        _this.model = res.data
                        let deposit = ((res.data.unit * res.data.price_handmade) * 30) / 100
                        _this.model.priceFull = Number(res.data.unit) * Number(res.data.price_handmade)
                        _this.model.pathImg = webURL.webImagesView + res.data.image_slip;
                        if (res.data.status_type == "handmadeMade") {
                            _this.model.deposit = deposit.toFixed()
                            $scope.handmade = "ทำงานฝีมือ"
                        } else if (res.data.status_type == "handmade") {
                            _this.model.deposit = 0
                            $scope.handmade = "ซื้องานฝีมือ"
                        }
                    }


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