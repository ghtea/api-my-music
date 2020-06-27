const fs = require('fs');
const request = require('request');
const axios = require("axios");
const cheerio = require("cheerio");
    
    
    
    
const getHtml = async(urlRym) => {
	try {
		return await axios.get(urlRym);
	} catch (error) {
		console.error(error);
	}
};

const parseHtml = (html) => {
		
		const $ = cheerio.load(html.data);
		const $imgAlbum = $(".coverart_img");
		
		const urlImgRaw =  $($imgAlbum[0]).attr('src');
		
		
		return new Promise(function(resolve, reject) {
    	if (urlImgRaw) {
        resolve(`https:${urlImgRaw}`);
      }
      reject(new Error("failed in parsing"));
  	});
	}

 

const downloadImg = function(urlImg, pathFile) {
	
  request.head(urlImg, function(err, res, body) {
    //console.log('content-type:', res.headers['content-type']);
    //console.log('content-length:', res.headers['content-length']);

    request(urlImg).pipe(fs.createWriteStream(pathFile)).on('close', function(){console.log("succeeded")} );
  });
  
};

module.exports = async (urlRym, pathFile) => { 
	const html = await getHtml(urlRym);
	const urlImg = await parseHtml(html);
	await downloadImg(urlImg, pathFile);
	
	return new Promise(function(resolve, reject) {
  	resolve(true);
	});
}


/*
return new Promise(function(resolve, reject) {
  	if (didSucceed) {
      resolve(true);
    }
    reject(new Error("failed in getAlbumCover"));
	});
	*/