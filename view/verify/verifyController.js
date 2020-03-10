'use strict'

app.controller("verifyController", ['$scope', '$rootScope', '$location', '$routeParams', 'customerService', '$http', 'customDialog', 'msgSettings', 'PaginationService',
    function ($scope, $rootScope, $location, $routeParams, customerService, $http, customDialog, msgSettings, PaginationService) {
        var _this = this;

        this.modelSearch = {
            name: null,
            is_use: "true",
            status: "รอการชำระเงิน",
            status_show: "รอการชำระเงิน",
            status_type: "handmade",
            status_type_show: "สั่งซื้องานฝีมือ",
            id_customers: customerService.getID()
        }
        this.listOrder = [];


        this.init = function () {
            _this.queue();
        }

        this.statusClick = (item) => {
            // console.log("item", item);
            this.modelSearch = {
                name: null,
                is_use: "true",
                status: item.status,
                status_show: item.status_show,
                status_type: item.status_type,
                status_type_show: item.status_type_show,
                id_customers: customerService.getID()
            }
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
                // console.log("res.data", res.data);
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
            $location.path("payment/" + item.id + "/" + item.employed_id);
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

        this.changeSelected = (item) => {
            if (item == "สั่งซื้องานฝีมือ") {
                this.modelSearch = {
                    name: null,
                    is_use: "true",
                    status: "รอการชำระเงิน",
                    status_show: "รอการชำระเงิน",
                    status_type: "handmade",
                    status_type_show: "สั่งซื้องานฝีมือ",
                    id_customers: customerService.getID()
                }
            } else {
                this.modelSearch = {
                    name: null,
                    is_use: "true",
                    status: "รอการยืนยันจากผู้รับจ้าง",
                    status_show: "รอการยืนยันจากผู้รับจ้าง",
                    status_type: "handmadeMade",
                    status_type_show: "สั่งทำงานฝีมือ",
                    id_customers: customerService.getID()
                }
            }

            this.searchOrder();
        }

        this.status = "สั่งซื้องานฝีมือ"

        this.listHandmade = [
            {
                id: 1,
                status_show: "รอการชำระเงิน",
                status_type_show: "สั่งซื้องานฝีมือ",
                status: "รอการชำระเงิน",
                status_type: "handmade"
            },
            {
                id: 2,
                status_show: "รอการตรวจสอบการชำระเงิน",
                status_type_show: "สั่งซื้องานฝีมือ",
                status: "รอการตรวจสอบการชำระเงิน",
                status_type: "handmade"
            },
            {
                id: 3,
                status_show: "การชำระเงินไม่ถูกต้อง",
                status_type_show: "สั่งซื้องานฝีมือ",
                status: "การชำระเงินไม่ถูกต้อง",
                status_type: "handmade"
            },
            {
                id: 4,
                status_show: "ยกเลิก",
                status_type_show: "สั่งซื้องานฝีมือ",
                status: "ยกเลิก",
                status_type: "handmade"
            },
            {
                id: 5,
                status_show: "เสร็จสิ้น",
                status_type_show: "สั่งซื้องานฝีมือ",
                status: "เสร็จสิ้น",
                status_type: "handmade"
            },
            {
                id: 6,
                status_show: "ทั้งหมด",
                status_type_show: "สั่งซื้องานฝีมือ",
                status: "all",
                status_type: "handmade"
            },



            {
                id: 7,
                status_show: "รอการยืนยันจากผู้รับจ้าง",
                status_type_show: "สั่งทำงานฝีมือ",
                status: "รอการยืนยันจากผู้รับจ้าง",
                status_type: "handmadeMade"
            },

            {
                id: 8,
                status_show: "รอการชำระเงิน",
                status_type_show: "สั่งทำงานฝีมือ",
                status: "รอการชำระเงิน",
                status_type: "handmadeMade"
            },
            {
                id: 9,
                status_show: "รอการตรวจสอบการชำระเงิน",
                status_type_show: "สั่งทำงานฝีมือ",
                status: "รอการตรวจสอบการชำระเงิน",
                status_type: "handmadeMade"
            },
            {
                id: 10,
                status_show: "การชำระเงินไม่ถูกต้อง",
                status_type_show: "สั่งทำงานฝีมือ",
                status: "การชำระเงินไม่ถูกต้อง",
                status_type: "handmadeMade"
            },
            {
                id: 11,
                status_show: "กำลังทำงานฝีมือ",
                status_type_show: "สั่งทำงานฝีมือ",
                status: "กำลังทำงานฝีมือ",
                status_type: "handmadeMade"
            },
            {
                id: 12,
                status_show: "ยกเลิก",
                status_type_show: "สั่งทำงานฝีมือ",
                status: "ยกเลิก",
                status_type: "handmadeMade"
            },
            {
                id: 13,
                status_show: "เสร็จสิ้น",
                status_type_show: "สั่งทำงานฝีมือ",
                status: "เสร็จสิ้น",
                status_type: "handmadeMade"
            },
            {
                id: 14,
                status_show: "ทั้งหมด",
                status_type_show: "สั่งทำงานฝีมือ",
                status: "all",
                status_type: "handmadeMade"
            },
        ];
    }
]);