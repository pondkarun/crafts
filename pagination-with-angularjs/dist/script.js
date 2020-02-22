(function() {
    'use-strict';

    angular
        .module('paginationApp', [])
        .factory('PaginationService', PaginationService)
        .controller('PaginationController', PaginationController);

    function PaginationController(PaginationService) {
        var _this = this;

        _this.dummyItems = _.range(1, 7); // dummy array of items to be paginated 
        _this.pager = {};
        _this.setPage = setPage;

        initPager();

        function initPager() {
            // initially set to page 1
            _this.setPage(1);
        }

        function setPage(page) {
            // console.log("page", page);
            // console.log("_this.pager.totalPages", _this.pager.totalPages);
            if (page < 1 || page > _this.pager.totalPages) {
                return;
            }

            // get the pager object from service 
            _this.pager = PaginationService.GetPager(_this.dummyItems.length, page);

            // get current page of items 
            // console.log("_this.pager.startIndex", _this.pager.startIndex);
            // console.log("_this.pager.endIndex + 1", _this.pager.endIndex + 1);

            _this.items = _this.dummyItems.slice(_this.pager.startIndex, _this.pager.endIndex + 1);
        }
    }

    function PaginationService() {
        // service definition 
        var service = {};

        service.GetPager = GetPager;

        return service;

        // service implementation
        function GetPager(totalItems, currentPage, pageSize) {
            console.log("totalItems", totalItems);
            console.log("currentPage", currentPage);
            console.log("pageSize", pageSize);

            // default to page 1
            currentPage = currentPage || 1;

            // default page size will be 10
            pageSize = pageSize || 3;

            // calc total pages 
            var totalPages = Math.ceil(totalItems / pageSize);

            var startPage, endPage;
            if (totalPages <= 10) {
                // less than 10 total pages so show all
                startPage = 1;
                endPage = totalPages;
            } else {
                // more than 10 total pages so calculate start and end pages
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }

            // calculate start and end item indexes
            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

            // create an array of pages to ng-repeat in the pager control
            var pages = _.range(startPage, endPage + 1);

            // return object with all pager properties required by the view
            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
        }
    }
})();