﻿(function () {

    // main application "wscApp" and dependencies
    var app = angular.module("wscApp", ['wsc.services', 'wsc.controllers','ngRoute', 'mobile-angular-ui', 'mobile-angular-ui.gestures']);

    
    app.run(function ($transform) {
        window.$transform = $transform;
    });
    

    app.run(['$rootScope', '$location', function ($rootScope, $location) {

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            if (next.indexOf('?uiSidebarLeft') > 0) {
                event.preventDefault();
            }
        });

        
        $rootScope.$on('$routeChangeStart', function (e, curr, prev) {
            if (curr.$$route && curr.$$route.resolve) {
                // Show a loading message until promises are not resolved
                //$rootScope.loading = true;
            }
        });
        

        $rootScope.$on('$routeChangeSuccess', function (e, curr, prev) {
            // Hide loading message
            $rootScope.loading = false;
        });

    }]); // end app.run

    app.config(['$routeProvider', function ($routeProvider) {
        //!$route.current.params.uiSidebarLeft

        $routeProvider.when('/article', {
            templateUrl: 'article.html',
            controller: 'ArticleCtrl',
            resolve: {
                articles: function (srvShop) {
                    return srvShop.getArticles();
                }
            }
        });

        $routeProvider.when('/cart', {
            templateUrl: 'cart.html',
            controller: 'CartCtrl'
        });

        $routeProvider.when('/order', {
            templateUrl: 'order.html',
            controller: 'OrderCtrl'
        });

        $routeProvider.when('/process/:id', {
            templateUrl: 'process.html',
            controller: 'ProcessCtrl',
            resolve: {
                order: function (srvShop, $route) {
                    return srvShop.getOrder($route.current.params.id);
                }
            }
        });

        $routeProvider.otherwise({ redirectTo: '/article' });

    }]);


    // Controller definition
    var MainController = function ($rootScope, $scope, $log) {

        $scope.sum = function(items, prop){
            return items.reduce( function(a, b){
                return a + b[prop];
            }, 0);
        };
       
        $scope.isEmpty = function (obj) {
            if (Object.getOwnPropertyNames(obj).length > 0)
                return false;
            else
                return true;
        };
       

        $scope.VAT = 0.22;
        $scope.VATdescr = '22%';

        $rootScope.clearCart = function () {
            $rootScope.cart = [];
            $scope.subtotals = [];

            $scope.sizeCart = 0;
            $scope.totalCart = 0.0;
        };
        $rootScope.clearCart();

        $rootScope.cartTotal = function (total) {
            var _rtScoope = this;

            // http://jsfiddle.net/3jaJC/1/
            $scope.subtotals = _rtScoope.cart.reduce(function (c, x) {
                if (!c[x.productId]) {
                    c[x.productId] = {
                        productName: x.productName,
                        productId: x.productId,
                        productPct: x.picture,
                        productPrice : x.unitPrice,
                        totalQty: 0,
                        total: 0
                    };
                }

                c[x.productId].totalQty += Number(x.cartQty);
                c[x.productId].total += Number(x.unitPrice);

                return c;
            }, {});

        };
        $rootScope.cartTotal();

        $rootScope.updateCart = function () {
            var _rtScope = this;
            $scope.sizeCart = $scope.sum(_rtScope.cart, 'cartQty');
            $scope.totalCart = $scope.sum(_rtScope.cart, 'unitPrice');
        };
        $rootScope.updateCart();

        
    };

    // Controller registration
    app.controller("MainController", ["$rootScope", "$scope", "$log", MainController]);

    // http://jsfiddle.net/2ZzZB/56/
    app.filter('startFrom', function () {
        return function (input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });

    app.directive('myDirective', function () {
        return {
            restrict: 'E',
            templateUrl: 'detail.html',
            link: function (scope, element, attrs) {
                scope.do = function () {
                    console.log('doing something...');
                }
            }
        };
    });

}());