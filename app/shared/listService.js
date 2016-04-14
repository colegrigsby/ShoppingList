app.factory('listService', function ($rootScope, userService, $log) {

    //Create empty object to start
    var service = {};


    service.getList = function (userId) {
        return getLists().filter(function (list) {
            return list.userId == userId;
        })[0];
    }
    service.getCurrentList = function () {
        return this.getList(userService.getCurrentUser().id)
    }


    service.addList = function (userId) {
        var lists = getLists();
        lists.push({userId: userId, items: []});
        updateLists(lists);
    }

    service.addItem = function (userId, newItem, quantity) {
        var list;
        if ((list = this.getList(userId))) {
            //$log.log(list);
            var idx = listIndex(list);

            list.items.push({item: newItem, quantity: quantity, completed: false});
            //$log.log(idx)

            updateList(idx, list);
            $rootScope.$broadcast("add", newItem, quantity);

        }
        else {
            // emit an error, clear the fields of the second controller
        }

    }

    //removes all instances of the item where it's quantity is the same 
    service.removeItem = function (userId, itemToRemove) {

        var rval;
        var list = this.getList(userId);
        var listsIdx = listIndex(list);
        $log.log(listsIdx);
        list.items = list.items.filter(function (itm) {

            return itm.item != itemToRemove.item || itm.quantity != itemToRemove.quantity;
        });


        //$log.log(list)
        rval = updateList(listsIdx, list);

        $rootScope.$broadcast("remove", itemToRemove.item);

        return rval;
    }

    service.toggleComplete = function(userId, item){
        var list = this.getList(userId);
        var listsIdx = getLists().indexOf(list);
        list.items = list.items.filter(function (itm) {

            return itm.item != item.item || itm.quantity != item.quantity;
        });


        item.completed = !item.completed;

        list.items.push(item);
        updateList(listsIdx, list);
        
        $rootScope.$broadcast("completed", item.item);
        
    }
    
    service.deleteList = function (userId) {
        //to be called when a user is deleted 
    }

    function updateLists(lists) {
        localStorage.lists = JSON.stringify(lists);
    }

    function getLists() {
        if (!localStorage.lists)
            localStorage.lists = JSON.stringify([]);
        return JSON.parse(localStorage.lists);
    }

    //
    function updateList(idx, list) {
        lists = getLists();
        var ret = lists.splice(idx, 1);
        lists.push(list);
        updateLists(lists);
        return ret;
    }

    function listIndex(list){
        var lists = getLists();
        for (var i = 0; i < lists.length; i++){
            if (lists[i].userId == list.userId)
                return i;
        }
        return -1;
    }

    return service;

});