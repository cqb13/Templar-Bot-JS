import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

const create = () => {
  const command = new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Deletes the given amount of messages!")
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("How many messages shall be deleted?")
        .setRequired(true)
    );

  return command.toJSON();
};

const invoke = async (interaction) => {
  const amount = interaction.options.getNumber("amount");

  // Check if the user executing the command has the required permissions to do so
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

  if (amount < 1)
    return interaction.reply({
      content: "I must delete one or more messages!",
      ephemeral: true,
    });

  const deletedMessages = (
    await interaction.channel.bulkDelete(amount, true).catch((err) => {
      console.error(err);
    })
  ).size;
  
  interaction.reply({
    content: `I deleted ${deletedMessages} messages for you!`,
    ephemeral: true,
  });
};

export { create, invoke };
