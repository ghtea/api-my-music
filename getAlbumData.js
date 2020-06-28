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
		
		let album = {};
		
		const $ = cheerio.load(html.data);
		
		const $shortcutAlbum = $("input.album_shortcut")[0];
		
		const $titleAlbum = $("div.page_section").children("div.album_title");
		const $infoAlbum = $("table.album_info tbody").children("tr");

		const $trackAlbum = $("div.section_tracklisting ul").children("li.track");
		
		album = {
			_id: $($shortcutAlbum).attr('value').replace(/\[/,'').replace(/\]/,'')
			
			,title: $($titleAlbum[0]).text().replace(/\s\n[\s\S]*/,'')
			,artist: $($infoAlbum[0]).find('a.artist').text()
			,year: $($infoAlbum[2]).find('td a b').text()
			
			
			//,tracks: []
			//,trackFirst: $($trackAlbum).find('span.tracklist_title span:nth-child(1)').text()
			//,tracks: $trackAlbum.map( (element)=> $(element).find('span.tracklist_title span:nth-child(1)').text() )
		}
		
		/* not working
		$trackAlbum.each((i, element)=>{
				album.tracks.push( $(this).find('span.tracklist_title span:nth-child(1)').text() )
			})
		*/
		
		return new Promise(function(resolve, reject) {
    	if (album) {
        resolve(album);
      }
      reject(new Error("failed in parsing"));
  	});
	}




module.exports = (urlRym) => 
	getHtml(urlRym)
	.then(parseHtml)



/*
 $bodyList.each(function(i, elem) {
    ulList[i] = {
        title: $(this).find('strong.news-tl a').text(),
        url: $(this).find('strong.news-tl a').attr('href'),
        image_url: $(this).find('p.poto a img').attr('src'),
        image_alt: $(this).find('p.poto a img').attr('alt'),
        summary: $(this).find('p.lead').text().slice(0, -11),
        date: $(this).find('span.p-time').text()
    };
  });
*/