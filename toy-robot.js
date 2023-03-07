// Import the readline module
const readline = require('readline');

// Create a 5x5 board filled with undefined values and a null robot
let board = Array.from({length: 5}, () => Array(5).fill(undefined));
let robot = null;

// Create a readline interface with the standard input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to handle user commands entered in the terminal
function handleCommand(input) {
  const command = input.split(',');
  switch (command[0]) {
    case 'PLACE_ROBOT':
      const row = parseInt(command[1]);
      const col = parseInt(command[2]);
      const facing = command[3];
      placeRobot(row, col, facing);
      break;
    case 'PLACE_WALL':
      const wallRow = parseInt(command[1]);
      const wallCol = parseInt(command[2]);
      placeWall(wallRow, wallCol);
      break;
    case 'REPORT':
      report();
      break;
    case 'MOVE':
      moveRobot();
      break;
    case 'LEFT':
      turnRobot(-1);
      break;
    case 'RIGHT':
      turnRobot(1);
      break;
    default:
      console.log(`Invalid command: ${input}`);
  }
}

// Function to place the robot on the board at the specified row, column, and facing direction
function placeRobot(row, col, facing) {
  if (isValidCoord(row, col) && isValidFacing(facing)) {
    robot = { row, col };
    robot.facing = facing;
  }
}

// Function to place a wall on the board at the specified row and column
function placeWall(row, col) {
  if (isValidCoord(row, col) && isEmpty(row, col)) {
    board[row-1][col-1] = 'X';
  }
}

// Function to move the robot one space in its current facing direction
function moveRobot() {
  if (robot) {
    let newRow = robot.row + (robot.facing === 'NORTH' ? 1 : robot.facing === 'SOUTH' ? -1 : 0);
    let newCol = robot.col + (robot.facing === 'EAST' ? 1 : robot.facing === 'WEST' ? -1 : 0);
    if (isEmpty(newRow, newCol)) {
      if (isValidCoord(newRow, newCol)) {
        robot.row = newRow;
        robot.col = newCol;
      } else {
        if (newRow > 5) newRow = 1;
        if (newRow < 1) newRow = 5;
        if (newCol > 5) newCol = 1;
        if (newCol < 1) newCol = 5;
        robot.row = newRow;
        robot.col = newCol;
      }
    }
  }
}

// This function receives a direction value as an argument and rotates the robot in that direction if it exists.
function turnRobot(direction) {
  if (robot) {
    const facings = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    const currentFacingIndex = facings.indexOf(robot.facing);
    const newFacingIndex = (currentFacingIndex + direction + 4) % 4;
    robot.facing = facings[newFacingIndex];
  }
}

// This function logs the current position of the robot and indicate that there is no robot on the board
function report() {
  console.log(robot ? `${robot.row},${robot.col},${robot.facing}` : 'No robot on the board');
}

// This function checks if a board position is empty (i.e., undefined)
function isEmpty(row, col) {
  return board[row-1][col-1] === undefined && (!robot || robot.row !== row || robot.col !== col);
}

// This function checks if a given row and column value are within the bounds of the 5x5 board.
function isValidCoord(row, col) {
  return row >= 1 && row <= 5 && col >= 1 && col <= 5;
}

// This function checks if a given facing value is one of the valid facing directions.
function isValidFacing(facing) {
  const validFacings = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
  return validFacings.includes(facing);
}

rl.on('line', handleCommand);

// The console outputs instructions for the user to enter commands or exit the program.
console.log('Enter commands to control the robot, or type "exit" to quit.');

