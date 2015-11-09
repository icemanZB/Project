var myApp=angular.module('myApp',[],function($provide){

    // 自定义服务 (了解) 返回必须是对象
    $provide.provider('CustomService',function(){
        this.$get= function () {
            return {
                message:'CustomService is running'
            }
        }
    });

    // 自定义工厂

    $provide.factory('CustomFactory', function () {
        return [1,2,3,4,5,6];
    });

    // 自定义服务  返回必须是对象
    $provide.service('Service', function () {
       return ['shanghai'];
    });
});

myApp.controller('firstController', function ($scope,CustomService,CustomFactory,Service) {

    $scope.name='Iceman';

    console.info(CustomService);

    console.info(CustomFactory);

    console.info(Service);
});


// myApp.factory();  myApp.service();