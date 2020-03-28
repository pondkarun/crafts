'use strict'
//demo
app.config(function($routeProvider, $mdDateLocaleProvider) {

    $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format('DD-MM-YYYY') : '';
    };

    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD-MM-YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };

    $routeProvider.when("/login", {
        templateUrl: "app/login/template/login.html",
        controller: "loginController",
        resolve: {
            check: function($location, userService) {
                if (userService.isUserLoggedIn()) {
                    $location.path("/account");
                }
            },
        },
    }).when("/account", {
        templateUrl: "app/account/account/template/account.html",
        controller: "accountController",
        resolve: {
            check: function($location, userService) {
                if (!userService.isUserLoggedIn()) {
                    $location.path("/login");
                }
            },
        }
    }).when("/employed", {
        templateUrl: "app/employed/searchEmployed/template/employed.html",
        controller: "employedController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "employed",
                        ID_STATUS_EM: userService.getStatusID()
                    }
                    $http.post(webURL.webApi + "menu/chackMenuUserService.php", model).then((res) => {
                        if (Number(res.data.COUNT_ID) <= 0) {
                            $location.path('/account');
                        }
                    })
                }
            },
        },
    }).when("/employed/:Type/:ID", {
        templateUrl: "app/employed/addEditEmployed/template/addEditEmployed.html",
        controller: "addEditEmployedController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "employed",
                        ID_STATUS_EM: userService.getStatusID()
                    }
                    $http.post(webURL.webApi + "menu/chackMenuUserService.php", model).then((res) => {
                        if (Number(res.data.COUNT_ID) <= 0) {
                            $location.path('/account');
                        }
                    })
                }
            },
        },
    }).when("/handmade", {
        templateUrl: "app/handmade/searchHandmade/template/handmade.html",
        controller: "handmadeController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "handmade",
                        ID_STATUS_EM: userService.getStatusID()
                    }
                    $http.post(webURL.webApi + "menu/chackMenuUserService.php", model).then((res) => {
                        if (Number(res.data.COUNT_ID) <= 0) {
                            $location.path('/account');
                        }
                    })
                }
            },
        },
    }).when("/handmade/:Type/:ID", {
        templateUrl: "app/handmade/addEditViewHandmade/template/addEditViewHandmade.html",
        controller: "addEditViewHandmadeController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "handmade",
                        ID_STATUS_EM: userService.getStatusID()
                    }
                    $http.post(webURL.webApi + "menu/chackMenuUserService.php", model).then((res) => {
                        if (Number(res.data.COUNT_ID) <= 0) {
                            $location.path('/account');
                        }
                    })
                }
            },
        },
    }).when("/bank", {
        templateUrl: "app/bank/bank/template/bank.html",
        controller: "bankController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "handmade",
                        ID_STATUS_EM: userService.getStatusID()
                    }
                    $http.post(webURL.webApi + "menu/chackMenuUserService.php", model).then((res) => {
                        if (Number(res.data.COUNT_ID) <= 0) {
                            $location.path('/account');
                        }
                    })
                }
            },
        },
    }).when("/order", {
        templateUrl: "app/order/searchOrder/template/order.html",
        controller: "orderController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "order",
                        ID_STATUS_EM: userService.getStatusID()
                    }
                    $http.post(webURL.webApi + "menu/chackMenuUserService.php", model).then((res) => {
                        if (Number(res.data.COUNT_ID) <= 0) {
                            $location.path('/account');
                        }
                    })
                }
            },
        },
    }).when("/order/:Type/:ID", {
        templateUrl: "app/order/addEditViewOrder/template/addEditViewOrder.html",
        controller: "addEditViewOrderController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "order",
                        ID_STATUS_EM: userService.getStatusID()
                    }
                    $http.post(webURL.webApi + "menu/chackMenuUserService.php", model).then((res) => {
                        if (Number(res.data.COUNT_ID) <= 0) {
                            $location.path('/account');
                        }
                    })
                }
            },
        },
    }).when("/report", {
        templateUrl: "app/report/searchReport/template/searchReport.html",
        controller: "searchReportController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "report",
                        ID_STATUS_EM: userService.getStatusID()
                    }
                    $http.post(webURL.webApi + "menu/chackMenuUserService.php", model).then((res) => {
                        if (Number(res.data.COUNT_ID) <= 0) {
                            $location.path('/account');
                        }
                    })
                }
            },
        },
    }).otherwise({ redirectTo: '/account' });

});



var checkPermission = function(authService) {
    authService.checkPermission();
}