import { GuildResolvable } from "discord.js";
import { ICommand } from "src/types";
import { skipData } from "./skip.data";

const { MessageEmbed } = require("discord.js");

export default {
  data: skipData,
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(
      interaction.guildId as GuildResolvable
    );

    if (!queue) return interaction.editReply("There are no songs in the queue");

    const currentSong = queue.current;

    queue.skip();
    return interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setDescription(`${currentSong.title} has been skipped!`)
          .setThumbnail(currentSong.thumbnail),
      ],
    });
  },
} as ICommand;
