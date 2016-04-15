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

        //TODO check if duplicate, if so, add quantity to it
        var list;
        if ((list = this.getList(userId))) {
            //$log.log(list);
            var idx = listIndex(list);
            var duplicate = list.items.filter(function(item){
                return item.item == newItem;
            });
            if(duplicate[0]) {
                var q = (list.items[list.items.indexOf(duplicate[0])].quantity += quantity);
                $rootScope.$broadcast("list:updateQ", newItem, q);

            }
            else {
                list.items.push({item: newItem, quantity: quantity, completed: false});
                $rootScope.$broadcast("list:add", newItem, quantity);

            }
            updateList(idx, list);

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
        list.items = list.items.filter(function (itm) {

            return itm.item != itemToRemove.item || itm.quantity != itemToRemove.quantity;
        });


        //$log.log(list)
        rval = updateList(listsIdx, list);

        $rootScope.$broadcast("list:remove", itemToRemove.item);

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
        
        $rootScope.$broadcast("list:completed", item.item);
        
    };
    
    service.removeAllFromList = function(userId) {
        this.deleteList(userId);
        this.addList(userId);
        $rootScope.$broadcast("list:cleared");

    }
    
    service.deleteList = function (userId) {
        var list = this.getList(userId);
        var lists = getLists();
        var listsIdx = lists.indexOf(list);
        lists.splice(listsIdx, 1);
        updateLists(lists);
    };

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