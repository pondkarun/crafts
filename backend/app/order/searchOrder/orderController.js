'use strict'

app.controller("orderController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function ($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;
        this.listStatusOrder = []
        this.listHandmade = []
        this.modelSearch = {
            status_type: "handmade",
            order_code: null,
            name: null,
            unit: null,
            deposit: null,
            price: null,
            status: "รอการตรวจสอบการชำระเงิน",
            employed_id: userService.getID()
        };

        this.typePage = {};

        this.init = () => {
            list();
            this.changeSelected("handmade")
            this.searchOrder();
        }

        this.gridOptions = {
            gridID: 'gridSearchOrder',
            dataSource: new kendo.data.DataSource({ data: [], pageSize: 10 }),
            sortable: true,
            pageable: true,
            columns: [{
                field: "order_code ",
                title: "เลขใบคำสั้งซื้อ",
                attributes: {
                    class: "text-center"
                }
            },

            {
                field: "name",
                title: "รายการงานฝีมือ",
                attributes: {
                    class: "text-center"
                }
            },

            {
                field: "unit",
                title: "จำนวน",
                attributes: {
                    class: "text-center"
                }
            },

            {
                field: "deposit",
                title: "ราคามัดจำ",
                attributes: {
                    class: "text-center"
                }
            },

            {
                field: "priceFull",
                title: "ราคาเต็ม",
                attributes: {
                    class: "text-center"
                }
            },
            {
                field: "status",
                title: "สถานะ",
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
            $location.path("handmade" + "/view/" + item.id);
        }



        this.searchOrder = () => {
            // console.log("modelSearch", _this.modelSearch);
            if (_this.modelSearch.price2 && !_this.modelSearch.price1) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else {
                loading.open();
                $http.post(webURL.webApi + "order/searchOrderService.php", _this.modelSearch).then((res) => {
                    let priceFull = null;
                    let deposit = null;
                    res.data.filter((e) => {
                        priceFull = Number(e.price) * Number(e.unit)
                        deposit = ((e.unit * e.price) * 30 ) / 100
                        e.priceFull = priceFull.toLocaleString()
                        e.deposit =  (e.status_type == "handmadeMade") ? deposit.toFixed() : "-" ;


                    })
                    _this.gridOptions.dataSource.data(res.data);
                    loading.close();
                }).catch((err) => {
                    console.log("Error");
                    loading.close();
                    showAlertBox(msgSettings.msgErrorApi, null);
                })
            }
        }

        this.clearOrder = () => {
            this.modelSearch = {
                status_type: "handmade",
                code_handmade: null,
                handmade: null,
                unit: null,
                deposit: null,
                price: null,
                status: "รอการตรวจสอบการชำระเงิน",
                employed_id: userService.getID()
            };
            _this.searchOrder();
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

        this.changeSelected = (item) => {
            // console.log(item);
            this.listStatusOrder = [];
            if (item == "handmade") {
                this.modelSearch.status = "รอการตรวจสอบการชำระเงิน"
                this.listHandmade.filter((e) => {
                    if (e.status_type == item) {
                        _this.listStatusOrder.push(e)
                    }
                })
            } else if (item == "handmadeMade") {
                this.modelSearch.status = "รอการยืนยันจากผู้รับจ้าง"
                this.listHandmade.filter((e) => {
                    if (e.status_type == item) {
                        _this.listStatusOrder.push(e)
                    }
                })
            }

            this.searchOrder();
        }

        const list = () => {
            this.listHandmade = [
                {
                    id: 1,
                    status_show: "รอการชำระเงิน",
                    status: "รอการชำระเงิน",
                    status_type: "handmade"
                },
                {
                    id: 2,
                    status_show: "รอการตรวจสอบการชำระเงิน",
                    status: "รอการตรวจสอบการชำระเงิน",
                    status_type: "handmade"
                },
                {
                    id: 3,
                    status_show: "การชำระเงินไม่ถูกต้อง",
                    status: "การชำระเงินไม่ถูกต้อง",
                    status_type: "handmade"
                },
                {
                    id: 4,
                    status_show: "ยกเลิก",
                    status: "ยกเลิก",
                    status_type: "handmade"
                },
                {
                    id: 5,
                    status_show: "เสร็จสิ้น",
                    status: "เสร็จสิ้น",
                    status_type: "handmade"
                },
                {
                    id: 6,
                    status_show: "ทั้งหมด",
                    status: "all",
                    status_type: "handmade"
                },



                {
                    id: 7,
                    status_show: "รอการยืนยันจากผู้รับจ้าง",
                    status: "รอการยืนยันจากผู้รับจ้าง",
                    status_type: "handmadeMade"
                },

                {
                    id: 8,
                    status_show: "รอการชำระเงิน",
                    status: "รอการชำระเงิน",
                    status_type: "handmadeMade"
                },
                {
                    id: 9,
                    status_show: "รอการตรวจสอบการชำระเงิน",
                    status: "รอการตรวจสอบการชำระเงิน",
                    status_type: "handmadeMade"
                },
                {
                    id: 10,
                    status_show: "การชำระเงินไม่ถูกต้อง",
                    status: "การชำระเงินไม่ถูกต้อง",
                    status_type: "handmadeMade"
                },
                {
                    id: 11,
                    status_show: "กำลังทำงานฝีมือ",
                    status: "กำลังทำงานฝีมือ",
                    status_type: "handmadeMade"
                },
                {
                    id: 12,
                    status_show: "ยกเลิก",
                    status: "ยกเลิก",
                    status_type: "handmadeMade"
                },
                {
                    id: 13,
                    status_show: "เสร็จสิ้น",
                    status: "เสร็จสิ้น",
                    status_type: "handmadeMade"
                },
                {
                    id: 14,
                    status_show: "ทั้งหมด",
                    status: "all",
                    status_type: "handmadeMade"
                },
            ];
        }
    }
]);