//`http://musicbrainz.org/ws/2/release-group/${idReleaseGroup}?inc=artist-credits+releases&fmt=json`

// `coverartarchive.org/release-group/${idReleaseGroup}`
//"https://rateyourmusic.com/release/album/radiohead/kid-a/"


let albums = [
  	{
		title: "Kid A",
		
		
		rating: 4,
		review: "",
		
		id: "2222",
		idMusicBrainz: "e75c0549-ad55-39e3-8025-c72c5d4a3c5d",
		urlRateYourMusic: "/album/radiohead/kid-a/",
		
		urlAlbumCover: "http://coverartarchive.org/release/e1bdf797-8b89-4d4c-8986-bcb0974d9726/8119727542-500.jpg"
	},
	
	{
		title: "Loveless",
		
		rating: 5,
		review: "",
		
		id: "1111",
		idMbz: "cb76227e-3ac0-3002-9a10-615a5b73cc59",
		urlRym: "/album/my-bloody-valentine/loveless/",
		
		urlAlbumCover: "http://coverartarchive.org/release/cd32c6cf-f979-39e7-a4ec-157d3a560d06/25797196285-500.jpg"
	}
];

export const getAlbums = () => albums;

export const getById = id => {
  const filteredAlbums = albums.filter(album => album.id === id);
  return filteredAlbums[0];
};


export const addAlbum = (urlRateYourMusic, rating) => {
  
  albums.push(newAlbum);
  
  return newAlbum;
};