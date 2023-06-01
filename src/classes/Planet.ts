import { getRandom } from "../utils/random";
import { Coordinate, Obstacle } from "./index";

export class Planet {
  size: number;
  obstacles: Obstacle[] = [];

  constructor(size: number, obstaclesCoordinates: Coordinate[] = []) {
    this.size = size;
    this.createObstacles(obstaclesCoordinates);
  }

  private createObstacles(obstaclesCoordinates: Coordinate[]) {
    obstaclesCoordinates.forEach((coordinate) => {
      const obstacle = new Obstacle(coordinate, this);
      this.obstacles.push(obstacle);
    });
  }

  public landRobot(): Coordinate {
    const coordinates = [...this.obstacles.map((obs) => obs.coordinate)];

    let impact = new Coordinate(
      getRandom(1, this.size),
      getRandom(1, this.size)
    );

    while (!coordinates.indexOf(impact)) {
      impact = new Coordinate(getRandom(1, this.size), getRandom(1, this.size));
    }

    return impact;
  }
}
