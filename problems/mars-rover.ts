enum Direction {
    N = 'N',
    E = 'E',
    S = 'S',
    W = 'W',
  }
  
  interface Rover {
    x: number;
    y: number;
    direction: Direction;
  }
  
  interface Plateau {
    x: number;
    y: number;
  }
  
  class MarsRoverController {
    private plateau: Plateau;
    private rovers: Rover[];
  
    constructor(input: string) {
      const [plateauStr, ...roversStr] = input.trim().split('\n');
      const [plateauX, plateauY] = plateauStr.split(' ').map(Number);
      this.plateau = { x: plateauX, y: plateauY };
      this.rovers = [];
  
      for (let i = 0; i < roversStr.length; i += 2) {
        const [x, y, directionStr] = roversStr[i].split(' ');
        const instructions = roversStr[i + 1];
        const direction = directionStr as Direction;
        const rover = {
          x: Number(x),
          y: Number(y),
          direction,
        };
        if (!this.isValidRover(rover)) {
          throw new Error('Invalid position or direction.');
        }
        this.rovers.push(rover);
        this.moveRover(rover, instructions);
      }
    }
  // Valid that the Mars truck is in the work area
    private isValidRover(rover: Rover): boolean {
      return (
        rover.x >= 0 &&
        rover.x <= this.plateau.x &&
        rover.y >= 0 &&
        rover.y <= this.plateau.y &&
        Object.values(Direction).includes(rover.direction)
      );
    }
  
    private moveRover(rover: Rover, instruction: string) {
      for (let i = 0; i < instruction.length; i++) {
        switch (instruction[i]) {
          case 'L':
            rover.direction = this.turnLeft(rover.direction);
            break;
          case 'R':
            rover.direction = this.turnRight(rover.direction);
            break;
          case 'M':
            const [newX, newY] = this.moveForward(rover);
            if (this.isValidPosition(newX, newY)) {
              rover.x = newX;
              rover.y = newY;
            }
            break;
          default:
            break;
        }
      }
    }
  
    private turnLeft(direction: Direction): Direction {
      const directions: Direction[] = [Direction.N, Direction.W, Direction.S, Direction.E];
      const index = directions.indexOf(direction);
      return directions[(index + 1) % 4];
    }
  
    private turnRight(direction: Direction): Direction {
      const directions: Direction[] = [Direction.N, Direction.E, Direction.S, Direction.W];
      const index = directions.indexOf(direction);
      return directions[(index + 1) % 4];
    }
  
    private moveForward(rover: Rover): [number, number] {
      switch (rover.direction) {
        case Direction.N:
          return [rover.x, rover.y + 1];
        case Direction.E:
          return [rover.x + 1, rover.y];
        case Direction.S:
          return [rover.x, rover.y - 1];
        case Direction.W:
          return [rover.x - 1, rover.y];
      }
    }
  
    private isValidPosition(x: number, y: number): boolean {
      return x >= 0 && x <= this.plateau.x && y >= 0 && y <= this.plateau.y;
    }
  
    public getResult(): string {
      return this.rovers
        .map((rover) => `${rover.x} ${rover.y} ${rover.direction}`)
        .join('\n');
    }
  }
// test
const input = '5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM';
const marsRover = new MarsRoverController(input);
const output = marsRover.getResult();
console.log(output); // 1 3 N\n5 1 E


export { Plateau, Rover, Direction }
export default MarsRoverController