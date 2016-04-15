var app = angular.module("listApp", ['ui.bootstrap', 'ui.router']);

app.controller("spyController", function ($scope , $timeout) {

    $scope.title = "Nice!";

    $scope.message = "No message";
    $scope.show = false;
    $scope.backColor = "#5cb85c";

    $scope.$on("list:remove", function (data, name) {
        $scope.title = "Nice!";

        $scope.message = name + " removed";
        $scope.show = true;
        $timeout.cancel($scope.promise);
        $scope.backColor = "#5cb85c";

        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);

    });

    $scope.$on("list:add", function (data, name, quant) {
        $scope.title = "Nice!";

        $scope.message = name + " added with quantity " + quant;
        $scope.show = true;
        $scope.backColor = "#5cb85c";;

        $timeout.cancel($scope.promise);
        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);

    });


    $scope.$on("list:completed", function (data, name) {
        $scope.title = "Nice!";

        $scope.message = name +" completed";
        $scope.show = true;
        $scope.backColor = "#5cb85c";;
        $timeout.cancel($scope.promise);
        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);
    });


    $scope.$on("list:cleared", function () {
        $scope.title = "Nice!";

        $scope.message = "List Cleared!";
        $scope.show = true;
        $scope.backColor = "#5cb85c";;
        $timeout.cancel($scope.promise);
        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);
    });

    $scope.$on("login:error", function (data) {
        $scope.title = "Try again!";

        $scope.message = "username or password is incorrect";
        $scope.show = true;
        $scope.backColor = "#c9302c";
        $timeout.cancel($scope.promise);
        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);
    });

    $scope.$on("user:added", function (data, name) {
        $scope.title = "Nice!";

        $scope.message = name + " added as a user";
        $scope.show = true;
        $scope.backColor = "#5cb85c";;
        $timeout.cancel($scope.promise);
        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);
    });

    $scope.$on("user:duplicate", function (data, name) {
        $scope.title = "Uh Oh!";

        $scope.message = name +" is already taken as a username";
        $scope.show = true;
        $scope.backColor = "#c9302c";
        $timeout.cancel($scope.promise);
        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);
    });


    $scope.$on("user:loggedOff", function (data, name) {
        $scope.title = "Bye!";

        $scope.message = name +" logged off";
        $scope.show = true;
        $scope.backColor = "#5cb85c";;
        $timeout.cancel($scope.promise);
        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);
    });
    $scope.$on("user:loggedIn", function (data, name) {
        $scope.title = "Welcome!";

        $scope.message = name +" logged in";
        $scope.show = true;
        $scope.backColor = "#5cb85c";;
        $timeout.cancel($scope.promise);
        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);
    });
});