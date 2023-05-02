import { createEmbed } from "../utils/createEmbed.js";
import { SlashCommandBuilder } from "discord.js";

const create = () => {
  const command = new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Displays a users avatar.")
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

  createEmbed(interaction, `${user.username}'s avatar`, avatar);
};

export { create, invoke };
