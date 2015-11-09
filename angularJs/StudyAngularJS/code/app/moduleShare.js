angular.module('myApp',[])

.factory('dataFactory', function () {
    return {
        message:'数据共享'
    };
})


.controller('firstController',function($scope,dataFactory){
    $scope.data={
        name:'Iceman'
    };

    $scope.dataFactory=dataFactory;

})

.controller('secondController',function($scope,dataFactory){
    $scope.data=$scope.$$prevSibling.data;   // 不推荐使用, 利用指针指向data

    $scope.dataFactory=dataFactory;
});