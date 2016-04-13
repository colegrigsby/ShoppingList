var app = angular.module("listApp", ['ui.bootstrap', 'ui.router']);

app.controller("spyController", function ($scope, $rootScope, $timeout) {

    $scope.controllerName = "Popup!";

    $scope.message = "No message";
    $scope.show = false;
    $scope.backColor = "#7BCC70";

    $rootScope.$on("remove", function (data, name) {
        $scope.message = name + " removed";
        $scope.show = true;
        $timeout.cancel($scope.promise);
        $scope.backColor = "#7BCC70";;

        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);

    });

    $rootScope.$on("add", function (data, name, quant) {
        $scope.message = name + " added with quantity " + quant;
        $scope.show = true;
        $scope.backColor = "#7BCC70";;

        $timeout.cancel($scope.promise);
        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);

    });
   /* $rootScope.$on("adderror", function (data, name, list) {
        $scope.message = name + " cannot be added to " + list + " because the list does not exist";
        $scope.show = true;
        $timeout.cancel($scope.promise);
        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);
    });*/
    $rootScope.$on("loginError", function (data) {
        $scope.message = "username or password is incorrect";
        $scope.show = true;
        $scope.backColor = "red";
        $timeout.cancel($scope.promise);
        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);
    });

    $rootScope.$on("userAdded", function (data, name) {
        $scope.message = name + " added as a user";
        $scope.show = true;
        $scope.backColor = "#7BCC70";;
        $timeout.cancel($scope.promise);
        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);
    });

    $rootScope.$on("duplicateUser", function (data, name) {
        $scope.message = name +" is already taken as a username";
        $scope.show = true;
        $scope.backColor = "red";
        $timeout.cancel($scope.promise);
        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);
    });


    $rootScope.$on("completed", function (data, name) {
        $scope.message = name +" completed";
        $scope.show = true;
        $scope.backColor = "#7BCC70";;
        $timeout.cancel($scope.promise);
        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);
    });


    $rootScope.$on("loggedOff", function (data, name) {
        $scope.message = name +" logged off";
        $scope.show = true;
        $scope.backColor = "#7BCC70";;
        $timeout.cancel($scope.promise);
        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);
    });
    $rootScope.$on("loggedIn", function (data, name) {
        $scope.message = name +" logged in";
        $scope.show = true;
        $scope.backColor = "#7BCC70";;
        $timeout.cancel($scope.promise);
        $scope.promise = $timeout(function () {
            $scope.show = false;
        }, 5000);
    });
});