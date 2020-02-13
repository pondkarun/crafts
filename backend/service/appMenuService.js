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
                    $location.path("account");
                }
            },
        },
    }).otherwise({ redirectTo: '/account' });

});



var checkPermission = function(authService) {
    authService.checkPermission();
}