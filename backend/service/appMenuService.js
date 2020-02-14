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
                    $location.path("employed");
                }
            },
        },
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
                            $location.path('/employed');
                        }
                    })
                }
            },
        },
    }).when("/employed/:Type/:ID", {
        templateUrl: "app/employed/addEditEmployed/template/addEditEmployed.html",
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
                            $location.path('/employed');
                        }
                    })
                }
            },
        },
    }).otherwise({ redirectTo: '/employed' });

});



var checkPermission = function(authService) {
    authService.checkPermission();
}