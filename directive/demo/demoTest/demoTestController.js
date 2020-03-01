'use strict';
app.controller('demoController', ['$scope',
    function($scope) {
        console.log("aaaa");


    }
]);

app.directive('demoTest', function() {

    return {
        restrict: "E",
        templateUrl: "./directive/demo/demoTest/template/demoTest.html",
        scope: {
            id: "=",
        },
        controllerAs: 'demoController',
        link: function($scope, $element, $attr) {
            $scope.gridOptions = {
                gridID: 'gridSearchSummaryReport',
                dataSource: new kendo.data.DataSource({ data: [], pageSize: 10 }),
                sortable: true,
                pageable: true,
                columns: [{
                        field: "REPORT_DATE",
                        title: "วันที่"
                    },
                    {
                        field: "SUMMARY_REPORT_NAME",
                        title: "ชื่อเรื่อง"
                    }, {
                        field: "UPDATE_NAME",
                        title: "ผู้บันทึก"
                    }
                ],
                management: true,
                operation: {
                    view: true,
                    del: true,
                    edit: true
                },
                showIndex: true,
            };
        }
    }
});