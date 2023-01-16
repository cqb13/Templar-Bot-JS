import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
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
      return interaction.reply({
        content: "I could not find that player!",
        ephemeral: true,
      });
    }
    try {
      body = JSON.parse(body);
      let render = `https://mc-heads.net/body/${mcPlayerName}`;
      const embed = new EmbedBuilder().setTitle(`${mcPlayerName}'s skin`);

      embed
        .setColor(4811710)
        .setFooter({ text: "find the source for Templar Bot on my github" })
        .setTimestamp()
        .setAuthor({
          name: "Developed by cqb13",
          url: "https://github.com/cqb13/Templar-Bot",
          iconURL: "https://avatars.githubusercontent.com/u/74616162?s=96&v=4",
        })
        .setImage(render);

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
    `Skin | From: ${interaction.guild.name} | By: ${interaction.user.username} | Target: ${mcPlayerName}`
  );
};

export { create, invoke };
