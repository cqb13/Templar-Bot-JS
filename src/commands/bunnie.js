import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import logger from "../events/eventLog.js";
import { color } from "../../bot.js";
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
      return interaction.reply({
        content: "Could not get the image!",
        ephemeral: true,
      });
    }
    try {
      body = JSON.parse(body);

      const embed = new EmbedBuilder().setTitle(`Bunnie pic!`);

      embed
        .setColor(color)
        .setFooter({ text: "find the source for Templar Bot on my github" })
        .setTimestamp()
        .setAuthor({
          name: "Developed by cqb13",
          url: "https://github.com/cqb13/Templar-Bot",
          iconURL: "https://avatars.githubusercontent.com/u/74616162?s=96&v=4",
        })
        .setImage(body.media.poster);

      // Reply to the user
      interaction.reply({
        embeds: [embed],
      });
    } catch (error) {
      return interaction.reply({
        content: "Something went wrong",
        ephemeral: true,
      });
    }
  });

  logger(
    "Command Ran",
    `Bunnie | From: ${interaction.guild.name} | By: ${interaction.user.username}`
  );
};

export { create, invoke };
