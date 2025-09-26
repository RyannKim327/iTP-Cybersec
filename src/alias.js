const { get, post } = require("../utils/gist");

module.exports = async (api, event, regex) => {
  const name = event.message.text.match(regex)[1];
  const users = await get("users.json");
  const existing = Object.values(users);

  const forbidden = [
    "admin",
    "administrator",
    "root",
    "superuser",
    "sysadmin",
    "system",
    "operator",
    "manager",
    "supervisor",
    "moderator",
    "owner",
    "maintainer",
    "controller",
    "coordinator",
    "overseer",
    "executive",
    "governor",
    "chief",
    "head",
    "director",
    "master",
    "poweruser",
    "adminuser",
    "adm",
    "admin1",
    "admin123",
    "superadmin",
    "admin_root",
    "rootadmin",
    "godmode",
    "administrator_account",
    "systemadmin",
    "networkadmin",
    "dbadmin",
    "webadmin",
    "adminpanel",
    "adminconsole",
    "adm1n",
    "4dm1n",
    "@dmin",
    "adm!n",
    "adm1nistrator",
    "4dm1nistrator",
    "@dm1nistrator",
    "administr8r",
    "adm1nz",
    "adminz",
    "adm1nztr",
    "4dm!n",
    "admn",
    "adm1",
    "adm1nsys",
    "adm1nroot",
    "r00t",
    "sup3ruser",
    "5ysadmin",
    "0perator",
    "manag3r",
    "m0derator",
    "0wn3r",
    "m@intainer",
    "c0ntroller",
    "c00rdinator",
    "0verseer",
    "g0vernor",
    "ch13f",
    "d1rector",
    "ma5ter",
    "p0weruser",
    "adm!npanel",
    "adminc0nsole",
    "game_master",
  ];

  if (forbidden.includes(name.toLowerCase())) {
    return api.sendMessage(
      `The nickname ${name} is not allowed to use. Please choose another one.`,
      event,
    );
  }

  const result = existing.filter((v) => v.toLowerCase() === name.toLowerCase());
  console.log(result);

  if (!result) {
    return api.sendMessage(`The nickname ${name} is already taken.`, event);
  }

  if (users[event.sender.id]) {
    return api.sendMessage("This account is already registered", event);
  }

  users[event.sender.id] = name;
  api.sendMessage(`The alias ${name} is now set to this account.`, event);
  api.sendToAdmin(
    `The alias ${name} is registed to user id: ${event.sender.id}`,
  );
  await post("users.json", users);
};
