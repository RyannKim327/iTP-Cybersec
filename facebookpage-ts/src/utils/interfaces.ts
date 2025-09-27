// INFO: Types
export type ApiCallbackProps = (
  error: json | null,
  message: json | json[] | null,
) => void;

export type ApiModule = (
  api: json,
  FB_TOKEN: string,
) => (...args: any[]) => void;

export type PromiseProps = (resolve: any, reject: any) => void;

export type admins = string[] | number[];

export type filetype = "audio" | "video" | "image";

export type json = Record<string, any>;

export type WebCallback = (req: any, res: any) => void;

// INFO: Interfaces
export interface CommandListProps {
  anywhere?: boolean;
  ci?: boolean;
  command: string;
  description?: string;
  hidden?: boolean;
  maintenance?: boolean;
  script: string;
  title: string;
  unprefix?: boolean;
}

export interface CommandProps {
  anywhere?: boolean;
  ci?: boolean;
  command: string;
  description?: string;
  hidden?: boolean;
  maintenance?: boolean;
  title: string;
  unprefix?: boolean;
}
