import { ApiCallbackProps, filetype, json } from "../utils/interfaces";

export default function (api: json, FB_TOKEN: string) {
	return function sendAttachment(
		url: string,
		type: filetype,
		event: json,
		callback?: ApiCallbackProps,
	) {
		// console.log("Test")
	};
}
