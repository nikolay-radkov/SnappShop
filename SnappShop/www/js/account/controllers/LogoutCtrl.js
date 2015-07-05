'use strict';

app.controller('LogoutCtrl', function ($scope, $location, $rootScope, identity, auth) {
    $scope.logout = function () {
        if (identity.isAuthenticated()) {
            auth.logout()
                .then(function () {
                    $location.path('/login');
                });
        }
    };
});