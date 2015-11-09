angular.module('myApp',[],function($filterProvider,$provide,$controllerProvider){


    $provide.service('data', function () {
        return [
            {
                name:'张三',
                age:20,
                city:'上海'
            },
            {
                name:'李四',
                age:30,
                city:'北京'
            }
        ];
    });

   $filterProvider.register('filterAge', function () {
        return function (obj) {
            // console.info(obj);
            var newObj=[];

            angular.forEach(obj, function(o){
                if(o.age>20){
                    newObj.push(o);
                }
            });

            return newObj;
        }
   });


   $controllerProvider.register('firstController', function ($scope,data) {
       $scope.data=data;
   })
})

.filter('filterCity', function () {
    return function(obj){
        var newObj=[];
        
        angular.forEach(obj, function (o) {
            if(o.city=='上海'){
                newObj.push(o);
            }
        });

        return newObj;
    }
});
