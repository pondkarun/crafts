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

    $routeProvider.when("/demoFormInput", {
        templateUrl: "app/demoFormInput/template/input-form.html",
        controller: "appController",
        resolve: {
            check: function($location, userService) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                }
            },
        },
    }).when("/demo/:id", {
        templateUrl: "app/demoFormInput/template/input-form.html",
        controller: "appController",
        resolve: {
            check: function($location, userService) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                }
            },
        },
    }).when("/login", {
        templateUrl: "app/login/template/login.html",
        controller: "loginController",
        resolve: {
            check: function($location, userService) {
                if (userService.isUserLoggedIn()) {
                    $location.path("account");
                }
            },
        },
    }).when("/account", {
        templateUrl: "app/account/template/account.html",
        controller: "accountController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "account",
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
    }).when("/deviceMe", {
        templateUrl: "app/deviceMe/template/deviceMe.html",
        controller: "deviceMeController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "deviceMe",
                        ID_STATUS_EM: userService.getStatusID()
                    }
                    $http.post(webURL.webApi + "menu/chackMenuUserService.php", model).then((res) => {
                        if (Number(res.data.COUNT_ID) <= 0) {
                            $location.path('/deviceMe');
                        }
                    })
                }
            },
        },
    }).when("/inventory", {
        templateUrl: "app/inventory/searchInventory/template/inventory.html",
        controller: "inventoryController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "inventory",
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
    }).when("/inventory/:type/:ID", {
        templateUrl: "app/inventory/addEditInventory/template/addEditInventory.html",
        controller: "addEditInventoryController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "inventory",
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
    }).when("/device", {
        templateUrl: "app/device/searchDevice/template/device.html",
        controller: "deviceController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "device",
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
    }).when("/device/add/:ID", {
        templateUrl: "app/device/addEditDevice/template/addEditDevice.html",
        controller: "addEditDeviceController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "device",
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
    }).when("/request", {
        templateUrl: "app/request/searchRequest/template/request.html",
        controller: "requestController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "request",
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
    }).when("/request/:Type/:ID", {
        templateUrl: "app/request/viewRequest/template/viewRequest.html",
        controller: "viewRequestController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "request",
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
    }).when("/service", {
        templateUrl: "app/service/searchService/template/service.html",
        controller: "serviceController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "service",
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
    }).when("/service/:Type/:ID", {
        templateUrl: "app/service/addEditService/template/addEditService.html",
        controller: "addEditServiceController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {

                    let model = {
                        ROUTEP: "service",
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
    }).when("/manager", {
        templateUrl: "app/manager/searchManager/template/manager.html",
        controller: "managerController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {
                    let model = {
                        ROUTEP: "manager",
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
    }).when("/manager/:Type/:ID", {
        templateUrl: "app/manager/viewManager/template/viewManager.html",
        controller: "viewManagerController",
        resolve: {
            check: function($location, userService, $http) {
                if (!userService.isUserLoggedIn()) {
                    $location.path('/login');
                } else {

                    let model = {
                        ROUTEP: "manager",
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
        templateUrl: "app/report/searchReport/template/report.html",
        controller: "reportController",
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