app.controller('ContentCtrl', function ($scope, $ionicSideMenuDelegate, $location, identity) {
    $scope.identity = identity;

    if(!identity.isAuthenticated()) {
        $location.path('/login');
    }

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
});