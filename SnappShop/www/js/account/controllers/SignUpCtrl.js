'use strict';

app.controller('SignUpCtrl',
    function ($scope, $location, auth, identity) {

        $scope.isLogged = identity.isAuthenticated();

        $scope.signup = function (user, signUpForm) {
            console.log(user);
            if (signUpForm.$valid) {
                var result = JSON.stringify(user);
                auth.signup(result).then(function (success) {
                    if (success) {
                        $location.path('/login');
                    }
                    else {
                        $scope.error = 'Username/Password combination is not valid!';
                    }
                },function(err){
                    console.log(err);
                });
            }
            else {
                console.log('Username and password are required fields!')
            }
        }
    });