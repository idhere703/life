angular.module("gameOfLife", [])

.controller('gameGridCtrl', ['$scope', function($scope) {
    $scope.cols = 20;
    $scope.rows = 10;
    $scope.grid = [];

    $scope.resizeGrid = function() {
      $scope.grid = init($scope.rows, $scope.cols);
    };

    $scope.reset = function() {
      $scope.cols = 20;
      $scope.rows = 10;
      $scope.grid = init($scope.rows, $scope.cols);
    };

    function init(rows, cols) {
        var grid = [];
        for (var h = 0; h < rows; h++) {
            var row = [];
            for (var w = 0; w < cols; w++) {
                row.push(false);
            }
            grid.push(row);
        }
        return grid;
    }

    $scope.grid = init(10, 20);

}])

.component("gameGrid", {
    templateUrl: 'templates/game-grid-tpl.html',
    controller: 'gameGridCtrl'
});
