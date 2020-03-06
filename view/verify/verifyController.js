'use strict'

app.controller("verifyController", ['$scope', '$rootScope', '$location', '$routeParams', 'customerService', '$http', 'customDialog', 'msgSettings', 'PaginationService',
    function ($scope, $rootScope, $location, $routeParams, customerService, $http, customDialog, msgSettings, PaginationService) {
        var _this = this;

        this.modelSearch = {
            name: null,
            is_use: "true",
            type_id: "all",
            status: "รอการชำระเงิน",
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
            id: 5,
            status: "กำลังทำงานฝีมือ"
        },
        {
            id: 5,
            status: "ยกเลิก"
        },
        {
            id: 6,
            status: "เสร็จสิ้น"
        },
        ];

        this.init = function () {
            _this.queue();
        }

        this.statusClick = (item) => {
            // console.log("item", item);
            this.modelSearch.status = item;
            _this.queue();
        }

        this.detail = (item) => {
            console.log(item);
            if (customerService.isUserLoggedIn()) {
                $location.path("detail/" + item.status_type + "/view/" + item.id);
            } else {
                showAlertBox(msgSettings.msgLogin, null);
            }
        }
        this.queue = () => {
            $http.post(webURL.webApi + "order/getQueueOrder.php").then((res) => {
                console.log("res.data", res.data);
                _this.listQueue = res.data;
                _this.searchOrder();
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
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
                    if (e.status_type == 'handmadeMade') {
                        let count = [];



                        _this.listQueue.forEach(x => {
                            if (x.id_handmade == e.id_handmade && x.id != e.id) {
                                count.push(e.id)
                            }
                        });
                        e.queue = count.length
                        e.queue = (e.queue < 0) ? 0 : e.queue;
                    }
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

        this.payment = (item) => {
            $location.path("payment/" + item.id);
        }

        this.cancel = (item) => {
            // console.log("item.id" , item.id);
            var callback = (res) => {
                $http.post(webURL.webApi + "order/cancelOrderService.php", item.id);
                _this.queue();
            }
            showConfirmBox(msgSettings.msgCancelConfirm, callback, null);
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

        function showConfirmBox(msg, okCallback, cancelCallback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.confirm(okCallback, cancelCallback, dialog);
        }


    }
]);