import { SlashCommandBuilder } from "discord.js";

export const infoData = new SlashCommandBuilder()
  .setName("info")
  .setDescription("Displays info about the currently playing song");
