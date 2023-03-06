// Import necessary libraries
const readline = require('readline');

// Initialize board and robot variables
let board = [];
let robot = null;

console.log('Starting program...');
// your program code here

// Initialize readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to handle user commands
function handleCommand(input) {
  console.log(`User input: ${input}`);
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

// Function to place robot on board
function placeRobot(row, col, facing) {
  if (isValidCoord(row, col) && isValidFacing(facing)) {
    robot = {
      row: row,
      col: col,
      facing: facing
    };
  }
}

// Function to place wall on board
function placeWall(row, col) {
  if (isValidCoord(row, col) && isEmpty(row, col)) {
    board[row-1][col-1] = 'X';
  }
}

// Function to move robot forward
function moveRobot() {
  if (robot) {
    let newRow = robot.row;
    let newCol = robot.col;
    switch (robot.facing) {
      case 'NORTH':
        newRow++;
        break;
      case 'SOUTH':
        newRow--;
        break;
      case 'EAST':
        newCol++;
        break;
      case 'WEST':
        newCol--;
        break;
    }
    if (isValidCoord(newRow, newCol) && isEmpty(newRow, newCol)) {
      robot.row = newRow;
      robot.col = newCol;
    } else {
      wrapRobot();
    }
  }
}

// Function to turn robot left or right
function turnRobot(direction) {
  if (robot) {
    const facings = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    const index = facings.indexOf(robot.facing);
    const newIndex = (index + direction + facings.length) % facings.length;
    robot.facing = facings[newIndex];
  }
}

// Function to report current robot position and facing direction
function report() {
  if (robot) {
    console.log(`${robot.row},${robot.col},${robot.facing}`);
  }
}

// Function to check if coordinates are valid
function isValidCoord(row, col) {
  return row >= 1 && row <= 5 && col >= 1 && col <= 5;
}

// Function to check if facing direction is valid
function isValidFacing(facing) {
  const validFacings = ['NORTH', 'SOUTH', 'EAST', 'WEST'];
  return validFacings.includes(facing);
}

// Function to check if board location is empty
function isEmpty(row, col) {
  return board[row-1][col-1] === undefined;
}
// Function to wrap robot to other side of board if it moves off the edge
function wrapRobot() {
    let newRow = robot.row;
    let newCol = robot.col;
    switch (robot.facing) {
    case 'NORTH':
    newRow = 1;
    break;
    case 'SOUTH':
    newRow = 5;
    break;
    case 'EAST':
    newCol = 1;
    break;
    case 'WEST':
    newCol = 5;
    break;
    }
    if (isEmpty(newRow, newCol)) {
    robot.row = newRow;
    robot.col = newCol;
    }
    }
    
    // Function to initialize board with empty spaces
    function initializeBoard() {
    for (let i = 0; i < 5; i++) {
    board[i] = [];
    for (let j = 0; j < 5; j++) {
    board[i][j] = undefined;
    }
    }
    }
    
    // Function to start the program
    function start() {
      initializeBoard();
      rl.on('line', (input) => {
        handleCommand(input);
        rl.prompt();
      });
      rl.prompt();
    }
    
    rl.question('Enter a command: ', (input) => {
      handleCommand(input);
      rl.prompt();
    });  
