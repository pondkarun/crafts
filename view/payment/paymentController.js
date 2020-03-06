'use strict'

app.controller("paymentController", ['$scope', '$rootScope', '$location', '$routeParams', 'customerService', '$http', 'customDialog', 'msgSettings',
    function($scope, $rootScope, $location, $routeParams, customerService, $http, customDialog, msgSettings) {
        var _this = this;
       
        this.init = function() { }

        this.save = () => {}

        this.cancel = () => {
            $location.path("home");
        }

        function modelPassNull(item) {
            _this.modelSave.password = null
            _this.modelSave.password_con = null
        }


        function showAlertBox(msg, callback) {
            var dialog = customDialog.defaultObj();
            dialog.content = msg;
            customDialog.alert(callback, dialog);
        }

    }
]);