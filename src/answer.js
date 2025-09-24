const { default: axios } = require("axios");
const { get } = require("../utils/gist");

const fetch_challenges = async () => {
  const { data } = await get("challenges.json");
  return data;
};

module.exports = async (api, event, regex) => {
  const challenges = await fetch_challenges();
};
