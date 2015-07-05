'use strict';

app.controller('SignUpCtrl',
    function ($scope, $location, $ionicPopup, auth, identity) {

        $scope.isLogged = identity.isAuthenticated();

        if (identity.isAuthenticated()) {
            $location.path('/tab/home');
        }

        $scope.signup = function (user, signUpForm) {
            if (signUpForm.$valid) {
                var result = JSON.stringify(user);
                auth.signup(result).then(function (success) {

                    var alertPopup = $ionicPopup.alert({
                        title: 'Info',
                        template: 'Successful registration'
                    });
                    alertPopup.then(function (res) {
                        $location.path('/login');
                    });

                }, function (err) {

                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'Username/Password combination is not valid!'
                    });

                });
            }
            else {

                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Username and password are required fields!'
                });

            }
        }
    });