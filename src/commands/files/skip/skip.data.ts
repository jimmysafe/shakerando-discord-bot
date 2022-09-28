import { SlashCommandBuilder } from "discord.js";

export const skipData = new SlashCommandBuilder()
  .setName("skip")
  .setDescription("Skips the current song");
