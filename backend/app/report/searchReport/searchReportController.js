'use strict'

app.controller("searchReportController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings', 'commonService',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings, commonService) {
        let _this = this;

        this.init = () => {
            list()
        }

        this.clearOrder = () => {
            this.modelSearch = {}
        }

        this.searchOrder = () => {
            this.listReport = []
            if ((_this.dateStart && !_this.dateEnd) || (!_this.dateStart && _this.dateEnd)) {
                showAlertBox(msgSettings.msgValidForm, null);
            } else {
                loading.open();
                _this.modelSearch.dateStart = (_this.dateStart) ? commonService.formatDatDB(_this.dateStart) : null;
                _this.modelSearch.dateEnd = (_this.dateEnd) ? commonService.formatDatDB(_this.dateEnd) : null;
                console.log(" _this.modelSearch", _this.modelSearch);
                $http.post(webURL.webApi + "order/searchOrderService.php", _this.modelSearch).then((res) => {
                    let priceFull = null;
                    let deposit = null;
                    res.data.filter((e) => {
                        priceFull = Number(e.price) * Number(e.unit)
                        deposit = ((e.unit * e.price) * 30) / 100
                        e.priceFull = priceFull.toLocaleString()
                        e.deposit = (e.status_type == "handmadeMade") ? deposit.toFixed() : "-";
                    })
                    this.listReport = res.data
                    loading.close();
                }).catch((err) => {
                    console.log("Error");
                    loading.close();
                    showAlertBox(msgSettings.msgErrorApi, null);
                })
            }
        }


        $scope.printDiv = () => {
            var divToPrint = document.getElementById("printTable");
            var newWin = window.open("");
            newWin.document.write(divToPrint.outerHTML);
            newWin.print();
            newWin.close();
        }

        this.changeSelected = (item) => {
            // console.log(item);
            this.listStatusOrder = [];
            if (item == "handmade") {
                this.modelSearch.status = "all"
                this.listHandmade.filter((e) => {
                    if (e.status_type == item) {
                        _this.listStatusOrder.push(e)
                    }
                })
            } else if (item == "handmadeMade") {
                this.modelSearch.status = "all"
                this.listHandmade.filter((e) => {
                    if (e.status_type == item) {
                        _this.listStatusOrder.push(e)
                    }
                })
            } else if (item == "customers") {
                $http.post(webURL.webApi + "customers/searchCustomersService.php").then((res) => {
                    this.listCustomers = res.data
                    loading.close();
                }).catch((err) => {
                    console.log("Error");
                    loading.close();
                    showAlertBox(msgSettings.msgErrorApi, null);
                })
            }


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

        const list = () => {
            this.listHandmade = [{
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