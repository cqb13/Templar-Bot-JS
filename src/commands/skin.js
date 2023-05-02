import { createEmbed } from "../utils/createEmbed.js";
import { SlashCommandBuilder } from "discord.js";
import logger from "../events/eventLog.js";
import pkg from "request";

const create = () => {
  const command = new SlashCommandBuilder()
    .setName("skin")
    .setDescription("Diplays a minecraft skin.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("What players skin do you wish to see?")
        .setRequired(true)
    );

  return command.toJSON();
};

const invoke = async (interaction) => {
  const mcPlayerName = interaction.options.getString("name");
  const request = pkg;

  if (mcPlayerName.length > 16) {
    return interaction.reply({
      content: "That player name is too long!",
      ephemeral: true,
    });
  }

  let mojangPlayerApi = `https://api.mojang.com/users/profiles/minecraft/${mcPlayerName}`;
  request(mojangPlayerApi, (error, response, body) => {
    if (error) {
      logger("Error", error);
      return interaction.reply({
        content: "I could not find that player!",
        ephemeral: true,
      });
    }
    try {
      body = JSON.parse(body);
      let render = `https://mc-heads.net/body/${mcPlayerName}`;

      createEmbed(interaction, `${mcPlayerName}'s skin`, render);
    } catch (error) {
      logger("Error", error);
      return interaction.reply({
        content: "Something went wrong",
        ephemeral: true,
      });
    }
  });
};

export { create, invoke };
