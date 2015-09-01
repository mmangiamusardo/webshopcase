'use strict';
var services = angular.module('wsc.services', []);

services.factory('srvShop', ['$http', function ($http) {
    var sdo = {

        getArticles: function () {
            var promise = $http({
                method: 'GET',
                url: 'http://localhost:7054/api/product'
            })
                            .success(function (data, status, headers, config) {
                                return data;
                            });
            return promise;
        },

        getArticle: function (id) {
            var promise = $http({
                method: 'GET',
                url: 'http://localhost:7054/api/product/' + id
            })
                            .success(function (data, status, headers, config) {
                                return data;
                            });
            return promise;
        },

        postOrder: function (order) {
            
            var promise = $http({
                method: 'POST',
                url: 'http://localhost:7054/api/order',
                data : order
            })
                            .success(function (data, status, headers, config) {
                                return data;
                            });
            return promise;
        },

        getOrder: function (id) {
            var promise = $http({ method: 'GET', url: 'http://localhost:7054/api/order/' + id })
                            .success(function (data, status, headers, config) {
                                return data;
                            });
            return promise;
        }

    };
    return sdo;

}]);