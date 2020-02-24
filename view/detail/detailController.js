'use strict'

app.controller("detailController", ['$scope', '$rootScope', '$location', '$routeParams', 'customerService', '$http', 'customDialog', 'msgSettings',
    function($scope, $rootScope, $location, $routeParams, customerService, $http, customDialog, msgSettings) {
        var _this = this;
        this.model = {
            id: null,
            name: null,
            price: null,
            type_id: null,
            color: [],
            size: [],
            imageStrings: []
        };

        $scope.myInterval = 3000;
        $scope.slides = [{
                image: 'http://www.smo-msci.com/crafts/images/crafts_164986253720200222_014631.jpg'
            },
            {
                image: 'http://www.smo-msci.com/crafts/images/crafts_164986253720200222_014631.jpg'
            },
            {
                image: 'http://www.smo-msci.com/crafts/images/crafts_164986253720200222_014631.jpg'
            },
            {
                image: 'http://www.smo-msci.com/crafts/images/crafts_164986253720200222_014631.jpg'
            }
        ];


        this.init = function() {
            _this.typePage = $routeParams;
            getHandmadeEdit(_this.typePage.id);
        }


        const getHandmadeEdit = (ID) => {
            loading.open();
            $http.post(webURL.webApi + "handmade/getViewEditHandmadeService.php", ID).then((res) => {
                // console.log("res.data", res.data);
                if (res.data.status == "200") {
                    var color = (res.data.color) ? JSON.parse(res.data.color) : null;
                    var size = (res.data.size) ? JSON.parse(res.data.size) : null;
                    this.model = {
                        id: res.data.id,
                        name: res.data.name,
                        price: Number(res.data.price),
                        type_id: res.data.type_id,
                        color: color,
                        size: size,
                        imageStrings: []
                    };
                    getHandmadeImageEdit(ID)
                } else {
                    loading.close();
                    showAlertBox(msgSettings.msgErrorApi, null);
                }
            }).catch((err) => {
                console.log("Error");
                loading.close();
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }


        const getHandmadeImageEdit = (ID) => {
            $http.post(webURL.webApi + "handmade/getViewEditHandmadeImageService.php", ID).then((res) => {
                // console.log("res.data", res.data);
                res.data.filter(e => e.path = webURL.webImagesView + e.image)
                _this.model.imageStrings = res.data;
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