import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import logger from "../events/eventLog.js";
import { color } from "../../bot.js";
import pkg from "moment";

const create = () => {
  const command = new SlashCommandBuilder()
    .setName("user-info")
    .setDescription("Gets info about discord accounts.")
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
  const guildInfo = interaction.guild.members.cache.get(user.id);
  const moment = pkg;

  const bot = (() => {
    if (user.bot === true) {
      return "yes";
    } else {
      return "no";
    }
  })();

  const embed = new EmbedBuilder()
    .setTitle(`Some info about ${user.username}`)
    .addFields([
      {
        name: "Username",
        value: user.username,
        inline: true,
      },
      {
        name: "ID",
        value: user.id,
        inline: true,
      },
      {
        name: "Nickname",
        value: guildInfo.nickname || "None",
        inline: true,
      },
      {
        name: "Bot",
        value: bot,
        inline: true,
      },
      {
        name: "Server JD",
        value: `${moment.utc(guildInfo.joinedAt).format("MM/DD/YY")}`,
        inline: true,
      },
      {
        name: "Discord JD",
        value: `${moment.utc(user.createdAt).format("MM/DD/YY")}`,
        inline: true,
      },
      {
        name: "Roles",
        value: `${guildInfo.roles.cache.map((roles) => `${roles}`).join(", ")}`,
        inline: true,
      },
    ]);

  embed
    .setColor(color)
    .setFooter({ text: "find the source for Templar Bot on my github" })
    .setTimestamp()
    .setAuthor({
      name: "Developed by cqb13",
      url: "https://github.com/cqb13/Templar-Bot",
      iconURL: "https://avatars.githubusercontent.com/u/74616162?s=96&v=4",
    })
    .setThumbnail(user.avatarURL());

  // Reply to the user
  interaction.reply({
    embeds: [embed],
  });
  logger(
    "Command Ran",
    `User info | From: ${interaction.guild.name} | By: ${interaction.user.username} | Target: ${user.username}`
  );
};

export { create, invoke };
