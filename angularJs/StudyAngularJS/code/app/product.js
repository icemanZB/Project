angular.module('product', [])

    .service('productData', function () {
        return [
            {
                id: 1000,
                name: 'iphone5s',
                quantity: 3,
                price: 4300
            },
            {
                id: 3300,
                name: 'iphone5',
                quantity: 30,
                price: 3300
            },
            {
                id: 232,
                name: 'mac',
                quantity: 4,
                price: 23000
            },
            {
                id: 2000,
                name: 'ipad',
                quantity: 5,
                price: 6900
            }
        ];
    })
    .controller('productController', function ($scope, productData) {
        $scope.productData = productData;

        $scope.orderType = 'id';

        $scope.order = '-';

        $scope.changeOrder = function (type) {
            $scope.orderType = type;

            if ($scope.order === '') {
                $scope.order = '-';
            } else {
                $scope.order = '';
            }
        }
    });