import { SlashCommandBuilder } from "discord.js";

export const queueData = new SlashCommandBuilder()
  .setName("queue")
  .setDescription("displays the current song queue")
  .addNumberOption((option) =>
    option
      .setName("page")
      .setDescription("Page number of the queue")
      .setMinValue(1)
  );
