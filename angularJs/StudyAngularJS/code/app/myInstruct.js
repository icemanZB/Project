var myApp = angular.module('myApp', [], ['$compileProvider', function ($compileProvider) {

    $compileProvider.directive('customTags', function () {
        return {
            restrict: 'ECAM',
            template: '<div>custom-tags HTML</div>',
            compile: function () {
                console.log(1);
            },
            replace:true // 会把当前的标签一道替换掉，建议为true
        }
    });
}])

// .directive('customTags',function(){
//
//    });