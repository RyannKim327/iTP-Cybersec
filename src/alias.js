const { get, post } = require("../utils/gist");

module.exports = async (api, event, regex) => {
	const name = event.message.text.match(regex)[1];
	const users = await get("users.json");
	if (users[event.sender.id]) {
		return api.sendMessage("This account is already registered", event);
	}
	users[event.sender.id] = name;
	api.sendMessage(`The alias ${name} is not set to this account.`, event);
	await post("users.json", users);
};
