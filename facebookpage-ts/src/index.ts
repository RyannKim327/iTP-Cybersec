import * as path from "path";
import * as fs from "fs";
import {
  admins,
  ApiModule,
  CommandListProps,
  json,
  WebCallback,
} from "./utils/interfaces";

export default function FacebookTest(callback?: WebCallback) {
  const api: json = {};
  const dir: string = path.join(__dirname, "api");
  const commands: CommandListProps[] = [];
  const admins: admins = [];

  const FB_TOKEN = "Distributed Token";
  const VERSION = "v23.0";

  fs.readdirSync(dir).forEach((file: string) => {
    if (file.endsWith(".ts")) {
      const name = path.basename(file, path.extname(file));
      const mod: {
        default: ApiModule;
      } = require(path.join(dir, file));
      api[name] = mod.default(api, FB_TOKEN);
    }
  });

  api["addCommand"] = require(
    path.join(__dirname, "core", "addCommand.ts"),
  ).default(commands);

  api["version"] = VERSION;
  api["admins"] = admins;
  api["listen"] = require(path.join(__dirname, "core", "listen.ts")).default(
    api,
    callback,
  );

  return api;
}
