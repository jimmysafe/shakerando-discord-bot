import { SlashCommandBuilder } from "discord.js";

export const pauseData = new SlashCommandBuilder()
  .setName("pause")
  .setDescription("Pauses the music");
