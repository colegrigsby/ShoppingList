app.controller("registerController", function($scope, $log, userService, listService, $location){

    $scope.model = {username: "", password: "", passwordConf: ""};

    $scope.register = function() {
        var id = userService.addUser($scope.model.username, $scope.model.password);
        if (id != -1) {
            //$log.log(id);
            listService.addList(id);
            $scope.model.username = "";
            $scope.model.password = "";
            $scope.model.passwordConf = "";
            $location.path("/home/login")
        }
    };


    $scope.passwordsMatch = function() {
        return $scope.model.password == $scope.model.passwordConf;
    };

});