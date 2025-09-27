import * as path from "path";
import * as fs from "fs";
import { ApiModule, CommandListProps, json } from "./utils/interfaces";

export default function FacebookTest(callback?: (req: any, res: any) => void) {
	const api: json = {};
	const dir: string = path.join(__dirname, "api");
	const commands: CommandListProps[] = [];

	const FB_TOKEN = "Distributed Token";

	fs.readdirSync(dir).forEach((file) => {
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
	api["commands"] = commands;

	return api;
}
