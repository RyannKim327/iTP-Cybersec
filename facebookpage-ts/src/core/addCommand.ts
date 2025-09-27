import { CommandListProps, CommandProps } from "~/utils/interfaces";

export default function (commands: CommandListProps[]) {
  return function addCommand(script: string, command: CommandProps) {
    // TODO: To replace all whitespaces into underscore in scripts
    script = script.replace(/\s/gi, "_") + ".ts";

    commands.push({
      ...command,
      script,
    });
  };
}
