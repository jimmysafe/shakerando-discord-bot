import { SlashCommandBuilder } from "discord.js";

export const stopData = new SlashCommandBuilder()
  .setName("stop")
  .setDescription("Stops the bot and clears the queue");
