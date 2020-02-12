'use strict';

app.directive("gridSearch", [function() {
    return {
        restrict: "E",
        templateUrl: "./directive/shared/gridMaster/template/gridSearch.html",
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
                            "class": "text-center",
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


                if (operation.view) {
                    if (operation.disabledModeView == undefined || operation.disabledModeView == false) {
                        arr.push({ template: '<img ng-click="onView(dataItem)" class="btn-grid" ng-src="images/ui_view_table_active_btn.png">' })
                    } else if (operation.disabledModeView == true) {
                        arr.push({ template: '<img style="opacity:0.75; filter: grayscale(100%); cursor: not-allowed;" class="btn-grid" ng-src="images/ui_view_table_active_btn.png">' })
                    }
                }
                if (operation.edit) {
                    if (operation.disabledModeView == undefined || operation.disabledModeView == false) {
                        arr.push({ template: '<img ng-click="onEdit(dataItem)"  class="btn-grid" ng-src="images/ui_edit_table_active_btn.png">' })
                    } else if (operation.disabledModeView == true) {
                        arr.push({ template: '<img style="opacity:0.75; filter: grayscale(100%); cursor: not-allowed;"  class="btn-grid" ng-src="images/ui_edit_table_active_btn.png">' })
                    }
                }
                if (operation.del) {
                    if (operation.disabledModeView == undefined || operation.disabledModeView == false) {
                        arr.push({ template: '<img ng-click="onDel(dataItem)"  class="btn-grid" ng-src="images/ui_delete_table_active_btn.png">' })
                    } else if (operation.disabledModeView == true) {
                        arr.push({ template: '<img style="opacity:0.75; filter: grayscale(100%); cursor: not-allowed;"  class="btn-grid" ng-src="images/ui_delete_table_active_btn.png">' })
                    }
                }
                return arr;
            }

            $scope.gridOptions = $scope.gOption;
            $scope.gridOptions.columns = $scope.setCommandManagement($scope.gridOptions);

        }
    }

}]);