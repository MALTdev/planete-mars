import { Coordinate, Planet } from "./index";

class Obstacle {
  coordinate: Coordinate;
  planet: Planet;

  constructor(coordinate: Coordinate, planet: Planet) {
    this.coordinate = coordinate;
    this.planet = planet;
  }
}

export { Obstacle };
