import { getAlbums, getById} from "./db";

const resolvers = {
  
  Query: {
    albums: () => getAlbums(),
    album: (_, { id }) => getById(id)
  }
  
  , Mutation: {
    addAlbum: (_, { urlRym, rating }) => addMovie(name, score)
  }
  
};

export default resolvers;