app.directive('shoppingList', function (listService, $log) {
    return {
        scope: {
            
        },
        link: function(scope, elem, attr){

            scope.sorting = "Sort Z to A";
            scope.alpha = true;
            scope.showSort = attr.showSort !== undefined;
            scope.showRemove = attr.showRemove !== undefined;
            scope.model = {newItem: "", quantity: 1};
            scope.list = listService.getCurrentList();



            scope.add = function(){
                if (!scope.list){
                    scope.list = listService.getCurrentList();

                }
                $log.log(scope);
                listService.addItem(scope.list.userId, scope.model.newItem, scope.model.quantity);
                scope.model.newItem = "";
                scope.model.quantity = 1;
                scope.list = listService.getCurrentList();

            }

            scope.remove = function(item) {
                listService.removeItem(scope.list.userId, item);
                $log.log("removed?");
                scope.list = listService.getCurrentList();

            }

            scope.markComplete = function(item) {
                //edit the item 
            }

            scope.swapSort = function() {
                if (scope.alpha) {
                    scope.sorting = "Sort A to Z";
                }
                else
                    scope.sorting = "Sort Z to A";
                scope.alpha = !scope.alpha;
            }

        },
        templateUrl: 'app/components/list/shoppingList.template.html'
    };
});