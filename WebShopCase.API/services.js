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

        getOrder: function () {
            var promise = $http({ method: 'GET', url: 'http://localhost:7054/api/products' })
                            .success(function (data, status, headers, config) {
                                return data;
                            });
            return promise;
        }

        /*
        $scope.sendAnswer = function (option) {
        $scope.working = true;
        $scope.answered = true;

        $http.post('/api/trivia', { 'questionId': option.questionId, 'optionId': option.id }).success(function (data, status, headers, config) {
            $scope.correctAnswer = (data === "true");
            $scope.working = false;
        }).error(function (data, status, headers, config) {
            $scope.title = "Oops... something went wrong";
            $scope.working = false;
            });
        };
        */


    };
    return sdo;

}]);