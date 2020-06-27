import { GraphQLServer } from "graphql-yoga";
import mongoose from 'mongoose';
import dotenv from "dotenv"

const getAlbumDataFromRym = require('./getAlbumDataFromRym.js');

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



const Album = mongoose.model("Album",{
  urlRym: String,
  id: String,
  
  title: String,
  artist: String,
  year: String,
  
  rating: Number,
  
  review: String
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
    addAlbum: async (_, { urlRym, id, title, artist, year, rating, review}) => {
      
      
        const album = new Album({urlRym, id, title, artist, year, rating, review});
        await album.save();
        
        
        return album;
    },
    deleteAlbum: async (_, {id}) => {
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