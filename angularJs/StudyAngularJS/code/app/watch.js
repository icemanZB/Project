var firstController= function ($scope) {
    $scope.name='张三';
    $scope.count=0;

    $scope.data={
        name:'李四',
        count:10
    };

    // 监听一个model,当一个model每次改变时,都会触发第二个函数
    $scope.$watch('name',function (newValue,oldValue) {

       //console.info(newValue,oldValue);

        $scope.count++;

        if($scope.count>5){
            $scope.name='已经大于5次了';
        }
    });

    // 通过第三个参数为true,监听一个对象或一个数组
    $scope.$watch('data', function () {

    },true);

}