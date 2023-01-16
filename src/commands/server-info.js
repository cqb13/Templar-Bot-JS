import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import logger from "../events/eventLog.js";
import { color } from "../../bot.js";
import pkg from "moment";

// Creates an Object in JSON with the data required by Discord's API to create a SlashCommand
const create = () => {
  const command = new SlashCommandBuilder()
    .setName("server-info")
    .setDescription(
      "Replys with a small amount of information about this server!"
    )
    .setDMPermission(false);

  return command.toJSON();
};

// Called by the interactionCreate event listener when the corresponding command is invoked
const invoke = (interaction) => {
  const guild = interaction.guild;
  const moment = pkg;

  // Create a MessageEmbed and add an inlined field for each property displayed in the reply message
  const embed = new EmbedBuilder().setTitle(guild.name).addFields([
    {
      name: "Members",
      value: guild.memberCount.toString(),
      inline: true,
    },
    {
      name: "Created At",
      value: `${moment.utc(guild.createdAt).format("MM/DD/YYYY")}`,
      inline: true,
    },
    {
      name: "Owner ID",
      value: `<@!${guild.ownerId}>`,
      inline: true,
    },
    {
      name: "ID",
      value: guild.id,
      inline: true,
    },
    {
      name: "AFK channels",
      value: guild.afkChannel?.name ?? "None",
      inline: true,
    },
    {
      name: "AFK timeout",
      value: guild.afkTimeout.toString(),
      inline: true,
    },
    {
      name: "Custom URL",
      value: guild.vanityURLCode ?? "None",
      inline: true,
    },
    {
      name: "Boosts",
      value: guild.premiumSubscriptionCount.toString(),
      inline: true,
    },
    {
      name: "Discord Partner",
      value: guild.partnered ? "Yes" : "No",
      inline: true,
    },
    {
      name: "Verified",
      value: guild.verified ? "Yes" : "No",
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
    .setThumbnail(guild.iconURL());

  // Reply to the user
  interaction.reply({
    embeds: [embed],
  });
  logger(
    "Command Ran",
    `Server info | From: ${interaction.guild.name} | By: ${interaction.user.username}`
  );
};

export { create, invoke };
