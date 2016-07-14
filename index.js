angular.module("gameOfLife", [])

.controller('gameGridCtrl', ['$scope', '$interval', ($scope, $interval) => {

    // Vars, or should I call them "let's" now?
    $scope.running = false;
    $scope.cols = 20;
    $scope.rows = 10;
    $scope.grid = [];
    $scope.previousGrids = [];
    $scope.speed = 500;
    $scope.speedOptions = [{speed: 100, name: "10/1"}, {speed: 500, name: "5/1"}, {speed: 1000,name: "1"}, {speed: 5000, name:"5"}];
    let gameLoop;

    // Function that (when passed an ineger) changes the speed of the game.
    $scope.changeSpeed = (speed) => {
      $scope.speed = speed;
    };

    // Function that resizes the grid when the user changes the height or width.
    $scope.resizeGrid = () => {
        $scope.grid = init($scope.rows, $scope.cols);
    };

    // Resets the grid to whatever the default is (set in the function right now)
    $scope.reset = () => {
        $scope.previousGrids = [];
        setGridDefaults();
        $scope.grid = init();
    };

    // Switch the value of the cell.
    $scope.switchVal = (row, col) => {
        $scope.grid[row][col] = !getCellValue(row, col);
    };

    // Allows the user to set the grid back to a specific point
    $scope.timeTravel = (gridIndex) => {
      // Set a variable since I don't like to update scope a billion times.
      let previousGrids = $scope.previousGrids;
      // If the grid's not zero.
      if(gridIndex) {
        // Get everything before the point we are going back to.
        previousGrids = previousGrids.slice(0, gridIndex);
        // Set the actual grid.
        $scope.grid = previousGrids[previousGrids.length - 1];
        // Now update the scope.
        $scope.previousGrids = previousGrids;
      } else {
        // If the index is zero. just set the grid back to the original.
        $scope.grid = previousGrids[gridIndex];
        $scope.previousGrids = [];
      }

    };

    // This is more for the display on the page than anything else.
    function setGridDefaults() {
        $scope.cols = 20;
        $scope.rows = 10;
    }

    // Main loop.
    $scope.start = () => {
        $scope.running = true;
        gameLoop = $interval(nextTic, $scope.speed);
    };

    // And the stop.
    $scope.stop = () => {
      $scope.running = false;
      $interval.cancel(gameLoop);
    };

    // Calculates each next "tic" in the game.
    function nextTic() {
        $scope.previousGrids.push($scope.grid);
        let newGrid = [];
        // For each row and column.
        $scope.grid.forEach((row, rowIndex) => {
            let newRow = [];

            row.forEach((col, colIndex) => {
                // If the cell is live. Check if it gets to keep living.
                if (getCellValue(rowIndex, colIndex)) {
                    newRow.push(liveOrDie(rowIndex, colIndex));
                } else {
                    // Otherwise check if it gets to live again.
                    newRow.push(newborn(rowIndex, colIndex));
                }

            });
            newGrid.push(newRow);
        });

        // Assign to the grid so the updates happen all at once.
        $scope.grid = newGrid;
    }

    // Will the cell live or die?
    function liveOrDie(row, col) {
        // Get the number of neighbours.
        let n = getNumberOfNeighbours(row, col);
        // If we have two or three neighbours, we live. Otherwise we die.
        // We also want to check that the cell is alive.
        if (n === 2 || n === 3 && getCellValue(row, col)) {
            // Live
            return true;

        } else {
            // Dead
            return false;

        }
    }

    // Is the cell new?
    function newborn(row, col) {
        // Get the number of neighbours.
        let n = getNumberOfNeighbours(row, col);
        // If number of neighbours is three and the cell we are checking is dead.
        // It's new.
        if (n === 3 && !getCellValue(row, col)) {
            return true;
        } else {
            return false;
        }
    }


    // Get the number of neighbours for the current cell.
    function getNumberOfNeighbours(row, col) {
        let numOfNeighbours = 0;
        // Top columns
        numOfNeighbours += getCellValue(row - 1, col - 1) ? 1 : 0;
        numOfNeighbours += getCellValue(row - 1, col + 0) ? 1 : 0;
        numOfNeighbours += getCellValue(row - 1, col + 1) ? 1 : 0;

        // Bottom columns.
        numOfNeighbours += getCellValue(row + 1, col - 1) ? 1 : 0;
        numOfNeighbours += getCellValue(row + 1, col + 0) ? 1 : 0;
        numOfNeighbours += getCellValue(row + 1, col + 1) ? 1 : 0;

        // Middle columns
        numOfNeighbours += getCellValue(row + 0, col - 1) ? 1 : 0;
        numOfNeighbours += getCellValue(row + 0, col + 1) ? 1 : 0;

        // Return
        return numOfNeighbours;
    }

    // Passed a row and col, return the value of the cell.
    function getCellValue(row, col) {
        // If the row and cols are greater than, or equal to, zero and not greater than the
        // grid. And the cell value is not false.
        return (row >= 0 &&
            row < $scope.grid.length &&
            col >= 0 &&
            col < $scope.grid[row].length &&
            $scope.grid[row][col]);

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
