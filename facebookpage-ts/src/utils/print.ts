export function log(from: string, message: string) {
	console.log(
		`\x1b[36mLOG  [${from
			.replace(/\W/gi, " ")
			.trim()
			.toUpperCase()}]: \x1b[37m${message}`,
	);
}

export function success(from: string, message: string) {
	console.log(
		`\x1b[32mDONE [${from
			.replace(/\W/gi, " ")
			.trim()
			.toUpperCase()}]: \x1b[37m${message}`,
	);
}

export function error(from: string, message: string) {
	console.log(
		`\x1b[31mERR  [${from
			.replace(/\W/gi, " ")
			.trim()
			.toUpperCase()}]: \x1b[37m${message}`,
	);
}

export function warning(from: string, message: string) {
	console.log(
		`\x1b[33mWARN [${from
			.replace(/\W/gi, " ")
			.trim()
			.toUpperCase()}]: \x1b[37m${message}`,
	);
}
