import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import logger from "../events/eventLog.js";
import { color } from "../../bot.js";

const create = () => {
  const command = new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Diplays a users avatar.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("What users avatar do you wish to see?")
        .setRequired(true)
    );

  return command.toJSON();
};

const invoke = async (interaction) => {
  const user = interaction.options.getUser("user");
  const avatar = user.displayAvatarURL({ format: "png", size: 1024 });

  const embed = new EmbedBuilder().setTitle(`${user.username}'s avatar`);

  embed
    .setColor(color)
    .setFooter({
      text: "find the source for Templar Bot on my github",
      url: "https://github.com/cqb13/Templar-Bot",
    })
    .setTimestamp()
    .setAuthor({
      name: "Developed by cqb13",
      url: "https://github.com/cqb13/Templar-Bot",
      iconURL: "https://avatars.githubusercontent.com/u/74616162?s=96&v=4",
    })
    .setImage(avatar);

  // Reply to the user
  interaction.reply({
    embeds: [embed],
  });

  logger(
    "Command Ran",
    `Avatar | From: ${interaction.guild.name} | By: ${interaction.user.username} | Target: ${user.username}`
  );
};

export { create, invoke };
