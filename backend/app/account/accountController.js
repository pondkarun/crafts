'use strict'

app.controller("accountController", ['$scope', '$rootScope', '$location', '$routeParams', 'userService', '$http', 'customDialog', 'msgSettings',
    function($scope, $rootScope, $location, $routeParams, userService, $http, customDialog, msgSettings) {
        let _this = this;
        $scope.modelSave = {};
        _this.ID = userService.getID();
        this.init = function() {
            getUserProfile(_this.ID)
        }
        $scope.saveForm = () => {


            if (!$scope.modelSave.PASSWORD || !$scope.modelSave.EMAIL) { //เช็คว่ากรอกข้อมูลครบไหม
                showAlertBox(msgSettings.msgValidForm, null);
            } else if (md5($scope.modelSave.PASSWORD) != $scope.modelSave.PASSWORD_OLD) { //เช็คว่า Passwordเก่า ถูกไหม
                showAlertBox(msgSettings.msgErrPassword, null);
            } else if (!$scope.modelSave.NEW_PASSWORD && !$scope.modelSave.CON_PASSWORS) { //เช็คการยืนยัน Password  ถูกไหม
                let Save = {
                    ID: _this.ID,
                    EMAIL: $scope.modelSave.EMAIL,
                    NICKNAME: $scope.modelSave.NICKNAME,
                    IPAddress: $scope.modelSave.IPAddress,
                    TEL: $scope.modelSave.TEL,
                    PASSWORD: md5($scope.modelSave.PASSWORD),
                }
                saveData(Save);
            } else {
                if ($scope.modelSave.NEW_PASSWORD && $scope.modelSave.CON_PASSWORS) {
                    if ($scope.modelSave.NEW_PASSWORD == $scope.modelSave.CON_PASSWORS) {
                        let Save = {
                            ID: _this.ID,
                            EMAIL: $scope.modelSave.EMAIL,
                            NICKNAME: $scope.modelSave.NICKNAME,
                            IPAddress: $scope.modelSave.IPAddress,
                            TEL: $scope.modelSave.TEL,
                            PASSWORD: md5($scope.modelSave.PASSWORD_NEW),
                        }
                        saveData(Save);
                    } else {
                        showAlertBox(msgSettings.msgUnlikePassword, null);
                    }
                } else {
                    showAlertBox(msgSettings.msgValidForm, null);
                }
            }
        }

        const getUserProfile = (ID) => {
            loading.open();
            $http.post(webURL.webApi + "user/userProfileService.php", ID).then((res) => {
                // console.log("res.data", res.data);
                if (res.data.status == 200) {
                    $scope.modelSave = res.data
                } else {
                    console.log("Error");
                    showAlertBox(msgSettings.msgTryAgain, null);
                }
                // console.log("$scope.modelSave", $scope.modelSave);
                loading.close();
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

        function saveData(item) {
            loading.open();
            $http.post(webURL.webApi + "user/editUserProfileService.php", item).then((res) => {
                //console.log("res.data", res.data);
                showAlertBox(msgSettings.msgSaveSucc, null);
            }).catch((err) => {
                loading.close();
                showAlertBox(msgSettings.msgNotSave, null);
            }).finally(() => {
                loading.close();
                let ID = userService.getID();
                getUserProfile(_this.ID)
            });

        }
    }

]);