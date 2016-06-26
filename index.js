angular.module("gameOfLife", [])

.controller('gameGridCtrl', ['$scope', '$interval', ($scope, $interval) => {

    // Vars, or should I call them "let's" now?
    $scope.running = false;
    $scope.cols = 20;
    $scope.rows = 10;
    $scope.grid = [];
    // We set and destroy it.
    let gameLoop;

    // Function that resizes the grid when the user changes the height or width.
    $scope.resizeGrid = () => {
        $scope.grid = init($scope.rows, $scope.cols);
    };

    // Resets the grid to whatever the default is (set in the function right now)
    $scope.reset = () => {
        setGridDefaults();
        $scope.grid = init();
    };

    // Switch the value of the cell.
    $scope.switchVal = (row, col) => {
        $scope.grid[row][col] = !getCellValue(row, col);
    };

    // This is more for the display on the page than anything else.
    function setGridDefaults() {
        $scope.cols = 20;
        $scope.rows = 10;
    }

    // Main loop.
    $scope.start = () => {
        $scope.running = true;
        gameLoop = $interval(nextTic, 500);
    };

    // And the stop.
    $scope.stop = () => {
      $scope.running = false;
      $interval.cancel(gameLoop);
    };

    // Calculates each next "tic" in the game.
    function nextTic() {
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
