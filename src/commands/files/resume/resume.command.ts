import { GuildResolvable } from "discord.js";
import { ICommand } from "src/types";
import { resumeData } from "./resume.data";

export default {
  data: resumeData,
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(
      interaction.guildId as GuildResolvable
    );

    if (!queue) return interaction.editReply("There are no songs in the queue");

    queue.setPaused(false);
    return interaction.editReply(
      "Music has been paused! Use `/pause` to resume the music"
    );
  },
} as ICommand;
