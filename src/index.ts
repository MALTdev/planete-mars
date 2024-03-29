import { prompt } from "enquirer";
import { Command, Orientation } from "./enums/index";
import { Coordinate, Planet, Robot } from "./classes/index";
import { getRandom } from "./utils/random";

const MIN_SIZE_PLANET = 5;
const MAX_SIZE_PLANET = 30;

const sizePlanet = getRandom(MAX_SIZE_PLANET, MIN_SIZE_PLANET);

const orientations = Object.values(Orientation);
const orientation = orientations[getRandom(orientations.length, 0)];

const planet = new Planet(sizePlanet, [
  new Coordinate(1, 1),
  new Coordinate(2, 2),
  new Coordinate(3, 3),
]);

planet.obstacles.forEach((obstacle) => {
  console.log(
    "Obstacle détécté aux coordonnées : " +
      obstacle.coordinate.x +
      "," +
      obstacle.coordinate.y
  );
});

const impact = planet.landRobot();

const rover = new Robot(impact, orientation, planet);

const commands = Object.values(Command);

(async () => {
  console.log("\n" + rover.toString());

  while (true) {
    const cmd = (
      await prompt<{ value: Command }>({
        name: "value",
        message: "\nEntrer la commande : (" + commands.join(",") + ")",
        type: "input",
      })
    ).value.toUpperCase();

    const sequence: Command[] = [...(cmd.split("") as Command[])];

    sequence.forEach((command: Command) => {
      switch (command) {
        case Command.ADVANCE:
          console.log("Le robot avance petit à petit...");
          rover.advance();
          break;

        case Command.MOVE_BACK:
          console.log("Le robot fait marche arrière...");
          rover.moveBack();
          break;

        case Command.TURN_LEFT:
          console.log("Le robot tourne à 90 degrés sur la gauche...");
          rover.turnLeft();
          break;

        case Command.TURN_RIGHT:
          console.log("Le robot tourne à 90 degrés sur la droite...");
          rover.turnRight();
          break;

        case Command.EXIT:
          console.log("Fin de la mission, le robot retourne sur Terre");
          process.exit();

        default:
          console.log("Commande non reconnue : " + command);
          break;
      }

      console.log("\n" + rover.toString());
    });
  }
})();
