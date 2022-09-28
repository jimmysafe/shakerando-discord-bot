import { EmbedBuilder, GuildResolvable } from "discord.js";
import { ICommand } from "src/types";
import { queueData } from "./queue.data";

export default {
  data: queueData,
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(
      interaction?.guildId as GuildResolvable
    );
    if (!queue || !queue.playing) {
      return interaction.editReply("There are no songs in the queue");
    }

    const totalPages = Math.ceil(queue.tracks.length / 10) || 1;
    const page = (interaction.options.getNumber("page") || 1) - 1;

    if (page + 1 > totalPages)
      return interaction.editReply(
        `Invalid Page. There are only a total of ${totalPages} pages of songs`
      );

    const queueString = queue.tracks
      .slice(page * 10, page * 10 + 10)
      .map((song, i) => {
        return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${
          song.title
        } -- <@${song.requestedBy.id}>`;
      })
      .join("\n");

    const currentSong = queue.current;

    let embed = new EmbedBuilder();

    return interaction.editReply({
      embeds: [
        embed
          .setDescription(
            `**Currently Playing**\n` +
              (currentSong
                ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>`
                : "None") +
              `\n\n**Queue**\n${queueString}`
          )
          .setFooter({
            text: `Page ${page + 1} of ${totalPages}`,
          })
          .setThumbnail(currentSong.thumbnail),
      ],
    });
  },
} as ICommand;
