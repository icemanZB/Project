angular.module('myApp', [])

    .controller('firstController', function ($scope) {
        $scope.status = false;

        $scope.changeStatus = function (event) {
            console.log(event.target); // 当前表单js对象
            $scope.status = !$scope.status;
            // angular.element 转换成jq对象
            angular.element(event.target).html('切换状态' + $scope.status);

        };

        $scope.defaultStyle = {color: 'red', 'margin-top': '50px'};
    })