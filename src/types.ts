import { Player } from "discord-player";
import {
  CacheType,
  ChatInputCommandInteraction,
  Client,
  Collection,
  SlashCommandBuilder,
} from "discord.js";

export interface IClient extends Client {
  commands: Collection<unknown, unknown>;
  player: Player;
}

export interface ICommandRunParams {
  client: IClient;
  interaction: ChatInputCommandInteraction<CacheType>;
}

export interface ICommand {
  data: SlashCommandBuilder;
  run: (params: ICommandRunParams) => any;
}
