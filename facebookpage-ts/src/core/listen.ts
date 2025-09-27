import { json, WebCallback } from "~/utils/interfaces";
import { error, log } from "~/utils/print";

export default function (api: json, callback?: WebCallback) {
  return new Promise(async (resolve, reject) => {
    try {
      log("", "Test");
    } catch (e) {
      if (callback) {
        callback(reject, null);
      } else {
        error("Listener", e);
      }
    }
  });
}
