import FacebookTest from "./src";

const api = FacebookTest();
api.sendMessage("Hello World");

api.addCommand("test", {
	title: "Hello",
	command: "World",
});

api.addCommand("test mode", {
	title: "Hello World",
	command: "Hehe",
});

api.sendToAdmin(JSON.stringify(api.commands));
