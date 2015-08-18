(function () {

    // main application "wscApp" and dependencies
    var app = angular.module("wscApp", ['wsc.services', 'wsc.controllers','ngRoute', 'mobile-angular-ui', 'mobile-angular-ui.gestures']);

    /*
    app.run(function ($transform) {
        window.$transform = $transform;
    });
    */

    app.run(['$rootScope', function ($rootScope) {

        $rootScope.$on('$routeChangeStart', function (e, curr, prev) {
            if (curr.$$route && curr.$$route.resolve) {
                // Show a loading message until promises are not resolved
                // $root.loadingView = true;
                $rootScope.loading = true;
            }
        });

        $rootScope.$on('$routeChangeSuccess', function (e, curr, prev) {
            // Hide loading message
            // $root.loadingView = false;
            $rootScope.loading = false;
        });

    }]); // end app.run

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
        });

        $routeProvider.when('/article', {
            templateUrl: 'article.html',
            controller: 'ArticleCtrl',
            resolve: {
                articles: function (srvShop) {
                    return srvShop.getArticles();
                }
            }
        });

        $routeProvider.when('/article/:id', {
            templateUrl: 'detail.html',
            controller: 'ArticleDetailsCtrl',
            resolve: {
                /*
                productId: ['$route', function ($route) {
                    var params = $route.current.params;
                    params.productId =  params.productId || 123;
                }],
                */
                article: function (srvShop, $route) {
                    return srvShop.getArticle($route.current.params.id);
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

        $routeProvider.otherwise({ redirectTo: '/' });

    }]);


    // Controller definition
    var MainController = function ($rootScope, $scope, $log) {
        
        $scope.sum = function(items, prop){
            return items.reduce( function(a, b){
                return a + b[prop];
            }, 0);
        };
        
        
        $scope.VAT = 0.22;
        $scope.VATdescr = '22%';
        $rootScope.cart = [];

        $scope.sizeCart = 0;
        $scope.totalCart = 0.0;

        $rootScope.updateCart = function () {
            var _rtScoope = this;
            $scope.sizeCart = _rtScoope.cart.length;
        };
        $rootScope.updateCart();

        $rootScope.cartTotal = function (total) {
            var _rtScoope = this;
            $scope.totalCart = $scope.sum(_rtScoope.cart, 'subTotal');
        };
        $rootScope.cartTotal();
    };

    // Controller registration
    app.controller("MainController", ["$rootScope","$scope", "$log", MainController]);

}());