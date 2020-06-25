import { getAlbums, getById} from "./db";

const resolvers = {
  Query: {
    albums: () => getAlbums(),
    album: (_, { id }) => getById(id)
  }
  
};

export default resolvers;