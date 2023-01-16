import { ActivityType } from "discord.js";
import logger from "./eventLog.js"
import pkg from "chalk";
import fs from "fs";

const once = true;
const name = "ready";

async function invoke(client) {
  const chalk = pkg
  const commands = fs
    .readdirSync("./src/commands")
    .filter((file) => file.endsWith(".js"))
    .map((file) => file.slice(0, -3));

  const commandsArray = [];

  for (let command of commands) {
    const commandFile = await import(`../commands/${command}`);
    commandsArray.push(commandFile.create());
    logger(
      "Load",
      `command ${command} has been loaded!`
    );
  }

  client.application.commands.set(commandsArray);

  client.user.setPresence({
    activities: [{ name: `with cats!`, type: ActivityType.Playing }],
  });
  logger(
    "Ready",
    `logged in as ${chalk.bold.white(client.user.username)} and ready to go!`
  );
}

export { once, name, invoke };
