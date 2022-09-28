import { Player } from "discord-player";
import Discord from "discord.js";
import { IClient } from "src/types";

export class ClientService {
  private declare() {
    return new Discord.Client({
      intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildVoiceStates,
      ],
    }) as IClient;
  }

  public init() {
    const client = this.declare();
    client.commands = new Discord.Collection();
    client.player = new Player(client, {
      ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      },
    });

    return client;
  }
}
