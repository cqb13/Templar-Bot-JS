import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import logger from "../events/eventLog.js";
import { color } from "../../bot.js";
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
      return interaction.reply({
        content: "Could not get the image!",
        ephemeral: true,
      });
    }
    try {
      body = JSON.parse(body);
      let image = body.link;

      const embed = new EmbedBuilder().setTitle(`Koala pic!`);

      embed
        .setColor(color)
        .setFooter({ text: "find the source for Templar Bot on my github" })
        .setTimestamp()
        .setAuthor({
          name: "Developed by cqb13",
          url: "https://github.com/cqb13/Templar-Bot",
          iconURL: "https://avatars.githubusercontent.com/u/74616162?s=96&v=4",
        })
        .setImage(image);

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
    `Koala | From: ${interaction.guild.name} | By: ${interaction.user.username}`
  );
};

export { create, invoke };
