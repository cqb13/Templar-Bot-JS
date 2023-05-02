import { SlashCommandBuilder } from "discord.js";
import { createEmbed } from "../utils/createEmbed.js";
import logger from "../events/eventLog.js";
import pkg from "request";

const create = () => {
  const command = new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Finds cat pics!");

  return command.toJSON();
};

const invoke = async interaction => {
  const request = pkg;

  let url = "https://api.thecatapi.com/v1/images/search";

  request(url, (error, response, body) => {
    if (error) {
      logger("Error", error);
      return interaction.reply({
        content: "Could not get the image!",
        ephemeral: true
      });
    }
    try {
      body = JSON.parse(body);
      let image = body[0].url;

      createEmbed(interaction, "Cat Pic!", image);
    } catch (error) {
      logger("Error", error);
      return interaction.reply({
        content: "Something went wrong",
        ephemeral: true
      });
    }
  });
};

export { create, invoke };
