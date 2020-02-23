﻿'use strict'
//demo
app.config(function($routeProvider, $mdDateLocaleProvider) {

    $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format('DD-MM-YYYY') : '';
    };

    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD-MM-YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };

    $routeProvider.when("/home", {
        templateUrl: "view/home/template/home.html",
        controller: "homeController"
    }).when("/register", {
        templateUrl: "view/register/template/register.html",
        controller: "registerController"
    }).when("/detail/:id", {
        templateUrl: "view/detail/template/detail.html",
        controller: "detailController"
    }).otherwise({ redirectTo: '/home' });
});



var checkPermission = function(authService) {
    authService.checkPermission();
}