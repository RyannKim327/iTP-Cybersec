/*
 * INFO:
 * Programmer: Ryann Kim Sesgundo [MPOP Reverse II]
 *
 * INFO: This file uses gist to handle data in json format.
 */

const axios = require("axios");

const TOKEN = process.env.GIST_TOKEN;
const GIST = process.env.GIST_ID;

const url = `https://api.github.com/gists/${GIST}`;

const get = async (FILE) => {
	const { data } = await axios.get(url, {
		headers: {
			Authorization: `Bearer ${TOKEN}`,
			Accept: "application/vnd.github+json",
			"X-Github-Api-Version": "2022-11-28",
		},
	});
	if (!data.files[FILE]) {
		return console.log("Error, unknown file or not found");
	}
	const file = data.files[FILE];
	return JSON.parse(file.content);
};

const post = async (FILE, _data) => {
	if (typeof _data !== "string") {
		_data = JSON.stringify(_data, null, 2);
	}

	const { data } = await axios.post(
		url,
		{
			files: {
				[FILE]: {
					content: _data,
				},
			},
		},
		{
			headers: {
				Authorization: `Bearer ${TOKEN}`,
				Accept: "application/vnd.github+json",
				"X-Github-Api-Version": "2022-11-28",
			},
		},
	);
	return data;
};

module.exports = {
	get,
	post,
};
