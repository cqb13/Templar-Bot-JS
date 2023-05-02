import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

const create = () => {
  const command = new SlashCommandBuilder()
    .setName("say")
    .setDescription("Says something for you")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("What should I say?")
        .setRequired(true)
    );

  return command.toJSON();
};

const invoke = async (interaction) => {
  const msg = interaction.options.getString("message");

  // checks permisions
  if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages))
    return interaction.reply({
      content: "You are not allowed to delete messages!",
      ephemeral: true,
    });

  if (!interaction.appPermissions.has(PermissionFlagsBits.ManageMessages))
    return interaction.reply({
      content: "I am not allowed to delete messages!",
      ephemeral: true,
    });

  const sendMessage = await interaction.channel.send(msg);
};

export { create, invoke };
