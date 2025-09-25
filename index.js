const bot = require("./facebook-page");

const api = new bot();

api.setPrefix(":");

api.addCommand("answer", {
  title: "Flag for CTF",
  command: "iTP{([\\w\\W]+)}",
  hidden: true,
  unprefix: true,
  any: true,
  ci: false,
});

api.addCommand("alias", {
  title: "Set nickname",
  command: "nickname ([\\w\\W]+)",
  hidden: true,
  unprefix: true,
});
