'use strict';

app.directive("gridMaster", [function() {
    return {
        restrict: "E",
        templateUrl: "./directive/shared/gridMaster/template/gridMaster.html",
        scope: {
            gOption: "=",
            onCallbackEdit: "=",
            onCallbackDel: "=",
            onCallbackView: "="
        },
        controller: function($scope) {

            $scope.setCommandManagement = function(option) {
                let res = [];
                let btnStatus = {};
                let iconStatus = {};

                if (option) {
                    res = option.columns;
                }
                if (option.management) {
                    btnStatus = {
                        command: $scope.setOperation(option.operation),
                        title: "การจัดการ",
                        attributes: {
                            // "data-title": "การจัดการ",
                            "class": "wrapper-btn-grid",
                        }
                    }
                    res.push(btnStatus)
                }
                if (option.showIndex) {
                    res.splice(0, 0, {
                        field: "rowNumber",
                        title: "ลำดับ",
                        template: "{{setIndex(dataItem)}}",
                        attributes: {
                            // "data-title": "ลำดับ",
                        }
                    })
                }
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

            $scope.setOperation = function(operation) {
                let arr = [];
                //if (operation.sort) {
                //    arr.push({ template: '<div ng-class="checkIndex(dataItem)" ng-click="ctrl.onSortUp(dataItem,ctrl.setIndex(dataItem))"></div><div ng-class="ctrl.checkIndexDown(dataItem)" ng-click="ctrl.onSortDown(dataItem,ctrl.setIndex(dataItem))"></div>' })
                //}

                if (operation.view) {
                    arr.push({ template: '<img ng-click="onView(dataItem)" class="btn-grid" ng-src="image/ui_view_table_active_btn.png">' })
                }
                if (operation.edit) {
                    arr.push({ template: '<img ng-click="onEdit(dataItem)" class="btn-grid" ng-src="image/ui_edit_table_active_btn.png">' })
                }
                if (operation.del) {
                    arr.push({ template: '<img ng-click="onDel(dataItem)" class="btn-grid" ng-src="image/ui_delete_table_active_btn.png">' })
                }
                return arr;
            }

            $scope.gridOptions = $scope.gOption;
            $scope.gridOptions.columns = $scope.setCommandManagement($scope.gridOptions);

        }
    }

}]);