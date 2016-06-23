angular.module("gameOfLife", [])

.controller('gameGridCtrl', ['$scope', ($scope) => {
    $scope.cols = 20;
    $scope.rows = 10;
    $scope.grid = [];

    $scope.resizeGrid = () => {
      $scope.grid = init($scope.rows, $scope.cols);
    };

    $scope.reset = () => {
      // This is more for the UI than anything else.
      setGridDefaults();
      $scope.grid = init();
    };


    function setGridDefaults() {
      $scope.cols = 20;
      $scope.rows = 10;
    }


    function getCellValue(row, col) {
      if( row >= 0 && row < $scope.grid.length && col >= 0 && col < $scope.grid.length ) {
          return $scope.grid[row][col];
      }

    }


    function init(rows = 10, cols = 20) {
        let grid = [];
        for (let h = 0; h < rows; h++) {
            let row = [];
            for (let w = 0; w < cols; w++) {
                row.push(false);
            }
            grid.push(row);
        }
        return grid;
    }

    // Init function.
    $scope.grid = init();

}])

.component("gameGrid", {
    templateUrl: 'templates/game-grid-tpl.html',
    controller: 'gameGridCtrl'
});
