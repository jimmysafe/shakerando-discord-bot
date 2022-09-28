import { GuildResolvable } from "discord.js";
import { ICommand } from "src/types";
import { stopData } from "./stop.data";

export default {
  data: stopData,
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(
      interaction.guildId as GuildResolvable
    );

    if (!queue) return interaction.editReply("There are no songs in the queue");

    queue.destroy();
    return interaction.editReply("Bye!");
  },
} as ICommand;
