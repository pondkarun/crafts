'use strict'

app.controller("verifyController", ['$scope', '$rootScope', '$location', '$routeParams', 'customerService', '$http', 'customDialog', 'msgSettings', 'PaginationService',
    function($scope, $rootScope, $location, $routeParams, customerService, $http, customDialog, msgSettings, PaginationService) {
        var _this = this;

        this.modelSearch = {
            name: null,
            is_use: "true",
            type_id: "all",
            status: "all",
            id_customers: customerService.getID()
        }
        this.listOrder = [];
        this.listStatus = [{
                id: 1,
                status: "รอการชำระเงิน"
            },
            {
                id: 2,
                status: "รอการยืนยันจากผู้รับจ้าง"
            },
            {
                id: 3,
                status: "รอการตรวจสอบการชำระเงิน"
            },
            {
                id: 4,
                status: "การชำระเงินไม่ถูกต้อง"
            },
            {
                id: 5,
                status: "การชำระเงินสำเร็จ"
            },
            {
                id: 6,
                status: "ยกเลิก"
            },
        ];

        this.init = function() {
            _this.searchOrder();
        }

        this.statusClick = (item) => {
            // console.log("item", item);
            this.modelSearch.status = item;
            _this.searchOrder();
        }

        this.detail = (id) => {
            // console.log(id);
            if (customerService.isUserLoggedIn()) {
                $location.path("detail/handmade/add/" + id);
            } else {
                showAlertBox(msgSettings.msgLogin, null);
            }
        }

        this.searchOrder = () => {
            // console.log("modelSearch", _this.modelSearch);
            loading.open();
            $http.post(webURL.webApi + "order/searchOrderService.php", _this.modelSearch).then((res) => {
                // console.log("res.data", res.data);
                res.data.filter((e) => {
                    e.price = Number(e.price).toLocaleString()
                    e.is_use = (e.is_use == 'true') ? 'ปกติ' : 'ยกเลิกรายการ';
                    e.path = webURL.webImagesView + e.path
                })

                _this.listOrder = angular.copy(res.data)
                _this.setPage(1);
                loading.close();
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }


        this.setPage = (page) => {

            // get the pager object from service 
            _this.pager = PaginationService.GetPager(_this.listOrder.length, page);

            // get current page of items 
            _this.items = _this.listOrder.slice(_this.pager.startIndex, _this.pager.endIndex + 1);

        }


        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }


    }
]);