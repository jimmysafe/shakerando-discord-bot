import { SlashCommandBuilder } from "discord.js";

export const playCommandData = new SlashCommandBuilder()
  .setName("play")
  .setDescription("loads songs from youtube")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("song")
      .setDescription("Loads a single song from a url")
      .addStringOption((option) =>
        option.setName("url").setDescription("the song's url").setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("playlist")
      .setDescription("Loads a playlist of songs from a url")
      .addStringOption((option) =>
        option
          .setName("url")
          .setDescription("the playlist's url")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("search")
      .setDescription("Searches for sogn based on provided keywords")
      .addStringOption((option) =>
        option
          .setName("searchterms")
          .setDescription("the search keywords")
          .setRequired(true)
      )
  );
