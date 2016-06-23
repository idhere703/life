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

    // Switch the value of the cell.
    $scope.switchVal = (row, col) => {
      $scope.grid[row][col] = !getCellValue(row, col);
    };


    function setGridDefaults() {
      $scope.cols = 20;
      $scope.rows = 10;
    }

    // Will the cell live or die?
    function liveOrDie(row, col) {
      // Get the number of neighbours.
      let n = getNumberOfNeighbours(row, col);
      // If we have two or three neighbours, we live. Otherwise we die.
      // We also want to check that the cell is alive.
      if(n === 2 || n === 3 && getCellValue(row, col)) {
        // Live
        return 1;

      } else {
        // Dead
        return 0;

      }
    }


    // Get the number of neighbours for the current cell.
    function getNumberOfNeighbours(row, col) {
      let numOfNeighbours = 0;
      // Top columns
      numOfNeighbours += getCellValue(row-1, col-1) ? 1 : 0;
      numOfNeighbours += getCellValue(row-1, col+0) ? 1 : 0;
      numOfNeighbours += getCellValue(row-1, col+1) ? 1 : 0;

      // Bottom columns.
      numOfNeighbours += getCellValue(row+1, col-1) ? 1 : 0;
      numOfNeighbours += getCellValue(row+1, col+0) ? 1 : 0;
      numOfNeighbours += getCellValue(row+1, col+1) ? 1 : 0;

      // Middle columns
      numOfNeighbours += getCellValue(row+0, col-1) ? 1 : 0;
      numOfNeighbours += getCellValue(row+0, col+1) ? 1 : 0;

      // Return
      return numOfNeighbours;
    }

    // Passed a row and col, return the value of the cell.
    function getCellValue(row, col) {
      // If the row and cols are greater than zero and not greater than the
      // grid. And the cell value is not false.
      return row >= 0 && row < $scope.grid.length && col >= 0 && col < $scope.grid.length && $scope.grid[row][col]

    }

    // Init function, with default params. (Thank you ES6)
    function init(rows = 10, cols = 20) {
        // Temp Grid.
        let grid = [];
        // For each row.
        for (let h = 0; h < rows; h++) {
            // Temp row.
            let row = [];
            // For each column.
            for (let w = 0; w < cols; w++) {
                // Push a false (dead) value.
                row.push(false);
            }
            // Push the row to the grid.
            grid.push(row);
        }
        // Return grid.
        return grid;
    }

    ///////////////////// Init function.
    $scope.grid = init();
    ///////////////////// End Init .
}])

.component("gameGrid", {
    templateUrl: 'templates/game-grid-tpl.html',
    controller: 'gameGridCtrl'
});
