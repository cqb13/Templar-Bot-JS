import { createEmbed } from "../utils/createEmbed.js";
import { SlashCommandBuilder } from "discord.js";
import logger from "../events/eventLog.js";
import pkg from "request";

const create = () => {
  const command = new SlashCommandBuilder()
    .setName("duck")
    .setDescription("Finds duck pics!");

  return command.toJSON();
};

const invoke = async (interaction) => {
  const request = pkg;

  let url = "https://random-d.uk/api/v1/random?type=png";

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
      let image = body.url;

      createEmbed(interaction, "Duck Pic!", image);
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
