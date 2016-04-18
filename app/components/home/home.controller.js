app.controller("homeController", function($scope, $log, listService, userService, $uibModal, $state){

    if(!userService.loggedIn()) {
        $state.go("login");
    }
    else { //is this bad practice? i was getting an error from get current list because cur user is undefined
        $scope.list = listService.getCurrentList();
        $scope.username = userService.getCurrentUser().username;
    }
    
    $scope.open = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/components/login/logout.partial.html',
            controller: 'logoutModalController',
            size: 'sm'
        });
        
    };

});