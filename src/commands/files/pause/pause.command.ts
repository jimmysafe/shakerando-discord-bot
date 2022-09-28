import { GuildResolvable } from "discord.js";
import { ICommand } from "src/types";
import { pauseData } from "./pause.data";

export default {
  data: pauseData,
  run: async ({ client, interaction }) => {
    const guildId = interaction?.guildId as GuildResolvable;
    const queue = client.player.getQueue(guildId);

    if (!queue)
      return await interaction.editReply("There are no songs in the queue");

    queue.setPaused(true);
    return interaction.editReply(
      "Music has been paused! Use `/resume` to resume the music"
    );
  },
} as ICommand;
