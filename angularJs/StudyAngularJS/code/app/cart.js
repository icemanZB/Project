var CartController = function ($scope) {
    $scope.cart = [
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

    $scope.totalPrice = function () {
        var total = 0;
        angular.forEach($scope.cart, function (item) {
            total += item.quantity * item.price;
        });

        return total;
    };

    $scope.totalQuantity = function () {
        var total = 0;
        angular.forEach($scope.cart, function (item) {
            total += parseInt(item.quantity);
        });

        return total;
    };

    $scope.remove = function (id) {
        var index = findIndex(id);
        if (index !== -1) {
            $scope.cart.splice(index, 1);
        }

    };

    $scope.add = function (id) {
        var index = findIndex(id);
        if (index !== -1) {
            ++$scope.cart[index].quantity;
        }
    };

    $scope.reduce = function (id) {
        var index = findIndex(id);
        if (index !== -1) {
            var item = $scope.cart[index];
            if (item.quantity > 1) {
                --item.quantity;
            } else {
                if (confirm('是否从购物车删除改产品!')) {
                    $scope.remove(id);
                }
            }

        }
    };

    $scope.$watch('cart', function (newValue, oldValue) {
        angular.forEach(newValue, function (item, key) {
            if (item.quantity < 1) {
                if (confirm('是否从购物车删除改产品!')) {
                    $scope.remove(item.id);
                } else {
                    item.quantity = oldValue[key].quantity;
                }
            }
        });
    }, true);

    var findIndex = function (id) {
        var index = -1;

        angular.forEach($scope.cart, function (item, key) {
            if (item.id === id) {
                index = key;
                return false;
            }
        });

        return index;
    };
};
