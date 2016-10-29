
var myApp = angular.module('lightingApp',[]);

myApp.factory('socket', ['$rootScope', function($rootScope) {
    var socket = io.connect();

    return {
        on: function(eventName, callback){
            socket.on(eventName, callback);
        },
        emit: function(eventName, data) {
            socket.emit(eventName, data);
        }
    };
}]);

myApp.controller('lightingCtrl', ['$scope','$http', '$timeout' ,'socket', function($scope, $http, $timeout, socket) {
    $scope.greeting = "hello";
    $scope.menuItem = "Items";

    //List of items, categories, rooms, channels.
    $scope.items = [];
    $scope.categories = [];
    $scope.rooms = [];
    $scope.channels = [];


    /**
     * When notified that clients are to update status, call init function
     */
    socket.on('clientDoStateUpdate', function (data) {
        console.info("Update request received by controller.js");
        $scope.init();
    });


    /**
     * Initialise the app
     * Pull in data from the DB
     */
    $scope.init = function(){
        console.info("Initialising app");
        $scope.editingItem = -1;
        $http({
            method: 'GET',
            url: '/api/list'
        }).then(function successCallback(response) {
            var data = response.data;

            for(var i=0; i<data.length; i++){
                if($scope.categories.indexOf(data[i].category) == -1) $scope.categories.push(data[i].category);
                if($scope.rooms.indexOf(data[i].room) == -1) $scope.rooms.push(data[i].room);

            }

            $scope.items = response.data;
        });
    };
    $scope.init();


    $scope.toggleItemStatus = function(item){

        var newStatus = (item.status == 0)? 1 : 0;
        $http({
            method: 'POST',
            url: '/api/switch/' + item.channelNo + '/' + item.switchNo,
            data:{status: newStatus}
        }).then(function(response) {
            item.status = newStatus;
            socket.emit("item-state-changed", item);
        });

    };

    /**
     * Gets item given a category
     * @param cat
     */
    $scope.itemsByCategory = function(cat){
        var toReturn = [];
        $scope.items.forEach(function(i){
            if(i.category == cat) toReturn.push(i);
        });
        return toReturn;
    };

    /**
     * Gets item given a room
     * @param room
     */
    $scope.itemsByRoom = function(room){
        var toReturn = [];
        $scope.items.forEach(function(i){
            if(i.room == room) toReturn.push(i);
        });
        return toReturn;
    }



}]);


/**
 * DIRECTIVES
 */
myApp.directive('itemList', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/itemList.html'
    };
});

myApp.directive('roomList', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/roomList.html'
    };
});

myApp.directive('channelList', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/channelList.html'
    };
});

myApp.directive('timerList', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/timerList.html'
    };
});


myApp.directive('card', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/card.html'
    };
});


myApp.directive('menuItem', function() {
    return {
        templateUrl: '/templates/menuItem.html',
        restrict: 'AE',
        replace: true,
        scope:{
            ngModel: '='
        },
        link: function(scope, element, attributes){
            scope.name = attributes.name;
        }
    };
});


