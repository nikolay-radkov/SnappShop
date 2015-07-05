'use strict';

app.controller('LoginCtrl',
    function ($scope, $location, $rootScope, $ionicPopup, identity, auth) {

        $scope.identity = identity;
        $scope.loginActive = true;


        if (identity.isAuthenticated()) {
            $location.path('/tab/home');
        }

        $scope.login = function (user, loginForm) {
            if (loginForm.$valid) {

                auth.login(user).then(function (success) {
                    if (success) {
                        identity.setCurrentUser(user);
                        var alertPopup = $ionicPopup.alert({
                            title: 'Info',
                            template: 'Successful registration'
                        });
                        alertPopup.then(function (res) {
                            $location.path('/tab/home');
                        });
                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error',
                            template: 'Username/Password combination is not valid!'
                        });
                    }
                },
                function(){
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
        };

        $scope.logout = function () {
            auth.logout().then(function () {
                console.log('Successful logout!');
                if ($scope.user) {
                    $scope.user.email = '';
                    $scope.user.username = '';
                    $scope.user.password = '';
                }

                $location.path('/home');
            })
        };

        $scope.changeToSignUp = function () {
            $scope.loginActive = false;
        };
    });