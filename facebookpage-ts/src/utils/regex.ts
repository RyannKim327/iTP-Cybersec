export default function (
	prefix: string,
	command: string,
	unprefix?: boolean,
	anywhere?: boolean,
	cs?: boolean,
) {
	const prefixes = ["/", "\\", "$", "^"];
	if (prefixes.includes(prefix)) {
		prefix = `\\${prefix}`;
	}
	if (cs === undefined || cs === null) {
		// TODO: To create a default value for case sensitive
		cs = false;
	}

	if (unprefix) {
		prefix = "";
	}

	if (!anywhere && !unprefix) {
		command = `^${prefix}${command}`;
	}

	return new RegExp(command, cs ? "i" : "");
}
