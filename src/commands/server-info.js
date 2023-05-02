import { createEmbed } from "../utils/createEmbed";
import { SlashCommandBuilder } from "discord.js";
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

  const afkChannels = () => {
    if (guild.afkChannel === null) {
      return "None";
    } else {
      return guild.afkChannel.name;
    }
  }

  // Create a MessageEmbed and add an inlined field for each property displayed in the reply message
  const fields = [
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
      value: afkChannels(),
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
    }
  ]

  createEmbed(interaction, guild.name, null, guild.iconURL(), fields);
};

export { create, invoke };
