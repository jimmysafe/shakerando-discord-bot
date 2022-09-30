import "reflect-metadata";
import dotenv from "dotenv";
import { CommandsService } from "./commands/commands.service";
import { ClientService } from "./client/client.service";
import { ICommand } from "./types";

dotenv.config();

const client = new ClientService().init();
const commandsService = new CommandsService(client);

client.on("ready", () =>
  console.log(`🚀 Logged in as ${client?.user?.tag} 🚀`)
);
/**
 * ON GUILD JOIN
 * Add slash commands into that guild.
 */
client.on("guildCreate", (guild) => commandsService.httpPushCommands(guild.id));
/**
 * ON MESSAGE RECEIVED
 * Handle interactions (commands)
 */
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (client.commands.size === 0) {
    if (!interaction?.guild?.id) return;

    console.log("Empty command list, refreshing");
    commandsService.commands();
    await commandsService.httpPushCommands(interaction.guild.id);
  }

  const command = client.commands.get(interaction.commandName) as ICommand;

  if (!command) interaction.reply("Not a valid command");

  await interaction.deferReply();
  await command.run({ client, interaction });
});

client.login(process.env.TOKEN);
