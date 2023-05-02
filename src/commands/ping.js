import { SlashCommandBuilder } from "discord.js";

const create = () => {
  const command = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replys with Pong!")
    .addUserOption((option) =>
      option.setName("user").setDescription("Shall I greet a user?")
    );

  return command.toJSON();
};

const invoke = (interaction) => {
  const user = interaction.options.getUser("user");

  if (user !== null) interaction.reply({ content: `Hello ${user}!` });
  else
    interaction.reply({
      content: "Pong!",
      ephemeral: true,
    });
};

export { create, invoke };
