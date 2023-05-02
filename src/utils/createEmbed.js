import { EmbedBuilder } from "discord.js";
import { color } from "../../bot.js";

const createEmbed = (interaction, title, imageUrl, thumbnail, fields) => {
  const embed = new EmbedBuilder().setTitle(title);

  embed
    .setColor(color)
    .setFooter({ text: "find the source for Templar Bot on my github" })
    .setTimestamp()
    .setAuthor({
      name: "Developed by cqb13",
      url: "https://github.com/cqb13/Templar-Bot-JS",
      iconURL: "https://avatars.githubusercontent.com/u/74616162?s=96&v=4"
    });
    if (imageUrl) embed.setImage(imageUrl);
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (fields) embed.addFields(fields);

    interaction.reply({
        embeds: [embed]
    });
};

export { createEmbed };
