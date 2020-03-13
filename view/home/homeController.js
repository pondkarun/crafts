'use strict'

app.controller("homeController", ['$scope', '$rootScope', '$location', '$routeParams', 'customerService', '$http', 'customDialog', 'msgSettings', 'PaginationService',
    function($scope, $rootScope, $location, $routeParams, customerService, $http, customDialog, msgSettings, PaginationService) {
        var _this = this;
        this.modelSearch = {
            name: null,
            is_use: "true",
            type_id: "all"
        }
        this.listType = [];
        this.listHandmade = [];
        this.pager = {};
        this.init = function() {
            _this.searchHandmade();
            setInterval(function () {
                _this.searchHandmade();
            }, 30000);
            getType();
        }

        this.typeClick = (item) => {
            // console.log("item", item);
            this.modelSearch.type_id = item;
            _this.searchHandmade();
        }
        this.detail = (id) => {
            // console.log(id);
            if (customerService.isUserLoggedIn()) {
                $location.path("detail/handmade/add/" + id);
            } else {
                showAlertBox(msgSettings.msgLogin, null);
            }
        }

        this.searchHandmade = () => {
            // console.log("modelSearch", _this.modelSearch);
            // loading.open();
            $http.post(webURL.webApi + "handmade/searchHandmadeService.php", _this.modelSearch).then((res) => {
                // console.log("res.data", res.data);
                res.data.filter((e) => {
                    e.price = Number(e.price).toLocaleString()
                    e.is_use = (e.is_use == 'true') ? 'ปกติ' : 'ยกเลิกรายการ';
                    e.path = webURL.webImagesView + e.path
                })

                _this.listHandmade = angular.copy(res.data)
                _this.setPage(1);
                // loading.close();
            }).catch((err) => {
                console.log("Error");
                // loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
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

        this.setPage = (page) => {

            // get the pager object from service 
            _this.pager = PaginationService.GetPager(_this.listHandmade.length, page);

            // get current page of items 
            _this.items = _this.listHandmade.slice(_this.pager.startIndex, _this.pager.endIndex + 1);

        }

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }

    }
]);