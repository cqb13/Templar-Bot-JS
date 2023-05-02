import config from "../../config.json" assert { type: "json" };
import { SlashCommandBuilder } from "discord.js";
import { client } from "../../bot.js";

const create = () => {
  const command = new SlashCommandBuilder()
    .setName("bot-servers")
    .setDescription("Checks what servers the bot is in!");

  return command.toJSON();
};

const invoke = async (interaction) => {
  const logs = client.channels.cache.get(config.LOG_CHANNEL_ID);
  var serverAmount = 0;

  if (interaction.user.id != config.OWNER_ID) {
    return interaction.reply({
      content: "You cant use this command, you are not the owner of the bot!",
      ephemeral: true,
    });
  }

  client.guilds.cache.forEach((x) => {
    logs.send({
      content: `🔹**${x.name}** | \`${x.memberCount}\` members (ID: ${x.id})\n............................`,
      ephemeral: true,
    });
    serverAmount += 1;
  });

  interaction.reply({
    content: `Templar bot is in \`${serverAmount}\` servers!`,
    ephemeral: true,
  });
};

export { create, invoke };
