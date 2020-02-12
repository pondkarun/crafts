'use strict'

app.controller("deviceMeController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings',
    function ($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings) {
        let _this = this;
        this.listType = [];
        this.listInventoryMe = [];
        this.ID = userService.getID();

        this.init = function () {
            getTypeInventory()
        }

        const mapDeviceMe = (ID) => {
            // console.log("listType 1", _this.listType);
            // console.log("listInventoryMe", _this.listInventoryMe);
            _this.listType.filter((e, index) => {
                let num = index + 1;
                e.id = 'pane-' + num + 'a';
                e.header = e.DATA_TOPICS
                e.content = []
                e.isExpanded = (index == 0) ? true : false;

                _this.listInventoryMe.filter((x) => {
                    if (x.TYPE_ID == e.ID) {
                        e.content.push(x)
                    }
                })

            })

            // console.log("listType 2", _this.listType);
        }

        const getDeviceMe = (ID) => {
            $http.post(webURL.webApi + "deviceMe/getDeviceMeService.php", ID).then((res) => {
                // console.log("res.data", res.data);
                _this.listInventoryMe = res.data;
                mapDeviceMe()
                loading.close();
            }).catch((err) => {
                loading.close();
                console.log("Error");
                showAlertBox(msgSettings.msgErrorApi, null);
            })

        }
        const getTypeInventory = () => {
            loading.open();
            $http.get(webURL.webApi + "inventory/getTypeInventoryService.php").then((res) => {
                // console.log("res.data", res.data);
                _this.listType = res.data
                getDeviceMe(_this.ID)
            }).catch((err) => {
                loading.close();
                console.log("Error");
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