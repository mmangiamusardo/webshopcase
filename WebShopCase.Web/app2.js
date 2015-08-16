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

        $routeProvider.otherwise({ redirectTo: '/' });

    }]);


    // Controller definition
    /*
    var MainController = function ($rootScope, $http, $scope, $log, shop) {

        // I determine if remote data is currently being loaded.
        $scope.isLoading = false;

        // I contain the data that we wan to render.
        $scope.articles = [];

        var onComplete = function (data) {
            $scope.articles = data;
            $scope.$apply();
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch data.";
        };

        // User agent displayed in home page
        $scope.userAgent = navigator.userAgent;

        // Needed for the loading screen
        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.loading = false;
        });

        // I hold the handle on the current request for data. Since we want to
        // be able to abort the request, mid-stream, we need to hold onto the
        // request which will have the .abort() method on it.

        var requestForArticles = null;
        // ---
        // PUBLIC METHODS.
        // ---
        // I abort the current request (if its running).
        $scope.abortRequest = function () {
            return (requestForFriends && requestForFriends.abort());
        };


        //requestForFriends = shop.getArticles().then(onComplete, onError);

        // I load the remote data for the view.
        $scope.loadData = function() {
            // Flag the data is currently being loaded.
            $scope.isLoading = true;
            $scope.articles = [];
            // Make a request for data. Note that we are saving a reference to
            // this response rather than just piping it directly into a .then()
            // call. This is because we need to be able to access the .abort()
            // method on the request and we'll lose that original reference after
            // we call the .then() method.
            (requestForArticles = shop.getArticles()).then(
                function( data ) {
                    // Flag the data as loaded.
                    $scope.isLoading = false;
                    $scope.articles = data;
                },
                function( errorMessage ) {
                    // Flag the data as loaded (or rather, done trying to load). loading).
                    $scope.isLoading = false;
                    console.warn( "Request for friends was rejected." );
                    console.info( "Error:", errorMessage );
                }
            );
        };

    }
    */

    // Controller registration
    //app.controller("MainController", ["$rootScope", "$scope", "$http", "$log", "shop", MainController]);

}());