import { createEmbed } from "../utils/createEmbed.js";
import { SlashCommandBuilder } from "discord.js";
import logger from "../events/eventLog.js";
import pkg from "request";

const create = () => {
  const command = new SlashCommandBuilder()
    .setName("fox")
    .setDescription("Finds fox pics!");

  return command.toJSON();
};

const invoke = async (interaction) => {
  const request = pkg;

  let url = "https://randomfox.ca/floof/";

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
      let image = body.image;

      createEmbed(interaction, "Fox Pic!", image);
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
