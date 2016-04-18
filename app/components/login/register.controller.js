app.controller("registerController", function($scope, $log, userService, listService, $state){

    $scope.model = {username: "", password: "", passwordConf: ""};

    $scope.register = function() {
        var id = userService.addUser($scope.model.username, $scope.model.password);
        if (id != -1) {
            //$log.log(id);
            listService.addList(id);
            $scope.model.username = "";
            $scope.model.password = "";
            $scope.model.passwordConf = "";
            $state.go("login")
        }
    };


    $scope.passwordsMatch = function() {
        return $scope.model.password == $scope.model.passwordConf;
    };

});