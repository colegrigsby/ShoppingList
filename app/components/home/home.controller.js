app.controller("homeController", function($scope, $rootScope, $log, listService, userService, $uibModal){

    $scope.list = listService.getCurrentList();
    $scope.username = userService.getCurrentUser().username;

    $rootScope.$on("loggedIn", function(data){
        $scope.list = listService.getCurrentList();
        $scope.username = userService.getCurrentUser().username;
    });

    $scope.loggedIn = function(){
        return userService.loggedIn();
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