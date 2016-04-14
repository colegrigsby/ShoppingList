app.controller("logoutModalController", function($scope, $uibModalInstance, userService, $location){
    $scope.logout = function() {
        userService.clearCurrentUser();

        $uibModalInstance.close();

        $location.path('/');

    }
    $scope.home = function(){
        $uibModalInstance.dismiss('cancel');
    }
});