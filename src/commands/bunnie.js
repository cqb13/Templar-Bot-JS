import { createEmbed } from "../utils/createEmbed.js";
import { SlashCommandBuilder } from "discord.js";
import logger from "../events/eventLog.js";
import pkg from "request";

const create = () => {
  const command = new SlashCommandBuilder()
    .setName("bunnie")
    .setDescription("Finds bunnie pics!");

  return command.toJSON();
};

const invoke = async (interaction) => {
  const request = pkg;

  let url = "https://api.bunnies.io/v2/loop/random/?media=gif,png";

  request(url, (error, response, body) => {
    if (error) {
      logger("Error", error);
      return interaction.reply({
        content: "Could not get the image!",
        ephemeral: true,
      });
    }
    try {
      body = JSON.parse(body);

      createEmbed(interaction, "Bunnie Pic!", body.media.poster);
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
