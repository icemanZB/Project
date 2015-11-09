angular.module('myApp',[], function () {

})

.factory('CustomService',['$window', function ($window) {
     console.info($window);
}])

// 隐式注入
.controller('firstController', function ($scope,CustomService) {
   // console.info(CustomService);
})

// 显示注入
.controller('secondController',['$scope', '$filter',function (scope,filter,CustomService) {
   // console.info(CustomService); // undefined
}]);


function otherController(scope){
    console.info(scope);
}

otherController.$inject=['$scope'];