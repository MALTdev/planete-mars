import { beforeEach, describe, expect, it } from "@jest/globals";

import { Orientation } from "../src/enums/index";
import { Coordinate, Obstacle, Planet, Robot } from "../src/classes/index";

describe("Rover", () => {
  let planet: Planet, rover: Robot;

  beforeEach(() => {
    planet = new Planet(5);
    const coords = new Coordinate(1, 1);
    rover = new Robot(coords, Orientation.NORTH, planet);
  });

  it("doit avancer vers le nord", () => {
    rover.advance();
    expect(rover.coordinate.y).toEqual(2);
    expect(rover.coordinate.x).toEqual(1);
    expect(rover.orientation).toEqual(Orientation.NORTH);
  });

  it("doit faire le tour de la planète", () => {
    for (let i = 1; i <= planet.size; i++) {
      rover.advance();
    }
    expect(rover.coordinate.y).toEqual(1);
    expect(rover.coordinate.x).toEqual(1);
    expect(rover.orientation).toEqual(Orientation.NORTH);
  });

  it("doit reculer vers le sud", () => {
    rover.moveBack();
    expect(rover.coordinate.y).toEqual(5);
    expect(rover.coordinate.x).toEqual(1);
    expect(rover.orientation).toEqual(Orientation.NORTH);
  });

  it("doit faire demi-tour et avancer vers le sud", () => {
    rover.turnRight();
    rover.turnRight();
    rover.advance();
    expect(rover.coordinate.y).toEqual(5);
    expect(rover.coordinate.x).toEqual(1);
    expect(rover.orientation).toEqual(Orientation.SOUTH);
  });

  it("doit tourner à droite et avancer vers l'est", () => {
    rover.turnRight();
    rover.advance();
    expect(rover.coordinate.y).toEqual(1);
    expect(rover.coordinate.x).toEqual(2);
    expect(rover.orientation).toEqual(Orientation.EAST);
  });

  it("doit tourner à gauche et avancer vers l'ouest", () => {
    rover.turnLeft();
    rover.advance();
    expect(rover.coordinate.y).toEqual(1);
    expect(rover.coordinate.x).toEqual(5);
    expect(rover.orientation).toEqual(Orientation.WEST);
  });

  it("doit tourner sur lui-même par la gauche et être orienté vers le nord", () => {
    rover.turnLeft();
    rover.turnLeft();
    rover.turnLeft();
    rover.turnLeft();
    expect(rover.coordinate.y).toEqual(1);
    expect(rover.coordinate.x).toEqual(1);
    expect(rover.orientation).toEqual(Orientation.NORTH);
  });

  it("doit tourner sur lui-même par la droite et être orienté vers le nord", () => {
    rover.turnRight();
    rover.turnRight();
    rover.turnRight();
    rover.turnRight();
    expect(rover.coordinate.y).toEqual(1);
    expect(rover.coordinate.x).toEqual(1);
    expect(rover.orientation).toEqual(Orientation.NORTH);
  });
});

describe("Obstacles", () => {
  let planet: Planet, rover: Robot;

  beforeEach(() => {
    planet = new Planet(5, [new Coordinate(1, 3)]);
    rover = new Robot(new Coordinate(1, 1), Orientation.NORTH, planet);
  });

  it("ne peut pas franchir un obstacle et reste aux même coordonnées", () => {
    rover.advance();
    rover.advance();
    expect(rover.coordinate.x).toEqual(1);
    expect(rover.coordinate.y).toEqual(2);
    expect(rover.orientation).toEqual(Orientation.NORTH);
  });
});
