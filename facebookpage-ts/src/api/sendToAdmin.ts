import { ApiCallbackProps, json } from "~/utils/interfaces";
import { error } from "~/utils/print";

export default function (api: json, FB_TOKEN: string) {
  return async function sendToAdmin(
    message: string,
    callback?: ApiCallbackProps,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        if (api.admins.length <= 0) {
          throw new Error("No Admin Added");
        }
        const resolves: any[] = [];
        for await (let admin of api.admins) {
          const event = {
            sender: {
              id: admin,
            },
          };
          resolves.push(
            require("~/middleware/messageController.ts").default(api, FB_TOKEN)(
              message,
              event,
              callback,
            ),
          );
        }
        resolve(resolves);
      } catch (e) {
        error("sendToAdmin", e);
        reject(e);
      }
      if (callback) {
        callback(reject, resolve);
      }
    });
  };
}
