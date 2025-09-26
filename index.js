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

api.addAdmin("24708604612113235");

api.listen((app) => {
  app.get("/terms", (req, res) => {
    res.sendFile(`${__dirname}/web/terms-and-conditions.html`);
  });
  app.get("/policy", (req, res) => {
    res.sendFile(`${__dirname}/web/privacy-policy.html`);
  });
});
