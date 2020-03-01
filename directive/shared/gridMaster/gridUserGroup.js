'use strict';

app.directive("gridUserGroup", [function() {
    return {
        restrict: "E",
        templateUrl: "./directive/shared/gridMaster/template/gridUserGroup.html",
        scope: {
            gOption: "=",
            selected: "="
        },
        controller: function($scope) {

            $scope.hostRoot = ngAuthSettings.ClientDirective;

            $scope.setCommandManagement = function(option) {
                let res = [];
                let btnStatus = {};
                let iconStatus = {};

                if (option) {
                    res = option.columns;
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
                if (option.selectList) {
                    res.splice(0, 0, {
                        field: "selected",
                        title: " ", //$scope.titleCheckAll(),
                        command: $scope.setCheckboxOperation(),
                        attributes: {

                        }
                    });

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
            $scope.onChangePrivilege = function(item) {

                if (this.onCallbackPrivilege) {
                    this.onCallbackPrivilege(item);
                }
            }

            $scope.toggle = function(item, list) {
                var idx = list.indexOf(item);
                if (idx > -1) {
                    list.splice(idx, 1);
                } else {
                    list.push(item);
                }
            };

            $scope.exists = function(item, list) {
                return list.indexOf(item) > -1;
            };



            $scope.isIndeterminate = function() {
                return ($scope.selected.length !== 0 &&
                    $scope.selected.length !== $scope.gOption.dataSource._data.length);
            };

            $scope.isChecked = function() {
                return $scope.selected.length === $scope.gOption.dataSource._data.length;
            };

            $scope.toggleAll = function() {
                if ($scope.selected.length === $scope.gOption.dataSource._data.length) {
                    $scope.selected = [];
                } else if ($scope.selected.length === 0 || $scope.gOption.dataSource._data.length > 0) {
                    $scope.selected = $scope.gOption.dataSource._data.slice(0);
                }
            };

            $scope.onExpand = function(ev) {
                $scope.expandedItem = $scope.kendoGrid.dataItem(ev.masterRow);
            };



            $scope.titleCheckAll = function() {
                return '<md-checkbox aria-label="Select All" ng-checked="isChecked()" md-indeterminate="isIndeterminate()" ng-click="toggleAll()"></md-checkbox>'
            }

            $scope.setCheckboxOperation = function() {
                return {
                    template: '<md-checkbox aria-label="Select item" ng-checked="exists(dataItem, selected)" ng-click="toggle(dataItem, selected)"></md-checkbox>'
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