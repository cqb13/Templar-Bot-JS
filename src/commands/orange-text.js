import config from "../../config.json" assert { type: "json" };
import { SlashCommandBuilder } from "discord.js";
import logger from "../events/eventLog.js";

const create = () => {
  const command = new SlashCommandBuilder()
    .setName("orange-text")
    .setDescription("Sends a message with orange text!")
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
  if (interaction.user.id != config.OWNER_ID) {
    return interaction.reply({
      content: "You cant use this command, you are not the owner of the bot!",
      ephemeral: true,
    });
  }

  const sendMessage = await interaction.channel.send(
    `\`\`\`fix\n${msg}\n\`\`\``
  );
};

export { create, invoke };
