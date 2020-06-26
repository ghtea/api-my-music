const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async() => {
	try {
		return await axios.get("https://rateyourmusic.com/release/album/my-bloody-valentine/loveless/");
	} catch (error) {
		console.error(error);
	}
};

getHtml()
	.then(html => {
		
		let album = {};
		
		const $ = cheerio.load(html.data);
		const $titleAlbum = $("div.page_section").children("div.album_title");
		const $infoAlbum = $("table.album_info tbody").children("tr");
		
		const $trackAlbum = $("div.section_tracklisting ul").children("li.track");
		
		album = {
			title: $($titleAlbum[0]).text().replace(/\s\n[\s\S]*/,'')
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
		
		return album;
	})
	.then(res => log(res));

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