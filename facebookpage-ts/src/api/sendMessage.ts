import axios from "axios";
import { ApiCallbackProps, json } from "~/utils/interfaces";
import { error } from "~/utils/print";

export default function (api: any, FB_TOKEN: string) {
  return function sendMessage(
    message: string,
    event: json,
    callback?: ApiCallbackProps,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(
          require("~/middleware/messageController.ts").default(api, FB_TOKEN)(
            message,
            event,
            callback,
          ),
        );
      } catch (e) {
        error("sendMessage", e);
        reject(e);
      }
      if (callback) {
        callback(reject, resolve);
      }
    });
  };
}
