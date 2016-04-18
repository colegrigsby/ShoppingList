app.controller("logoutModalController", function($scope, $uibModalInstance, userService, $state){
    $scope.logout = function() {
        userService.clearCurrentUser();

        $uibModalInstance.close();
        $state.go("login");

    }
    $scope.home = function(){
        $uibModalInstance.dismiss('cancel');
    }
});