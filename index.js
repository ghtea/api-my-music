import { GraphQLServer } from "graphql-yoga";
import mongoose from 'mongoose';
import dotenv from "dotenv"


const getAlbumData = require('./getAlbumData.js');
const getAlbumCover = require('./getAlbumCover.js');

let Album = require('./mongodb/models/album');

dotenv.config({ 
  path: './.env' 
});




// mongo db 와 연결
mongoose
.connect(process.env.DB_URL, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(`DB Connection Error: ${err.message}`);
});





//resolvers
const resolvers = {
  Query: {
    getAlbums: ()=> Album.find(),
    getAlbum: async (_,{id}) => {
      var result = await Album.findById(id);
      return result;
  }
},
  Mutation: {
    addAlbum: async (_, {urlRym, rating, review}) => {
  
    	try {
    		let newAlbumWorking =  await getAlbumData(urlRym)
    		
    		let id = urlRym.replace(/https:\/\/rateyourmusic.com\//, '').replace(/\/$/, '').replace(/\//g,'_')
    		
    		newAlbumWorking = {
    			...newAlbumWorking,
    			_id: id,
    			urlRym: urlRym
    	  }
    	  
    		if (rating) {
    	  	newAlbumWorking["rating"] = rating;
    	  }
    	  if (review) {
    	    newAlbumWorking["review"] = review;
    	  }
    	  
        
        
        const pathFile = `./storage/albumCovers/${newAlbumWorking["_id"]}.png`
        await getAlbumCover(urlRym, pathFile)
        
        
        const album = new Album({...newAlbumWorking});
        await album.save();
      	return "album added successfully!";
      
      } catch (error) {
      		console.error(error);
      }
	
    },
    
    deleteAlbum: async (_, {_id}) => {
        await Album.findByIdAndRemove(id);
        return "Album deleted";
    }
  }
}


// run server
const server = new GraphQLServer({
  typeDefs: "graphql/schema.graphql",
  resolvers
});

const options = { 
  port: 2004
} 

server.start( (options), ({port} ) => console.log(`Graphql Server Running on port: ${port}`) );