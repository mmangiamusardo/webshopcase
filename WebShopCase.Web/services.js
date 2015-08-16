'use strict';
var services = angular.module('wsc.services', []);

services.factory('srvShop', ['$http', function ($http) {
    var sdo = {

        getBooks: function () {
            var promise = $http({ method: 'GET', url: 'api/books.php' }).success(function (data, status, headers, config) {
                return data;
            });

            return promise;
        },

        getMovies: function () {
            var promise = $http({ method: 'GET', url: 'api/movies.php' }).success(function (data, status, headers, config) {
                return data;
            });

            return promise;
        },

        getArticles: function () {
            var promise = $http({ method: 'GET', url: 'http://localhost:7054/api/products' })
                            .success(function (data, status, headers, config) {
                                return data;
                            });
            return promise;

        }
    }

    return sdo;

}]);