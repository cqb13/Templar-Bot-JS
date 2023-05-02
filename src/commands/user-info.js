import { createEmbed } from "../utils/createEmbed.js";
import { SlashCommandBuilder } from "discord.js";
import pkg from "moment";

const create = () => {
  const command = new SlashCommandBuilder()
    .setName("user-info")
    .setDescription("Gets info about discord accounts.")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("What users avatar do you wish to see?")
        .setRequired(true)
    );

  return command.toJSON();
};

const invoke = async interaction => {
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

  const fields = [
    {
      name: "Username",
      value: user.username,
      inline: true
    },
    {
      name: "ID",
      value: user.id,
      inline: true
    },
    {
      name: "Nickname",
      value: guildInfo.nickname || "None",
      inline: true
    },
    {
      name: "Bot",
      value: bot,
      inline: true
    },
    {
      name: "Server JD",
      value: `${moment.utc(guildInfo.joinedAt).format("MM/DD/YY")}`,
      inline: true
    },
    {
      name: "Discord JD",
      value: `${moment.utc(user.createdAt).format("MM/DD/YY")}`,
      inline: true
    },
    {
      name: "Roles",
      value: `${guildInfo.roles.cache.map(roles => `${roles}`).join(", ")}`,
      inline: true
    }
  ];

  createEmbed(
    interaction,
    `Some info about ${user.username}`,
    null,
    user.avatarURL(),
    fields
  );
};

export { create, invoke };
