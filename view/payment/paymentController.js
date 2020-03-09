'use strict'

app.controller("paymentController", ['$scope', '$rootScope', '$location', '$routeParams', 'customerService', '$http', 'customDialog', 'msgSettings',
    function($scope, $rootScope, $location, $routeParams, customerService, $http, customDialog, msgSettings) {
        var _this = this;
        this.modelSave = {
            id_bank_employed: null
        }
    
        this.init = function() {
            _this.typePage = $routeParams;
            getBank(_this.typePage.employed_id)

         }
         

        this.save = () => {}

        this.cancel = () => {
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

    }
]);