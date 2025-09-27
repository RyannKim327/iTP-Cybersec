export type json = Record<string, any>;

export type filetype = "audio" | "video" | "image";

export type ApiModule = (
	api: json,
	FB_TOKEN: string,
) => (...args: any[]) => void;

export type ApiCallbackProps = (
	error: json | null,
	message: json | json[] | null,
) => void;

export interface CommandListProps {
	script: string;
	title: string;
	description?: string;
	command: string;
	unprefix?: boolean;
	anywhere?: boolean;
	ci?: boolean;
	maintenance?: boolean;
	hidden?: boolean;
}

export interface CommandProps {
	title: string;
	description?: string;
	command: string;
	unprefix?: boolean;
	anywhere?: boolean;
	ci?: boolean;
	maintenance?: boolean;
	hidden?: boolean;
}
