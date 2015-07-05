'use strict';

app.factory('auth', function ($http, $q, $location, identity, baseUrl) {
    var usersApi = baseUrl;

    return {
        signup: function (user) {
            var deferred = $q.defer();

            $http.post(usersApi + '/register', user)
                .success(function () {
                    deferred.resolve();
                }, function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        },
        login: function (user) {
            var deferred = $q.defer();
            $http.post(baseUrl + '/login',user)
                .success(function (response) {
                    if (response["success"]) {
                        identity.setCurrentUser(response);
                        deferred.resolve(response);
                    }
                    else {
                        deferred.reject();
                    }
                });

            return deferred.promise;
        },
        logout: function () {
            var deferred = $q.defer();

            $http.post(usersApi + '/logout', {})
                .success(function () {
                    identity.setCurrentUser(undefined);
                    deferred.resolve();
                })
                .error(function(err){
                    deferred.reject(err);
                });

            return deferred.promise;
        },
        isAuthenticated: function () {
            if (identity.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        }
    }
});