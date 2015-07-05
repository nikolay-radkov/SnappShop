app.controller('InfoCtrl', function ($scope, $stateParams, $location, $ionicHistory, identity, productsData) {
    $scope.identity = identity;

    if(!identity.isAuthenticated()) {
        $location.path('/login');
    }

    var id = $stateParams.productId;

    var getProductInfo = function (id) {
        productsData.getProductInfo(id)
            .then(function (data) {
                $scope.item = data;
                console.log(data);

                $scope.navTitle='<img class="title-image" src="$scope.item.product.background" />';
            },
            function (err) {
                //TODO: handle error
            });
    };

    $scope.vote = function (voteValue) {
        productsData.updateVote({
            value: voteValue
        })
            .then(function (success) {
                if (success) {
                    //TODO:  update view
                }
                else {
                    //TODO: cant update
                }
            },
            function (err) {
                //TODO: handle error
            })
    };

    $scope.goBack = function () {
        $ionicHistory.goBack();
    };

    getProductInfo(id);
});