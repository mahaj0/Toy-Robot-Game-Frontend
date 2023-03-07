# Toy-Robot-Game-Frontend

The program initializes an empty 5 x 5 board with its coordinate system, and when the game starts, it responds to the following user commands:

PLACE_ROBOT ROW,COL,FACING (This command places a robot at a given coordinate with an initial facing direction)
PLACE_WALL ROW,COL (This command places a wall at the given coordinate)
REPORT (This command prints out the current location and facing direction of the robot)
MOVE (This command moves the robot one space forward in its current facing direction)
LEFT (This command rotates the robot 90 degrees to the left)
RIGHT (This command rotates the robot 90 degrees to the right)

The program also handles invalid commands and coordinates correctly by ignoring them.
