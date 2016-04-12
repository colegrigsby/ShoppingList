
app.factory('userService', function($rootScope, $log) {

    var service = {};
    var _id = 0;
    var _currentUser = {};


    service.addUser = function (username, password) { //TODO check duplicates etc
        var users = getUsers();

        var user = {id: _id, username: username, password: password};
        users.push(user);
        updateUsers(users);
        //TODO $rootscope.broadcast
        //todo prevent duplicates unique names 
        $log.log(localStorage);
        _id++;
        return _id - 1;
    };


    //TODO JSON STUFFS
    service.getUserById = function(userId){
        user = getUsers().filter(function(val) {
            return val.id == userId;
        });
        if (user[0])
            return user[0];
        return null;
        //ERROR HANDLING
    };

    service.getUserByName = function(username){
        user = getUsers().filter(function(val) {
            return val.username == username;
        });
        if (user[0])
            return user[0];
        return null;
    };

    service.removeUser = function(){
        //TODO
    };

    service.setCurrentUser = function(user){
        localStorage.currentUser = JSON.stringify(user);
        localStorage.loggedIn = true;
    }
    
    service.getCurrentUser = function() {
        $log.log(localStorage.loggedIn == true)
        if (localStorage.loggedIn)
            return JSON.parse(localStorage.currentUser);
        return -1;
    }

    service.loggedIn = function() {
        return JSON.parse(localStorage.loggedIn);
    }
    
    service.clearCurrentUser = function() {
        localStorage.currentUser = "";
        localStorage.loggedIn = false;
        $log.log(localStorage.loggedIn);
    }
    
    function updateUsers(users){
        localStorage.users = JSON.stringify(users);
    }

    function getUsers(){
        if (!localStorage.users)
            localStorage.users = JSON.stringify([]);
        return JSON.parse(localStorage.users);
    }

    return service;
});
