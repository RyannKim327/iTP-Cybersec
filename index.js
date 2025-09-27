const bot = require("./facebook-page");
const { get } = require("./utils/gist");

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

(async () => {
  const admins = await get("admins.json");
  for (const admin of admins) {
    api.addAdmin(admin);
  }
})();

api.listen((app) => {
  app.get("/terms", (req, res) => {
    res.setHeader("X-Powered-By", "MPOP Reverse II");
    res.sendFile(`${__dirname}/web/terms-and-conditions.html`);
  });
  app.get("/policy", (req, res) => {
    res.setHeader("X-Powered-By", "MPOP Reverse II");
    res.sendFile(`${__dirname}/web/privacy-policy.html`);
  });
});
