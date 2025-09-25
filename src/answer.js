const { get, post } = require("../utils/gist");
const date = require("../utils/date");

const fetch_challenges = async () => {
  const { data } = await get("challenges.json");
  return data;
};

const fetch_users = async () => {
  const { data } = await get("matches.json");
  return data;
};

/*
 * INFO: The format of the data of the flags.
 * [
 *  {
 *    "flag": "flag_sample",
 *    "next": {
 *      "title": "Sample Title",
 *      "description": "Sample Description",
 *      "hints": [
 *        "sample hint"
 *      ]
 *    },
 *    "due_date": "12-31-2025",
 *  }
 * ]
 *
 * TODO: Sample of players
 * [
 *  {
 *    "id": "user1_user2",
 *    "user1": 1, -> points
 *    "user2": 1  -> points
 *  }
 * ]
 */

module.exports = async (api, event, regex) => {
  // const challenges = await fetch_challenges();
  // const users = await fetch_challenges()
  const code = event.messaage.text.match(regex)[1].toLowerCase();
  const challenges = [
    {
      flag: "flag_sample",
      next: {
        title: "Sample Title",
        description: "Sample Description",
        hints: ["sample hint"],
      },
      due_date: "12-31-2025",
    },
  ];
  const users = [
    {
      id: "user1_user2",
      players: {
        user1: 1, // -> points
        user2: 1, // -> points
      },
      failed: 0,
    },
  ];
  const senderId = "user1";

  // TODO: To filter players
  const user = users.filter((user) => user.id.includes(senderId));

  // TODO: To check the current state (user1.points + user2.points)
  const points = Object.values(user.players);
  const combined = points[0] + points[1] + failed;
  const currentFlag = challenges[combined];
  const players = Object.keys(user.players);

  // TODO: To create a break function for less process for wrong flags
  if (code !== currentFlag.flag.toLowerCase()) {
    return api.sendMessage("You got a wrong flag.", event);
  }

  // TODO: Add Due dates functions
  const due = date(`${currentFlag.due_date} 23:59:59`, "Asia/Manila");
  const current = date();

  if (due.getTime() >= current.getTime()) {
    api.sendMessage("You failed this challenge.", event);
    user.failed++;
  } else {
    // TODO: If correct answer for a player.
    user[senderId]++;
  }

  const next = challenges[combined + 1]["next"];
  const hints = next.hints ? ` * ${next.hints.join("\n * ")}` : "No hins added";
  const message = `You're now on the next challenge, it is called: ${next.title}\n ~ ${next.description}\n\n${hints}`;

  api.sendMessage(message, {
    sender: {
      id: players[0],
    },
  });

  api.sendMessage(message, {
    sender: {
      id: players[1],
    },
  });

  // TODO: To save data after
  post("matches.json", users);
};
