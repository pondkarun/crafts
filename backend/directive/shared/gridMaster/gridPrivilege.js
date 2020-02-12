'use strict';

app.directive("gridPrivilege", [function() {
    return {
        restrict: "E",
        templateUrl: "./directive/shared/gridMaster/template/gridPrivilege.html",
        scope: {
            gOption: "=",
            onCallbackEdit: "=",
            onCallbackDel: "=",
            onCallbackView: "=",
            onCallbackPrivilege: "="
        },
        controller: function($scope) {



            $scope.setCommandManagement = function(option) {
                let res = [];
                let btnStatus = {};
                let iconStatus = {};

                if (option) {
                    res = option.columns;
                }
                if (option.permission) {
                    btnStatus = {
                        command: $scope.setPermissionOperation(),
                        title: "โต๊ะข่าว",
                        attributes: {
                            "class": "wrapper-btn-grid",
                        }
                    }
                    res.push(btnStatus)
                }

                if (option.privilege) {
                    btnStatus = {
                        command: $scope.setPrivilegeOperation(),
                        title: "สิทธิ์",
                        attributes: {
                            "class": "wrapper-btn-grid",
                        }
                    }
                    res.push(btnStatus)
                }

                if (option.management) {
                    btnStatus = {
                        command: $scope.setOperation(option.operation),
                        title: "การจัดการ",
                        attributes: {
                            "class": "wrapper-btn-grid",
                        }
                    }
                    res.push(btnStatus)
                }


                //if (option.showIndex) {
                //    res.splice(0, 0, {
                //        field: "rowNumber",
                //        title: "ลำดับ",
                //        template: "{{setIndex(dataItem)}}",
                //        attributes: {}
                //    })
                //}

                return res;
            }

            $scope.setIndex = function(item) {
                let index = $scope.kendoGrid.dataSource.indexOf(item) + 1;
                return index;
            }

            $scope.onEdit = function(item) {
                if (this.onCallbackEdit) {
                    this.onCallbackEdit(item);
                }
            }

            $scope.onDel = function(item) {
                if (this.onCallbackDel) {
                    this.onCallbackDel(item);
                }
            }
            $scope.onView = function(item) {
                if (this.onCallbackView) {
                    this.onCallbackView(item);
                }
            }
            $scope.onChangePrivilege = function(item) {

                if (this.onCallbackPrivilege) {
                    this.onCallbackPrivilege(item);
                }
            }



            $scope.setPermissionOperation = function() {
                return {
                    template: '<div ng-repeat="x in dataItem.NEWS_DESKS">{{x.NEWS_DESK_NAME}} </div>'
                }
            }

            $scope.setPrivilegeOperation = function() {
                return {
                    template: '<md-radio-group  ng-change="onChangePrivilege(dataItem)" ng-model="dataItem.IDENTITY_ROLE_ID" aria-label="">' +
                        '<md-radio-button value="1">Super Admin</md-radio-button>' +
                        '<md-radio-button value="2">Admin</md-radio-button> ' +
                        '<md-radio-button value="3">Read/Write</md-radio-button> ' +
                        '<md-radio-button value="4">Read Only</md-radio-button>' +
                        '<md-radio-button value="5">ไม่มีสิทธิ์</md-radio-button>' +
                        '</md-radio-group>'
                }
            }

            $scope.setOperation = function(operation) {
                let arr = [];
                if (operation.edit) {
                    arr.push({
                        template: '<img ng-click="onEdit(dataItem)" ng-show="dataItem.IDENTITY_ROLE_ID==2||dataItem.IDENTITY_ROLE_ID==3" class="btn-grid" ng-src="image/ui_edit_table_active_btn.png"> '
                            //+ '<img ng-hide="dataItem.IDENTITY_ROLE_ID==2||dataItem.IDENTITY_ROLE_ID==3" class="btn-grid" ng-src="image/ui_edit_table_enable_btn.png">'
                    })
                }
                return arr;
            }

            $scope.gridOptions = $scope.gOption;
            $scope.gridOptions.columns = $scope.setCommandManagement($scope.gridOptions);

        }
    }

}]);