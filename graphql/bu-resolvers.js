import { getAlbumById, addAlbum} from "./db";

const resolvers = {
  
  Query: {
    albums: () => Album.find(),
    album: async (_,{id}) => {
        var result = await Album.findById(id);
        return result;
    }
  }
  
  , Mutation: {
    addAlbum: (_, { urlRym, rating }) => addAlbum(urlRym, rating)
  }
  
};

export default resolvers;