'use strict'

app.controller("detailController", ['$scope', '$rootScope', '$location', '$routeParams', 'customerService', '$http', 'customDialog', 'msgSettings',
    function($scope, $rootScope, $location, $routeParams, customerService, $http, customDialog, msgSettings) {
        var _this = this;
        this.model = {
            id: null,
            name: null,
            price: null,
            type: null,
            type_id: null,
            employed_name: null,
            color: [],
            size: [],
            imageStrings: []
        };

        $scope.ShowId = function(event) {
            alert(event.target.id);
        };


        this.init = function() {
            loading.open();
            _this.typePage = $routeParams;
            getHandmadeEdit(_this.typePage.id);
            showDivs(slideIndex);
            setTimeout(function() {
                _this.plusDivs(1);
                loading.close();
            }, 500);
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