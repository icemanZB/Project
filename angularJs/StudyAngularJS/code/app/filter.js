angular.module('myApp', [])

    .factory('dataFactory', function () {
        return {
            message: '数据共享',
            today:new Date(),
            word:'AAAA',
            city:[
                {
                    name:'上海....',
                    py:'shanghai'
                },
                {
                    name:'北京',
                    py:'beijing'
                },
                {
                    name:'四川',
                    py:'sichuan'
                }
            ]
        };
    })


    .controller('firstController', function ($scope,dataFactory,$filter) {
        $scope.data = dataFactory;

        // 过滤器

        var num=$filter('number')(3000);
        console.info(num);

        var jsonString=$filter('json')($scope.data);

        console.info(jsonString);
        
        $scope.checkName= function (obj) {
           // console.info(obj);
            if(obj.py.indexOf('h')===-1){
                return false;
            }
            return true;
        }
    })

