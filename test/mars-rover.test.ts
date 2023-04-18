import MarsRoverController, { Plateau, Rover, Direction } from "../problems/mars-rover";

describe('MarsRoverController', () => {
  describe('constructor', () => {
    it('should initialize rover and plateau correctly', () => {
      const input = '5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM\n';
      const controller = new MarsRoverController(input);
      const expectedPlateau: Plateau = { x: 5, y: 5 };
      const expectedRovers: Rover[] = [
        { x: 1, y: 3, direction: Direction.N },
        { x: 5, y: 1, direction: Direction.E },
      ];
      expect(controller['plateau']).toEqual(expectedPlateau);
      expect(controller['rovers']).toEqual(expectedRovers);
    });

    it('should throw error if input is invalid', () => {
      const input = '5 5\n1 2 Z\nLMLMLMLMM\n';
      expect(() => new MarsRoverController(input)).toThrowError('Invalid position or direction.');
    });
  });

  describe('isValidRover', () => {
    it('should return true if rover is valid', () => {
      const controller = new MarsRoverController('2 2\n1 1 N\nM\n');
      const rover = { x: 1, y: 1, direction: Direction.N };
      expect(controller['isValidRover'](rover)).toBe(true);
    });

    it('should return false if rover is invalid', () => {
      const controller = new MarsRoverController('2 2\n1 1 N\nM\n');
      const rover = { x: -1, y: 1, direction: Direction.N };
      expect(controller['isValidRover'](rover)).toBe(false);
    });
  });

  describe('moveRover', () => {
    it('should move rover correctly', () => {
      const controller = new MarsRoverController('5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM\n');
      const rover = { x: 1, y: 2, direction: Direction.N };
      controller['moveRover'](rover, 'LMLMLMLMM');
      const expected: Rover = { x: 1, y: 3, direction: Direction.N };
      expect(rover).toEqual(expected);
    });

    it('should stay in the plateau', () => {
      const controller = new MarsRoverController('5 5\n1 2 N\nM\n');
      const rover = { x: 1, y: 2, direction: Direction.N };
      controller['moveRover'](rover, 'M');
      const expected: Rover = { x: 1, y: 3, direction: Direction.N };
      expect(rover).toEqual(expected);
    });
    
  });
  describe('moveForward', () => {
    it('should move forward correctly', () => {
      const controller = new MarsRoverController('5 5\n1 2 N\nM\n');
      const rover = { x: 1, y: 2, direction: Direction.N };
      const expected: [number, number] = [1, 3];
      expect(controller['moveForward'](rover)).toEqual(expected);
    });
  });

  describe('isValidPosition', () => {
    it('should return true if position is valid', () => {
      const controller = new MarsRoverController('5 5\n1 2 N\nM\n');
      const expected: [number, number] = [1, 3];
      expect(controller['isValidPosition'](...expected)).toBe(true);
    });

    it('should return false if position is invalid', () => {
      const controller = new MarsRoverController('5 5\n1 2 N\nM\n');
      const expected: [number, number] = [1, 7];
      expect(controller['isValidPosition'](...expected)).toBe(false);
    });
  });

  describe('getResult', () => {
    it('should return correct result string', () => {
      const input = '5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM\n';
      const controller = new MarsRoverController(input);
      const expected = '1 3 N\n5 1 E';
      expect(controller.getResult()).toEqual(expected);
    });
  });
});
