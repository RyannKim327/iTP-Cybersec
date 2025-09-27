import { ApiCallbackProps, json } from "../utils/interfaces";
import { error, log, success, warning } from "../utils/print";

export default function (api: json, FB_TOKEN: string) {
	return function sendToAdmin(message: string, callback?: ApiCallbackProps) {
		return new Promise((resolve, reject) => {
			log("", "Test");
			success("Test", "Hello");
			error("Hello", "World");
			warning("", FB_TOKEN);
			log("Test Log", message);
		});
	};
}
