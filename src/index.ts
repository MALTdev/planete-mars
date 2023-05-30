import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { Command, Orientation } from "./enums/index";
import { Coordinate, Planet, Robot } from "./classes/index";
import { getRandom } from "./utils/random";

const MIN_SIZE_PLANET = 5;
const MAX_SIZE_PLANET = 30;

const sizePlanet = getRandom(MAX_SIZE_PLANET, MIN_SIZE_PLANET);

const impact = new Coordinate(
  getRandom(1, sizePlanet),
  getRandom(1, sizePlanet)
);

const orientations = Object.values(Orientation);
const orientation = orientations[getRandom(orientations.length, 0)];

const planet = new Planet(sizePlanet);
const rover = new Robot(impact, orientation, planet);

(async () => {
  const rl = readline.createInterface({ input, output, prompt: "> " });

  console.log(rover.toString());

  while (true) {
    const commands = Object.values(Command).join(", ");

    const cmd = (
      await rl.question(`\nEntrer la commande (${commands}) : `)
    ).toLowerCase() as Command;

    switch (cmd) {
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
        rl.close();
        process.exit();
        break;

      default:
        console.log("Commande non reconnue");
        break;
    }

    console.log(rover.toString());
  }
})();
