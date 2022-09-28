import { EmbedBuilder, GuildResolvable } from "discord.js";
import { ICommand } from "src/types";
import { infoData } from "./info.data";

export default {
  data: infoData,
  run: async ({ client, interaction }) => {
    const guildId = interaction?.guildId as GuildResolvable;
    const queue = client.player.getQueue(guildId);

    if (!queue)
      return await interaction.editReply("There are no songs in the queue");

    let bar = queue.createProgressBar({
      queue: false,
      length: 19,
    });

    const song = queue.current;

    let embed = new EmbedBuilder();

    return interaction.editReply({
      embeds: [
        embed
          .setThumbnail(song.thumbnail)
          .setDescription(
            `Currently Playing [${song.title}](${song.url})\n\n` + bar
          ),
      ],
    });
  },
} as ICommand;
