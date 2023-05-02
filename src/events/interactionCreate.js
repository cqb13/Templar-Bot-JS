import logger from "./eventLog.js";

const once = false;
const name = "interactionCreate";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function invoke(interaction) {
  if (interaction.isChatInputCommand())
    (await import(`../commands/${interaction.commandName}`)).invoke(
      interaction
    );
  logger(
    "Command Ran",
    `${capitalize(interaction.commandName)} | From: ${interaction.guild.name} | By: ${interaction.user
      .username}`
  );
}

export { once, name, invoke };
