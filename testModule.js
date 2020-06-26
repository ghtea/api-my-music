const getAlbumDataFromRym = require('./getAlbumDataFromRym.js');

const urlRym = "https://rateyourmusic.com/release/album/nell/separation_anxiety/"


const result = async (urlRym) => {
	try {
		return await getAlbumDataFromRym(urlRym)
	} catch (error) {
		console.error(error);
	}
};

result(urlRym).then(res => console.log(res))