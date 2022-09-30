import fs from "fs";
import { REST, Routes } from "discord.js";
import { IClient, ICommand } from "src/types";
import { commandsList } from "./commands.list";

export class CommandsService {
  constructor(private readonly client: IClient) {}

  private getFiles() {
    const isProduction = process.env.NODE_ENV === "production";
    const commands: string[] = [];
    commandsList.forEach((commandName) => {
      const path = __dirname + `/files/${commandName}`;
      const exists = fs.existsSync(path);
      if (!exists) return;
      commands.push(
        ...fs
          .readdirSync(path)
          .filter((file) =>
            isProduction
              ? file.endsWith(".command.js")
              : file.endsWith(".command.ts")
          )
      );
    });

    return commands;
  }

  public commands() {
    const files = this.getFiles();
    return files.map((file) => {
      const cmd = require(`${__dirname}/files/${file.split(".")[0]}/${file}`)
        .default as ICommand;
      this.client.commands.set(cmd?.data.name, cmd);
      return cmd?.data;
    });
  }

  public async httpPushCommands(guildId: string) {
    try {
      const rest = new REST({ version: "9" }).setToken(process.env.TOKEN!);
      const res = await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID!, guildId),
        {
          body: this.commands(),
        }
      );
      // @ts-expect-error
      if (res) console.log("Success Loading REST Commands.", res.length);
    } catch (err) {
      console.log(err);
    }
  }
}
