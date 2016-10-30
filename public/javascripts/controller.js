
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

myApp.controller('lightingCtrl', ['$scope','$http', '$timeout' ,'socket' , '$location', function($scope, $http, $timeout, socket, $location) {
    $scope.menuItem = "items";

    //List of items, categories, rooms, channels.
    $scope.items = [];
    $scope.categories = [];
    $scope.rooms = [];
    $scope.channels = [];
    $scope.disabled = false;

    $scope.tabs = [
        "items",
        "rooms",
        "channels",
        "timers"
    ];

    $scope.timers = [
        {
            'name':'Test',
            'status':1,
            'monday':0,
            'tuesday':0,
            'wednesday':0,
            'thursday':0,
            'friday':0,
            'saturday':1,
            'sunday':0,
            'hours':10,
            'minutes':0,
            'actions':[
                {'channel':1,'socket':1,'action':1},
                {'channel':1,'socket':2,'action':0}
            ]
        }
    ];

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
        $scope.disabled = false;

        var urlLoc = $location.path();
        var urlStrippedLoc = urlLoc.replace("/", '').toLowerCase();

        if($scope.tabs.indexOf(urlStrippedLoc.toLowerCase()) > -1){
            console.log("Setting tab")
            $scope.menuItem = urlStrippedLoc;
        }

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


    $scope.setMenuItem = function(name){
        $scope.menuItem = name;
    };

    $scope.toggleItemStatus = function(item){
        if($scope.disabled) {
            navigator.vibrate([300]);
        }else{
            $scope.disabled = true;
            navigator.vibrate([50]);
            var newStatus = (item.status == 0)? 1 : 0;
            item.pending=true;

            $http({
                method: 'POST',
                url: '/api/switch/' + item.channelNo + '/' + item.switchNo,
                data:{status: newStatus}
            }).then(function(response) {
                item.status = newStatus;
                socket.emit("item-state-changed", item);
            });
        }


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

    /**
     * Given a channel and a socket, returns the item as an array of objects
     * @param ch
     * @param so
     */
    $scope.getItemBySocket = function(ch,so){

        var toReturn = [];
        $scope.items.forEach(function(item){
            if(item.channelNo == ch && item.switchNo == so){
                toReturn.push(item);
            }
        })
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


myApp.directive('timerCard', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/timerCard.html'
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



myApp.filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});