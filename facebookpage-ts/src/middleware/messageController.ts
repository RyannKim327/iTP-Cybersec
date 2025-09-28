import axios from "axios";
import { ApiCallbackProps, json } from "~/utils/interfaces";
import { error } from "~/utils/print";

export default function (api: json, FB_TOKEN: string) {
  return function messageController(
    message: string,
    event: json,
    callback?: ApiCallbackProps,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        if (typeof message !== "string") {
          throw new Error("MESSAGE must be string");
        }
        if (event.sender.id === undefined) {
          throw new Error("Sender ID is undefined");
        }

        const messages: string[] = message.split(" ");
        const words: number = 300;
        const resolves: any[] = [];
        if (messages.length >= words) {
          let index = 0;
          if (Math.ceil(messages.length / words)) {
            const msg = messages.slice(index * words, (index + 1) * words);
            const sendMessage = async (message: string) => {
              const { data } = await axios.post(
                `https://graph.facebook.com/${api.version}/me/messages?access_token=${FB_TOKEN}`,
                {
                  message: {
                    text: message,
                  },
                  recipient: {
                    id: event.sender.id,
                  },
                },
              );
              resolves.push(data);
            };

            setTimeout(async () => {
              await sendMessage(msg.join(" "));
              index++;
            }, 1500);
          }
        } else {
          const { data } = await axios.post(
            `https://graph.facebook.com/${api.version}/me/messages?access_token=${FB_TOKEN}`,
            {
              message: {
                text: message,
              },
              recipient: {
                id: event.sender.id,
              },
            },
          );
          resolve(data);
          return;
        }
        resolve(resolves);
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
