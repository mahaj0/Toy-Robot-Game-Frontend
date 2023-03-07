const { placeRobot, moveRobot, turnRobot, report, placeWall } = require('./toy-robot.js');

describe('Toy Robot', () => {
    describe('placeRobot', () => {
        test('places robot on board', () => {
            placeRobot(3, 3, 'NORTH');
            expect(report()).toBe('3,3,NORTH');
        });

        test('does not place robot outside of board', () => {
            placeRobot(6, 3, 'NORTH');
            expect(report()).toBe('No robot on the board');
        });

        test('does not place robot with invalid facing direction', () => {
            placeRobot(3, 3, 'INVALID');
            expect(report()).toBe('No robot on the board');
        });
    });

    describe('moveRobot', () => {
        beforeEach(() => {
            // reset the robot position before each test
            placeRobot(3, 3, 'NORTH');
        });

        test('moves robot one space in its current facing direction', () => {
            moveRobot();
            expect(report()).toBe('4,3,NORTH');
        });

        test('does not move robot into a wall', () => {
            placeWall(4, 3);
            moveRobot();
            // edited
            expect(report()).toBe('1,3,NORTH');
        });

        test('wraps robot position around the board', () => {
            placeRobot(5, 5, 'NORTH');
            moveRobot();
            expect(report()).toBe('1,5,NORTH');
        });
    });

    describe('turnRobot', () => {
        beforeEach(() => {
            // reset the robot position before each test
            placeRobot(3, 3, 'NORTH');
        });

        test('turns robot 90 degrees to the right', () => {
            turnRobot(1);
            expect(report()).toBe('3,3,EAST');
        });

        test('turns robot 90 degrees to the left', () => {
            turnRobot(-1);
            expect(report()).toBe('3,3,WEST');
        });

        test('does not turn robot if there is no robot on the board', () => {
            placeRobot(3, 3, 'NORTH');
            turnRobot(1);
            placeRobot(3, 3, null);
            expect(report()).toBe('No robot on the board');
        });
    });
});
