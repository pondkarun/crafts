'use strict'

app.controller("paymentController", ['$scope', '$rootScope', '$location', '$routeParams', 'customerService', '$http', 'customDialog', 'msgSettings',
    function ($scope, $rootScope, $location, $routeParams, customerService, $http, customDialog, msgSettings) {
        var _this = this;
        this.modelSave = {
            id_order_handmade: $routeParams.id,
            id_bank_employed: null,
            reference: null,
            imageStrings: []
        }

        this.init = function () {
            _this.typePage = $routeParams;
            getBank(_this.typePage.employed_id)

        }


        this.saveForm = () => { 
           
            if ($scope.payment.$valid && _this.modelSave.imageStrings.length > 0) {
                // console.log("modelSave" , _this.modelSave);   
                let path = () => {
                    $location.path("verify");
                    $scope.states.activeItem = "verify"
                }
                $http.post(webURL.webApi + "payment/paymentService.php", _this.modelSave).then((res) => {
                    // console.log("res.data", res.data);
                    showAlertBox(msgSettings.msgSaveSucc, path()); 
                }).catch((err) => {
                    showAlertBox(msgSettings.msgErrorApi, null);
                })
            } else {
                showAlertBox(msgSettings.msgValidForm, null);
            }
        }

        this.cancelForm = () => {
            $location.path("verify");
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

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }

        //อัพโหลด
        this.processFiles = (files) => {
            angular.forEach(files, function (flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                    let item = {
                        image: event.target.result,
                        name: flowFile.name
                    }
                    _this.modelSave.imageStrings.push(item);
                };
                fileReader.readAsDataURL(flowFile.file);
            });
        };

        this.delImg = (item) => {
            let delIndex = _this.modelSave.imageStrings.findIndex((x) => x.name == item);
            _this.modelSave.imageStrings.splice(delIndex, 1);
        }

       
    }
]);