const axios = require("axios");
const URL_API_ALBUM_COVER = "coverartarchive.org/release-group/"

const getHtml = async() => {
	try {
		return await axios.get(`${URL_API_ALBUM_COVER}`);
	} catch (error) {
		console.error(error);
	}
};