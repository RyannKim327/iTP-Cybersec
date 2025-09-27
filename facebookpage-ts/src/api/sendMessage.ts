import { ApiCallbackProps, json } from "../utils/interfaces";

export default function (api: any, FB_TOKEN: string) {
	return function sendMessage(
		message: string,
		event: json,
		callback?: ApiCallbackProps,
	) {
		console.log(message);
	};
}
