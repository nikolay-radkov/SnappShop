app.controller('ContentCtrl', function ($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleRight();
    };
});