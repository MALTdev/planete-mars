import { Coordinate, Planet } from "./index";
import { Orientation } from "../enums/index";

class Robot {
  orientation: Orientation;
  coordinate: Coordinate;
  planet: Planet;

  constructor(
    coordinate: Coordinate,
    orientation: Orientation,
    planet: Planet
  ) {
    this.orientation = orientation;
    this.coordinate = coordinate;
    this.planet = planet;
  }

  advance() {
    switch (this.orientation) {
      case Orientation.NORTH:
        this.changeCoordinateOnPlanet(
          new Coordinate(this.coordinate.x, this.coordinate.y + 1)
        );
        break;
      case Orientation.SOUTH:
        this.changeCoordinateOnPlanet(
          new Coordinate(this.coordinate.x, this.coordinate.y - 1)
        );
        break;
      case Orientation.EAST:
        this.changeCoordinateOnPlanet(
          new Coordinate(this.coordinate.x + 1, this.coordinate.y)
        );
        break;
      case Orientation.WEST:
        this.changeCoordinateOnPlanet(
          new Coordinate(this.coordinate.x - 1, this.coordinate.y)
        );
        break;
    }
  }

  moveBack() {
    switch (this.orientation) {
      case Orientation.NORTH:
        this.changeCoordinateOnPlanet(
          new Coordinate(this.coordinate.x, this.coordinate.y - 1)
        );
        break;
      case Orientation.SOUTH:
        this.changeCoordinateOnPlanet(
          new Coordinate(this.coordinate.x, this.coordinate.y + 1)
        );
        break;
      case Orientation.EAST:
        this.changeCoordinateOnPlanet(
          new Coordinate(this.coordinate.x - 1, this.coordinate.y)
        );
        break;
      case Orientation.WEST:
        this.changeCoordinateOnPlanet(
          new Coordinate(this.coordinate.x + 1, this.coordinate.y)
        );
        break;
    }
  }

  turnRight() {
    switch (this.orientation) {
      case Orientation.NORTH:
        this.orientation = Orientation.EAST;
        break;
      case Orientation.EAST:
        this.orientation = Orientation.SOUTH;
        break;
      case Orientation.SOUTH:
        this.orientation = Orientation.WEST;
        break;
      case Orientation.WEST:
        this.orientation = Orientation.NORTH;
        break;
    }
  }

  turnLeft() {
    switch (this.orientation) {
      case Orientation.NORTH:
        this.orientation = Orientation.WEST;
        break;
      case Orientation.WEST:
        this.orientation = Orientation.SOUTH;
        break;
      case Orientation.SOUTH:
        this.orientation = Orientation.EAST;
        break;
      case Orientation.EAST:
        this.orientation = Orientation.NORTH;
        break;
    }
  }

  private changeCoordinateOnPlanet(newCoordinate: Coordinate): void {
    if (newCoordinate.x > this.planet.size) {
      newCoordinate.x = 1;
    }

    if (newCoordinate.y > this.planet.size) {
      newCoordinate.y = 1;
    }

    this.coordinate = newCoordinate;
  }

  public toString(): string {
    return (
      "Position du robot : \nX: " +
      this.coordinate.x +
      "\n" +
      "Y: " +
      this.coordinate.y +
      "\n" +
      "Orientation: " +
      this.orientation
    );
  }
}

export { Robot };
