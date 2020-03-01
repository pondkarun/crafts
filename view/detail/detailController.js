'use strict'

app.controller("detailController", ['$scope', '$rootScope', '$location', '$routeParams', 'customerService', '$http', 'customDialog', 'msgSettings',
    function($scope, $rootScope, $location, $routeParams, customerService, $http, customDialog, msgSettings) {
        var _this = this;

        function defaultModelSave() {
            _this.modelSave = {
                id: null,
                order_code: null,
                unit: null,
                color: null,
                size: null,
                detail: null,
                status: null,
                id_handmade: $routeParams.id,
                id_customers: customerService.getID(),
                status_type: $routeParams.handmade
            };
        }

        function defaultModel() {
            _this.model = {
                id: null,
                name: null,
                price: null,
                type: null,
                type_id: null,
                employed_name: null,
                color: [],
                size: [],
                imageStrings: [],
                totel: null
            };
        }

        this.listsizeAll = []
        this.init = function() {
            defaultModelSave()
            defaultModel()
            loading.open();
            _this.typePage = $routeParams;
            checkParams()
            showDivs(slideIndex);
            setTimeout(function() {
                _this.plusDivs(1);
                loading.close();
            }, 500);
        }

        this.saveFormAdd = () => {
            if ($scope.orderHandmade.$valid) {
                // console.log("modelSave", _this.modelSave);
                $http.post(webURL.webApi + "order/addEditOrderService.php", _this.modelSave).then((res) => {
                    // console.log("res.data", res.data);
                    showAlertBox(msgSettings.msgSaveSucc, null);
                    $location.path("verify");
                    $scope.states.activeItem = "verify"
                }).catch((err) => {
                    showAlertBox(msgSettings.msgErrorApi, null);
                })
            } else {
                showAlertBox(msgSettings.msgValidForm, null);
            }

        }

        this.cancelForm = () => {
            $location.path('home');
        }

        const getHandmadeEdit = (ID) => {

            $http.post(webURL.webApi + "handmade/getViewEditHandmadeService.php", ID).then((res) => {
                // console.log("res.data", res.data);
                if (res.data.status == "200") {
                    var color = (res.data.color) ? JSON.parse(res.data.color) : null;
                    var size = (res.data.size) ? JSON.parse(res.data.size) : null;
                    _this.listsizeAll = angular.copy(size);
                    this.model = {
                        id: res.data.id,
                        name: res.data.name,
                        price: Number(res.data.price),
                        type: res.data.type,
                        type_id: res.data.type_id,
                        employed_name: res.data.employed_name,
                        color: color,
                        size: size,
                        imageStrings: []
                    };
                    getHandmadeImageEdit(ID)
                } else {
                    showAlertBox(msgSettings.msgErrorApi, null);
                }
            }).catch((err) => {
                console.log("Error");
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        this.filterColorSize = (item) => {
            _this.listColorSize = [];
            _this.modelSave.size = null;
            _this.listsizeAll.filter((e) => {
                if (e.color == item) {
                    _this.listColorSize.push(e)
                }
            })
        }

        this.calculator = () => {
            _this.model.totel = _this.modelSave.unit * _this.model.price
        }


        this.handmadeMade = () => {
            defaultModelSave()
            $location.path("detail/handmadeMade/add/" + _this.typePage.id);
        }

        const getHandmadeImageEdit = (ID) => {
            $http.post(webURL.webApi + "handmade/getViewEditHandmadeImageService.php", ID).then((res) => {
                // console.log("res.data", res.data);
                res.data.filter(e => e.path = webURL.webImagesView + e.image)
                _this.model.imageStrings = res.data;

            }).catch((err) => {
                console.log("Error");
                showAlertBox(msgSettings.msgErrorApi, null);
            })
        }

        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }

        var slideIndex = 1;


        this.plusDivs = (n) => {
            showDivs(slideIndex += n);
        }

        function checkParams() {
            if (_this.typePage.handmade == "handmade" || _this.typePage.handmade == "handmadeMade") {
                if (_this.typePage.type == "add" || _this.typePage.type == "edit" || _this.typePage.type == "view") {
                    getHandmadeEdit(_this.typePage.id);
                } else {
                    $location.path('home');
                }
            } else {
                $location.path('home');
            }
        }

        function showDivs(n) {
            var i;
            var x = document.getElementsByClassName("mySlides");
            if (n > x.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = x.length }
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }

            if (x.length > 0)
                x[slideIndex - 1].style.display = "block";


        }

    }
]);