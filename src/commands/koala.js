import { createEmbed } from "../utils/createEmbed.js";
import { SlashCommandBuilder } from "discord.js";
import logger from "../events/eventLog.js";
import pkg from "request";

const create = () => {
  const command = new SlashCommandBuilder()
    .setName("koala")
    .setDescription("Finds koala pics!");

  return command.toJSON();
};

const invoke = async (interaction) => {
  const request = pkg;

  let url = "https://some-random-api.ml/img/koala";

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
      let image = body.link;

      createEmbed(interaction, "Koala Pic!", image);
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
