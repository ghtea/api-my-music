const getAlbumCover = require('./getAlbumCover.js');

const urlRym = 'https://rateyourmusic.com/release/album/the-beatles/sgt-peppers-lonely-hearts-club-band-13/' ;
const pathFile = './storage/albumCovers/ohbeatles.png' ;

getAlbumCover(urlRym, pathFile)