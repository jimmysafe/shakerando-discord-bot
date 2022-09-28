import {
  EmbedBuilder,
  GuildChannelResolvable,
  GuildMember,
  GuildResolvable,
} from "discord.js";
import { QueryType } from "discord-player";
import { ICommand } from "src/types";
import { playCommandData } from "./play.data";

export default {
  data: playCommandData,
  run: async ({ client, interaction }) => {
    const interactionMember = interaction.member as GuildMember;

    if (!interactionMember.voice.channel)
      return interaction.editReply(
        "You need to be in a VC to use this command"
      );

    const queue = client.player.createQueue(
      interaction?.guild as GuildResolvable
    );

    if (!queue.connection)
      await queue.connect(
        interactionMember.voice.channel as GuildChannelResolvable
      );

    let embed = new EmbedBuilder();

    const url = interaction.options.getString("url");

    const song = async () => {
      if (!url) return;
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_VIDEO,
      });

      if (result.tracks.length === 0)
        return interaction.editReply("No results");

      const song = result.tracks[0];
      queue.addTrack(song);

      return embed
        .setDescription(
          `**[${song.title}](${song.url})** has been added to the Queue`
        )
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duration: ${song.duration}` });
    };

    const playlist = async () => {
      if (!url) return;
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_PLAYLIST,
      });

      if (result.tracks.length === 0)
        return interaction.editReply("No results");

      const playlist = result.playlist;
      queue.addTracks(result.tracks);
      return embed
        .setDescription(
          `**${result.tracks.length} songs from [${playlist?.title}](${playlist?.url})** have been added to the Queue`
        )
        .setThumbnail(playlist?.thumbnail ?? null);
    };

    const search = async () => {
      if (!url) return;
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      });
      if (result.tracks.length === 0)
        return interaction.editReply("No results");
      const song = result.tracks[0];
      queue.addTrack(song);
      return embed
        .setDescription(
          `**[${song.title}](${song.url})** has been added to the Queue`
        )
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duration: ${song.duration}` });
    };

    switch (interaction.options.getSubcommand()) {
      case "song":
        return song();
      case "playlist":
        return playlist();
      case "search":
        return search();
    }

    if (!queue.playing) await queue.play();
    return interaction.editReply({
      embeds: [embed],
    });
  },
} as ICommand;
